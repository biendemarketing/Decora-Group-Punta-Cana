import React from 'react';
import { NavigationData, TopBarLink } from '../types';
import ImageUploader from './ImageUploader';

interface SiteSettingsEditorProps {
  navigationData: NavigationData;
  onNavigationChange: (newData: NavigationData) => void;
}

const SiteSettingsEditor: React.FC<SiteSettingsEditorProps> = ({ navigationData, onNavigationChange }) => {
  
  const handleLogoChange = (type: 'logoUrl' | 'footerLogoUrl', url: string) => {
    onNavigationChange({ ...navigationData, [type]: url });
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
        <h3 className="text-lg font-bold mb-4 text-gray-800">Editor de Logos</h3>
        <div className="space-y-6">
          {/* Header Logo Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Logo del Encabezado</label>
            <ImageUploader 
              imageUrl={navigationData.logoUrl}
              onImageChange={(url) => handleLogoChange('logoUrl', url)}
            />
          </div>
          {/* Footer Logo Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Logo del Pie de Página</label>
             <ImageUploader 
              imageUrl={navigationData.footerLogoUrl}
              onImageChange={(url) => handleLogoChange('footerLogoUrl', url)}
              bgClass="bg-gray-800"
            />
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Editor de Barra Superior</h3>
        <div className="space-y-4">
          {navigationData.topBarLinks.map(link => (
            <div key={link.id}>
              <label className="block text-sm font-medium text-gray-700 capitalize">{link.id}</label>
              <input 
                type="text"
                value={link.text}
                onChange={(e) => handleTopBarLinkChange(link.id, e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-sm p-2 bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SiteSettingsEditor;