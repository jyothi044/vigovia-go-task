import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { ImportantNote, ServiceScope, InclusionItem } from '../types';

interface AdditionalDetailsFormProps {
  importantNotes: ImportantNote[];
  serviceScope: ServiceScope[];
  inclusions: InclusionItem[];
  onNotesChange: (notes: ImportantNote[]) => void;
  onScopeChange: (scope: ServiceScope[]) => void;
  onInclusionsChange: (inclusions: InclusionItem[]) => void;
}

export const AdditionalDetailsForm: React.FC<AdditionalDetailsFormProps> = ({
  importantNotes,
  serviceScope,
  inclusions,
  onNotesChange,
  onScopeChange,
  onInclusionsChange
}) => {
  // Important Notes functions
  const addNote = () => {
    const newNote: ImportantNote = {
      id: Date.now().toString(),
      point: '',
      details: ''
    };
    onNotesChange([...importantNotes, newNote]);
  };

  const updateNote = (index: number, field: keyof ImportantNote, value: string) => {
    const updatedNotes = [...importantNotes];
    updatedNotes[index] = { ...updatedNotes[index], [field]: value };
    onNotesChange(updatedNotes);
  };

  const removeNote = (index: number) => {
    onNotesChange(importantNotes.filter((_, i) => i !== index));
  };

  // Service Scope functions
  const addScope = () => {
    const newScope: ServiceScope = {
      id: Date.now().toString(),
      service: '',
      details: ''
    };
    onScopeChange([...serviceScope, newScope]);
  };

  const updateScope = (index: number, field: keyof ServiceScope, value: string) => {
    const updatedScope = [...serviceScope];
    updatedScope[index] = { ...updatedScope[index], [field]: value };
    onScopeChange(updatedScope);
  };

  const removeScope = (index: number) => {
    onScopeChange(serviceScope.filter((_, i) => i !== index));
  };

  // Inclusions functions
  const addInclusion = () => {
    const newInclusion: InclusionItem = {
      id: Date.now().toString(),
      category: '',
      count: 0,
      details: '',
      status: ''
    };
    onInclusionsChange([...inclusions, newInclusion]);
  };

  const updateInclusion = (index: number, field: keyof InclusionItem, value: string | number) => {
    const updatedInclusions = [...inclusions];
    updatedInclusions[index] = { ...updatedInclusions[index], [field]: value };
    onInclusionsChange(updatedInclusions);
  };

  const removeInclusion = (index: number) => {
    onInclusionsChange(inclusions.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      {/* Important Notes Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Important Notes</h3>
          <button
            onClick={addNote}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            <Plus size={16} />
            Add Note
          </button>
        </div>

        {importantNotes.map((note, index) => (
          <div key={note.id} className="bg-gray-50 p-4 rounded-lg border mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Point
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={note.point}
                  onChange={(e) => updateNote(index, 'point', e.target.value)}
                  placeholder="e.g., Airlines Standard Policy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Details
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={note.details}
                  onChange={(e) => updateNote(index, 'details', e.target.value)}
                  placeholder="Enter detailed description"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => removeNote(index)}
                  className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Service Scope Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Scope of Service</h3>
          <button
            onClick={addScope}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            <Plus size={16} />
            Add Service
          </button>
        </div>

        {serviceScope.map((scope, index) => (
          <div key={scope.id} className="bg-gray-50 p-4 rounded-lg border mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={scope.service}
                  onChange={(e) => updateScope(index, 'service', e.target.value)}
                  placeholder="e.g., Flight Tickets And Hotel Vouchers"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Details
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={scope.details}
                  onChange={(e) => updateScope(index, 'details', e.target.value)}
                  placeholder="Enter service details"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => removeScope(index)}
                  className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Inclusions Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Inclusion Summary</h3>
          <button
            onClick={addInclusion}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            <Plus size={16} />
            Add Inclusion
          </button>
        </div>

        {inclusions.map((inclusion, index) => (
          <div key={inclusion.id} className="bg-gray-50 p-4 rounded-lg border mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={inclusion.category}
                  onChange={(e) => updateInclusion(index, 'category', e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="Flight">Flight</option>
                  <option value="Tourist Tax">Tourist Tax</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Transfer">Transfer</option>
                  <option value="Activity">Activity</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Count
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={inclusion.count}
                  onChange={(e) => updateInclusion(index, 'count', parseInt(e.target.value))}
                  placeholder="Enter count"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Details
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={inclusion.details}
                  onChange={(e) => updateInclusion(index, 'details', e.target.value)}
                  placeholder="Enter details"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={inclusion.status}
                  onChange={(e) => updateInclusion(index, 'status', e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="Awaiting Confirmation">Awaiting Confirmation</option>
                  <option value="Included">Included</option>
                  <option value="Optional">Optional</option>
                  <option value="Not Included">Not Included</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => removeInclusion(index)}
                  className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};