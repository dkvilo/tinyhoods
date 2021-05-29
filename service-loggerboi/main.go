package main

/*
 *
 * Loggerboi: main.go
 * Author: David Kviloria <dkviloria@gmail.com>
 * Type: HTTP Service
 * Version: 0.1
 *
 */
import (
	"bufio"
	"context"
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"time"
)

const (
	ServiceName = "Loggerboi"
	MaxBytes    = 1048576
)

// ######################## COLORS BOILERPLATE ################################## //
var (
	Red    = Color("\033[1;31m%s\033[0m")
	Green  = Color("\033[1;32m%s\033[0m")
	Yellow = Color("\033[1;33m%s\033[0m")
	Teal   = Color("\033[1;36m%s\033[0m")
)

var (
	Info  = Teal
	Warn  = Yellow
	Fatal = Red
	Succ  = Green
)

func Color(colorString string) func(...interface{}) string {
	return func(args ...interface{}) string {
		return fmt.Sprintf(colorString, fmt.Sprint(args...))
	}
}

// ##################### JSON DECODER BOILERPLATE ################################ //
type malformedRequest struct {
	status int
	msg    string
}

func (mr *malformedRequest) Error() string {
	return mr.msg
}

func decodeJSONBody(w http.ResponseWriter, r *http.Request, dst *Record) error {

	ct := r.Header.Get("Content-Type")
	if ct != "" && ct != "application/json" {
		msg := "Content-Type header is not application/json"
		return &malformedRequest{status: http.StatusUnsupportedMediaType, msg: msg}
	}

	r.Body = http.MaxBytesReader(w, r.Body, MaxBytes)
	defer r.Body.Close()

	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()

	err := dec.Decode(dst)

	if err != nil {
		var syntaxError *json.SyntaxError
		var unmarshalTypeError *json.UnmarshalTypeError

		switch {
		case errors.As(err, &syntaxError):
			msg := fmt.Sprintf("Request body contains badly-formed JSON (at position %d)", syntaxError.Offset)
			return &malformedRequest{status: http.StatusBadRequest, msg: msg}

		case errors.Is(err, io.ErrUnexpectedEOF):
			msg := fmt.Sprintf("Request body contains badly-formed JSON")
			return &malformedRequest{status: http.StatusBadRequest, msg: msg}

		case errors.As(err, &unmarshalTypeError):
			msg := fmt.Sprintf("Request body contains an invalid value for the %q field (at position %d)",
				unmarshalTypeError.Field, unmarshalTypeError.Offset)
			return &malformedRequest{status: http.StatusBadRequest, msg: msg}

		case strings.HasPrefix(err.Error(), "json: unknown field "):
			fieldName := strings.TrimPrefix(err.Error(), "json: unknown field ")
			msg := fmt.Sprintf("Request body contains unknown field %s", fieldName)
			return &malformedRequest{status: http.StatusBadRequest, msg: msg}

		case errors.Is(err, io.EOF):
			msg := "Request body must not be empty"
			return &malformedRequest{status: http.StatusBadRequest, msg: msg}

		case err.Error() == "http: request body too large":
			msg := "Request body must not be larger than 1MB"
			return &malformedRequest{status: http.StatusRequestEntityTooLarge, msg: msg}

		default:
			return err
		}
	}

	err = dec.Decode(&struct{}{})
	if err != io.EOF {
		msg := "Request body must only contain a single JSON object"
		return &malformedRequest{status: http.StatusBadRequest, msg: msg}
	}

	return nil
}

// ################### LOGGERBOI STUFF ... ####################################### //
type Logger struct{}
type Record struct {
	ServiceName string `json:"service_name"`
	Message     string `json:"message"`
	Type        uint8  `json:"type,omitempty"` // 0 Success, 1 Info, 2 Warning, 3 Error
}

func NewLogger() *Logger {
	return &Logger{}
}

func (lg *Logger) Log(r *Record) {
	ch := make(chan *Record, 500)

	// Read from the chanel
	go func(ch <-chan *Record) {
		for c := range ch {
			switch c.Type {
			case 0:
				log.Printf("(%s): %s", Succ(c.ServiceName), c.Message)
				break
			case 1: // Info
				log.Printf("(%s): %s", Info(c.ServiceName), c.Message)
				break
			case 2: // Warning
				log.Printf("(%s): %s", Warn(c.ServiceName), c.Message)
				break
			case 3: // Error
				log.Printf("(%s): %s", Fatal(c.ServiceName), c.Message)
				break
			}
		}
	}(ch)

	// Write in the chanel
	go func(ch chan *Record) {
		ch <- r
		close(ch)
	}(ch)
}

// ####################### SERVER INITIALIZATION ######################################### //
var cache []*Record
var lastLogOnDisk *Record

var l *Logger
var fport string

func init() {
	flag.StringVar(&fport, "port", ":4343", "HTTP Port Number")
	l = NewLogger()
}

func handler(w http.ResponseWriter, r *http.Request) {

	if r.Method == "GET" {
	}

	if r.Method == "POST" {
		var rec Record
		if err := decodeJSONBody(w, r, &rec); err != nil {
			var mr *malformedRequest
			if errors.As(err, &mr) {
				http.Error(w, mr.msg, mr.status)
			} else {
				l.Log(&Record{ServiceName: ServiceName, Type: 3, Message: err.Error()})
				http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			}
			return
		}

		cache = append(cache, &rec)
		l.Log(&rec)
	}
}

func save() {

	cache_len := len(cache)
	if cache_len == 0 {
		return
	}
	
	if lastLogOnDisk != nil && lastLogOnDisk == cache[cache_len-1] {
		return
	}

	f, err := os.OpenFile("logs.json", os.O_CREATE|os.O_RDWR, 0777)
	if err != nil {
		fmt.Println(err)
		return
	}

	w := bufio.NewWriter(f)
	start := time.Now()

	j, _ := json.Marshal(cache)
	w.WriteString(string(j))

	lastLogOnDisk = cache[cache_len - 1];

	w.Flush()
	f.Close()
	end := time.Now()

	rt := end.Sub(start).Seconds()
	l.Log(&Record{ServiceName: ServiceName, Type: 1, Message: fmt.Sprintf("Writing to disk took %s total of [%s] logs has been written", Succ(rt, "ms"), Succ(cache_len))})
}


func cleanUpMemory() {
	// IMPORTANT: Save before clean up memory
	save()

	cl := len(cache)
	if cl != 0 {
		cache = make([]*Record, 0)
		l.Log(&Record{ServiceName: ServiceName, Type: 1, Message: fmt.Sprintf("Memory has been freed -> total of [%s] logs", Succ(cl))})
	}
}

func main() {

	flag.Parse()
	http.HandleFunc("/stdin", handler)

	s := http.Server{
		Addr:         fport,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  120 * time.Second,
	}

	writer := time.NewTicker(60 * 2 * time.Second)
	writerDone := make(chan bool)

	cleaner := time.NewTicker(60 * 5 * time.Second)
	cleanerDone := make(chan bool)

	go func() {
		for {
			select {
			case <-cleanerDone:
				close(cleanerDone)
			case <-cleaner.C:
				cleanUpMemory()
			case <-writerDone:
				close(writerDone)
				return
			case <-writer.C:
				save()
			}
		}
	}()
	
	go func() {
		l.Log(&Record{ServiceName: ServiceName, Message: "Service has been started"})
		if err := s.ListenAndServe(); err != nil {
			l.Log(&Record{ServiceName: ServiceName, Type: 3, Message: err.Error()})
			os.Exit(1)
		}
	}()

	ch := make(chan os.Signal, 1)

	signal.Notify(ch, os.Interrupt)
	signal.Notify(ch, os.Kill)

	l.Log(&Record{ServiceName: ServiceName, Type: 1, Message: fmt.Sprintf("Received Signal: %s", <-ch)})
	ctx, c := context.WithTimeout(context.Background(), 30*time.Second)

	defer c()
	s.Shutdown(ctx)
}