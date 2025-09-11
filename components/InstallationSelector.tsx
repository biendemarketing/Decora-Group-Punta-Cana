import React from 'react';

interface Option {
  id: string;
  label: string;
  price: number;
  multiplier: number;
}

interface InstallationSelectorProps {
  options: Option[];
  selectedValue: Option;
  onChange: (option: Option) => void;
}

const InstallationSelector: React.FC<InstallationSelectorProps> = ({
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label
          key={option.id}
          className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 has-[:checked]:bg-red-50 has-[:checked]:border-red-300"
        >
          <input
            type="radio"
            name="installation-option"
            value={option.id}
            checked={selectedValue.id === option.id}
            onChange={() => onChange(option)}
            className="h-4 w-4 text-[#621330] focus:ring-red-400 border-gray-300"
          />
          <span className="ml-3 text-sm font-medium text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default InstallationSelector;