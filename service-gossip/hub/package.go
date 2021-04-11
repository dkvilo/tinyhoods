package hub

import (
	"context"
	"time"

	"github.com/dkvilo/gossip/app/model"
	"github.com/go-redis/redis/v8"
	"github.com/gorilla/websocket"
)

const (
	// WriteWait - Time allowed to write a message to the peer.
	WriteWait = 60 * time.Minute
	// PongWait - Time allowed to read the next pong message from the peer.
	PongWait = 60 * time.Minute
	// PingPeriod - Send pings to peer with this period. Must be less than pongWait.
	PingPeriod = (PongWait) / 10
	// MaxMessageSize - Maximum message size allowed from peer.
	MaxMessageSize = 1024
)

// Connection is an middleman between the websocket connection and the hub.
type Connection struct {
	// Ws - The websocket connection.
	Ws *websocket.Conn
	// Send - Buffered channel of outbound messages.
	Send chan []byte
	// Id - Connection unique id
	Id string
}

// Subscription structure
type Subscription struct {
	Conn *Connection
	Room string
	RedisClient *redis.Client
}

// Upgrader Configuration
var Upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

// Hub maintains the set of active connections and broadcasts messages to the
// connections.
type Hub struct {
	// Registered connections.
	Rooms map[string]map[*Connection]bool
	// Inbound messages from the connections.
	Broadcast chan model.Message
	// Register requests from the connections.
	Register chan Subscription
	// Unregister requests from connections.
	Unregister chan Subscription
	// RedisClient provider
	RedisClient *redis.Client
	// Ctx for redis
	Ctx context.Context
}


// H hub instance
var H = Hub {
	Broadcast:  make(chan model.Message),
	Register:   make(chan Subscription),
	Unregister: make(chan Subscription),
	Rooms:      make(map[string]map[*Connection]bool),
	Ctx: context.Background(),
}
