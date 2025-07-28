import jsPDF from 'jspdf';
import { ItineraryData } from '../types';

export const generatePDF = (data: ItineraryData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  let yPos = 20;

  // Helper function to add new page if needed
  const checkPageBreak = (neededHeight: number) => {
    if (yPos + neededHeight > pageHeight - 50) {
      doc.addPage();
      yPos = 20;
    }
  };

  // Company footer function
  const addFooter = () => {
    const footerY = pageHeight - 40;
    
    // Footer line
    doc.setDrawColor(200, 200, 200);
    doc.line(20, footerY - 5, pageWidth - 20, footerY - 5);
    
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    
    // Left side company info
    doc.text('Vigovia Tech Pvt. Ltd', 20, footerY);
    doc.text('Registered Office: Hd-109 Cinnabar Hills,', 20, footerY + 4);
    doc.text('Links Business Park, Karnataka, India', 20, footerY + 8);
    
    // Center contact info
    doc.text('Phone: +91-99X9999999', pageWidth/2 - 30, footerY);
    doc.text('Email ID: Contact@Vigovia.Com', pageWidth/2 - 30, footerY + 4);
    
    // Right side logo
    doc.setFontSize(12);
    doc.setTextColor(84, 28, 156); // Purple color
    doc.text('vigovia', pageWidth - 50, footerY);
    doc.setFontSize(6);
    doc.setTextColor(100, 100, 100);
    doc.text('PLAN.PACK.GO', pageWidth - 50, footerY + 4);
  };

  // Add footer to all pages at the end
  const addFooterToAllPages = () => {
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      addFooter();
    }
  };

  // Page 1: Header and Trip Overview
  // Company logo and branding
  doc.setFontSize(20);
  doc.setTextColor(84, 28, 156); // Purple
  doc.text('vigovia', pageWidth / 2, yPos, { align: 'center' });
  yPos += 6;
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('PLAN.PACK.GO', pageWidth / 2, yPos, { align: 'center' });
  yPos += 20;

  // Main header with gradient background
  const headerHeight = 40;
  // Create gradient effect with blue to purple
  doc.setFillColor(74, 144, 226); // Blue
  doc.roundedRect(40, yPos, pageWidth - 80, headerHeight, 8, 8, 'F');
  
  // Add purple gradient overlay
  for (let i = 0; i < headerHeight; i++) {
    const ratio = i / headerHeight;
    const r = Math.round(74 + (84 - 74) * ratio);
    const g = Math.round(144 + (28 - 144) * ratio);
    const b = Math.round(226 + (156 - 226) * ratio);
    doc.setFillColor(r, g, b);
    doc.rect(40, yPos + i, pageWidth - 80, 1, 'F');
  }
  
  // Header text
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text(`Hi, ${data.tripDetails.customerName}!`, pageWidth / 2, yPos + 12, { align: 'center' });
  doc.setFontSize(14);
  doc.text(`${data.tripDetails.destination} Itinerary`, pageWidth / 2, yPos + 22, { align: 'center' });
  doc.setFontSize(10);
  doc.text(`${data.tripDetails.days} Days ${data.tripDetails.nights} Nights`, pageWidth / 2, yPos + 30, { align: 'center' });
  
  // Travel icons using ASCII characters that render properly in PDF
  doc.setFontSize(12);
  const iconY = yPos + 37;
  const iconSpacing = 15;
  const startX = pageWidth / 2 - (4 * iconSpacing) / 2;
  
  // Flight icon
  doc.text('F', startX, iconY, { align: 'center' });
  
  // Hotel icon
  doc.text('H', startX + iconSpacing, iconY, { align: 'center' });
  
  // Time icon
  doc.text('T', startX + iconSpacing * 2, iconY, { align: 'center' });
  
  // Transport icon
  doc.text('C', startX + iconSpacing * 3, iconY, { align: 'center' });
  
  // Calendar icon
  doc.text('D', startX + iconSpacing * 4, iconY, { align: 'center' });
  
  yPos += headerHeight + 15;

  // Trip details table
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(20, yPos, pageWidth - 40, 20, 3, 3, 'F');
  doc.setDrawColor(200, 200, 200);
  doc.roundedRect(20, yPos, pageWidth - 40, 20, 3, 3, 'S');
  
  const tableWidth = pageWidth - 40;
  const colWidth = tableWidth / 5;
  
  // Table headers
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(8);
  doc.text('Departure From', 25, yPos + 6);
  doc.text('Departure', 25 + colWidth, yPos + 6);
  doc.text('Arrival', 25 + colWidth * 2, yPos + 6);
  doc.text('Destination', 25 + colWidth * 3, yPos + 6);
  doc.text('No. Of Travellers', 25 + colWidth * 4, yPos + 6);
  
  // Table values
  doc.setFontSize(9);
  doc.text(data.tripDetails.departureFrom, 25, yPos + 14);
  doc.text(data.tripDetails.departureDate, 25 + colWidth, yPos + 14);
  doc.text(data.tripDetails.arrivalDate, 25 + colWidth * 2, yPos + 14);
  doc.text(data.tripDetails.destination, 25 + colWidth * 3, yPos + 14);
  doc.text(data.tripDetails.numberOfTravelers.toString(), 25 + colWidth * 4, yPos + 14);
  
  yPos += 35;

  // Daily itinerary with exact Figma styling
  data.dailyItinerary.forEach((day, index) => {
    checkPageBreak(80);
    
    // Day number circle (purple background)
    doc.setFillColor(84, 28, 156); // Purple
    doc.roundedRect(20, yPos, 30, 60, 15, 15, 'F');
    
    // Day text in white
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text('Day', 35, yPos + 20, { align: 'center' });
    doc.setFontSize(14);
    doc.text(`${day.day}`, 35, yPos + 35, { align: 'center' });
    
    // Date and location info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(`${day.date || '27th November'}`, 60, yPos + 15);
    doc.setFontSize(8);
    doc.text(`Arrival In ${data.tripDetails.destination} & City`, 60, yPos + 22);
    doc.text('Exploration', 60, yPos + 28);
    
    // Timeline with activities
    let timelineY = yPos + 35;
    const timelineX = 60;
    
    // Morning activities
    const morningActivities = day.activities.filter(a => a.type === 'morning');
    if (morningActivities.length > 0) {
      // Timeline dot
      doc.setFillColor(84, 28, 156);
      doc.circle(timelineX, timelineY, 1.5, 'F');
      doc.setDrawColor(84, 28, 156);
      doc.line(timelineX, timelineY, timelineX, timelineY + 12);
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(8);
      doc.text('Morning', timelineX + 5, timelineY + 1);
      
      morningActivities.forEach((activity) => {
        timelineY += 6;
        doc.setFontSize(7);
        doc.text(`• ${activity.name}`, timelineX + 8, timelineY);
        if (activity.description) {
          timelineY += 4;
          doc.text(`  ${activity.description}`, timelineX + 8, timelineY);
        }
      });
      timelineY += 3;
    }
    
    // Afternoon activities
    const afternoonActivities = day.activities.filter(a => a.type === 'afternoon');
    if (afternoonActivities.length > 0) {
      doc.setFillColor(84, 28, 156);
      doc.circle(timelineX, timelineY, 1.5, 'F');
      doc.setDrawColor(84, 28, 156);
      doc.line(timelineX, timelineY, timelineX, timelineY + 12);
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(8);
      doc.text('Afternoon', timelineX + 5, timelineY + 1);
      
      afternoonActivities.forEach((activity) => {
        timelineY += 6;
        doc.setFontSize(7);
        doc.text(`• ${activity.name}`, timelineX + 8, timelineY);
        if (activity.description) {
          timelineY += 4;
          doc.text(`  ${activity.description}`, timelineX + 8, timelineY);
        }
      });
      timelineY += 3;
    }
    
    // Evening activities
    const eveningActivities = day.activities.filter(a => a.type === 'evening');
    if (eveningActivities.length > 0) {
      doc.setFillColor(84, 28, 156);
      doc.circle(timelineX, timelineY, 1.5, 'F');
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(8);
      doc.text('Evening', timelineX + 5, timelineY + 1);
      
      eveningActivities.forEach((activity) => {
        timelineY += 6;
        doc.setFontSize(7);
        doc.text(`• ${activity.name}`, timelineX + 8, timelineY);
        if (activity.description) {
          timelineY += 4;
          doc.text(`  ${activity.description}`, timelineX + 8, timelineY);
        }
      });
    }
    
    yPos += Math.max(70, timelineY - yPos + 15);
  });

  // Flight Summary Section
  if (data.flights.length > 0) {
    checkPageBreak(60);
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Flight ', 20, yPos);
    doc.setTextColor(147, 51, 234); // Purple for "Summary"
    doc.text('Summary', 42, yPos);
    yPos += 15;
    
    data.flights.forEach((flight) => {
      checkPageBreak(20);
      
      // Flight entry with arrow design
      doc.setFillColor(240, 230, 255); // Light purple background
      doc.roundedRect(20, yPos, pageWidth - 40, 15, 3, 3, 'F');
      
      // Date section (left arrow part)
      const arrowWidth = 60;
      doc.setFillColor(220, 200, 255);
      doc.roundedRect(20, yPos, arrowWidth, 15, 3, 3, 'F');
      
      // Arrow point (triangle)
      doc.setFillColor(220, 200, 255);
      const points = [
        [20 + arrowWidth, yPos],
        [20 + arrowWidth + 8, yPos + 7.5],
        [20 + arrowWidth, yPos + 15]
      ];
      doc.triangle(points[0][0], points[0][1], points[1][0], points[1][1], points[2][0], points[2][1], 'F');
      
      // Date text
      doc.setTextColor(84, 28, 156);
      doc.setFontSize(8);
      doc.text(flight.date || 'Thu 10 Jan\'24', 25, yPos + 9);
      
      // Flight details
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(8);
      doc.text(`${flight.airline} From ${flight.from} To ${flight.to}`, 95, yPos + 9);
      
      yPos += 18;
    });
    
    // Flight note
    doc.setFontSize(7);
    doc.setTextColor(100, 100, 100);
    doc.text('Note: All Flights Include Meals, Seat Choice (Excluding XL), And 20kg/25Kg Checked Baggage.', 20, yPos + 5);
    yPos += 20;
  }

  // Hotel Bookings Section
  if (data.hotels.length > 0) {
    checkPageBreak(80);
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Hotel ', 20, yPos);
    doc.setTextColor(147, 51, 234);
    doc.text('Bookings', 40, yPos);
    yPos += 15;
    
    // Table header with purple background
    const headerHeight = 10;
    doc.setFillColor(84, 28, 156);
    doc.roundedRect(20, yPos, pageWidth - 40, headerHeight, 3, 3, 'F');
    
    // Header text
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    const colWidths = [30, 30, 30, 20, 60];
    let xPos = 25;
    doc.text('City', xPos, yPos + 6);
    xPos += colWidths[0];
    doc.text('Check In', xPos, yPos + 6);
    xPos += colWidths[1];
    doc.text('Check Out', xPos, yPos + 6);
    xPos += colWidths[2];
    doc.text('Nights', xPos, yPos + 6);
    xPos += colWidths[3];
    doc.text('Hotel Name', xPos, yPos + 6);
    
    yPos += headerHeight;
    
    // Hotel data rows
    data.hotels.forEach((hotel, index) => {
      checkPageBreak(12);
      
      // Alternating row colors
      if (index % 2 === 0) {
        doc.setFillColor(248, 240, 255);
      } else {
        doc.setFillColor(255, 255, 255);
      }
      doc.rect(20, yPos, pageWidth - 40, 10, 'F');
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(7);
      xPos = 25;
      doc.text(hotel.city, xPos, yPos + 6);
      xPos += colWidths[0];
      doc.text(hotel.checkIn, xPos, yPos + 6);
      xPos += colWidths[1];
      doc.text(hotel.checkOut, xPos, yPos + 6);
      xPos += colWidths[2];
      doc.text(hotel.nights.toString(), xPos, yPos + 6);
      xPos += colWidths[3];
      doc.text(hotel.name, xPos, yPos + 6);
      
      yPos += 10;
    });
    
    // Hotel notes
    yPos += 8;
    doc.setFontSize(7);
    doc.setTextColor(100, 100, 100);
    doc.text('1. All Hotels Are Tentative And Can Be Replaced With Similar.', 20, yPos);
    doc.text('2. Breakfast Included For All Hotel Stays', 20, yPos + 4);
    doc.text('3. All Hotels Will Be 4* And Above Category', 20, yPos + 8);
    doc.text('4. A maximum occupancy of 2 people/room is allowed in most hotels.', 20, yPos + 12);
    yPos += 20;
  }

  // Important Notes Section
  if (data.importantNotes.length > 0) {
    checkPageBreak(80);
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Important ', 20, yPos);
    doc.setTextColor(147, 51, 234);
    doc.text('Notes', 55, yPos);
    yPos += 15;
    
    // Table header
    doc.setFillColor(84, 28, 156);
    doc.roundedRect(20, yPos, pageWidth - 40, 10, 3, 3, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text('Point', 25, yPos + 6);
    doc.text('Details', 90, yPos + 6);
    yPos += 10;
    
    // Notes data
    data.importantNotes.forEach((note, index) => {
      checkPageBreak(12);
      
      if (index % 2 === 0) {
        doc.setFillColor(248, 240, 255);
      } else {
        doc.setFillColor(255, 255, 255);
      }
      doc.rect(20, yPos, pageWidth - 40, 10, 'F');
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(7);
      doc.text(note.point, 25, yPos + 6);
      doc.text(note.details, 90, yPos + 6);
      
      yPos += 10;
    });
    yPos += 15;
  }

  // Scope of Service Section
  if (data.serviceScope.length > 0) {
    checkPageBreak(80);
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Scope Of ', 20, yPos);
    doc.setTextColor(147, 51, 234);
    doc.text('Service', 55, yPos);
    yPos += 15;
    
    // Table header
    doc.setFillColor(84, 28, 156);
    doc.roundedRect(20, yPos, pageWidth - 40, 10, 3, 3, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text('Service', 25, yPos + 6);
    doc.text('Details', 90, yPos + 6);
    yPos += 10;
    
    // Service data
    data.serviceScope.forEach((scope, index) => {
      checkPageBreak(12);
      
      if (index % 2 === 0) {
        doc.setFillColor(248, 240, 255);
      } else {
        doc.setFillColor(255, 255, 255);
      }
      doc.rect(20, yPos, pageWidth - 40, 10, 'F');
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(7);
      doc.text(scope.service, 25, yPos + 6);
      doc.text(scope.details, 90, yPos + 6);
      
      yPos += 10;
    });
    yPos += 15;
  }

  // Inclusion Summary Section
  if (data.inclusions.length > 0) {
    checkPageBreak(80);
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Inclusion ', 20, yPos);
    doc.setTextColor(147, 51, 234);
    doc.text('Summary', 55, yPos);
    yPos += 15;
    
    // Table header
    doc.setFillColor(84, 28, 156);
    doc.roundedRect(20, yPos, pageWidth - 40, 10, 3, 3, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    const inclColWidths = [25, 15, 60, 45];
    let inclXPos = 25;
    doc.text('Category', inclXPos, yPos + 6);
    inclXPos += inclColWidths[0];
    doc.text('Count', inclXPos, yPos + 6);
    inclXPos += inclColWidths[1];
    doc.text('Details', inclXPos, yPos + 6);
    inclXPos += inclColWidths[2];
    doc.text('Status / Comments', inclXPos, yPos + 6);
    yPos += 10;
    
    // Inclusion data
    data.inclusions.forEach((inclusion, index) => {
      checkPageBreak(12);
      
      if (index % 2 === 0) {
        doc.setFillColor(248, 240, 255);
      } else {
        doc.setFillColor(255, 255, 255);
      }
      doc.rect(20, yPos, pageWidth - 40, 10, 'F');
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(7);
      inclXPos = 25;
      doc.text(inclusion.category, inclXPos, yPos + 6);
      inclXPos += inclColWidths[0];
      doc.text(inclusion.count.toString(), inclXPos, yPos + 6);
      inclXPos += inclColWidths[1];
      doc.text(inclusion.details, inclXPos, yPos + 6);
      inclXPos += inclColWidths[2];
      doc.text(inclusion.status, inclXPos, yPos + 6);
      
      yPos += 10;
    });
    
    // Transfer policy note
    yPos += 8;
    doc.setFontSize(7);
    doc.setTextColor(0, 0, 0);
    doc.text('Transfer Policy(Refundable Upon Claim)', 20, yPos);
    doc.text('If Any Transfer Is Delayed Beyond 15 Minutes, Customers May Book An App-Based Or Radio Taxi And Claim A Refund For That Specific Leg', 20, yPos + 4);
    yPos += 15;
  }

  // Activity Table Section
  if (data.activities.length > 0) {
    checkPageBreak(80);
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Activity ', 20, yPos);
    doc.setTextColor(147, 51, 234);
    doc.text('Table', 50, yPos);
    yPos += 15;
    
    // Table header
    doc.setFillColor(84, 28, 156);
    doc.roundedRect(20, yPos, pageWidth - 40, 10, 3, 3, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    const actColWidths = [30, 60, 30, 25];
    let actXPos = 25;
    doc.text('City', actXPos, yPos + 6);
    actXPos += actColWidths[0];
    doc.text('Activity', actXPos, yPos + 6);
    actXPos += actColWidths[1];
    doc.text('Type', actXPos, yPos + 6);
    actXPos += actColWidths[2];
    doc.text('Time Required', actXPos, yPos + 6);
    yPos += 10;
    
    // Activity data
    data.activities.forEach((activity, index) => {
      checkPageBreak(12);
      
      if (index % 2 === 0) {
        doc.setFillColor(248, 240, 255);
      } else {
        doc.setFillColor(255, 255, 255);
      }
      doc.rect(20, yPos, pageWidth - 40, 10, 'F');
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(7);
      actXPos = 25;
      doc.text(activity.city, actXPos, yPos + 6);
      actXPos += actColWidths[0];
      doc.text(activity.activity, actXPos, yPos + 6);
      actXPos += actColWidths[1];
      doc.text(activity.type, actXPos, yPos + 6);
      actXPos += actColWidths[2];
      doc.text(activity.timeRequired, actXPos, yPos + 6);
      
      yPos += 10;
    });
    yPos += 15;
  }

  // Terms and Conditions
  checkPageBreak(25);
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Terms and ', 20, yPos);
  doc.setTextColor(147, 51, 234);
  doc.text('Conditions', 60, yPos);
  yPos += 8;
  
  doc.setFontSize(8);
  doc.setTextColor(0, 100, 200); // Blue color for link
  doc.text('View all terms and conditions', 20, yPos);
  yPos += 25;

  // Payment Plan Section
  checkPageBreak(100);
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Payment ', 20, yPos);
  doc.setTextColor(147, 51, 234);
  doc.text('Plan', 55, yPos);
  yPos += 15;
  
  // Total Amount section with arrow design
  doc.setFillColor(240, 230, 255);
  doc.roundedRect(20, yPos, pageWidth - 40, 12, 3, 3, 'F');
  
  // Arrow design for total amount
  const totalArrowWidth = 80;
  doc.setFillColor(220, 200, 255);
  doc.roundedRect(20, yPos, totalArrowWidth, 12, 3, 3, 'F');
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(8);
  doc.text('Total Amount', 25, yPos + 7);
  doc.text(`₹ ${data.paymentPlan.totalAmount.toLocaleString()} For ${data.tripDetails.numberOfTravelers} Pax (Inclusive of GST)`, 110, yPos + 7);
  yPos += 15;
  
  // TCS section with arrow design
  doc.setFillColor(240, 230, 255);
  doc.roundedRect(20, yPos, pageWidth - 40, 12, 3, 3, 'F');
  
  doc.setFillColor(220, 200, 255);
  doc.roundedRect(20, yPos, totalArrowWidth, 12, 3, 3, 'F');
  
  doc.text('TCS', 25, yPos + 7);
  doc.text(data.paymentPlan.tcsCollected ? 'Collected' : 'Not Collected', 110, yPos + 7);
  yPos += 20;
  
  // Installments table
  if (data.paymentPlan.installments.length > 0) {
    // Table header
    doc.setFillColor(84, 28, 156);
    doc.roundedRect(20, yPos, pageWidth - 40, 10, 3, 3, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    const payColWidths = [45, 45, 60];
    let payXPos = 25;
    doc.text('Installment', payXPos, yPos + 6);
    payXPos += payColWidths[0];
    doc.text('Amount', payXPos, yPos + 6);
    payXPos += payColWidths[1];
    doc.text('Due Date', payXPos, yPos + 6);
    yPos += 10;
    
    // Installment data
    data.paymentPlan.installments.forEach((installment, index) => {
      checkPageBreak(12);
      
      if (index % 2 === 0) {
        doc.setFillColor(248, 240, 255);
      } else {
        doc.setFillColor(255, 255, 255);
      }
      doc.rect(20, yPos, pageWidth - 40, 10, 'F');
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(7);
      payXPos = 25;
      doc.text(installment.name, payXPos, yPos + 6);
      payXPos += payColWidths[0];
      doc.text(`₹${installment.amount.toLocaleString()}`, payXPos, yPos + 6);
      payXPos += payColWidths[1];
      doc.text(installment.description, payXPos, yPos + 6);
      
      yPos += 10;
    });
  }
  yPos += 15;

  // Visa Details Section
  checkPageBreak(40);
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Visa ', 20, yPos);
  doc.setTextColor(147, 51, 234);
  doc.text('Details', 40, yPos);
  yPos += 15;
  
  // Visa details box
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(20, yPos, pageWidth - 40, 20, 3, 3, 'F');
  doc.setDrawColor(200, 200, 200);
  doc.roundedRect(20, yPos, pageWidth - 40, 20, 3, 3, 'S');
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(8);
  doc.text(`Visa Type : ${data.visaDetails.visaType}`, 30, yPos + 8);
  doc.text(`Validity: ${data.visaDetails.validity}`, 100, yPos + 8);
  doc.text(`Processing Date : ${data.visaDetails.processingDate}`, 30, yPos + 15);
  yPos += 35;

  // Final Call to Action
  checkPageBreak(50);
  doc.setFontSize(16);
  doc.setTextColor(84, 28, 156);
  doc.text('PLAN.PACK.GO!', pageWidth / 2, yPos + 10, { align: 'center' });
  
  // Book Now button
  doc.setFillColor(84, 28, 156);
  doc.roundedRect(pageWidth/2 - 25, yPos + 20, 50, 12, 6, 6, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text('Book Now', pageWidth / 2, yPos + 28, { align: 'center' });

  // Add footer to all pages
  addFooterToAllPages();

  // Save the PDF
  doc.save(`${data.tripDetails.destination}_Itinerary.pdf`);
};


