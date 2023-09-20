package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math"
	"net/http"
	"os"
	"path/filepath"
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
	bytes, err := os.ReadFile(scoresFile)
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
	err = os.WriteFile(scoresFile, bytes, 0644)
	if err != nil {
		log.Fatal(err)
	}
}

// AddScoreHandler handles the POST request to add a new score
func AddScoreHandler(w http.ResponseWriter, r *http.Request) {
	Cors(w, r)
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
	Cors(w, r)
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

func Cors(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}
}

func main() {
	// // Uncomment this stuff before building executable file.

	// // Get the full path of the executable file
	// exePath, err := os.Executable()
	// if err != nil {
	// 	fmt.Println("Error getting executable path:", err)
	// 	return
	// }

	// // Extract the directory from the executable path
	// exeDir := filepath.Dir(exePath)

	// // Change the working directory to the directory of the executable
	// err = os.Chdir(exeDir)
	// if err != nil {
	// 	fmt.Println("Error changing working directory:", err)
	// 	return
	// }

	// // End of section only for building exe.

	htmlFolderDir, _ := filepath.Abs("../")

	http.Handle("/", http.FileServer(http.Dir(htmlFolderDir)))

	staticAddr := "localhost:8080"
	fmt.Printf("Static File Server started at %s\n", staticAddr)

	// Start the static file server in a separate goroutine
	go func() {
		err := http.ListenAndServe(staticAddr, nil)
		if err != nil {
			log.Println("Static File Server Error:", err)
		}
	}()

	loadScores() // Load the scores from the file

	// Set up HTTP handlers for the scoreboard server
	http.HandleFunc("/add-score", AddScoreHandler)
	http.HandleFunc("/get-scores", GetScoresHandler)

	// Start the scoreboard server
	scoreboardAddr := "localhost:10000"
	fmt.Printf("Scoreboard Server started at %s\n", scoreboardAddr)
	log.Fatal(http.ListenAndServe(scoreboardAddr, nil))
}
