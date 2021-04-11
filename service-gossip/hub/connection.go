package hub

import (
	"encoding/json"
	"time"
)

func writeInCache(pck []byte, thread string) {
	var data map[string]interface{}
	json.Unmarshal(pck, &data)
	data["thread"] = thread
	writable, _ := json.Marshal(data)
	if _, err := H.RedisClient.LPush(H.Ctx, "messages", writable).Result(); err != nil {
		panic(err)
	}
}

func getLastFromCache() string {
	var val string
	var err error
	if val, err = H.RedisClient.LIndex(H.Ctx, "messages", 0).Result(); err != nil {
		panic(err)
	}
	return val
}


// Write - writes a message with the given message type and payload.
func (c *Connection) Write(mt int, payload []byte) error {
	c.Ws.SetWriteDeadline(time.Now().Add(WriteWait))
	return c.Ws.WriteMessage(mt, payload);
}
