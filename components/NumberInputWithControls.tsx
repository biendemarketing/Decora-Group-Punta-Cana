import React, { useState, useEffect } from 'react';
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
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    // This effect syncs the displayed value with the parent component's state.
    // It's important for when the value is changed by the increment/decrement buttons
    // or if the parent component sends a new value.
    setInputValue(value.toString());
  }, [value]);

  const handleIncrement = () => {
    const newValue = Math.min(max, value + step);
    onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(min, value - step);
    onChange(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow the user to type freely, including an empty string.
    // Only allow numeric characters.
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    setInputValue(numericValue);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let numValue = parseInt(e.target.value, 10);
    
    // If input is empty or not a number, revert to the last valid value from parent.
    if (isNaN(numValue)) {
        numValue = value; 
    }

    // Clamp the value within min/max bounds
    const clampedValue = Math.max(min, Math.min(max, numValue));
    
    // Update the parent component with the final, validated value.
    onChange(clampedValue);
    // The parent state will update, and the useEffect will re-sync the inputValue if it changed,
    // for example, if the user entered a value outside the min/max range.
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
            type="text" // Using text allows for temporary empty state
            inputMode="numeric" // Shows numeric keyboard on mobile
            pattern="[0-9]*"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
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
