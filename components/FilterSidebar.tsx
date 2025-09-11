import React, { useState, useEffect } from 'react';
import type { Filters } from '../types';
import { MAX_PRICE, MIN_PRICE, CATEGORIES } from '../constants';
import { ChevronUp } from 'lucide-react';
import { useCurrency } from '../App';

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (newFilters: Partial<Filters>) => void;
  onResetFilters: () => void;
  materials: string[];
  colors: string[];
  setTypes: string[];
  colorMap: { [key: string]: string };
}

// Refactored to lift state up
interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <h3 className="text-md font-semibold text-gray-800">{title}</h3>
        <ChevronUp className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? '' : 'transform rotate-180'}`} />
      </button>
      {isOpen && <div className="pb-4">{children}</div>}
    </div>
  );
};

const DELIVERY_TIMES = [
  { label: 'Hasta 5 días laborales', value: '5' },
  { label: 'Hasta 10 días laborales', value: '10' },
  { label: 'Hasta 15 días laborales', value: '15' },
  { label: 'Más 15 días laborales', value: '15+' },
];


const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  filters, 
  onFilterChange, 
  onResetFilters,
  materials,
  colors,
  setTypes,
  colorMap
}) => {
  const { currency, setCurrency } = useCurrency();
  const [localMinPrice, setLocalMinPrice] = useState(filters.priceRange.min.toString());
  const [localMaxPrice, setLocalMaxPrice] = useState(filters.priceRange.max.toString());

  // State for open sections is now managed here
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "Categorías": true,
    "Color": true,
  });

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  useEffect(() => {
    setLocalMinPrice(filters.priceRange.min.toString());
    setLocalMaxPrice(filters.priceRange.max.toString());
  }, [filters.priceRange]);

  const handlePriceInputBlur = (type: 'min' | 'max') => {
    let newMin = parseInt(localMinPrice, 10);
    let newMax = parseInt(localMaxPrice, 10);

    if (isNaN(newMin) || newMin < MIN_PRICE) newMin = MIN_PRICE;
    if (isNaN(newMax) || newMax > MAX_PRICE) newMax = MAX_PRICE;
    
    if (newMin > newMax) {
      if (type === 'min') newMin = newMax;
      else newMax = newMin;
    }

    onFilterChange({ priceRange: { min: newMin, max: newMax }});
  };

  const handleCheckboxChange = (filterType: 'materials' | 'colors' | 'setType' | 'deliveryTime' | 'category', value: string) => {
    const currentValues = filters[filterType] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    onFilterChange({ [filterType]: newValues });
  };
  
  const handleLedChange = (value: 'Si' | 'No') => {
    onFilterChange({ ledLighting: filters.ledLighting === value ? null : value });
  };
    
  const handleMinPriceSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(parseInt(e.target.value, 10), filters.priceRange.max);
    onFilterChange({ priceRange: { ...filters.priceRange, min: newMin } });
  };

  const handleMaxPriceSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(parseInt(e.target.value, 10), filters.priceRange.min);
    onFilterChange({ priceRange: { ...filters.priceRange, max: newMax } });
  };


  return (
    <div className="p-1 shadow-md rounded-lg bg-white sticky top-28">
      <div className="p-4 flex justify-between items-center border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Filtrar</h2>
        <div className="flex items-center border border-gray-300 rounded-md text-xs font-semibold">
            <button 
              onClick={() => setCurrency('USD')} 
              className={`px-3 py-1 rounded-l-sm transition-colors ${currency === 'USD' ? 'bg-[#5a1e38] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              aria-label="Cambiar a Dólares Estadounidenses"
            >
              US$
            </button>
            <button 
              onClick={() => setCurrency('RD$')} 
              className={`px-3 py-1 rounded-r-sm transition-colors ${currency === 'RD$' ? 'bg-[#5a1e38] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
               aria-label="Cambiar a Pesos Dominicanos"
            >
              RD$
            </button>
        </div>
      </div>

      <div className="px-4">
        <CollapsibleSection title="Categorías" isOpen={!!openSections['Categorías']} onToggle={() => toggleSection('Categorías')}>
            <div className="space-y-2">
            {CATEGORIES.map(item => (
                <label key={item} className="flex items-center cursor-pointer">
                    <input type="checkbox" checked={filters.category.includes(item)} onChange={() => handleCheckboxChange('category', item)} className="h-4 w-4 rounded border-gray-300 text-[#5a1e38] focus:ring-[#5a1e38] bg-white" />
                    <span className="ml-2 text-sm text-gray-600">{item}</span>
                </label>
            ))}
            </div>
        </CollapsibleSection>

        <CollapsibleSection title="Precio" isOpen={!!openSections['Precio']} onToggle={() => toggleSection('Precio')}>
            <div className="flex items-center justify-between mb-4 text-sm">
                <input 
                  type="text"
                  value={`$${localMinPrice}`}
                  onChange={(e) => setLocalMinPrice(e.target.value.replace(/\D/g, ''))}
                  onBlur={() => handlePriceInputBlur('min')}
                  className="w-full border border-gray-300 rounded-md p-2 text-center bg-white text-gray-900"
                />
                <span className="mx-2 text-gray-500">-</span>
                <input 
                  type="text"
                  value={`$${localMaxPrice}`}
                  onChange={(e) => setLocalMaxPrice(e.target.value.replace(/\D/g, ''))}
                  onBlur={() => handlePriceInputBlur('max')}
                  className="w-full border border-gray-300 rounded-md p-2 text-center bg-white text-gray-900"
                />
            </div>
            <div className="relative h-5 pt-2">
                <div className="absolute w-full h-1 bg-gray-200 rounded-full top-1/2 -translate-y-1/2">
                    <div 
                        className="absolute h-1 bg-[#5a1e38] rounded-full"
                        style={{ 
                            left: `${((filters.priceRange.min - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
                            right: `${100 - ((filters.priceRange.max - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`
                        }}
                    ></div>
                </div>
                <input
                    type="range"
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={50}
                    value={filters.priceRange.min}
                    onChange={handleMinPriceSliderChange}
                    className="absolute w-full h-1 bg-transparent pointer-events-none appearance-none z-10 slider-thumb"
                />
                <input
                    type="range"
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={50}
                    value={filters.priceRange.max}
                    onChange={handleMaxPriceSliderChange}
                    className="absolute w-full h-1 bg-transparent pointer-events-none appearance-none z-10 slider-thumb"
                />
            </div>
             <style>{`
                .slider-thumb::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    background: #5a1e38;
                    cursor: pointer;
                    border-radius: 50%;
                    pointer-events: auto;
                    margin-top: -7px;
                }
                .slider-thumb::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    background: #5a1e38;
                    cursor: pointer;
                    border-radius: 50%;
                    pointer-events: auto;
                }
             `}</style>
        </CollapsibleSection>

        <CollapsibleSection title="Plazo de entrega" isOpen={!!openSections['Plazo de entrega']} onToggle={() => toggleSection('Plazo de entrega')}>
            <div className="space-y-2">
            {DELIVERY_TIMES.map(item => (
                <label key={item.value} className="flex items-center cursor-pointer">
                    <input type="checkbox" checked={filters.deliveryTime.includes(item.value)} onChange={() => handleCheckboxChange('deliveryTime', item.value)} className="h-4 w-4 rounded border-gray-300 text-[#5a1e38] focus:ring-[#5a1e38] bg-white" />
                    <span className="ml-2 text-sm text-gray-600">{item.label}</span>
                </label>
            ))}
            </div>
        </CollapsibleSection>

        <CollapsibleSection title="Tipo de juego" isOpen={!!openSections['Tipo de juego']} onToggle={() => toggleSection('Tipo de juego')}>
             <div className="space-y-2">
            {setTypes.map(item => (
                <label key={item} className="flex items-center cursor-pointer">
                    <input type="checkbox" checked={filters.setType.includes(item)} onChange={() => handleCheckboxChange('setType', item)} className="h-4 w-4 rounded border-gray-300 text-[#5a1e38] focus:ring-[#5a1e38] bg-white" />
                    <span className="ml-2 text-sm text-gray-600">{item}</span>
                </label>
            ))}
            </div>
        </CollapsibleSection>
        
        <CollapsibleSection title="Iluminación led" isOpen={!!openSections['Iluminación led']} onToggle={() => toggleSection('Iluminación led')}>
             <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                    <input type="checkbox" checked={filters.ledLighting === 'Si'} onChange={() => handleLedChange('Si')} className="h-4 w-4 rounded border-gray-300 text-[#5a1e38] focus:ring-[#5a1e38] bg-white" />
                    <span className="ml-2 text-sm text-gray-600">Si</span>
                </label>
                 <label className="flex items-center cursor-pointer">
                    <input type="checkbox" checked={filters.ledLighting === 'No'} onChange={() => handleLedChange('No')} className="h-4 w-4 rounded border-gray-300 text-[#5a1e38] focus:ring-[#5a1e38] bg-white" />
                    <span className="ml-2 text-sm text-gray-600">No</span>
                </label>
            </div>
        </CollapsibleSection>

        <CollapsibleSection title="Material" isOpen={!!openSections['Material']} onToggle={() => toggleSection('Material')}>
            <div className="space-y-2">
            {materials.map(item => (
                <label key={item} className="flex items-center cursor-pointer">
                    <input type="checkbox" checked={filters.materials.includes(item)} onChange={() => handleCheckboxChange('materials', item)} className="h-4 w-4 rounded border-gray-300 text-[#5a1e38] focus:ring-[#5a1e38] bg-white" />
                    <span className="ml-2 text-sm text-gray-600">{item}</span>
                </label>
            ))}
            </div>
        </CollapsibleSection>
        
        <CollapsibleSection title="Color" isOpen={!!openSections['Color']} onToggle={() => toggleSection('Color')}>
             <div className="grid grid-cols-5 gap-2">
                {colors.map(color => (
                    <button key={color} onClick={() => handleCheckboxChange('colors', color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${filters.colors.includes(color) ? 'border-[#5a1e38] scale-110' : 'border-gray-200'}`}
                    style={{ backgroundColor: colorMap[color] || '#ccc' }}
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