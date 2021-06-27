package server

import (
	"encoding/json"
	"log"
	"net/http"
	"sysinfo/internal/logger"
	"sysinfo/internal/monitor"

	"github.com/gorilla/mux"
)

// Run starts the server in given port
func Run(port string) {
	handleRequests(port)
}

func handleRequests(port string) {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/api", handleMonitorDataRequest)
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./public/")))

	server := http.Server{}
	server.Addr = port
	server.Handler = router
	server.SetKeepAlivesEnabled(false)

	logger.Log("info", "API started on port "+port)
	log.Fatal(server.ListenAndServe())
}

func handleMonitorDataRequest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	system := monitor.Monitor()
	json.NewEncoder(w).Encode(&system)
}
