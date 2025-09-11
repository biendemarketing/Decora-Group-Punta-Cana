import React from 'react';
import { Catalogue } from '../types';
import { ArrowRight } from 'lucide-react';

interface CataloguesMegaMenuProps {
  catalogues: Catalogue[];
  onViewCatalogue: (catalogue: Catalogue) => void;
  onClose: () => void;
}

const CataloguesMegaMenu: React.FC<CataloguesMegaMenuProps> = ({ catalogues, onViewCatalogue, onClose }) => {
  const handleClick = (e: React.MouseEvent, catalogue: Catalogue) => {
    e.preventDefault();
    onViewCatalogue(catalogue);
    onClose();
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-5">
        <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">Catálogos Recientes</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {catalogues.map((catalogue) => (
            <a 
              href="#" 
              key={catalogue.id} 
              onClick={(e) => handleClick(e, catalogue)} 
              className="group flex flex-col items-center text-center"
            >
              <div className="w-24 h-32 rounded-lg overflow-hidden bg-gray-100">
                <img 
                  src={catalogue.featuredImage} 
                  alt={catalogue.title} 
                  className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" 
                />
              </div>
              <p className="mt-3 text-sm font-semibold text-gray-800 group-hover:text-[#5a1e38]">{catalogue.title}</p>
              <p className="mt-1 text-xs text-gray-500 flex items-center justify-center group-hover:text-[#5a1e38]">
                Ver catálogo <ArrowRight className="h-3 w-3 ml-1" />
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CataloguesMegaMenu;
