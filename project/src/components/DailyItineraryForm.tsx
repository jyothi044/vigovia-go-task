import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { DayItinerary, Activity, Transfer } from '../types';

interface DailyItineraryFormProps {
  dailyItinerary: DayItinerary[];
  onChange: (itinerary: DayItinerary[]) => void;
  totalDays: number;
}

export const DailyItineraryForm: React.FC<DailyItineraryFormProps> = ({ 
  dailyItinerary, 
  onChange, 
  totalDays 
}) => {
  const initializeDays = () => {
    const days: DayItinerary[] = [];
    for (let i = 0; i < totalDays; i++) {
      if (!dailyItinerary[i]) {
        days.push({
          day: i + 1,
          date: '',
          activities: [],
          transfers: []
        });
      } else {
        days.push(dailyItinerary[i]);
      }
    }
    return days;
  };

  const days = initializeDays();

  const updateDay = (dayIndex: number, updatedDay: DayItinerary) => {
    const newItinerary = [...days];
    newItinerary[dayIndex] = updatedDay;
    onChange(newItinerary);
  };

  const addActivity = (dayIndex: number, timeOfDay: 'morning' | 'afternoon' | 'evening') => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      name: '',
      description: '',
      price: 0,
      duration: '',
      type: timeOfDay
    };
    const updatedDay = {
      ...days[dayIndex],
      activities: [...days[dayIndex].activities, newActivity]
    };
    updateDay(dayIndex, updatedDay);
  };

  const updateActivity = (dayIndex: number, activityIndex: number, field: keyof Activity, value: string | number) => {
    const updatedDay = { ...days[dayIndex] };
    updatedDay.activities[activityIndex] = {
      ...updatedDay.activities[activityIndex],
      [field]: value
    };
    updateDay(dayIndex, updatedDay);
  };

  const removeActivity = (dayIndex: number, activityIndex: number) => {
    const updatedDay = {
      ...days[dayIndex],
      activities: days[dayIndex].activities.filter((_, index) => index !== activityIndex)
    };
    updateDay(dayIndex, updatedDay);
  };

  const addTransfer = (dayIndex: number) => {
    const newTransfer: Transfer = {
      id: Date.now().toString(),
      type: '',
      timing: '',
      price: 0,
      capacity: 0,
      description: ''
    };
    const updatedDay = {
      ...days[dayIndex],
      transfers: [...days[dayIndex].transfers, newTransfer]
    };
    updateDay(dayIndex, updatedDay);
  };

  const updateTransfer = (dayIndex: number, transferIndex: number, field: keyof Transfer, value: string | number) => {
    const updatedDay = { ...days[dayIndex] };
    updatedDay.transfers[transferIndex] = {
      ...updatedDay.transfers[transferIndex],
      [field]: value
    };
    updateDay(dayIndex, updatedDay);
  };

  const removeTransfer = (dayIndex: number, transferIndex: number) => {
    const updatedDay = {
      ...days[dayIndex],
      transfers: days[dayIndex].transfers.filter((_, index) => index !== transferIndex)
    };
    updateDay(dayIndex, updatedDay);
  };

  return (
    <div className="space-y-8">
      {days.map((day, dayIndex) => (
        <div key={dayIndex} className="border rounded-lg p-6 bg-gray-50">
          <h3 className="text-xl font-semibold mb-4 text-purple-700">Day {day.day}</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={day.date}
              onChange={(e) => updateDay(dayIndex, { ...day, date: e.target.value })}
            />
          </div>

          {/* Activities by time of day */}
          {(['morning', 'afternoon', 'evening'] as const).map((timeOfDay) => (
            <div key={timeOfDay} className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-medium capitalize text-gray-800">{timeOfDay}</h4>
                <button
                  onClick={() => addActivity(dayIndex, timeOfDay)}
                  className="flex items-center gap-2 px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  <Plus size={16} />
                  Add Activity
                </button>
              </div>
              
              {day.activities
                .filter(activity => activity.type === timeOfDay)
                .map((activity, activityIndex) => {
                  const globalActivityIndex = day.activities.findIndex(a => a.id === activity.id);
                  return (
                    <div key={activity.id} className="bg-white p-4 rounded-md border mb-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Activity Name
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            value={activity.name}
                            onChange={(e) => updateActivity(dayIndex, globalActivityIndex, 'name', e.target.value)}
                            placeholder="Enter activity name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Duration
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            value={activity.duration}
                            onChange={(e) => updateActivity(dayIndex, globalActivityIndex, 'duration', e.target.value)}
                            placeholder="e.g., 2-3 Hours"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price
                          </label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            value={activity.price}
                            onChange={(e) => updateActivity(dayIndex, globalActivityIndex, 'price', parseFloat(e.target.value))}
                            placeholder="Enter price"
                          />
                        </div>
                        <div className="flex items-end">
                          <button
                            onClick={() => removeActivity(dayIndex, globalActivityIndex)}
                            className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                          >
                            <Trash2 size={16} />
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          rows={2}
                          value={activity.description}
                          onChange={(e) => updateActivity(dayIndex, globalActivityIndex, 'description', e.target.value)}
                          placeholder="Enter activity description"
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          ))}

          {/* Transfers */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-medium text-gray-800">Transfers</h4>
              <button
                onClick={() => addTransfer(dayIndex)}
                className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} />
                Add Transfer
              </button>
            </div>

            {day.transfers.map((transfer, transferIndex) => (
              <div key={transfer.id} className="bg-white p-4 rounded-md border mb-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Transfer Type
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={transfer.type}
                      onChange={(e) => updateTransfer(dayIndex, transferIndex, 'type', e.target.value)}
                      placeholder="e.g., Airport Transfer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Timing
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={transfer.timing}
                      onChange={(e) => updateTransfer(dayIndex, transferIndex, 'timing', e.target.value)}
                      placeholder="e.g., 10:00 AM"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={transfer.price}
                      onChange={(e) => updateTransfer(dayIndex, transferIndex, 'price', parseFloat(e.target.value))}
                      placeholder="Enter price"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Capacity
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={transfer.capacity}
                      onChange={(e) => updateTransfer(dayIndex, transferIndex, 'capacity', parseInt(e.target.value))}
                      placeholder="Number of people"
                    />
                  </div>
                </div>
                <div className="mt-3 flex items-end justify-between">
                  <div className="flex-1 mr-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={transfer.description}
                      onChange={(e) => updateTransfer(dayIndex, transferIndex, 'description', e.target.value)}
                      placeholder="Transfer description"
                    />
                  </div>
                  <button
                    onClick={() => removeTransfer(dayIndex, transferIndex)}
                    className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};