package main

import (
	"chapter04/lib/trace"
	"chapter04/task3b/people"
	"context"
	"log"
	"net/http"
	"strings"

	opentracing "github.com/opentracing/opentracing-go"
	otlog "github.com/opentracing/opentracing-go/log"
)

var repo *people.Repository

//var tracer opentracing.Tracer

func main() {
	repo = people.NewRepository()
	defer repo.Close()

	tracer, closer := trace.Init("go-3-hello")
	defer closer.Close()
	opentracing.SetGlobalTracer(tracer)

	http.HandleFunc("/sayHello/", handleSayHello)

	log.Print("Listening on http://localhost:8080/")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func handleSayHello(w http.ResponseWriter, r *http.Request) {
	span := opentracing.GlobalTracer().StartSpan("say-hello")
	defer span.Finish()
	ctx := opentracing.ContextWithSpan(r.Context(), span)

	name := strings.TrimPrefix(r.URL.Path, "/sayHello/")
	greeting, err := SayHello(ctx, name)
	if err != nil {
		span.SetTag("error", true)
		span.LogFields(otlog.Error(err))

		http.Error(w, err.Error(), http.StatusInternalServerError)

		return
	}

	w.Write([]byte(greeting))
}

func SayHello(ctx context.Context, name string) (string, error) {
	person, err := repo.GetPerson(ctx, name)
	if err != nil {

		return "", err
	}

	opentracing.SpanFromContext(ctx).LogKV(
		"name", person.Name,
		"title", person.Title,
		"description", person.Description,
	)

	return FormatGreeting(
		ctx,
		person.Name,
		person.Title,
		person.Description,
	), nil
}

func FormatGreeting(
	ctx context.Context,
	name, title, description string,
) string {
	span, ctx := opentracing.StartSpanFromContext(
		ctx,
		"format-greeting",
	)
	defer span.Finish()

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
