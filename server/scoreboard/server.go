package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

var writeCount int
var writeMu sync.Mutex

var readCount int
var readMu sync.Mutex

type Score struct {
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

func loadScores() {
	readMu.Lock()
	if readCount > 45000 {
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
		log.Fatalf("Failed to retrieve scores: %v", err)
	}
	for _, doc := range docs {
		var score Score
		doc.DataTo(&score)
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
	scoresData.scores = append(scoresData.scores, score)
	if len(scoresData.scores) > 20 {
		deleteMinimumScore()
	}
	scoresData.mu.Unlock()

	writeMu.Lock()
	if writeCount > 15000 {
		writeMu.Unlock()
		w.WriteHeader(http.StatusTooManyRequests) // 429
		return
	}
	writeCount++
	writeMu.Unlock()

	ctx := context.Background()
	_, _, err = client.Collection("scores").Add(ctx, score)
	if err != nil {
		log.Fatalf("Failed adding score: %v", err)
	}

	w.WriteHeader(http.StatusCreated) // 201
}

func deleteMinimumScore() {
	minIndex := 0
	minScore := scoresData.scores[0].Score
	for i, score := range scoresData.scores {
		if score.Score < minScore {
			minScore = score.Score
			minIndex = i
		}
	}
	scoresData.scores = append(scoresData.scores[:minIndex], scoresData.scores[minIndex+1:]...)
}

func GetScoresHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	readMu.Lock()
	if readCount > 45000 {
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
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		if r.Method == "OPTIONS" {
			return
		}
		h(w, r)
	}
}

func main() {
	ctx := context.Background()
	sa := option.WithCredentialsFile("./retro-raiders-firebase-adminsdk-dmo0r-87d49b29c4.json")
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
