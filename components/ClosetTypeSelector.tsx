import React from 'react';

interface ClosetType {
  name: string;
  value: number;
  imageUrl: string;
}

interface ClosetTypeSelectorProps {
  types: ClosetType[];
  selectedType: ClosetType;
  onSelect: (type: ClosetType) => void;
}

const ClosetTypeSelector: React.FC<ClosetTypeSelectorProps> = ({ types, selectedType, onSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {types.map((type) => (
        <label
          key={type.name}
          className={`relative border-2 rounded-lg cursor-pointer transition-all duration-200 ${
            selectedType.name === type.name
              ? 'border-[#621330] shadow-lg scale-105'
              : 'border-gray-200 hover:border-gray-400'
          }`}
        >
          <input
            type="radio"
            name="closet-type-selector"
            value={type.name}
            checked={selectedType.name === type.name}
            onChange={() => onSelect(type)}
            className="sr-only"
          />
          <div className="aspect-square w-full overflow-hidden rounded-t-md">
            <img
              src={type.imageUrl}
              alt={`Ilustración de un ${type.name}`}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="p-3 text-center bg-white rounded-b-md">
            <p className="font-semibold text-sm text-gray-800">{type.name}</p>
          </div>
        </label>
      ))}
    </div>
  );
};

export default ClosetTypeSelector;