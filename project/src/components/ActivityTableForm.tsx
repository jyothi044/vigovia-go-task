import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { ActivityTableEntry } from '../types';

interface ActivityTableFormProps {
  activities: ActivityTableEntry[];
  onChange: (activities: ActivityTableEntry[]) => void;
}

export const ActivityTableForm: React.FC<ActivityTableFormProps> = ({ activities, onChange }) => {
  const addActivity = () => {
    const newActivity: ActivityTableEntry = {
      id: Date.now().toString(),
      city: '',
      activity: '',
      type: '',
      timeRequired: ''
    };
    onChange([...activities, newActivity]);
  };

  const updateActivity = (index: number, field: keyof ActivityTableEntry, value: string) => {
    const updatedActivities = [...activities];
    updatedActivities[index] = { ...updatedActivities[index], [field]: value };
    onChange(updatedActivities);
  };

  const removeActivity = (index: number) => {
    onChange(activities.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Activity Table</h3>
        <button
          onClick={addActivity}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          <Plus size={16} />
          Add Activity
        </button>
      </div>

      {activities.map((activity, index) => (
        <div key={activity.id} className="bg-gray-50 p-4 rounded-lg border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={activity.city}
                onChange={(e) => updateActivity(index, 'city', e.target.value)}
                placeholder="e.g., Rio De Janeiro"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Activity
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={activity.activity}
                onChange={(e) => updateActivity(index, 'activity', e.target.value)}
                placeholder="e.g., Sydney Harbour Cruise"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={activity.type}
                onChange={(e) => updateActivity(index, 'type', e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="Nature/Sightseeing">Nature/Sightseeing</option>
                <option value="Airlines Standard">Airlines Standard</option>
                <option value="Adventure">Adventure</option>
                <option value="Cultural">Cultural</option>
                <option value="Food & Dining">Food & Dining</option>
                <option value="Shopping">Shopping</option>
                <option value="Entertainment">Entertainment</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time Required
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={activity.timeRequired}
                onChange={(e) => updateActivity(index, 'timeRequired', e.target.value)}
                placeholder="e.g., 2-3 Hours"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => removeActivity(index)}
              className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <Trash2 size={16} />
              Remove
            </button>
          </div>
        </div>
      ))}

      {activities.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No activities added yet. Click "Add Activity" to add activities to the table.
        </div>
      )}
    </div>
  );
};