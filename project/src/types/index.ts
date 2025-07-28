export interface TripDetails {
  customerName: string;
  destination: string;
  days: number;
  nights: number;
  departureFrom: string;
  departureDate: string;
  arrivalDate: string;
  numberOfTravelers: number;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  type: 'morning' | 'afternoon' | 'evening';
}

export interface Transfer {
  id: string;
  type: string;
  timing: string;
  price: number;
  capacity: number;
  description: string;
}

export interface DayItinerary {
  day: number;
  date: string;
  activities: Activity[];
  transfers: Transfer[];
  image?: string;
}

export interface Flight {
  id: string;
  airline: string;
  date: string;
  from: string;
  to: string;
  flightNumber: string;
}

export interface Hotel {
  id: string;
  city: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  name: string;
}

export interface ActivityTableEntry {
  id: string;
  city: string;
  activity: string;
  type: string;
  timeRequired: string;
}

export interface PaymentPlan {
  totalAmount: number;
  tcsCollected: boolean;
  installments: PaymentInstallment[];
}

export interface PaymentInstallment {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  description: string;
}

export interface VisaDetails {
  visaType: string;
  validity: string;
  processingDate: string;
}

export interface ImportantNote {
  id: string;
  point: string;
  details: string;
}

export interface ServiceScope {
  id: string;
  service: string;
  details: string;
}

export interface InclusionItem {
  id: string;
  category: string;
  count: number;
  details: string;
  status: string;
}

export interface ItineraryData {
  tripDetails: TripDetails;
  dailyItinerary: DayItinerary[];
  flights: Flight[];
  hotels: Hotel[];
  activities: ActivityTableEntry[];
  paymentPlan: PaymentPlan;
  visaDetails: VisaDetails;
  importantNotes: ImportantNote[];
  serviceScope: ServiceScope[];
  inclusions: InclusionItem[];
}