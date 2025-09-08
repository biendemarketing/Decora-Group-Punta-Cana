import React from 'react';
import { QUOTE_PROJECT_TYPES } from '../constants';

interface CotizarMegaMenuProps {
  onSelectQuoteType: (type: string) => void;
  onClose: () => void;
}

const CotizarMegaMenu: React.FC<CotizarMegaMenuProps> = ({ onSelectQuoteType, onClose }) => {
  const handleClick = (e: React.MouseEvent, quoteType: string) => {
    e.preventDefault();
    onSelectQuoteType(quoteType);
    onClose();
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-4 gap-6 py-5">
        <div className="col-span-3 grid grid-cols-4 gap-x-6 gap-y-4">
          {QUOTE_PROJECT_TYPES.map((project) => (
            <a 
              href="#" 
              key={project.title} 
              onClick={(e) => handleClick(e, project.quoteType)} 
              className="group flex flex-col items-center text-center p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center border">
                <img src={project.imageUrl} alt={`Cotizar proyecto de ${project.title}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <span className="mt-3 text-sm font-semibold text-gray-800 group-hover:text-[#5a1e38]">{project.title}</span>
              <span className="mt-1 text-xs text-gray-500">{project.description}</span>
            </a>
          ))}
        </div>
        
        <div className="col-span-1 relative rounded-md overflow-hidden group h-full">
          <img src="https://picsum.photos/id/1076/600/800" alt="Arquitecto revisando planos para un proyecto a medida" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-start justify-end p-6 text-white">
            <h3 className="text-xl font-bold">Proyectos a tu Medida</h3>
            <p className="text-sm mt-2">Creamos soluciones únicas que se adaptan perfectamente a tu espacio y estilo de vida.</p>
          </div>
          <a href="#" onClick={(e) => handleClick(e, QUOTE_PROJECT_TYPES[0].quoteType)} className="absolute inset-0" aria-label="Ver todos los proyectos a medida"></a>
        </div>
      </div>
    </div>
  );
};

export default CotizarMegaMenu;