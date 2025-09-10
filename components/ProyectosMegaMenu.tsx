import React from 'react';
import { SubCategory } from '../types';

interface ProyectosMegaMenuProps {
  subCategories: SubCategory[];
  onSelectProjectCategory: (category: string) => void;
  onClose: () => void;
}

const ProyectosMegaMenu: React.FC<ProyectosMegaMenuProps> = ({ subCategories, onSelectProjectCategory, onClose }) => {
  const handleClick = (e: React.MouseEvent, category: string) => {
    e.preventDefault();
    onSelectProjectCategory(category);
    onClose();
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-4 gap-6 py-5">
        <div className="col-span-3 grid grid-cols-6 gap-x-4 gap-y-3">
          {subCategories.map((category) => (
            <a href="#" key={category.name} onClick={(e) => handleClick(e, category.name)} className="group flex flex-col items-center text-center p-1 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center border">
                <img src={category.imageUrl} alt={`Icono de la categoría de proyectos ${category.name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <span className="mt-2 text-xs font-medium text-gray-700 group-hover:text-[#5a1e38] leading-tight">{category.name}</span>
            </a>
          ))}
        </div>
        
        <div className="col-span-1 relative rounded-md overflow-hidden group h-full">
          <img src="https://picsum.photos/id/1076/600/800" alt="Plano de diseño arquitectónico para un proyecto de Decora Group" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
            <h3 className="text-white text-lg font-bold">Nuestros Proyectos</h3>
          </div>
           <a href="#" onClick={(e) => handleClick(e, 'Proyectos Comerciales')} className="absolute inset-0" aria-label="Ver todos los proyectos"></a>
        </div>
      </div>
    </div>
  );
};

export default ProyectosMegaMenu;
