import React from 'react';

interface QuoteStepProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const QuoteStep: React.FC<QuoteStepProps> = ({ title, subtitle, children }) => {
  return (
    <div className="py-8 border-t border-gray-200">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      {subtitle && <p className="mt-1 text-red-500 font-semibold">{subtitle}</p>}
      <div className="mt-6">
        {children}
      </div>
    </div>
  );
};

export default QuoteStep;
