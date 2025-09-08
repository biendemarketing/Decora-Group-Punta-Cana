import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface NumberInputWithControlsProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
}

const NumberInputWithControls: React.FC<NumberInputWithControlsProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
}) => {
  const handleIncrement = () => {
    const newValue = Math.min(max, value + step);
    onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(min, value - step);
    onChange(newValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value, 10);
    if (isNaN(newValue)) {
      newValue = min;
    }
    newValue = Math.max(min, Math.min(max, newValue));
    onChange(newValue);
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <label className="block text-sm font-medium text-gray-700">{label}*</label>
      <div className="flex items-center w-full max-w-[200px]">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min}
          className="px-3 py-3 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus className="h-4 w-4" />
        </button>
        <div className="relative flex-grow">
           <input
            type="number"
            value={value}
            onChange={handleChange}
            onBlur={handleChange} // Ensure value is validated on blur
            min={min}
            max={max}
            step={step}
            className="w-full text-center bg-white border-y border-gray-300 focus:ring-[#621330] focus:border-[#621330] block shadow-sm text-base py-2.5 text-gray-900"
            style={{ MozAppearance: 'textfield' }}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
            {unit}
          </span>
        </div>
        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max}
          className="px-3 py-3 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default NumberInputWithControls;
