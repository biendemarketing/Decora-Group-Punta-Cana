import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import iconMap from '../utils/iconMap';

interface IconSelectorProps {
  selectedIcon: string;
  onIconChange: (iconName: string) => void;
}

const IconSelector: React.FC<IconSelectorProps> = ({ selectedIcon, onIconChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const availableIcons = Object.keys(iconMap).filter(key => key !== 'Default');

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);
  
  const handleSelect = (iconName: string) => {
    onIconChange(iconName);
    setIsOpen(false);
  };

  const SelectedIcon = iconMap[selectedIcon] || iconMap.Default;

  return (
    <div ref={wrapperRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between border-gray-300 rounded-md shadow-sm text-sm p-2 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      >
        <span className="flex items-center gap-2">
          <SelectedIcon className="h-4 w-4 text-gray-600" />
          {selectedIcon}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg border rounded-md max-h-60 overflow-auto">
          <ul className="py-1">
            {availableIcons.map(iconName => {
              const IconComponent = iconMap[iconName];
              return (
                <li key={iconName}>
                  <button
                    type="button"
                    onClick={() => handleSelect(iconName)}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <IconComponent className="h-4 w-4 text-gray-600" />
                    {iconName}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IconSelector;
