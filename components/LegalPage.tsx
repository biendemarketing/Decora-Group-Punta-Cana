import React, { useState } from 'react';
import { NavigationData } from '../types';

interface LegalPageProps {
  legalContent: NavigationData['legalContent'];
}

const LegalPage: React.FC<LegalPageProps> = ({ legalContent }) => {
  const [activeTab, setActiveTab] = useState(legalContent.pages[0]?.id || '');

  const activePage = legalContent.pages.find(p => p.id === activeTab);

  return (
    <main className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Documentación Legal</h1>
          <p className="mt-4 text-lg text-gray-600">
            Nuestros términos, políticas y avisos para tu información.
          </p>
        </div>

        <div className="flex border-b border-gray-200 mb-8">
          {legalContent.pages.map(page => (
            <button
              key={page.id}
              onClick={() => setActiveTab(page.id)}
              className={`px-4 py-3 text-sm font-medium focus:outline-none ${
                activeTab === page.id
                  ? 'border-b-2 border-[#5a1e38] text-[#5a1e38]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {page.title}
            </button>
          ))}
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          {activePage ? (
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4">{activePage.title}</h2>
              <p>{activePage.content}</p>
            </div>
          ) : (
            <p>Selecciona un documento para ver su contenido.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default LegalPage;