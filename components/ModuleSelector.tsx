import React from 'react';
import QuoteStep from './QuoteStep';

interface ModuleOption {
  name: string;
  price: number;
  imageUrl: string;
}

interface ModuleSelectorProps {
  title: string;
  description?: string;
  options: ModuleOption[];
  selectedOptions: ModuleOption[];
  onSelectionChange: (selected: ModuleOption[]) => void;
  selectionLimit?: number;
}

const ModuleSelector: React.FC<ModuleSelectorProps> = ({
  title,
  description,
  options,
  selectedOptions,
  onSelectionChange,
  selectionLimit,
}) => {
  const handleSelection = (option: ModuleOption) => {
    const isSelected = selectedOptions.some(item => item.name === option.name);
    let newSelection;

    if (isSelected) {
      newSelection = selectedOptions.filter(item => item.name !== option.name);
    } else {
      if (selectionLimit && selectedOptions.length >= selectionLimit) {
        alert(`Solo puedes seleccionar hasta ${selectionLimit} módulos.`);
        return;
      }
      newSelection = [...selectedOptions, option];
    }
    onSelectionChange(newSelection);
  };

  const isSelected = (option: ModuleOption) => selectedOptions.some(item => item.name === option.name);

  return (
    <QuoteStep title={title}>
        {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}
        {selectionLimit && (
             <div className={`mb-4 text-sm font-semibold p-2 rounded-md text-center ${selectedOptions.length > selectionLimit ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                Módulos seleccionados: {selectedOptions.length} de {selectionLimit}
            </div>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {options.map((option) => (
                <label
                    key={option.name}
                    className={`relative border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        isSelected(option)
                        ? 'border-[#621330] shadow-lg scale-105'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                >
                    <input
                        type="checkbox"
                        checked={isSelected(option)}
                        onChange={() => handleSelection(option)}
                        className="sr-only"
                    />
                    <div className="aspect-[4/5] w-full overflow-hidden rounded-t-md">
                        <img src={option.imageUrl} alt={`Ilustración del ${option.name}`} className="w-full h-full object-contain" />
                    </div>
                    <div className="p-2 text-center bg-white rounded-b-md">
                        <p className="font-semibold text-xs text-gray-800 leading-tight">{option.name}</p>
                    </div>
                </label>
            ))}
        </div>
    </QuoteStep>
  );
};

export default ModuleSelector;