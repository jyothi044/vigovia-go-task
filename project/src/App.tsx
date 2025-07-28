import React, { useState } from 'react';
import { Plane, Download, ArrowRight, ArrowLeft } from 'lucide-react';
import { ItineraryData, TripDetails, DayItinerary, Flight, Hotel, ActivityTableEntry, PaymentPlan, VisaDetails, ImportantNote, ServiceScope, InclusionItem } from './types';
import { apiClient } from './utils/apiClient';
import { downloadPDF } from './utils/pdfDownloader';
import { StepIndicator } from './components/StepIndicator';
import { FormStep } from './components/FormStep';
import { TripDetailsForm } from './components/TripDetailsForm';
import { DailyItineraryForm } from './components/DailyItineraryForm';
import { FlightForm } from './components/FlightForm';
import { HotelForm } from './components/HotelForm';
import { ActivityTableForm } from './components/ActivityTableForm';
import { PaymentPlanForm } from './components/PaymentPlanForm';
import { VisaDetailsForm } from './components/VisaDetailsForm';
import { AdditionalDetailsForm } from './components/AdditionalDetailsForm';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [itineraryData, setItineraryData] = useState<ItineraryData>({
    tripDetails: {
      customerName: '',
      destination: '',
      days: 1,
      nights: 1,
      departureFrom: '',
      departureDate: '',
      arrivalDate: '',
      numberOfTravelers: 1
    },
    dailyItinerary: [],
    flights: [],
    hotels: [],
    activities: [],
    paymentPlan: {
      totalAmount: 0,
      tcsCollected: false,
      installments: []
    },
    visaDetails: {
      visaType: '',
      validity: '',
      processingDate: ''
    },
    importantNotes: [],
    serviceScope: [],
    inclusions: []
  });

  const steps = [
    'Trip Details',
    'Daily Itinerary',
    'Flights',
    'Hotels',
    'Activities',
    'Payment Plan',
    'Visa Details',
    'Additional Details'
  ];

  const updateTripDetails = (tripDetails: TripDetails) => {
    setItineraryData(prev => ({ ...prev, tripDetails }));
  };

  const updateDailyItinerary = (dailyItinerary: DayItinerary[]) => {
    setItineraryData(prev => ({ ...prev, dailyItinerary }));
  };

  const updateFlights = (flights: Flight[]) => {
    setItineraryData(prev => ({ ...prev, flights }));
  };

  const updateHotels = (hotels: Hotel[]) => {
    setItineraryData(prev => ({ ...prev, hotels }));
  };

  const updateActivities = (activities: ActivityTableEntry[]) => {
    setItineraryData(prev => ({ ...prev, activities }));
  };

  const updatePaymentPlan = (paymentPlan: PaymentPlan) => {
    setItineraryData(prev => ({ ...prev, paymentPlan }));
  };

  const updateVisaDetails = (visaDetails: VisaDetails) => {
    setItineraryData(prev => ({ ...prev, visaDetails }));
  };

  const updateImportantNotes = (importantNotes: ImportantNote[]) => {
    setItineraryData(prev => ({ ...prev, importantNotes }));
  };

  const updateServiceScope = (serviceScope: ServiceScope[]) => {
    setItineraryData(prev => ({ ...prev, serviceScope }));
  };

  const updateInclusions = (inclusions: InclusionItem[]) => {
    setItineraryData(prev => ({ ...prev, inclusions }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true);
    setPdfError(null);
    
    console.log('Starting PDF generation...');
    console.log('Itinerary data:', itineraryData);
    
    try {
      // First check if backend is available
      console.log('Checking backend health...');
      await apiClient.healthCheck();
      console.log('Backend is healthy, generating PDF...');
      
      // Generate PDF via backend API
      const pdfBlob = await apiClient.generatePDF(itineraryData);
      console.log('PDF generated successfully, downloading...');
      
      // Download the PDF
      const filename = `${itineraryData.tripDetails.destination || 'Travel'}_Itinerary.pdf`;
      downloadPDF(pdfBlob, filename);
      console.log('PDF download initiated');
      
    } catch (error) {
      console.error('PDF generation failed:', error);
      setPdfError(error instanceof Error ? error.message : 'Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return itineraryData.tripDetails.customerName && 
               itineraryData.tripDetails.destination && 
               itineraryData.tripDetails.days > 0;
      case 1:
        return itineraryData.dailyItinerary.length > 0;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <Plane className="text-purple-600" size={32} />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">vigovia</h1>
              <p className="text-sm text-gray-600">PLAN.PACK.GO</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Create Your Perfect Travel Itinerary
          </h2>
          <p className="text-gray-600">
            Fill in the details below to generate a professional PDF itinerary
          </p>
        </div>

        <StepIndicator 
          currentStep={currentStep} 
          totalSteps={steps.length}
          stepTitles={steps}
        />

        <FormStep title={steps[0]} isActive={currentStep === 0}>
          <TripDetailsForm 
            tripDetails={itineraryData.tripDetails}
            onChange={updateTripDetails}
          />
        </FormStep>

        <FormStep title={steps[1]} isActive={currentStep === 1}>
          <DailyItineraryForm 
            dailyItinerary={itineraryData.dailyItinerary}
            onChange={updateDailyItinerary}
            totalDays={itineraryData.tripDetails.days}
          />
        </FormStep>

        <FormStep title={steps[2]} isActive={currentStep === 2}>
          <FlightForm 
            flights={itineraryData.flights}
            onChange={updateFlights}
          />
        </FormStep>

        <FormStep title={steps[3]} isActive={currentStep === 3}>
          <HotelForm 
            hotels={itineraryData.hotels}
            onChange={updateHotels}
          />
        </FormStep>

        <FormStep title={steps[4]} isActive={currentStep === 4}>
          <ActivityTableForm 
            activities={itineraryData.activities}
            onChange={updateActivities}
          />
        </FormStep>

        <FormStep title={steps[5]} isActive={currentStep === 5}>
          <PaymentPlanForm 
            paymentPlan={itineraryData.paymentPlan}
            onChange={updatePaymentPlan}
          />
        </FormStep>

        <FormStep title={steps[6]} isActive={currentStep === 6}>
          <VisaDetailsForm 
            visaDetails={itineraryData.visaDetails}
            onChange={updateVisaDetails}
          />
        </FormStep>

        <FormStep title={steps[7]} isActive={currentStep === 7}>
          <AdditionalDetailsForm 
            importantNotes={itineraryData.importantNotes}
            serviceScope={itineraryData.serviceScope}
            inclusions={itineraryData.inclusions}
            onNotesChange={updateImportantNotes}
            onScopeChange={updateServiceScope}
            onInclusionsChange={updateInclusions}
          />
        </FormStep>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            <ArrowLeft size={20} />
            Previous
          </button>

          <div className="flex gap-4">
            {currentStep === steps.length - 1 ? (
              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={handleGeneratePDF}
                  disabled={isGeneratingPDF}
                  className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-colors ${
                    isGeneratingPDF
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white`}
                >
                  <Download size={20} />
                  {isGeneratingPDF ? 'Generating PDF...' : 'Generate Itinerary PDF'}
                </button>
                {pdfError && (
                  <div className="text-red-600 text-sm max-w-md text-right">
                    {pdfError}
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={nextStep}
                disabled={!isStepValid()}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  !isStepValid()
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                Next
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-purple-100 to-purple-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Tour Packages Section */}
          <div className="mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 text-sm text-gray-700">
              <div className="space-y-2">
                <a href="#" className="block hover:text-purple-600">Bali Tour Packages</a>
                <a href="#" className="block hover:text-purple-600">Dubai Tour Packages</a>
              </div>
              <div className="space-y-2">
                <a href="#" className="block hover:text-purple-600">Japan Tour Packages</a>
                <a href="#" className="block hover:text-purple-600">Turkey Tour Packages</a>
              </div>
              <div className="space-y-2">
                <a href="#" className="block hover:text-purple-600">Vietnam Tour Packages</a>
                <a href="#" className="block hover:text-purple-600">UAE Tour Packages</a>
              </div>
              <div className="space-y-2">
                <a href="#" className="block hover:text-purple-600">Malaysia Tour Packages</a>
                <a href="#" className="block hover:text-purple-600">Singapore Tour Packages</a>
              </div>
              <div className="space-y-2">
                <a href="#" className="block hover:text-purple-600">Thailand Tour Packages</a>
                <a href="#" className="block hover:text-purple-600">Australia Tour Packages</a>
              </div>
              <div className="space-y-2">
                <a href="#" className="block hover:text-purple-600">Europe Tour Packages</a>
                <a href="#" className="block hover:text-purple-600">South Korea Tour Packages</a>
              </div>
              <div className="space-y-2">
                <a href="#" className="block hover:text-purple-600">Cultural Tour Packages</a>
                <a href="#" className="block hover:text-purple-600">Honeymoon Tour Packages</a>
              </div>
              <div className="space-y-2">
                <a href="#" className="block hover:text-purple-600">Luxury Tour Packages</a>
                <a href="#" className="block hover:text-purple-600">Adventure Tour Packages</a>
              </div>
            </div>
          </div>

          <div className="border-t border-purple-300 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {/* Our Offerings */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-800">Our Offerings</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><a href="#" className="hover:text-purple-600">Holidays</a></li>
                  <li><a href="#" className="hover:text-purple-600">Visa</a></li>
                  <li><a href="#" className="hover:text-purple-600">Forex</a></li>
                  <li><a href="#" className="hover:text-purple-600">Hotels</a></li>
                  <li><a href="#" className="hover:text-purple-600">Flights</a></li>
                </ul>
              </div>

              {/* Popular Destinations */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-800">Popular Destinations</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><a href="#" className="hover:text-purple-600">Dubai</a></li>
                  <li><a href="#" className="hover:text-purple-600">Bali</a></li>
                  <li><a href="#" className="hover:text-purple-600">Thailand</a></li>
                  <li><a href="#" className="hover:text-purple-600">Singapore</a></li>
                  <li><a href="#" className="hover:text-purple-600">Malaysia</a></li>
                </ul>
              </div>

              {/* Vigovia Specials */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-800">Vigovia Specials</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><a href="#" className="hover:text-purple-600">Featured Experience</a></li>
                  <li><a href="#" className="hover:text-purple-600">Group Tours</a></li>
                  <li><a href="#" className="hover:text-purple-600">Backpackers Club</a></li>
                  <li><a href="#" className="hover:text-purple-600">Offline Events</a></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-800">Company</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><a href="#" className="hover:text-purple-600">About Us</a></li>
                  <li><a href="#" className="hover:text-purple-600">Careers</a></li>
                  <li><a href="#" className="hover:text-purple-600">Vigovia Blog</a></li>
                  <li><a href="#" className="hover:text-purple-600">Partner Portal</a></li>
                  <li><a href="#" className="hover:text-purple-600">Accreditations</a></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-4 text-gray-800">More</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li><a href="#" className="hover:text-purple-600">Investor Relations</a></li>
                    <li><a href="#" className="hover:text-purple-600">Forex</a></li>
                    <li><a href="#" className="hover:text-purple-600">FAQs</a></li>
                    <li><a href="#" className="hover:text-purple-600">Domestic Holidays</a></li>
                  </ul>
                </div>
                
                <div className="bg-purple-600 text-white p-4 rounded-lg">
                  <div className="text-center mb-2">
                    <span className="text-sm">Need help? Call us</span>
                  </div>
                  <div className="text-center font-bold text-lg mb-2">
                    +91-98xxx6841
                  </div>
                  <div className="text-center text-sm mb-3">
                    Email<br />
                    contact@vigovia.com
                  </div>
                  <div className="text-center text-xs">
                    <strong>Address</strong><br />
                    Hd-109 Cinnabar Hills,Links Business<br />
                    Park,Bangalore<br />
                    North Bangalore,Karnataka,India-560076
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-purple-300 mt-8 pt-6">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Plane className="text-purple-600" size={24} />
                    <div>
                      <h3 className="text-2xl font-bold text-purple-800">vigovia</h3>
                      <p className="text-sm text-gray-600">PLAN.PACK.GO</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-700 mb-2">Payments</div>
                  <div className="flex gap-2">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded text-xs">Razorpay</div>
                    <div className="bg-blue-500 text-white px-3 py-1 rounded text-xs">Stripe</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Purple Section */}
        <div className="bg-purple-800 text-white py-6">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm mb-4 md:mb-0">
                © 2025 Vigovia Travel Technologies (P) Ltd. All rights reserved.
              </div>
              <div className="flex items-center gap-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-purple-800 font-bold text-sm">f</span>
                  </div>
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-purple-800 font-bold text-sm">@</span>
                  </div>
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-purple-800 font-bold text-sm">in</span>
                  </div>
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-purple-800 font-bold text-sm">▶</span>
                  </div>
                </div>
                <div className="flex gap-4 text-sm">
                  <a href="#" className="hover:text-purple-200">Privacy policy</a>
                  <a href="#" className="hover:text-purple-200">Legal notice</a>
                  <a href="#" className="hover:text-purple-200">Accessibility</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;


