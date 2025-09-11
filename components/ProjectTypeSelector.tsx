import React from 'react';
import { QuoteType } from '../types';

interface ProjectTypeSelectorProps {
  projectTypes: QuoteType[];
  onSelectQuoteType: (type: string) => void;
}

const ProjectTypeSelector: React.FC<ProjectTypeSelectorProps> = ({ projectTypes, onSelectQuoteType }) => {
  return (
    <section className="bg-[#621330] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Selecciona el Tipo de Proyecto
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectTypes.map((project) => (
            <div 
              key={project.id} 
              className="bg-gray-50 text-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-center transition-transform hover:scale-105"
            >
              <div className="w-32 h-24 flex items-center justify-center mb-4">
                <img src={project.imageUrl} alt={project.title} className="max-h-full max-w-full object-contain" />
              </div>
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="mt-2 text-sm text-gray-600 flex-grow">{project.description}</p>
              <button
                onClick={() => onSelectQuoteType(project.quoteType)}
                className="mt-6 bg-white text-[#621330] font-bold py-2 px-8 rounded-lg border border-[#621330] hover:bg-gray-100 transition-colors"
              >
                Cotizar
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectTypeSelector;