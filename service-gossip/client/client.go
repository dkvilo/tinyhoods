package client

import (
	uuid "github.com/satori/go.uuid"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/dkvilo/gossip/app/hub"
)

// Serve handles websocket requests from the peer.
func Serve(h *hub.Hub, w http.ResponseWriter, r *http.Request) {

	var room string = r.URL.Query().Get("room")
	hub.Upgrader.CheckOrigin = func(r *http.Request) bool {
		originList := strings.Split(os.Getenv("ALLOWED_ORIGINS"), ",")
		for originIndex := range originList {
			if r.Header.Get("Origin") == originList[originIndex] {
				return true
			}
		}
		return false
	}

	conn, err := hub.Upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	sub := hub.Subscription{
		Conn: &hub.Connection{Send: make(chan []byte, 256), Ws: conn, Id: uuid.NewV4().String()},
		Room: room,
		RedisClient: hub.H.RedisClient,
	}

	hub.H.Register <- sub

	go sub.WritePump()
	go sub.ReadPump()
}

