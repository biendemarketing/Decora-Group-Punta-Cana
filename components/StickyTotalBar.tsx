import React from 'react';

interface StickyTotalBarProps {
  total: number;
}

const StickyTotalBar: React.FC<StickyTotalBarProps> = ({ total }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">Total estimado</h3>
        <p className="text-2xl font-extrabold text-gray-900">
          ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          <span className="ml-2 text-base font-medium text-gray-500">USD</span>
        </p>
      </div>
    </div>
  );
};

export default StickyTotalBar;