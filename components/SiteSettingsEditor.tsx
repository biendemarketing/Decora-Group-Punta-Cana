import React from 'react';
import { NavigationData, TopBarLink, TopBarBenefit } from '../types';
import ImageUploader from './ImageUploader';

interface SiteSettingsEditorProps {
  navigationData: NavigationData;
  onNavigationChange: (newData: NavigationData) => void;
}

const SiteSettingsEditor: React.FC<SiteSettingsEditorProps> = ({ navigationData, onNavigationChange }) => {
  const availableIcons = ['Truck', 'CreditCard', 'ShieldCheck', 'Phone', 'Package', 'Gem', 'Lightbulb', 'Award', 'Heart', 'CheckCircle'];

  const handleLogoChange = (type: 'logoUrl' | 'footerLogoUrl', url: string) => {
    onNavigationChange({ ...navigationData, [type]: url });
  };

  const handleTopBarLinkChange = (id: TopBarLink['id'], newText: string) => {
    const updatedLinks = navigationData.topBarLinks.map(link => 
      link.id === id ? { ...link, text: newText } : link
    );
    onNavigationChange({ ...navigationData, topBarLinks: updatedLinks });
  };

  const handleBenefitChange = (id: string, field: 'text' | 'icon', value: string) => {
    const updatedBenefits = navigationData.topBarBenefits.map(benefit =>
      benefit.id === id ? { ...benefit, [field]: value } : benefit
    );
    onNavigationChange({ ...navigationData, topBarBenefits: updatedBenefits });
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

      <div className="border-t pt-6">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Beneficios de la Barra Superior</h3>
        <div className="space-y-4">
          {navigationData.topBarBenefits.map(benefit => (
            <div key={benefit.id} className="p-3 border rounded-md bg-gray-50 space-y-2">
              <div>
                <label className="block text-xs font-medium text-gray-600">Texto</label>
                <input
                  type="text"
                  value={benefit.text}
                  onChange={(e) => handleBenefitChange(benefit.id, 'text', e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-sm p-2 bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600">Icono</label>
                <select
                  value={benefit.icon}
                  onChange={(e) => handleBenefitChange(benefit.id, 'icon', e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-sm p-2 bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                >
                  {availableIcons.map(iconName => (
                    <option key={iconName} value={iconName}>{iconName}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SiteSettingsEditor;