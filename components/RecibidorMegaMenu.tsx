import React from 'react';
import { SubCategory } from '../types';

interface RecibidorMegaMenuProps {
  subCategories: SubCategory[];
  featuredImageUrl: string;
  onSelectCategory: () => void;
  onClose: () => void;
}

const RecibidorMegaMenu: React.FC<RecibidorMegaMenuProps> = ({ subCategories, featuredImageUrl, onSelectCategory, onClose }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSelectCategory();
    onClose();
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-4 gap-6 py-5">
        <div className="col-span-3 grid grid-cols-6 gap-x-4 gap-y-3">
          {subCategories.map((category) => (
            <a href="#" key={category.id} onClick={handleClick} className="group flex flex-col items-center text-center p-1 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center border">
                <img src={category.imageUrl} alt={`Icono de la categoría ${category.name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <span className="mt-2 text-xs font-medium text-gray-700 group-hover:text-[#5a1e38] leading-tight">{category.name}</span>
            </a>
          ))}
        </div>
        
        <div className="col-span-1 relative rounded-md overflow-hidden group h-full">
          <img src={featuredImageUrl} alt="Recibidor con consola, espejo y perchero" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
            <h3 className="text-white text-lg font-bold">Muebles de recibidor</h3>
          </div>
          <a href="#" onClick={handleClick} className="absolute inset-0" aria-label="Ver todos los muebles de recibidor"></a>
        </div>
      </div>
    </div>
  );
};

export default RecibidorMegaMenu;