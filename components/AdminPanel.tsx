import React, { useState } from 'react';
import Header from './Header';
import HeaderEditor from './HeaderEditor';
import SiteSettingsEditor from './SiteSettingsEditor';
import { NavigationData } from '../types';
import { LogOut, LayoutDashboard, Settings } from 'lucide-react';

interface AdminPanelProps {
  navigationData: NavigationData;
  onNavigationChange: (newData: NavigationData) => void;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ navigationData, onNavigationChange, onLogout }) => {
  const dummyFunc = () => console.log("Action disabled in preview mode.");
  const [activeTab, setActiveTab] = useState<'menu' | 'settings'>('menu');

  const TabButton: React.FC<{ tabId: 'menu' | 'settings'; children: React.ReactNode, icon: React.ElementType }> = ({ tabId, children, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(tabId)}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        activeTab === tabId
          ? 'bg-gray-800 text-white'
          : 'text-gray-600 hover:bg-gray-200'
      }`}
    >
      <Icon className="h-4 w-4" />
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="p-4 bg-white shadow-md flex justify-between items-center z-10">
        <h1 className="text-xl font-bold text-gray-800">Panel de Administración</h1>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Cerrar Sesión
        </button>
      </header>
      
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
        {/* Editor Column */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-lg flex flex-col">
          <nav className="flex space-x-2 border-b pb-4 mb-6">
            <TabButton tabId="menu" icon={LayoutDashboard}>Menú Principal</TabButton>
            <TabButton tabId="settings" icon={Settings}>Logos y Barra Superior</TabButton>
          </nav>
          <div className="flex-grow overflow-y-auto">
            {activeTab === 'menu' && (
              <HeaderEditor
                navigationData={navigationData}
                onNavigationChange={onNavigationChange}
              />
            )}
            {activeTab === 'settings' && (
              <SiteSettingsEditor
                navigationData={navigationData}
                onNavigationChange={onNavigationChange}
              />
            )}
          </div>
        </div>
        
        {/* Preview Column */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Vista Previa en Vivo</h2>
          <div className="border-4 border-gray-300 rounded-lg overflow-hidden shadow-2xl bg-white">
            <Header
              navigationData={navigationData}
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
              onViewAdminPage={dummyFunc}
            />
            <div className="p-8 bg-gray-50 h-64 flex items-center justify-center">
              <p className="text-center text-gray-500">El resto de la página se mostraría aquí...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;