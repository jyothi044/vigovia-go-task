package utils

import (
    "bytes"
    "fmt"
    "log"
    "vigovia-pdf-api/types"
    "github.com/jung-kurt/gofpdf"
)

func GeneratePDF(data types.ItineraryData) ([]byte, error) {
    pdf := gofpdf.New("P", "pt", "A4", "")
    pdf.SetFont("Helvetica", "", 12)
    pageWidth, pageHeight := 595.0, 842.0
    yPos := 20.0

    // Helper function to check for page breaks
    checkPageBreak := func(neededHeight float64) {
        if yPos+neededHeight > pageHeight-50 {
            pdf.AddPage()
            yPos = 20.0
        }
    }

    // Company footer function
    addFooter := func() {
        footerY := pageHeight - 40
        pdf.SetLineWidth(0.5)
        pdf.SetDrawColor(200, 200, 200)
        pdf.Line(20, footerY-5, pageWidth-20, footerY-5)

        pdf.SetFont("Helvetica", "", 8)
        pdf.SetTextColor(100, 100, 100)
        // Left side company info
        pdf.SetXY(20, footerY)
        pdf.Cell(0, 0, "Vigovia Tech Pvt. Ltd")
        pdf.SetXY(20, footerY+4)
        pdf.Cell(0, 0, "Registered Office: Hd-109 Cinnabar Hills,")
        pdf.SetXY(20, footerY+8)
        pdf.Cell(0, 0, "Links Business Park, Karnataka, India")

        // Center contact info
        pdf.SetXY(pageWidth/2-30, footerY)
        pdf.Cell(0, 0, "Phone: +91-99X9999999")
        pdf.SetXY(pageWidth/2-30, footerY+4)
        pdf.Cell(0, 0, "Email: Contact@Vigovia.Com")

        // Right side logo
        pdf.SetFont("Helvetica", "", 12)
        pdf.SetTextColor(84, 28, 156)
        pdf.SetXY(pageWidth-50, footerY)
        pdf.Cell(0, 0, "vigovia")
        pdf.SetFont("Helvetica", "", 6)
        pdf.SetTextColor(100, 100, 100)
        pdf.SetXY(pageWidth-50, footerY+4)
        pdf.Cell(0, 0, "PLAN.PACK.GO")
    }

    // Add footer to all pages at the end
    addFooterToAllPages := func() {
        pageCount := pdf.PageCount()
        for i := 1; i <= pageCount; i++ {
            pdf.SetPage(i)
            addFooter()
        }
    }

    // Add first page
    pdf.AddPage()

    // Page 1: Header and Trip Overview
    // Company logo and branding
    pdf.SetFont("Helvetica", "", 20)
    pdf.SetTextColor(84, 28, 156)
    pdf.SetXY(pageWidth/2-20, yPos)
    pdf.Cell(0, 0, "vigovia")
    yPos += 6
    pdf.SetFont("Helvetica", "", 8)
    pdf.SetTextColor(100, 100, 100)
    pdf.SetXY(pageWidth/2-20, yPos)
    pdf.Cell(0, 0, "PLAN.PACK.GO")
    yPos += 20

    // Main header with solid background (approximating gradient)
    headerHeight := 40.0
    pdf.SetFillColor(84, 28, 156)
    pdf.Rect(40, yPos, pageWidth-80, headerHeight, "F")
    pdf.SetTextColor(255, 255, 255)
    pdf.SetFont("Helvetica", "", 16)
    pdf.SetXY(pageWidth/2-50, yPos+12)
    pdf.Cell(0, 0, fmt.Sprintf("Hi, %s!", data.TripDetails.CustomerName))
    pdf.SetFont("Helvetica", "", 14)
    pdf.SetXY(pageWidth/2-50, yPos+22)
    pdf.Cell(0, 0, fmt.Sprintf("%s Itinerary", data.TripDetails.Destination))
    pdf.SetFont("Helvetica", "", 10)
    pdf.SetXY(pageWidth/2-50, yPos+30)
    pdf.Cell(0, 0, fmt.Sprintf("%d Days %d Nights", data.TripDetails.Days, data.TripDetails.Nights))
    yPos += headerHeight + 15

    // Travel icons (text placeholders)
    iconY := yPos
    iconSpacing := 15.0
    startX := pageWidth/2 - (5*iconSpacing)/2
    pdf.SetFont("Helvetica", "", 10)
    pdf.SetTextColor(0, 0, 0)
    pdf.SetXY(startX, iconY)
    pdf.Cell(0, 0, "[Flight]")
    pdf.SetXY(startX+iconSpacing, iconY)
    pdf.Cell(0, 0, "[Hotel]")
    pdf.SetXY(startX+iconSpacing*2, iconY)
    pdf.Cell(0, 0, "[Time]")
    pdf.SetXY(startX+iconSpacing*3, iconY)
    pdf.Cell(0, 0, "[Car]")
    pdf.SetXY(startX+iconSpacing*4, iconY)
    pdf.Cell(0, 0, "[Calendar]")
    yPos += 15

    // Trip details table
    checkPageBreak(35)
    pdf.SetFillColor(245, 245, 245)
    pdf.Rect(20, yPos, pageWidth-40, 20, "F")
    pdf.SetLineWidth(0.5)
    pdf.SetDrawColor(200, 200, 200)
    pdf.Rect(20, yPos, pageWidth-40, 20, "D")
    tableWidth := pageWidth - 40
    colWidth := tableWidth / 5

    pdf.SetTextColor(0, 0, 0)
    pdf.SetFont("Helvetica", "", 8)
    pdf.SetXY(25, yPos+6)
    pdf.Cell(0, 0, "Departure From")
    pdf.SetXY(25+colWidth, yPos+6)
    pdf.Cell(0, 0, "Departure")
    pdf.SetXY(25+colWidth*2, yPos+6)
    pdf.Cell(0, 0, "Arrival")
    pdf.SetXY(25+colWidth*3, yPos+6)
    pdf.Cell(0, 0, "Destination")
    pdf.SetXY(25+colWidth*4, yPos+6)
    pdf.Cell(0, 0, "No. Of Travellers")

    pdf.SetFont("Helvetica", "", 9)
    pdf.SetXY(25, yPos+14)
    pdf.Cell(0, 0, data.TripDetails.DepartureFrom)
    pdf.SetXY(25+colWidth, yPos+14)
    pdf.Cell(0, 0, data.TripDetails.DepartureDate)
    pdf.SetXY(25+colWidth*2, yPos+14)
    pdf.Cell(0, 0, data.TripDetails.ArrivalDate)
    pdf.SetXY(25+colWidth*3, yPos+14)
    pdf.Cell(0, 0, data.TripDetails.Destination)
    pdf.SetXY(25+colWidth*4, yPos+14)
    pdf.Cell(0, 0, fmt.Sprintf("%d", data.TripDetails.NumberOfTravelers))
    yPos += 35

    // Daily itinerary
    for _, day := range data.DailyItinerary {
        checkPageBreak(80)
        pdf.SetFillColor(84, 28, 156)
        pdf.Rect(20, yPos, 30, 60, "F")
        pdf.SetTextColor(255, 255, 255)
        pdf.SetFont("Helvetica", "", 8)
        pdf.SetXY(35, yPos+20)
        pdf.Cell(0, 0, "Day")
        pdf.SetFont("Helvetica", "", 14)
        pdf.SetXY(35, yPos+35)
        pdf.Cell(0, 0, fmt.Sprintf("%d", day.Day))

        pdf.SetTextColor(0, 0, 0)
        pdf.SetFont("Helvetica", "", 10)
        pdf.SetXY(60, yPos+15)
        dateStr := day.Date
        if dateStr == "" {
            dateStr = "27th November"
        }
        pdf.Cell(0, 0, dateStr)
        pdf.SetFont("Helvetica", "", 8)
        pdf.SetXY(60, yPos+22)
        pdf.Cell(0, 0, fmt.Sprintf("Arrival In %s & City", data.TripDetails.Destination))
        pdf.SetXY(60, yPos+28)
        pdf.Cell(0, 0, "Exploration")

        timelineY := yPos + 35
        timelineX := 60.0

        morningActivities := filterActivities(day.Activities, "morning")
        if len(morningActivities) > 0 {
            pdf.SetFillColor(84, 28, 156)
            pdf.Circle(timelineX, timelineY, 1.5, "F")
            pdf.SetDrawColor(84, 28, 156)
            pdf.Line(timelineX, timelineY, timelineX, timelineY+12)
            pdf.SetTextColor(0, 0, 0)
            pdf.SetFont("Helvetica", "", 8)
            pdf.SetXY(timelineX+5, timelineY-1)
            pdf.Cell(0, 0, "Morning")
            timelineY += 6
            for _, activity := range morningActivities {
                pdf.SetFont("Helvetica", "", 7)
                pdf.SetXY(timelineX+8, timelineY)
                pdf.Cell(0, 0, fmt.Sprintf("• %s", activity.Name))
                timelineY += 6
                if activity.Description != "" {
                    pdf.SetXY(timelineX+8, timelineY)
                    pdf.Cell(0, 0, fmt.Sprintf("  %s", activity.Description))
                    timelineY += 4
                }
            }
            timelineY += 3
        }

        afternoonActivities := filterActivities(day.Activities, "afternoon")
        if len(afternoonActivities) > 0 {
            pdf.SetFillColor(84, 28, 156)
            pdf.Circle(timelineX, timelineY, 1.5, "F")
            pdf.SetDrawColor(84, 28, 156)
            pdf.Line(timelineX, timelineY, timelineX, timelineY+12)
            pdf.SetTextColor(0, 0, 0)
            pdf.SetFont("Helvetica", "", 8)
            pdf.SetXY(timelineX+5, timelineY-1)
            pdf.Cell(0, 0, "Afternoon")
            timelineY += 6
            for _, activity := range afternoonActivities {
                pdf.SetFont("Helvetica", "", 7)
                pdf.SetXY(timelineX+8, timelineY)
                pdf.Cell(0, 0, fmt.Sprintf("• %s", activity.Name))
                timelineY += 6
                if activity.Description != "" {
                    pdf.SetXY(timelineX+8, timelineY)
                    pdf.Cell(0, 0, fmt.Sprintf("  %s", activity.Description))
                    timelineY += 4
                }
            }
            timelineY += 3
        }

        eveningActivities := filterActivities(day.Activities, "evening")
        if len(eveningActivities) > 0 {
            pdf.SetFillColor(84, 28, 156)
            pdf.Circle(timelineX, timelineY, 1.5, "F")
            pdf.SetTextColor(0, 0, 0)
            pdf.SetFont("Helvetica", "", 8)
            pdf.SetXY(timelineX+5, timelineY-1)
            pdf.Cell(0, 0, "Evening")
            timelineY += 6
            for _, activity := range eveningActivities {
                pdf.SetFont("Helvetica", "", 7)
                pdf.SetXY(timelineX+8, timelineY)
                pdf.Cell(0, 0, fmt.Sprintf("• %s", activity.Name))
                timelineY += 6
                if activity.Description != "" {
                    pdf.SetXY(timelineX+8, timelineY)
                    pdf.Cell(0, 0, fmt.Sprintf("  %s", activity.Description))
                    timelineY += 4
                }
            }
            timelineY += 3
        }

        yPos += max(70, timelineY-yPos+15)
    }

    // Flight Summary Section
    if len(data.Flights) > 0 {
        checkPageBreak(60)
        pdf.SetFont("Helvetica", "", 14)
        pdf.SetTextColor(0, 0, 0)
        pdf.SetXY(20, yPos)
        pdf.Cell(0, 0, "Flight ")
        pdf.SetTextColor(147, 51, 234)
        pdf.SetXY(42, yPos)
        pdf.Cell(0, 0, "Summary")
        yPos += 15

        for _, flight := range data.Flights {
            checkPageBreak(20)
            pdf.SetFillColor(240, 230, 255)
            pdf.Rect(20, yPos, pageWidth-40, 15, "F")
            arrowWidth := 60.0
            pdf.SetFillColor(220, 200, 255)
            pdf.Rect(20, yPos, arrowWidth, 15, "F")
            pdf.SetTextColor(84, 28, 156)
            pdf.SetFont("Helvetica", "", 8)
            pdf.SetXY(25, yPos+9)
            dateStr := flight.Date
            if dateStr == "" {
                dateStr = "Thu 10 Jan'24"
            }
            pdf.Cell(0, 0, dateStr)
            pdf.SetTextColor(0, 0, 0)
            pdf.SetXY(95, yPos+9)
            pdf.Cell(0, 0, fmt.Sprintf("%s From %s To %s", flight.Airline, flight.From, flight.To))
            yPos += 18
        }

        pdf.SetFont("Helvetica", "", 7)
        pdf.SetTextColor(100, 100, 100)
        pdf.SetXY(20, yPos+5)
        pdf.Cell(0, 0, "Note: All Flights Include Meals, Seat Choice (Excluding XL), And 20kg/25Kg Checked Baggage.")
        yPos += 20
    }

    // Hotel Bookings Section
    if len(data.Hotels) > 0 {
        checkPageBreak(80)
        pdf.SetFont("Helvetica", "", 14)
        pdf.SetTextColor(0, 0, 0)
        pdf.SetXY(20, yPos)
        pdf.Cell(0, 0, "Hotel ")
        pdf.SetTextColor(147, 51, 234)
        pdf.SetXY(40, yPos)
        pdf.Cell(0, 0, "Bookings")
        yPos += 15

        pdf.SetFillColor(84, 28, 156)
        pdf.Rect(20, yPos, pageWidth-40, 10, "F")
        pdf.SetTextColor(255, 255, 255)
        pdf.SetFont("Helvetica", "", 8)
        colWidths := []float64{30, 30, 30, 20, 60}
        xPos := 25.0
        pdf.SetXY(xPos, yPos+6)
        pdf.Cell(0, 0, "City")
        xPos += colWidths[0]
        pdf.SetXY(xPos, yPos+6)
        pdf.Cell(0, 0, "Check In")
        xPos += colWidths[1]
        pdf.SetXY(xPos, yPos+6)
        pdf.Cell(0, 0, "Check Out")
        xPos += colWidths[2]
        pdf.SetXY(xPos, yPos+6)
        pdf.Cell(0, 0, "Nights")
        xPos += colWidths[3]
        pdf.SetXY(xPos, yPos+6)
        pdf.Cell(0, 0, "Hotel Name")
        yPos += 10

        for i, hotel := range data.Hotels {
            checkPageBreak(12)
            if i%2 == 0 {
                pdf.SetFillColor(248, 240, 255)
            } else {
                pdf.SetFillColor(255, 255, 255)
            }
            pdf.Rect(20, yPos, pageWidth-40, 10, "F")
            pdf.SetTextColor(0, 0, 0)
            pdf.SetFont("Helvetica", "", 7)
            xPos = 25
            pdf.SetXY(xPos, yPos+6)
            pdf.Cell(0, 0, hotel.City)
            xPos += colWidths[0]
            pdf.SetXY(xPos, yPos+6)
            pdf.Cell(0, 0, hotel.CheckIn)
            xPos += colWidths[1]
            pdf.SetXY(xPos, yPos+6)
            pdf.Cell(0, 0, hotel.CheckOut)
            xPos += colWidths[2]
            pdf.SetXY(xPos, yPos+6)
            pdf.Cell(0, 0, fmt.Sprintf("%d", hotel.Nights))
            xPos += colWidths[3]
            pdf.SetXY(xPos, yPos+6)
            pdf.Cell(0, 0, hotel.Name)
            yPos += 10
        }
        yPos += 15
    }

    // Payment Plan Section
    if data.PaymentPlan.TotalAmount > 0 {
        checkPageBreak(100)
        pdf.SetFont("Helvetica", "", 14)
        pdf.SetTextColor(0, 0, 0)
        pdf.SetXY(20, yPos)
        pdf.Cell(0, 0, "Payment ")
        pdf.SetTextColor(147, 51, 234)
        pdf.SetXY(55, yPos)
        pdf.Cell(0, 0, "Plan")
        yPos += 15

        pdf.SetFillColor(240, 230, 255)
        pdf.Rect(20, yPos, pageWidth-40, 12, "F")
        pdf.SetTextColor(0, 0, 0)
        pdf.SetFont("Helvetica", "", 8)
        pdf.SetXY(25, yPos+7)
        pdf.Cell(0, 0, "Total Amount")
        pdf.SetXY(110, yPos+7)
        pdf.Cell(0, 0, fmt.Sprintf("₹%d For %d Pax (Inclusive of GST)", data.PaymentPlan.TotalAmount, data.TripDetails.NumberOfTravelers))
        yPos += 15

        pdf.SetFillColor(240, 230, 255)
        pdf.Rect(20, yPos, pageWidth-40, 12, "F")
        pdf.SetTextColor(0, 0, 0)
        pdf.SetXY(25, yPos+7)
        pdf.Cell(0, 0, "TCS")
        pdf.SetXY(110, yPos+7)
        pdf.Cell(0, 0, mapBoolToString(data.PaymentPlan.TCSCollected))
        yPos += 20

        if len(data.PaymentPlan.Installments) > 0 {
            pdf.SetFillColor(84, 28, 156)
            pdf.Rect(20, yPos, pageWidth-40, 10, "F")
            pdf.SetTextColor(255, 255, 255)
            pdf.SetFont("Helvetica", "", 8)
            pdf.SetXY(25, yPos+6)
            pdf.Cell(0, 0, "Installment")
            pdf.SetXY(70, yPos+6)
            pdf.Cell(0, 0, "Amount")
            pdf.SetXY(115, yPos+6)
            pdf.Cell(0, 0, "Due Date")
            yPos += 10

            for i, installment := range data.PaymentPlan.Installments {
                checkPageBreak(12)
                if i%2 == 0 {
                    pdf.SetFillColor(248, 240, 255)
                } else {
                    pdf.SetFillColor(255, 255, 255)
                }
                pdf.Rect(20, yPos, pageWidth-40, 10, "F")
                pdf.SetTextColor(0, 0, 0)
                pdf.SetFont("Helvetica", "", 7)
                pdf.SetXY(25, yPos+6)
                pdf.Cell(0, 0, installment.Name)
                pdf.SetXY(70, yPos+6)
                pdf.Cell(0, 0, fmt.Sprintf("₹%d", installment.Amount))
                pdf.SetXY(115, yPos+6)
                pdf.Cell(0, 0, installment.DueDate)
                yPos += 10
            }
        }
        yPos += 15
    }

    // Visa Details Section
    if data.VisaDetails.VisaType != "" {
        checkPageBreak(40)
        pdf.SetFont("Helvetica", "", 14)
        pdf.SetTextColor(0, 0, 0)
        pdf.SetXY(20, yPos)
        pdf.Cell(0, 0, "Visa ")
        pdf.SetTextColor(147, 51, 234)
        pdf.SetXY(40, yPos)
        pdf.Cell(0, 0, "Details")
        yPos += 15
        pdf.SetFillColor(245, 245, 245)
        pdf.Rect(20, yPos, pageWidth-40, 20, "F")
        pdf.SetTextColor(0, 0, 0)
        pdf.SetFont("Helvetica", "", 8)
        pdf.SetXY(30, yPos+8)
        pdf.Cell(0, 0, fmt.Sprintf("Visa Type: %s", data.VisaDetails.VisaType))
        pdf.SetXY(100, yPos+8)
        pdf.Cell(0, 0, fmt.Sprintf("Validity: %s", data.VisaDetails.Validity))
        pdf.SetXY(30, yPos+15)
        pdf.Cell(0, 0, fmt.Sprintf("Processing Date: %s", data.VisaDetails.ProcessingDate))
        yPos += 35
    }

    // Add footer to all pages
    addFooterToAllPages()

    // Generate PDF as byte array
    var buf bytes.Buffer
    err := pdf.Output(&buf)
    if err != nil {
        log.Printf("Error writing PDF: %v", err)
        return nil, err
    }

    return buf.Bytes(), nil
}

// Helper function to filter activities by type
func filterActivities(activities []types.Activity, activityType string) []types.Activity {
    var filtered []types.Activity
    for _, activity := range activities {
        if activity.Type == activityType {
            filtered = append(filtered, activity)
        }
    }
    return filtered
}

// Helper function to map boolean to string
func mapBoolToString(b bool) string {
    if b {
        return "Collected"
    }
    return "Not Collected"
}

// Helper function to get maximum of two float64 values
func max(a, b float64) float64 {
    if a > b {
        return a
    }
    return b
}

