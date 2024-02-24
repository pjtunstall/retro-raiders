package main

import (
	"context"
	"log"

	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

type Score struct {
	Name    string `firestore:"name,omitempty"`
	Score   int    `firestore:"score,omitempty"`
	Minutes int    `firestore:"minutes,omitempty"`
	Seconds int    `firestore:"seconds,omitempty"`
}

func main() {
	opt := option.WithCredentialsFile("../scoreboard/retro-raiders-firebase-adminsdk-dmo0r-87d49b29c4.json")
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		log.Fatalf("error initializing app: %v", err)
	}

	client, err := app.Firestore(context.Background())
	if err != nil {
		log.Fatalf("error getting Firestore client: %v", err)
	}
	defer client.Close()

	/// Delete any existing scores
	scoresDocuments := client.Collection("scores").Documents(context.Background())
	docs, err := scoresDocuments.GetAll()
	if err != nil {
		log.Fatalf("Failed fetching scores: %v", err)
	}
	for _, doc := range docs {
		_, err = doc.Ref.Delete(context.Background())
		if err != nil {
			log.Fatalf("Failed deleting score: %v", err)
		}
	}

	var scores [20]Score
	for i := 0; i < 20; i++ {
		scores[i] = Score{Name: "...", Score: 0, Minutes: 0, Seconds: 0}
	}

	for _, score := range scores {
		_, _, err := client.Collection("scores").Add(context.Background(), score)
		if err != nil {
			log.Fatalf("Failed adding score: %v", err)
		}
	}

	log.Println("Scores added successfully")
}
