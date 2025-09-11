import React, { useState, useEffect } from 'react';
import HeaderEditor from './HeaderEditor';
import SiteSettingsEditor from './SiteSettingsEditor';
import HeroSliderEditor from './HeroSliderEditor';
import AdminSidebar from './AdminSidebar';
import ProjectsEditor from './ProjectsEditor';
import PopularCategoriesEditor from './PopularCategoriesEditor';
import ProductsEditor from './ProductsEditor';
import ServicesEditor from './ServicesEditor';
import QuoteEditor from './QuoteEditor';
import WorkProcessEditor from './WorkProcessEditor';
import BlogEditor from './BlogEditor';
import CataloguesEditor from './CataloguesEditor';
import ContentPagesEditor from './ContentPagesEditor';
import FooterEditor from './FooterEditor';
import IntegrationsEditor from './IntegrationsEditor';
import { NavigationData, Project, Product } from '../types';
import { LogOut, Save, XCircle } from 'lucide-react';

interface AdminPanelProps {
  initialNavigationData: NavigationData;
  initialProjectsData: Project[];
  initialProductsData: Product[];
  onSaveChanges: (data: { navigation: NavigationData, projects: Project[], products: Product[] }) => void;
  onLogout: () => void;
}

type EditorType = 'menu' | 'slider' | 'settings' | 'projects' | 'popularCategories' | 'products' | 'services' | 'quote' | 'workProcess' | 'blog' | 'catalogues' | 'pages' | 'footer' | 'integrations';

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  initialNavigationData, 
  initialProjectsData, 
  initialProductsData, 
  onSaveChanges, 
  onLogout 
}) => {
  const [activeEditor, setActiveEditor] = useState<EditorType>('settings');
  
  const [draftNavData, setDraftNavData] = useState<NavigationData>(() => JSON.parse(JSON.stringify(initialNavigationData)));
  const [draftProjectsData, setDraftProjectsData] = useState<Project[]>(() => JSON.parse(JSON.stringify(initialProjectsData)));
  const [draftProductsData, setDraftProductsData] = useState<Product[]>(() => JSON.parse(JSON.stringify(initialProductsData)));

  useEffect(() => {
    setDraftNavData(JSON.parse(JSON.stringify(initialNavigationData)));
    setDraftProjectsData(JSON.parse(JSON.stringify(initialProjectsData)));
    setDraftProductsData(JSON.parse(JSON.stringify(initialProductsData)));
  }, [initialNavigationData, initialProjectsData, initialProductsData]);

  const handleDiscardChanges = () => {
    if (window.confirm("¿Estás seguro de que quieres descartar todos los cambios no guardados?")) {
      setDraftNavData(JSON.parse(JSON.stringify(initialNavigationData)));
      setDraftProjectsData(JSON.parse(JSON.stringify(initialProjectsData)));
      setDraftProductsData(JSON.parse(JSON.stringify(initialProductsData)));
    }
  };

  const handleSaveChanges = () => {
    onSaveChanges({ navigation: draftNavData, projects: draftProjectsData, products: draftProductsData });
  };
  
  const hasChanges = JSON.stringify(draftNavData) !== JSON.stringify(initialNavigationData) 
                  || JSON.stringify(draftProjectsData) !== JSON.stringify(initialProjectsData)
                  || JSON.stringify(draftProductsData) !== JSON.stringify(initialProductsData);

  const projectCategories = draftNavData.menuItems.find(item => item.key === 'proyectos')?.subCategories || [];

  const renderEditor = () => {
    switch(activeEditor) {
      case 'settings':
        return <SiteSettingsEditor navigationData={draftNavData} onNavigationChange={setDraftNavData} />;
      case 'menu':
        return <HeaderEditor navigationData={draftNavData} onNavigationChange={setDraftNavData} />;
      case 'slider':
        return <HeroSliderEditor slides={draftNavData.heroSlides} onSlidesChange={(newSlides) => setDraftNavData(prev => ({ ...prev, heroSlides: newSlides }))} />;
      case 'popularCategories':
        return <PopularCategoriesEditor categories={draftNavData.popularCategories} onCategoriesChange={(newCategories) => setDraftNavData(prev => ({ ...prev, popularCategories: newCategories }))} menuItems={draftNavData.menuItems} />;
      case 'services':
        return <ServicesEditor services={draftNavData.services} onServicesChange={(newServices) => setDraftNavData(prev => ({...prev, services: newServices}))} quoteTypes={draftNavData.quoteConfig.projectTypes} />;
      case 'workProcess':
        return <WorkProcessEditor workProcessSection={draftNavData.workProcessSection} onSectionChange={(newSection) => setDraftNavData(prev => ({...prev, workProcessSection: newSection}))} />;
      case 'blog':
        return <BlogEditor navigationData={draftNavData} onNavigationChange={setDraftNavData} />;
      case 'catalogues':
        return <CataloguesEditor catalogues={draftNavData.catalogues} onCataloguesChange={(newCatalogues) => setDraftNavData(prev => ({ ...prev, catalogues: newCatalogues }))} />;
      case 'quote':
        return <QuoteEditor quoteConfig={draftNavData.quoteConfig} onQuoteConfigChange={(newConfig) => setDraftNavData(prev => ({...prev, quoteConfig: newConfig}))} />;
      case 'projects':
        return <ProjectsEditor projects={draftProjectsData} onProjectsChange={setDraftProjectsData} projectCategories={projectCategories} />;
      case 'products':
        return <ProductsEditor products={draftProductsData} onProductsChange={setDraftProductsData} navigationData={draftNavData} />;
      case 'pages':
        return <ContentPagesEditor navigationData={draftNavData} onNavigationChange={setDraftNavData} />;
      case 'footer':
        return <FooterEditor footerContent={draftNavData.footerContent} onFooterChange={(newFooter) => setDraftNavData(prev => ({...prev, footerContent: newFooter}))} projectCategories={projectCategories} />;
      case 'integrations':
        return <IntegrationsEditor navigationData={draftNavData} onNavigationChange={setDraftNavData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="p-4 bg-white shadow-md flex justify-between items-center z-10 sticky top-0">
        <h1 className="text-xl font-bold text-gray-800">Panel de Administración</h1>
        <div className="flex items-center gap-4">
           {hasChanges && (
            <>
               <button onClick={handleDiscardChanges} className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors">
                  <XCircle className="h-4 w-4" /> Descartar
               </button>
               <button onClick={handleSaveChanges} className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                  <Save className="h-4 w-4" /> Guardar Cambios
               </button>
            </>
           )}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </button>
        </div>
      </header>
      
      <div className="flex-grow grid grid-cols-1 xl:grid-cols-5 gap-8 p-8">
        {/* Sidebar Column */}
        <div className="xl:col-span-1">
           <div className="bg-white p-4 rounded-lg shadow-lg sticky top-24">
             <AdminSidebar activeEditor={activeEditor} onSelectEditor={setActiveEditor} />
           </div>
        </div>
        
        {/* Editor Column */}
        <div className="xl:col-span-4 bg-white p-6 rounded-lg shadow-lg flex flex-col max-h-[calc(100vh-120px)]">
            <div className="flex-grow overflow-y-auto pr-2">
                {renderEditor()}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;