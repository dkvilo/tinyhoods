package controller

import (
	"encoding/json"
	"net/http"

	"github.com/dkvilo/gossip/app/functions"
	"github.com/dkvilo/gossip/app/hub"
)

// GetThreadByID .
func (c *Controller) GetThreadByID(w http.ResponseWriter, r *http.Request) {
		query := r.URL.Query()
		threadID := query.Get("id")
		if threadID == "" {
			http.Error(w, "Theard Id is missing", http.StatusBadRequest)
		}

		w.Header().Set("Content-Type", "text/json")
		json.NewEncoder(w).Encode(functions.GetMessagesFromThread(hub.H.RedisClient, hub.H.Ctx, threadID))
}

