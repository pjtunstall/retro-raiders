package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"math"

	"net/http"
	"os"

	"sync"
)

// Score represents the score information
type Score struct {
	Name    string `json:"name"`
	Score   int    `json:"score"`
	Minutes int    `json:"minutes"`
	Seconds int    `json:"seconds"`
}

// ScoresData represents the data structure to store scores
type ScoresData struct {
	scores []Score
	mu     sync.Mutex
}

var scoresData ScoresData
var scoresFile = "scores.json" // The name of the JSON file to store the scores

// loadScores loads the scores from the JSON file
func loadScores() {
	// Read the file
	bytes, err := ioutil.ReadFile(scoresFile)
	if err != nil {
		// If the file doesn't exist, initialize an empty slice of scores
		if os.IsNotExist(err) {
			scoresData.scores = []Score{}
			return
		}
		log.Fatal(err)
	}

	// Unmarshal the JSON into the scores slice
	err = json.Unmarshal(bytes, &scoresData.scores)
	if err != nil {
		log.Fatal(err)
	}
}

// saveScores saves the scores to the JSON file
func saveScores() {
	// Marshal the scores slice into JSON
	bytes, err := json.Marshal(scoresData.scores)
	if err != nil {
		log.Fatal(err)
	}

	// Write the JSON to the file
	err = ioutil.WriteFile(scoresFile, bytes, 0644)
	if err != nil {
		log.Fatal(err)
	}
}

// func

// AddScoreHandler handles the POST request to add a new score
func AddScoreHandler(w http.ResponseWriter, r *http.Request) {
	Cors(&w, r)
	if r.Method != http.MethodPost {
		http.Error(w, `{"error": "405 Method Not Allowed"}`, http.StatusMethodNotAllowed)
		return
	}

	// Parse the JSON payload from the request body
	var score Score
	err := json.NewDecoder(r.Body).Decode(&score)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	minScore := math.MaxInt64

	for _, s := range scoresData.scores {
		if s.Score < minScore {
			minScore = s.Score
		}
	}

	if score.Score > minScore {
		for i, s := range scoresData.scores {
			if s.Score == minScore {
				scoresData.scores = append(scoresData.scores[:i], scoresData.scores[i+1:]...)
				break
			}
		}
	}

	// Add the score to the scores data
	scoresData.mu.Lock()
	scoresData.scores = append(scoresData.scores, score)
	saveScores() // Save the scores every time a new one is added
	scoresData.mu.Unlock()
	w.WriteHeader(http.StatusCreated)
}

// GetScoresHandler handles the GET request to retrieve all scores
func GetScoresHandler(w http.ResponseWriter, r *http.Request) {
	Cors(&w, r)
	if r.Method == http.MethodGet {
		// Retrieve the scores data
		scoresData.mu.Lock()
		scores := scoresData.scores
		scoresData.mu.Unlock()

		// Serialize the scores data to JSON
		response, err := json.Marshal(scores)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Set the Content-Type header to application/json
		w.Header().Set("Content-Type", "application/json")

		// Write the JSON response
		w.Write(response)
	} else {
		http.Error(w, `{"error": "405 Method Not Allowed"}`, http.StatusMethodNotAllowed)
		return
	}
}

// http://127.0.0.1:5500
func Cors(w *http.ResponseWriter, r *http.Request) {
	// http://127.0.0.1:57560
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Credentials", "true")
	(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type")
	if r.Method == http.MethodOptions {
		(*w).WriteHeader(http.StatusOK)
		return
	}
}

func main() {
	loadScores() // Load the scores from the file

	// Set up HTTP handlers
	http.HandleFunc("/add-score", AddScoreHandler)
	http.HandleFunc("/get-scores", GetScoresHandler)

	// Start the HTTP server
	log.Println("Starting server on port 10000...")
	log.Fatal(http.ListenAndServe(":10000", nil))
}
