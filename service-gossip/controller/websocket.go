package controller

import (
	"net/http"

	"github.com/dkvilo/gossip/app/client"
	"github.com/dkvilo/gossip/app/hub"
)

// WebSocket Controller
func (c *Controller) WebSocket(w http.ResponseWriter, r *http.Request) {
	client.Serve(&hub.H, w, r);
}
