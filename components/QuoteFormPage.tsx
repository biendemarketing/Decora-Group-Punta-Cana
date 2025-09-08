import React from 'react';
import { ArrowLeft } from 'lucide-react';
import TvWallQuoteForm from './TvWallQuoteForm';
import ClosetQuoteForm from './ClosetQuoteForm';
import KitchenQuoteForm from './KitchenQuoteForm';

interface QuoteFormPageProps {
  projectType: string;
  onBack: () => void;
}

const QuoteFormPage: React.FC<QuoteFormPageProps> = ({ projectType, onBack }) => {
  if (projectType === 'TV Wall') {
    return <TvWallQuoteForm onBack={onBack} />;
  }
  
  if (projectType === 'Closets') {
    return <ClosetQuoteForm onBack={onBack} />;
  }
  
  if (projectType === 'Cocinas') {
    return <KitchenQuoteForm onBack={onBack} />;
  }

  // Placeholder for other quote forms
  return (
    <main className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button 
            onClick={onBack} 
            className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a la selección de proyectos
          </button>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900">
            Cotización para: <span className="text-[#621330]">{projectType}</span>
          </h1>
          <p className="mt-4 text-gray-600">
            Estás a un paso de comenzar tu proyecto. Por favor, completa el siguiente formulario para que podamos preparar una cotización detallada para ti.
          </p>
          <div className="mt-12 h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">
              Próximamente: Formulario de cotización detallado aquí.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default QuoteFormPage;