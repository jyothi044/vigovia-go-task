import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Flight } from '../types';

interface FlightFormProps {
  flights: Flight[];
  onChange: (flights: Flight[]) => void;
}

export const FlightForm: React.FC<FlightFormProps> = ({ flights, onChange }) => {
  const addFlight = () => {
    const newFlight: Flight = {
      id: Date.now().toString(),
      airline: '',
      date: '',
      from: '',
      to: '',
      flightNumber: ''
    };
    onChange([...flights, newFlight]);
  };

  const updateFlight = (index: number, field: keyof Flight, value: string) => {
    const updatedFlights = [...flights];
    updatedFlights[index] = { ...updatedFlights[index], [field]: value };
    onChange(updatedFlights);
  };

  const removeFlight = (index: number) => {
    onChange(flights.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Flight Details</h3>
        <button
          onClick={addFlight}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          <Plus size={16} />
          Add Flight
        </button>
      </div>

      {flights.map((flight, index) => (
        <div key={flight.id} className="bg-gray-50 p-4 rounded-lg border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Airline
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={flight.airline}
                onChange={(e) => updateFlight(index, 'airline', e.target.value)}
                placeholder="e.g., Fly Air India"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Flight Number
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={flight.flightNumber}
                onChange={(e) => updateFlight(index, 'flightNumber', e.target.value)}
                placeholder="e.g., AI123"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={flight.date}
                onChange={(e) => updateFlight(index, 'date', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={flight.from}
                onChange={(e) => updateFlight(index, 'from', e.target.value)}
                placeholder="e.g., Delhi (DEL)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={flight.to}
                onChange={(e) => updateFlight(index, 'to', e.target.value)}
                placeholder="e.g., Singapore (SIN)"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => removeFlight(index)}
                className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <Trash2 size={16} />
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {flights.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No flights added yet. Click "Add Flight" to add flight details.
        </div>
      )}
    </div>
  );
};