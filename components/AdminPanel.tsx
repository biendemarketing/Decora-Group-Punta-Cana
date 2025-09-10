import React, { useState, useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import HeaderEditor from './HeaderEditor';
import SiteSettingsEditor from './SiteSettingsEditor';
import HeroSliderEditor from './HeroSliderEditor';
import AdminSidebar from './AdminSidebar';
import ProjectsEditor from './ProjectsEditor';
import { NavigationData, Project } from '../types';
import { LogOut, Save, XCircle } from 'lucide-react';

interface AdminPanelProps {
  initialNavigationData: NavigationData;
  initialProjectsData: Project[];
  onSaveChanges: (data: { navigation: NavigationData, projects: Project[] }) => void;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ initialNavigationData, initialProjectsData, onSaveChanges, onLogout }) => {
  const dummyFunc = () => console.log("Action disabled in preview mode.");
  const [activeEditor, setActiveEditor] = useState<'menu' | 'slider' | 'settings' | 'projects'>('settings');
  
  const [draftNavData, setDraftNavData] = useState<NavigationData>(() => JSON.parse(JSON.stringify(initialNavigationData)));
  const [draftProjectsData, setDraftProjectsData] = useState<Project[]>(() => JSON.parse(JSON.stringify(initialProjectsData)));

  useEffect(() => {
    setDraftNavData(JSON.parse(JSON.stringify(initialNavigationData)));
    setDraftProjectsData(JSON.parse(JSON.stringify(initialProjectsData)));
  }, [initialNavigationData, initialProjectsData]);

  const handleDiscardChanges = () => {
    if (window.confirm("¿Estás seguro de que quieres descartar todos los cambios no guardados?")) {
      setDraftNavData(JSON.parse(JSON.stringify(initialNavigationData)));
      setDraftProjectsData(JSON.parse(JSON.stringify(initialProjectsData)));
    }
  };

  const handleSaveChanges = () => {
    onSaveChanges({ navigation: draftNavData, projects: draftProjectsData });
  };
  
  const hasChanges = JSON.stringify(draftNavData) !== JSON.stringify(initialNavigationData) || JSON.stringify(draftProjectsData) !== JSON.stringify(initialProjectsData);

  const projectCategories = draftNavData.menuItems.find(item => item.key === 'proyectos')?.subCategories || [];

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
      
      <div className="flex-grow grid grid-cols-1 xl:grid-cols-12 gap-8 p-8">
        {/* Sidebar Column */}
        <div className="xl:col-span-2">
           <div className="bg-white p-4 rounded-lg shadow-lg sticky top-24">
             <AdminSidebar activeEditor={activeEditor} onSelectEditor={setActiveEditor} />
           </div>
        </div>
        
        {/* Editor Column */}
        <div className="xl:col-span-5 bg-white p-6 rounded-lg shadow-lg flex flex-col max-h-[calc(100vh-120px)]">
            <div className="flex-grow overflow-y-auto pr-2">
                {activeEditor === 'settings' && (
                  <SiteSettingsEditor
                    navigationData={draftNavData}
                    onNavigationChange={setDraftNavData}
                  />
                )}
                {activeEditor === 'menu' && (
                  <HeaderEditor
                    navigationData={draftNavData}
                    onNavigationChange={setDraftNavData}
                  />
                )}
                 {activeEditor === 'slider' && (
                  <HeroSliderEditor
                    slides={draftNavData.heroSlides}
                    onSlidesChange={(newSlides) => setDraftNavData(prev => ({ ...prev, heroSlides: newSlides }))}
                  />
                )}
                 {activeEditor === 'projects' && (
                  <ProjectsEditor
                    projects={draftProjectsData}
                    onProjectsChange={setDraftProjectsData}
                    projectCategories={projectCategories}
                  />
                )}
            </div>
        </div>
        
        {/* Preview Column */}
        <div className="xl:col-span-5">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Vista Previa en Vivo</h2>
          <div className="border-4 border-gray-300 rounded-lg overflow-hidden shadow-2xl bg-white transform scale-[0.85] origin-top">
            <Header
              navigationData={draftNavData}
              onSelectCategory={dummyFunc}
              onSelectProjectCategory={dummyFunc}
              onGoHome={dummyFunc}
              onViewQuotePage={dummyFunc}
              onSelectQuoteType={dummyFunc}
              onViewAboutPage={dummyFunc}
              onViewContactPage={dummyFunc}
              onViewCart={dummyFunc}
              onViewWishlist={dummyFunc}
              onViewBlogPage={dummyFunc}
              searchQuery=""
              onSearch={dummyFunc}
            />
            <Hero heroSlides={draftNavData.heroSlides} onNavigate={dummyFunc} />
            <div className="p-8 bg-gray-50 h-auto flex items-center justify-center">
              <p className="text-center text-gray-500">
                El resto de la página se mostraría aquí...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;