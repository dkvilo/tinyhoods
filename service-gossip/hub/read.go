package hub

import (
	"encoding/json"
	"log"
	"time"

	"github.com/dkvilo/gossip/app/functions"

	"github.com/dkvilo/gossip/app/model"
	"github.com/gorilla/websocket"
)

// ReadPump pumps messages from the websocket connection to the hub.
// reads from this goroutine.
func (s Subscription) ReadPump() {
	c := s.Conn

	defer func() {
		H.Unregister <- s
		c.Ws.Close()
	}()

	c.Ws.SetReadLimit(MaxMessageSize)
	c.Ws.SetReadDeadline(time.Now().Add(PongWait))
	c.Ws.SetPongHandler(func(string) error { c.Ws.SetReadDeadline(time.Now().Add(PongWait)); return nil })

	for {
		_, msg, err := c.Ws.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway) {
				log.Printf("error: %v", err)
			}
			break
		}

		if !functions.IsJSON(msg) { return }

		var data map[string]interface{}
		if err := json.Unmarshal(msg, &data); err != nil {
			panic(err)
		}

		// Accepted Action Types By The Server
		var action = map[string]string {
			"MESSAGE": "send:message",
			"INFO": "system:info",
			"HIT_CACHE": "system:hit-cache",
		}

		switch data["action"] {
		case action["MESSAGE"]:
			writeInCache(msg, c.Id);
			H.Broadcast <-model.Message{Data: []byte(getLastFromCache()), Room: s.Room}
			break
		case action["INFO"]:
			H.Broadcast <-model.Message{Data: []byte(msg), Room: s.Room}
			break
		}
	}
}
