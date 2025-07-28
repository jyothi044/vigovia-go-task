// types/itinerary.go
package types

type TripDetails struct {
    CustomerName      string `json:"customerName"`
    Destination       string `json:"destination"`
    Days              int    `json:"days"`
    Nights            int    `json:"nights"`
    DepartureFrom     string `json:"departureFrom"`
    DepartureDate     string `json:"departureDate"`
    ArrivalDate       string `json:"arrivalDate"`
    NumberOfTravelers int    `json:"numberOfTravelers"`
}

type Activity struct {
    ID          string `json:"id"`
    Name        string `json:"name"`
    Description string `json:"description"`
    Price       int    `json:"price"`
    Duration    string `json:"duration"`
    Type        string `json:"type"`
}

type Transfer struct {
    ID          string `json:"id"`
    Type        string `json:"type"`
    Timing      string `json:"timing"`
    Price       int    `json:"price"`
    Capacity    int    `json:"capacity"`
    Description string `json:"description"`
}

type DayItinerary struct {
    Day        int        `json:"day"`
    Date       string     `json:"date"`
    Activities []Activity `json:"activities"`
    Transfers  []Transfer `json:"transfers"`
}

type Flight struct {
    ID           string `json:"id"`
    Airline      string `json:"airline"`
    Date         string `json:"date"`
    From         string `json:"from"`
    To           string `json:"to"`
    FlightNumber string `json:"flightNumber"`
}

type Hotel struct {
    ID        string `json:"id"`
    City      string `json:"city"`
    CheckIn   string `json:"checkIn"`
    CheckOut  string `json:"checkOut"`
    Nights    int    `json:"nights"`
    Name      string `json:"name"`
}

type ActivityTableEntry struct {
    ID           string `json:"id"`
    City         string `json:"city"`
    Activity     string `json:"activity"`
    Type         string `json:"type"`
    TimeRequired string `json:"timeRequired"`
}

type PaymentInstallment struct {
    ID          string `json:"id"`
    Name        string `json:"name"`
    Amount      int    `json:"amount"`
    DueDate     string `json:"dueDate"`
    Description string `json:"description"`
}

type PaymentPlan struct {
    TotalAmount  int                `json:"totalAmount"`
    TCSCollected bool               `json:"tcsCollected"`
    Installments []PaymentInstallment `json:"installments"`
}

type VisaDetails struct {
    VisaType       string `json:"visaType"`
    Validity       string `json:"validity"`
    ProcessingDate string `json:"processingDate"`
}

type ImportantNote struct {
    ID      string `json:"id"`
    Point   string `json:"point"`
    Details string `json:"details"`
}

type ServiceScope struct {
    ID      string `json:"id"`
    Service string `json:"service"`
    Details string `json:"details"`
}

type InclusionItem struct {
    ID       string `json:"id"`
    Category string `json:"category"`
    Count    int    `json:"count"`
    Details  string `json:"details"`
    Status   string `json:"status"`
}

type ItineraryData struct {
    TripDetails    TripDetails         `json:"tripDetails"`
    DailyItinerary []DayItinerary      `json:"dailyItinerary"`
    Flights        []Flight            `json:"flights"`
    Hotels         []Hotel             `json:"hotels"`
    Activities     []ActivityTableEntry `json:"activities"`
    PaymentPlan    PaymentPlan         `json:"paymentPlan"`
    VisaDetails    VisaDetails         `json:"visaDetails"`
    ImportantNotes []ImportantNote     `json:"importantNotes"`
    ServiceScope   []ServiceScope      `json:"serviceScope"`
    Inclusions     []InclusionItem     `json:"inclusions"`
}