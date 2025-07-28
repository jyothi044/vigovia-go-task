import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Hotel } from '../types';

interface HotelFormProps {
  hotels: Hotel[];
  onChange: (hotels: Hotel[]) => void;
}

export const HotelForm: React.FC<HotelFormProps> = ({ hotels, onChange }) => {
  const addHotel = () => {
    const newHotel: Hotel = {
      id: Date.now().toString(),
      city: '',
      checkIn: '',
      checkOut: '',
      nights: 1,
      name: ''
    };
    onChange([...hotels, newHotel]);
  };

  const updateHotel = (index: number, field: keyof Hotel, value: string | number) => {
    const updatedHotels = [...hotels];
    updatedHotels[index] = { ...updatedHotels[index], [field]: value };
    onChange(updatedHotels);
  };

  const removeHotel = (index: number) => {
    onChange(hotels.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Hotel Bookings</h3>
        <button
          onClick={addHotel}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          <Plus size={16} />
          Add Hotel
        </button>
      </div>

      {hotels.map((hotel, index) => (
        <div key={hotel.id} className="bg-gray-50 p-4 rounded-lg border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={hotel.city}
                onChange={(e) => updateHotel(index, 'city', e.target.value)}
                placeholder="e.g., Singapore"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hotel Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={hotel.name}
                onChange={(e) => updateHotel(index, 'name', e.target.value)}
                placeholder="e.g., Super Townhouse Oak"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nights
              </label>
              <input
                type="number"
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={hotel.nights}
                onChange={(e) => updateHotel(index, 'nights', parseInt(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check In
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={hotel.checkIn}
                onChange={(e) => updateHotel(index, 'checkIn', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check Out
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={hotel.checkOut}
                onChange={(e) => updateHotel(index, 'checkOut', e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => removeHotel(index)}
                className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <Trash2 size={16} />
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {hotels.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hotels added yet. Click "Add Hotel" to add hotel bookings.
        </div>
      )}
    </div>
  );
};