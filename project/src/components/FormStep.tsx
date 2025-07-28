import React from 'react';

interface FormStepProps {
  title: string;
  children: React.ReactNode;
  isActive: boolean;
}

export const FormStep: React.FC<FormStepProps> = ({ title, children, isActive }) => {
  if (!isActive) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      {children}
    </div>
  );
};