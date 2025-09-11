import React, { useState } from 'react';
import { NavigationData, AboutUsPageContent, FAQItem, LegalPage } from '../types';
import { FileText, HelpCircle, Building } from 'lucide-react';
// Import sub-editors if they were complex, or define inline for simplicity
// For now, let's define them inline.

interface ContentPagesEditorProps {
  navigationData: NavigationData;
  onNavigationChange: (newData: NavigationData) => void;
}

type ActiveTab = 'about' | 'faq' | 'legal';

// Placeholder for a more complex sub-editor component
const AboutUsEditor: React.FC<{ content: AboutUsPageContent, onChange: (newContent: AboutUsPageContent) => void }> = ({ content, onChange }) => (
    <div className="p-4 border rounded-md bg-gray-100 text-sm">
        <h4 className="font-semibold mb-2">Editor Página "Nosotros"</h4>
        <p>Aquí iría el editor detallado para la página "Nosotros", con campos para la historia, misión, visión, equipo, etc.</p>
        <textarea 
            className="w-full h-40 p-2 mt-2 border rounded" 
            value={JSON.stringify(content, null, 2)} 
            onChange={(e) => {
                try {
                    onChange(JSON.parse(e.target.value))
                } catch(err) {
                    console.error("Invalid JSON")
                }
            }}
        />
    </div>
);

const FAQEditor: React.FC<{ faqs: FAQItem[], onChange: (newFaqs: FAQItem[]) => void }> = ({ faqs, onChange }) => (
     <div className="p-4 border rounded-md bg-gray-100 text-sm">
        <h4 className="font-semibold mb-2">Editor de Preguntas Frecuentes (FAQ)</h4>
        <p>Aquí iría el editor para añadir, eliminar y reordenar las preguntas y respuestas.</p>
         <textarea 
            className="w-full h-40 p-2 mt-2 border rounded" 
            value={JSON.stringify(faqs, null, 2)} 
            onChange={(e) => {
                try {
                    onChange(JSON.parse(e.target.value))
                } catch(err) {
                    console.error("Invalid JSON")
                }
            }}
        />
    </div>
);

const LegalEditor: React.FC<{ pages: LegalPage[], onChange: (newPages: LegalPage[]) => void }> = ({ pages, onChange }) => (
     <div className="p-4 border rounded-md bg-gray-100 text-sm">
        <h4 className="font-semibold mb-2">Editor de Páginas Legales</h4>
        <p>Aquí iría el editor para el contenido de las páginas de Aviso Legal, Términos, etc.</p>
         <textarea 
            className="w-full h-40 p-2 mt-2 border rounded" 
            value={JSON.stringify(pages, null, 2)} 
            onChange={(e) => {
                try {
                    onChange(JSON.parse(e.target.value))
                } catch(err) {
                    console.error("Invalid JSON")
                }
            }}
        />
    </div>
);


const ContentPagesEditor: React.FC<ContentPagesEditorProps> = ({ navigationData, onNavigationChange }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('about');

  const handleAboutChange = (newContent: AboutUsPageContent) => {
    onNavigationChange({ ...navigationData, aboutUsPage: newContent });
  };
  
  const handleFaqChange = (newFaqs: FAQItem[]) => {
     onNavigationChange({ ...navigationData, faqContent: { ...navigationData.faqContent, faqs: newFaqs } });
  };

  const handleLegalChange = (newPages: LegalPage[]) => {
      onNavigationChange({ ...navigationData, legalContent: { pages: newPages } });
  };

  const TabButton = ({ id, label, icon: Icon }: { id: ActiveTab, label: string, icon: React.ElementType }) => (
    <button onClick={() => setActiveTab(id)} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 ${activeTab === id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
        <Icon className="h-5 w-5" /> {label}
    </button>
  );

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-800">Editor de Páginas de Contenido</h3>
      <div className="border-b flex space-x-2">
        <TabButton id="about" label="Nosotros" icon={Building} />
        <TabButton id="faq" label="FAQ" icon={HelpCircle} />
        <TabButton id="legal" label="Legal" icon={FileText} />
      </div>
       <div className="p-4 bg-gray-50 rounded-b-lg border border-t-0">
         {activeTab === 'about' && <AboutUsEditor content={navigationData.aboutUsPage} onChange={handleAboutChange} />}
         {activeTab === 'faq' && <FAQEditor faqs={navigationData.faqContent.faqs} onChange={handleFaqChange} />}
         {activeTab === 'legal' && <LegalEditor pages={navigationData.legalContent.pages} onChange={handleLegalChange} />}
       </div>
    </div>
  );
};

export default ContentPagesEditor;