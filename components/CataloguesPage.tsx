import React from 'react';
import { Catalogue } from '../types';
import { ArrowRight } from 'lucide-react';

interface CataloguesPageProps {
  catalogues: Catalogue[];
  onCatalogueSelect: (catalogue: Catalogue) => void;
}

const CataloguesPage: React.FC<CataloguesPageProps> = ({ catalogues, onCatalogueSelect }) => {
  const visibleCatalogues = catalogues.filter(c => c.isVisible);

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Nuestros Catálogos</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Explora nuestras colecciones, guías de productos y últimas novedades.
          </p>
        </div>

        {visibleCatalogues.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {visibleCatalogues.map((catalogue) => (
              <div 
                key={catalogue.id} 
                onClick={() => onCatalogueSelect(catalogue)}
                className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col cursor-pointer"
              >
                <div className="aspect-w-3 aspect-h-4 w-full bg-gray-100 overflow-hidden">
                  <img 
                    src={catalogue.featuredImage} 
                    alt={catalogue.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow text-left">
                  <h2 className="text-base font-bold text-gray-900 group-hover:text-[#5a1e38]">{catalogue.title}</h2>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2 flex-grow">{catalogue.description}</p>
                  <span className="mt-3 inline-flex items-center text-sm font-semibold text-[#5a1e38]">
                    Ver más <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
             <h2 className="text-xl font-semibold text-gray-800">No hay catálogos disponibles</h2>
            <p className="mt-2 text-gray-500">Vuelve pronto para ver nuestras últimas publicaciones.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default CataloguesPage;
