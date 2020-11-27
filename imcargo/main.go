package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	_ "image/jpeg"
	_ "image/png"

	_ "golang.org/x/image/bmp"
	_ "golang.org/x/image/tiff"
	_ "golang.org/x/image/webp"

	"github.com/dkvilo/imcargo/controller"
	"github.com/dkvilo/imcargo/functions"
	"github.com/dkvilo/imcargo/middleware"
	"github.com/julienschmidt/httprouter"
	"github.com/rs/cors"
)


func main() {

	mux := httprouter.New()
	ctrl := controller.New()

	c := cors.New(
		cors.Options{
			AllowedOrigins: []string{"http://localhost:3000", "http://localhost", "http://localhost:4000"},
			AllowCredentials: true,
		},
	)

	handler := c.Handler(mux)

	mux.Handler("GET", "/", http.NotFoundHandler())
	mux.Handler("GET", "/favicon.ico", http.NotFoundHandler())

	go mux.POST("/upload", middleware.VerifyHmac(ctrl.Upload))

	fmt.Println("accessToken:", functions.GenerateHmac(os.Getenv("HMAC_MESSAGE"), os.Getenv("HMAC_SECRET")))

	mux.ServeFiles("/static/*filepath", http.Dir("static"))
	log.Fatal(http.ListenAndServe(":8080", handler))
}




