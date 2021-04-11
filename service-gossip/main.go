package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/dkvilo/gossip/app/controller"
	"github.com/dkvilo/gossip/app/functions"
	"github.com/dkvilo/gossip/app/hub"
	"github.com/dkvilo/gossip/app/middleware"
	"github.com/go-redis/redis/v8"
)

func init() {
	hub.H.RedisClient = redis.NewClient(&redis.Options{
		Addr:     "service-redis-storage:6379",
		Password: "",
		DB:       2,
	});
	go hub.H.Run()

}

func main()  {

	ctr := controller.New()

	http.HandleFunc("/", ctr.StaticServer)
	http.HandleFunc("/ws", middleware.VerifyHmac(ctr.WebSocket))
	http.HandleFunc("/api/thread/", middleware.VerifyHmac(ctr.GetThreadByID))

	fmt.Println("Hmac accessToken:", functions.GenerateHmac(os.Getenv("HMAC_MESSAGE"), os.Getenv("HMAC_SECRET")))

	panic(http.ListenAndServe(":5000", nil))
}
