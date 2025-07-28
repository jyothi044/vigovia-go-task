package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "os"
    "vigovia-pdf-api/types"
    "vigovia-pdf-api/utils"
    "github.com/gorilla/handlers"
    "github.com/gorilla/mux"
)

func main() {
    r := mux.NewRouter()

    // Health check endpoint
    r.HandleFunc("/api/health", healthCheckHandler).Methods("GET", "OPTIONS")

    // PDF generation endpoint
    r.HandleFunc("/api/generate-pdf", generatePDFHandler).Methods("POST", "OPTIONS")

    // 404 handler
    r.NotFoundHandler = http.HandlerFunc(notFoundHandler)

    // CORS middleware
    corsHandler := handlers.CORS(
        handlers.AllowedOrigins([]string{"http://localhost:5173"}),
        handlers.AllowedMethods([]string{"GET", "POST", "OPTIONS"}),
        handlers.AllowedHeaders([]string{"Content-Type", "Accept"}),
        handlers.AllowCredentials(),
        handlers.MaxAge(300),
        handlers.OptionStatusCode(http.StatusOK),
    )(r)

    // Start server
    port := os.Getenv("PORT")
    if port == "" {
        port = "5000"
    }

    log.Printf("Vigovia PDF API server running on port %s", port)
    log.Printf("Health check: http://localhost:%s/api/health", port)
    log.Printf("PDF endpoint: http://localhost:%s/api/generate-pdf", port)

    // Wrap the router with a logging middleware for debugging
    loggedRouter := handlers.LoggingHandler(os.Stdout, corsHandler)

    err := http.ListenAndServe(":"+port, loggedRouter)
    if err != nil {
        log.Fatalf("Server failed to start: %v", err)
    }
}

func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
    log.Printf("Health check request: Method=%s, Origin=%s", r.Method, r.Header.Get("Origin"))
    if r.Method == http.MethodOptions {
        log.Println("Handling OPTIONS request for health check")
        w.WriteHeader(http.StatusOK)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(map[string]string{
        "status":  "OK",
        "message": "Vigovia PDF API is running",
    })
}

func generatePDFHandler(w http.ResponseWriter, r *http.Request) {
    log.Printf("PDF generation request: Method=%s, Origin=%s", r.Method, r.Header.Get("Origin"))
    if r.Method == http.MethodOptions {
        log.Println("Handling OPTIONS request for generate-pdf")
        w.WriteHeader(http.StatusOK)
        return
    }

    w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")

    var itineraryData types.ItineraryData
    if err := json.NewDecoder(r.Body).Decode(&itineraryData); err != nil {
        http.Error(w, `{"error":"Invalid JSON","message":"Failed to parse request body"}`, http.StatusBadRequest)
        return
    }

    // Validate required data
    if itineraryData.TripDetails.CustomerName == "" || itineraryData.TripDetails.Destination == "" {
        http.Error(w, `{"error":"Invalid data","message":"Trip details are required"}`, http.StatusBadRequest)
        return
    }

    // Generate PDF
    pdfBytes, err := utils.GeneratePDF(itineraryData)
    if err != nil {
        log.Printf("PDF generation error: %v", err)
        http.Error(w, `{"error":"PDF generation failed","message":"`+err.Error()+`"}`, http.StatusInternalServerError)
        return
    }

    // Set response headers for PDF download
    w.Header().Set("Content-Type", "application/pdf")
    w.Header().Set("Content-Disposition", fmt.Sprintf(`attachment; filename="%s_Itinerary.pdf"`, itineraryData.TripDetails.Destination))
    w.Header().Set("Content-Length", fmt.Sprintf("%d", len(pdfBytes)))

    // Send PDF bytes
    w.Write(pdfBytes)
}

func notFoundHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
    w.WriteHeader(http.StatusNotFound)
    json.NewEncoder(w).Encode(map[string]string{
        "error":   "Not Found",
        "message": "API endpoint not found",
    })
}