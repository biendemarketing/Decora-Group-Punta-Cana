import React, { useState } from 'react';
import type { Filters } from '../types';
import { MATERIALS, COLORS, MAX_PRICE, MIN_PRICE, DELIVERY_TIMES, SET_TYPES, COLOR_MAP } from '../constants';
import { ChevronUp } from 'lucide-react';

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (newFilters: Partial<Filters>) => void;
  onResetFilters: () => void;
}

const CollapsibleSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="text-md font-semibold text-gray-800">{title}</h3>
        <ChevronUp className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? '' : 'transform rotate-180'}`} />
      </button>
      {isOpen && <div className="pb-4">{children}</div>}
    </div>
  );
};


const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange, onResetFilters }) => {
    
  const handleCheckboxChange = (category: 'materials' | 'colors' | 'setType' | 'deliveryTime', value: string) => {
    const currentValues = filters[category];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    onFilterChange({ [category]: newValues });
  };
  
  const handleLedChange = (value: 'Si' | 'No') => {
    onFilterChange({ ledLighting: filters.ledLighting === value ? null : value });
  };
    
  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numericValue = value === '' ? (type === 'min' ? MIN_PRICE : MAX_PRICE) : parseInt(value, 10);
    if (!isNaN(numericValue)) {
      onFilterChange({ 
        priceRange: { 
          ...filters.priceRange, 
          [type]: numericValue 
        } 
      });
    }
  };


  return (
    <div className="p-1 shadow-md rounded-lg bg-white sticky top-28">
      <div className="p-4 flex justify-between items-center border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Filtrar productos</h2>
      </div>

      <div className="px-4">
        <CollapsibleSection title="Precio">
            <div className="flex items-center space-x-2">
                <input type="number" value={filters.priceRange.min} onChange={e => handlePriceChange('min', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm p-2 text-center" placeholder="Min"/>
                <span>-</span>
                <input type="number" value={filters.priceRange.max} onChange={e => handlePriceChange('max', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm p-2 text-center" placeholder="Max" />
            </div>
            {/* A simple visual representation could be added here if needed */}
        </CollapsibleSection>

        <CollapsibleSection title="Plazo de entrega">
            <div className="space-y-2">
            {DELIVERY_TIMES.map(item => (
                <label key={item.value} className="flex items-center cursor-pointer">
                    <input type="checkbox" checked={filters.deliveryTime.includes(item.value)} onChange={() => handleCheckboxChange('deliveryTime', item.value)} className="h-4 w-4 rounded border-gray-300 text-[#5a1e38] focus:ring-[#5a1e38]" />
                    <span className="ml-2 text-sm text-gray-600">{item.label}</span>
                </label>
            ))}
            </div>
        </CollapsibleSection>

        <CollapsibleSection title="Tipo de conjunto">
             <div className="space-y-2">
            {SET_TYPES.map(item => (
                <label key={item} className="flex items-center cursor-pointer">
                    <input type="checkbox" checked={filters.setType.includes(item)} onChange={() => handleCheckboxChange('setType', item)} className="h-4 w-4 rounded border-gray-300 text-[#5a1e38] focus:ring-[#5a1e38]" />
                    <span className="ml-2 text-sm text-gray-600">{item}</span>
                </label>
            ))}
            </div>
        </CollapsibleSection>
        
        <CollapsibleSection title="Iluminación led">
             <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                    <input type="checkbox" checked={filters.ledLighting === 'Si'} onChange={() => handleLedChange('Si')} className="h-4 w-4 rounded border-gray-300 text-[#5a1e38] focus:ring-[#5a1e38]" />
                    <span className="ml-2 text-sm text-gray-600">Si</span>
                </label>
                 <label className="flex items-center cursor-pointer">
                    <input type="checkbox" checked={filters.ledLighting === 'No'} onChange={() => handleLedChange('No')} className="h-4 w-4 rounded border-gray-300 text-[#5a1e38] focus:ring-[#5a1e38]" />
                    <span className="ml-2 text-sm text-gray-600">No</span>
                </label>
            </div>
        </CollapsibleSection>

        <CollapsibleSection title="Material">
            <div className="space-y-2">
            {MATERIALS.map(item => (
                <label key={item} className="flex items-center cursor-pointer">
                    <input type="checkbox" checked={filters.materials.includes(item)} onChange={() => handleCheckboxChange('materials', item)} className="h-4 w-4 rounded border-gray-300 text-[#5a1e38] focus:ring-[#5a1e38]" />
                    <span className="ml-2 text-sm text-gray-600">{item}</span>
                </label>
            ))}
            </div>
        </CollapsibleSection>
        
        <CollapsibleSection title="Color">
             <div className="grid grid-cols-5 gap-2">
                {COLORS.map(color => (
                    <button key={color} onClick={() => handleCheckboxChange('colors', color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${filters.colors.includes(color) ? 'border-[#5a1e38] scale-110' : 'border-gray-200'}`}
                    style={{ backgroundColor: COLOR_MAP[color] || '#ccc' }}
                    aria-label={`Filter by color ${color}`}
                    >
                        {color === 'Blanco' && <span className="block w-full h-full rounded-full border border-gray-300"></span>}
                    </button>
                ))}
             </div>
        </CollapsibleSection>
      </div>
      <div className="p-4 mt-4 border-t border-gray-200">
        <button onClick={onResetFilters} className="w-full text-center text-sm font-medium text-[#5a1e38] hover:text-[#4d182e] transition-colors">
          Limpiar Filtros
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;