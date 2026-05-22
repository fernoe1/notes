package main

import (
	"chapter04/lib/trace"
	"chapter04/task1/people"
	"log"
	"net/http"
	"strings"

	opentracing "github.com/opentracing/opentracing-go"
)

var repo *people.Repository
var tracer opentracing.Tracer

func main() {
	repo = people.NewRepository()
	defer repo.Close()

	tr, closer := trace.Init("go-2-hello")
	defer closer.Close()

	tracer = tr

	http.HandleFunc("/sayHello/", handleSayHello)

	log.Print("Listening on http://localhost:8080/")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func handleSayHello(w http.ResponseWriter, r *http.Request) {
	span := tracer.StartSpan("say-hello")
	defer span.Finish()

	name := strings.TrimPrefix(r.URL.Path, "/sayHello/")
	greeting, err := SayHello(name)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)

		return
	}

	w.Write([]byte(greeting))
}

func SayHello(name string) (string, error) {
	person, err := repo.GetPerson(name)
	if err != nil {

		return "", err
	}

	return FormatGreeting(
		person.Name,
		person.Title,
		person.Description,
	), nil
}

func FormatGreeting(name, title, description string) string {
	response := "Hello, "
	if title != "" {
		response += title + " "
	}
	response += name + "!"
	if description != "" {
		response += " " + description
	}

	return response
}
