```
# Vigovia Travel Itinerary System

This repository contains the full stack implementation of the Vigovia travel itinerary system, consisting of a Go-based backend API and a React-based frontend application. The system allows users to create multi-step travel itineraries and generate PDFs matching a predefined Figma design.

## Overview

### Backend
- **Language**: Go
- **Purpose**: Provides a RESTful API to validate itinerary data.
- **Endpoints**:
  - `POST /api/generate-pdf`: Validates itinerary data.
  - `GET /api/health`: Checks API health.

### Frontend
- **Framework**: React
- **Styling**: Tailwind CSS
- **PDF Generation**: jsPDF (client-side)
- **Purpose**: Multi-step form for itinerary creation and PDF generation.

## Prerequisites

- **For Backend**:
  - Go (version 1.18 or later)
- **For Frontend**:
  - Node.js (version 16 or later)
  - npm (usually included with Node.js)
- Internet connection (for dependency setup)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd vigovia-travel-itinerary
```

### 2. Backend Setup
- Navigate to the backend directory:
  ```bash
  cd vigovia-pdf-api
  ```
- Install dependencies:
  ```bash
  go mod tidy
  ```
- Run the backend:
  ```bash
  go run main.go
  ```
  - Expected output:
    ```
    🚀 Vigovia PDF API server running on port 5000
    📋 Health check: http://localhost:5000/api/health
    📄 PDF endpoint: http://localhost:5000/api/generate-pdf
    ```
- Test the API (e.g., using `curl`):
  ```bash
  curl -X POST http://localhost:5000/api/generate-pdf -H "Content-Type: application/json" -d '{"tripDetails":{"customerName":"Test User","destination":"Paris"}}'
  ```
  - Expected response: `{"status":"success","message":"Data received for PDF generation"}`

### 3. Frontend Setup
- Navigate to the frontend directory:
  ```bash
  cd ../<frontend-directory>
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Install `jsPDF` for PDF generation:
  ```bash
  npm install jspdf
  ```
- Start the development server:
  ```bash
  npm run dev
  ```
  - Open `http://localhost:5173` in your browser.

### 4. Verify Integration
- Ensure the backend is running at `http://localhost:5000`.
- The frontend will communicate with this endpoint for data validation.

## Usage

### Backend
- **POST /api/generate-pdf**: Send itinerary data as JSON to validate it.
- **GET /api/health**: Use to confirm the API is operational.

### Frontend
1. **Navigate the Form**:
   - Complete each step (Trip Details, Daily Itinerary, Flights, etc.) using the provided forms.
   - Use "Next" and "Previous" buttons to move between steps.
2. **Generate PDF**:
   - After filling all details, click "Generate Itinerary PDF" on the final step.
   - A PDF file (e.g., `Paris_Itinerary.pdf`) will download, styled according to the Figma design.

## Directory Structure

- `vigovia-pdf-api/`:
  - `main.go`: Backend entry point.
  - `utils/`: Utility functions (e.g., `pdf_generator.go`).
  - `types/`: Data structure definitions.
- `<frontend-directory>/`:
  - `src/App.tsx`: Main React component.
  - `src/components/`: Form step components.
  - `src/types.ts`: Type definitions.
  - `src/pdfGenerator.ts`: PDF generation logic.
  - `src/utils/apiClient.ts`: API client.

## Features

- **Backend**: Lightweight API for data validation.
- **Frontend**: Interactive multi-step form with client-side PDF generation.
- **Design**: PDF output matches Figma design with gradients, icons, and tables.

## Contributing

- Report bugs or suggest enhancements by creating an issue.
- Submit pull requests with detailed change descriptions.

## License
