import React from 'react';
import { NavigationData } from '../types';
import { Instagram } from 'lucide-react';

interface IntegrationsEditorProps {
  navigationData: NavigationData;
  onNavigationChange: (newData: NavigationData) => void;
}

const IntegrationsEditor: React.FC<IntegrationsEditorProps> = ({ navigationData, onNavigationChange }) => {

    const handleInstagramUsernameChange = (username: string) => {
        const newFeed = { ...navigationData.instagramFeed, username };
        onNavigationChange({ ...navigationData, instagramFeed: newFeed });
    };
    
    const inputClass = "w-full text-sm p-2 border border-gray-300 rounded bg-white text-gray-900 shadow-sm focus:ring-blue-500 focus:border-blue-500";

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800">Editor de Integraciones</h3>

            <div className="p-4 border rounded-md bg-gray-50">
                <div className="flex items-center gap-2 mb-3">
                    <Instagram className="h-5 w-5 text-pink-600" />
                    <h4 className="text-md font-semibold text-gray-700">Feed de Instagram</h4>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Nombre de usuario</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">@</span>
                        <input 
                            type="text" 
                            value={navigationData.instagramFeed.username}
                            onChange={e => handleInstagramUsernameChange(e.target.value)}
                            className={`${inputClass} pl-7`} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntegrationsEditor;