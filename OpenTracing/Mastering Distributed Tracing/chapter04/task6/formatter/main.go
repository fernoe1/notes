package main

import (
	"chapter04/lib/trace"
	"chapter04/task6/othttp"
	"context"
	"net/http"

	opentracing "github.com/opentracing/opentracing-go"
)

func main() {
	tracer, closer := trace.Init("go-6-formatter")
	defer closer.Close()
	opentracing.SetGlobalTracer(tracer)

	http.HandleFunc("/formatGreeting", handleFormatGreeting)
	othttp.ListenAndServe(":8082", "/formatGreeting")
}

func handleFormatGreeting(w http.ResponseWriter, r *http.Request) {
	name := r.FormValue("name")
	title := r.FormValue("title")
	descr := r.FormValue("description")

	greeting := FormatGreeting(r.Context(), name, title, descr)
	w.Write([]byte(greeting))
}

func FormatGreeting(
	ctx context.Context,
	name, title, description string,
) string {
	span := opentracing.SpanFromContext(ctx)

	greeting := span.BaggageItem("greeting")
	if greeting == "" {
		greeting = "Hello"
	}
	response := greeting + ", "
	if title != "" {
		response += title + " "
	}
	response += name + "!"
	if description != "" {
		response += " " + description
	}

	return response
}
