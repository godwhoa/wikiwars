package main

import (
	"fmt"
	"log"
	"net/http"
)

func RandomPage() string {
	resp, err := http.Get("https://en.wikipedia.org/wiki/Special:Random")
	if err != nil {
		log.Fatalf("http.Get => %v", err.Error())
	}
	seed := resp.Request.URL.String()
	return seed
}
func main() {
	fmt.Println(RandomPage())
}
