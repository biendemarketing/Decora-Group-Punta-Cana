import React from 'react';
import { LegalPage } from '../types';
import { ArrowLeft } from 'lucide-react';

interface LegalDetailPageProps {
    page: LegalPage;
    onBack: () => void;
}

const LegalDetailPage: React.FC<LegalDetailPageProps> = ({ page, onBack }) => {
    if (!page) {
        return (
            <main className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Página no encontrada</h1>
                    <p className="text-gray-600 mt-2">El contenido legal que buscas no está disponible.</p>
                    <button onClick={onBack} className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#5a1e38] hover:bg-[#4d182e]">
                       Volver al inicio
                    </button>
                </div>
            </main>
        );
    }
    
    return (
        <main className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <button onClick={onBack} className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver
                </button>
                <div className="bg-white p-8 sm:p-12 rounded-lg shadow-lg">
                    <div className="prose max-w-none text-gray-700">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">{page.title}</h1>
                        <div className="whitespace-pre-line text-base leading-relaxed">
                            {page.content}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default LegalDetailPage;
