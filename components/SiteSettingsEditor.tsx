import React from 'react';
import { NavigationData, TopBarLink } from '../types';
import { Upload } from 'lucide-react';

interface SiteSettingsEditorProps {
  navigationData: NavigationData;
  onNavigationChange: (newData: NavigationData) => void;
}

const SiteSettingsEditor: React.FC<SiteSettingsEditorProps> = ({ navigationData, onNavigationChange }) => {
  
  const handleFileChange = (file: File, callback: (base64: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleLogoChange = (type: 'logoUrl' | 'footerLogoUrl', file: File) => {
    handleFileChange(file, (base64) => {
      onNavigationChange({
        ...navigationData,
        [type]: base64
      });
    });
  };

  const handleTopBarLinkChange = (id: TopBarLink['id'], newText: string) => {
    const updatedLinks = navigationData.topBarLinks.map(link => 
      link.id === id ? { ...link, text: newText } : link
    );
    onNavigationChange({ ...navigationData, topBarLinks: updatedLinks });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold mb-4">Editor de Logos</h3>
        <div className="space-y-6">
          {/* Header Logo Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Logo del Encabezado</label>
            <div className="mt-2 flex items-center gap-4">
              <img src={navigationData.logoUrl} alt="Header Logo Preview" className="h-14 w-auto bg-gray-200 p-1 rounded border"/>
              <label className="cursor-pointer flex items-center justify-center gap-2 w-full border-gray-300 rounded-md shadow-sm text-sm p-2 bg-white border hover:bg-gray-50">
                <Upload className="h-4 w-4 text-gray-500"/>
                <span className="text-xs text-gray-600">Cambiar logo</span>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files && handleLogoChange('logoUrl', e.target.files[0])} />
              </label>
            </div>
          </div>
          {/* Footer Logo Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Logo del Pie de Página</label>
            <div className="mt-2 flex items-center gap-4">
              <img src={navigationData.footerLogoUrl} alt="Footer Logo Preview" className="h-16 w-auto bg-gray-800 p-1 rounded border"/>
              <label className="cursor-pointer flex items-center justify-center gap-2 w-full border-gray-300 rounded-md shadow-sm text-sm p-2 bg-white border hover:bg-gray-50">
                <Upload className="h-4 w-4 text-gray-500"/>
                <span className="text-xs text-gray-600">Cambiar logo</span>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files && handleLogoChange('footerLogoUrl', e.target.files[0])} />
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-bold mb-4">Editor de Barra Superior</h3>
        <div className="space-y-4">
          {navigationData.topBarLinks.map(link => (
            <div key={link.id}>
              <label className="block text-sm font-medium text-gray-700 capitalize">{link.id}</label>
              <input 
                type="text"
                value={link.text}
                onChange={(e) => handleTopBarLinkChange(link.id, e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-sm p-2"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SiteSettingsEditor;