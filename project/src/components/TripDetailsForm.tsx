import React from 'react';
import { TripDetails } from '../types';

interface TripDetailsFormProps {
  tripDetails: TripDetails;
  onChange: (details: TripDetails) => void;
}

export const TripDetailsForm: React.FC<TripDetailsFormProps> = ({ tripDetails, onChange }) => {
  const handleChange = (field: keyof TripDetails, value: string | number) => {
    onChange({ ...tripDetails, [field]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Customer Name
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={tripDetails.customerName}
          onChange={(e) => handleChange('customerName', e.target.value)}
          placeholder="Enter customer name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Destination
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={tripDetails.destination}
          onChange={(e) => handleChange('destination', e.target.value)}
          placeholder="Enter destination"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Days
        </label>
        <input
          type="number"
          min="1"
          max="30"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={tripDetails.days}
          onChange={(e) => handleChange('days', parseInt(e.target.value))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Nights
        </label>
        <input
          type="number"
          min="0"
          max="30"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={tripDetails.nights}
          onChange={(e) => handleChange('nights', parseInt(e.target.value))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Departure From
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={tripDetails.departureFrom}
          onChange={(e) => handleChange('departureFrom', e.target.value)}
          placeholder="Enter departure city"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Departure Date
        </label>
        <input
          type="date"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={tripDetails.departureDate}
          onChange={(e) => handleChange('departureDate', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Arrival Date
        </label>
        <input
          type="date"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={tripDetails.arrivalDate}
          onChange={(e) => handleChange('arrivalDate', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Travelers
        </label>
        <input
          type="number"
          min="1"
          max="20"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={tripDetails.numberOfTravelers}
          onChange={(e) => handleChange('numberOfTravelers', parseInt(e.target.value))}
        />
      </div>
    </div>
  );
};