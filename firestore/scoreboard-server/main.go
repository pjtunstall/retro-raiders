package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"
	"time"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

var writeCount int
var writeMu sync.Mutex

var readCount int
var readMu sync.Mutex

type Score struct {
	ID      string `firestore:"-"`
	Name    string `firestore:"name"`
	Score   int    `firestore:"score"`
	Minutes int    `firestore:"minutes"`
	Seconds int    `firestore:"seconds"`
}

type ScoresData struct {
	scores []Score
	mu     sync.RWMutex
}

var scoresData ScoresData
var client *firestore.Client

func resetCounts() {
	loc, err := time.LoadLocation("America/Los_Angeles")
	now := time.Now()
	if err != nil {
		log.Println("Failed to load location, using local time:", err)
	} else {
		now = now.In(loc)
	}

	next := now.Add(time.Hour * 24)
	next = time.Date(next.Year(), next.Month(), next.Day(), 0, 0, 0, 0, loc)
	diff := next.Sub(now)

	ticker := time.NewTicker(diff)
	go func() {
		for range ticker.C {
			readMu.Lock()
			readCount = 0
			readMu.Unlock()

			writeMu.Lock()
			writeCount = 0
			writeMu.Unlock()

			ticker.Reset(24 * time.Hour)
		}
	}()
}

func loadScores() {
	readMu.Lock()
	if readCount > 49000 {
		readMu.Unlock()
		log.Println("Read limit exceeded")
		return
	}
	readCount++
	readMu.Unlock()

	ctx := context.Background()
	iter := client.Collection("scores").Documents(ctx)
	docs, err := iter.GetAll()
	if err != nil {
		log.Println("Failed to retrieve scores", err)
		return
	}
	for _, doc := range docs {
		var score Score
		doc.DataTo(&score)
		score.ID = doc.Ref.ID
		scoresData.mu.Lock()
		scoresData.scores = append(scoresData.scores, score)
		scoresData.mu.Unlock()
	}
	log.Println(readCount)
}

func AddScoreHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var score Score
	err := json.NewDecoder(r.Body).Decode(&score)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	scoresData.mu.Lock()
	defer scoresData.mu.Unlock()

	minScore, minID, minIndex := getMinimumScoreAndID()
	if score.Score <= minScore {
		http.Error(w, "Score not high enough", http.StatusBadRequest)
		return
	}

	if writeCount > 49000 {
		http.Error(w, "Write limit exceeded", http.StatusTooManyRequests) // 429
		return
	}
	writeMu.Lock()
	writeCount++
	writeMu.Unlock()

	scoresData.scores[minIndex] = score

	ctx := context.Background()
	_, err = client.Collection("scores").Doc(minID).Set(ctx, map[string]interface{}{
		"Name":    score.Name,
		"Score":   score.Score,
		"Minutes": score.Minutes,
		"Seconds": score.Seconds,
	})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

func getMinimumScoreAndID() (int, string, int) {
	minScore := scoresData.scores[0].Score
	minID := scoresData.scores[0].ID
	minIndex := 0
	for i, score := range scoresData.scores {
		if score.Score < minScore {
			minScore = score.Score
			minID = score.ID
			minIndex = i
		}
	}
	return minScore, minID, minIndex
}

func GetScoresHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	readMu.Lock()
	if readCount > 49000 {
		readMu.Unlock()
		http.Error(w, "Read limit exceeded", http.StatusTooManyRequests) // 429
		return
	}
	readMu.Unlock()

	scoresData.mu.RLock()
	scores := make([]Score, len(scoresData.scores))
	copy(scores, scoresData.scores)
	scoresData.mu.RUnlock()

	json.NewEncoder(w).Encode(scores)
}

func Cors(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Replace URL with * to allow any origin, e.g. for local testing
		w.Header().Set("Access-Control-Allow-Origin", "https://retro-raiders.netlify.app")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		if r.Method == "OPTIONS" {
			return
		}
		h(w, r)
	}
}

func main() {
	resetCounts()

	ctx := context.Background()
	sa := option.WithCredentialsFile("<relative-path-to-firebase-service-account-key.json>")
	app, err := firebase.NewApp(ctx, nil, sa)
	if err != nil {
		log.Fatalln(err)
	}
	client, err = app.Firestore(ctx)
	if err != nil {
		log.Fatalln(err)
	}
	defer client.Close()

	loadScores()

	http.HandleFunc("/add-score", Cors(AddScoreHandler))
	http.HandleFunc("/get-scores", Cors(GetScoresHandler))

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default port if not specified
	}
	fmt.Printf("Scoreboard Server started at :%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
