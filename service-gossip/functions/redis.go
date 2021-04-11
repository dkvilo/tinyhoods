package functions

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
	"strings"
)

// HitCache returns data from redis
func HitCache(client *redis.Client, ctx context.Context) []string {
	var val []string
	var err error
	if val, err = client.LRange(ctx, "messages", 0, 300).Result(); err != nil {
		panic(err)
	}
	return val
}

// GetMessagesFromThread - Returns list from specific thread
func GetMessagesFromThread(client *redis.Client, ctx context.Context, threadId string)[]string {
	thread, err := client.LRange(ctx, "messages", 0, 100).Result();
	if err != nil {
		panic(err)
	}

	var result []string
	for _, message := range thread {
		if strings.ContainsAny(message, fmt.Sprintf("thread: %s", threadId)) {
			result = append(result, message);
		}
	}

	fmt.Println(result)
	return result
}

