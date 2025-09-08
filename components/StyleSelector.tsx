import React from 'react';

interface Style {
  name: string;
  price: number;
  imageUrl: string;
}

interface StyleSelectorProps {
  styles: Style[];
  selectedStyle: Style;
  onSelect: (style: Style) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {styles.map((style) => (
        <label
          key={style.name}
          className={`relative border-2 rounded-lg cursor-pointer transition-all duration-200 ${
            selectedStyle.name === style.name
              ? 'border-[#621330] shadow-lg scale-105'
              : 'border-gray-200 hover:border-gray-400'
          }`}
        >
          <input
            type="radio"
            name="style-selector"
            value={style.name}
            checked={selectedStyle.name === style.name}
            onChange={() => onSelect(style)}
            className="sr-only"
          />
          <div className="aspect-square w-full overflow-hidden rounded-t-md">
            <img
              src={style.imageUrl}
              alt={`Estilo de TV Wall: ${style.name}`}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="p-3 text-center bg-white rounded-b-md">
            <p className="font-semibold text-sm text-gray-800">{style.name}</p>
          </div>
        </label>
      ))}
    </div>
  );
};

export default StyleSelector;