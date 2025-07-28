import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps, stepTitles }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {stepTitles.map((title, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
              index <= currentStep ? 'bg-purple-600' : 'bg-gray-300'
            }`}>
              {index + 1}
            </div>
            <span className="text-sm mt-2 text-gray-600">{title}</span>
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <div 
          className="h-2 bg-purple-600 rounded-full transition-all duration-300"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        />
        <div 
          className="h-2 bg-gray-300 rounded-full"
          style={{ width: `${((totalSteps - currentStep - 1) / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};