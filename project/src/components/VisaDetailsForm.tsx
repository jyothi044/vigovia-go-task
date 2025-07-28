import React from 'react';
import { VisaDetails } from '../types';

interface VisaDetailsFormProps {
  visaDetails: VisaDetails;
  onChange: (visaDetails: VisaDetails) => void;
}

export const VisaDetailsForm: React.FC<VisaDetailsFormProps> = ({ visaDetails, onChange }) => {
  const handleChange = (field: keyof VisaDetails, value: string) => {
    onChange({ ...visaDetails, [field]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Visa Type
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={visaDetails.visaType}
          onChange={(e) => handleChange('visaType', e.target.value)}
        >
          <option value="">Select Visa Type</option>
          <option value="Tourist">Tourist</option>
          <option value="Business">Business</option>
          <option value="Transit">Transit</option>
          <option value="Student">Student</option>
          <option value="Work">Work</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Validity (Days)
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={visaDetails.validity}
          onChange={(e) => handleChange('validity', e.target.value)}
          placeholder="e.g., 30 Days"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Processing Date
        </label>
        <input
          type="date"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={visaDetails.processingDate}
          onChange={(e) => handleChange('processingDate', e.target.value)}
        />
      </div>
    </div>
  );
};