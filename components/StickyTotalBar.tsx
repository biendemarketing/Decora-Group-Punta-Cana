import React from 'react';
import { useCurrency } from '../App';

interface StickyTotalBarProps {
  total: number;
}

const StickyTotalBar: React.FC<StickyTotalBarProps> = ({ total }) => {
  const { formatPrice } = useCurrency();
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">Total estimado</h3>
        <p className="text-2xl font-extrabold text-gray-900">
          {formatPrice(total)}
        </p>
      </div>
    </div>
  );
};

export default StickyTotalBar;
