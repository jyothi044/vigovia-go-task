import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { PaymentPlan, PaymentInstallment } from '../types';

interface PaymentPlanFormProps {
  paymentPlan: PaymentPlan;
  onChange: (paymentPlan: PaymentPlan) => void;
}

export const PaymentPlanForm: React.FC<PaymentPlanFormProps> = ({ paymentPlan, onChange }) => {
  const addInstallment = () => {
    const newInstallment: PaymentInstallment = {
      id: Date.now().toString(),
      name: '',
      amount: 0,
      dueDate: '',
      description: ''
    };
    onChange({
      ...paymentPlan,
      installments: [...paymentPlan.installments, newInstallment]
    });
  };

  const updateInstallment = (index: number, field: keyof PaymentInstallment, value: string | number) => {
    const updatedInstallments = [...paymentPlan.installments];
    updatedInstallments[index] = { ...updatedInstallments[index], [field]: value };
    onChange({ ...paymentPlan, installments: updatedInstallments });
  };

  const removeInstallment = (index: number) => {
    onChange({
      ...paymentPlan,
      installments: paymentPlan.installments.filter((_, i) => i !== index)
    });
  };

  const updatePaymentPlan = (field: keyof PaymentPlan, value: number | boolean) => {
    onChange({ ...paymentPlan, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Amount (₹)
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={paymentPlan.totalAmount}
            onChange={(e) => updatePaymentPlan('totalAmount', parseFloat(e.target.value))}
            placeholder="Enter total amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            TCS Collection
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={paymentPlan.tcsCollected ? 'yes' : 'no'}
            onChange={(e) => updatePaymentPlan('tcsCollected', e.target.value === 'yes')}
          >
            <option value="no">Not Collected</option>
            <option value="yes">Collected</option>
          </select>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Payment Installments</h3>
          <button
            onClick={addInstallment}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            <Plus size={16} />
            Add Installment
          </button>
        </div>

        {paymentPlan.installments.map((installment, index) => (
          <div key={installment.id} className="bg-gray-50 p-4 rounded-lg border mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Installment Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={installment.name}
                  onChange={(e) => updateInstallment(index, 'name', e.target.value)}
                  placeholder="e.g., Installment 1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={installment.amount}
                  onChange={(e) => updateInstallment(index, 'amount', parseFloat(e.target.value))}
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={installment.dueDate}
                  onChange={(e) => updateInstallment(index, 'dueDate', e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => removeInstallment(index)}
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
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={installment.description}
                onChange={(e) => updateInstallment(index, 'description', e.target.value)}
                placeholder="e.g., Initial Payment, Post Visa Approval"
              />
            </div>
          </div>
        ))}

        {paymentPlan.installments.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No installments added yet. Click "Add Installment" to add payment installments.
          </div>
        )}
      </div>
    </div>
  );
};