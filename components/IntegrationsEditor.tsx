import React from 'react';
import { NavigationData, InstagramShowcaseData } from '../types';
import { Instagram } from 'lucide-react';
import ImageUploader from './ImageUploader';
import ToggleSwitch from './ToggleSwitch';

interface IntegrationsEditorProps {
  navigationData: NavigationData;
  onNavigationChange: (newData: NavigationData) => void;
}

const IntegrationsEditor: React.FC<IntegrationsEditorProps> = ({ navigationData, onNavigationChange }) => {
    const showcaseData = navigationData.instagramShowcase;

    const handleShowcaseChange = (field: keyof InstagramShowcaseData, value: any) => {
        const newShowcaseData = { ...showcaseData, [field]: value };
        onNavigationChange({ ...navigationData, instagramShowcase: newShowcaseData });
    };

    const handleGalleryImageChange = (index: number, url: string) => {
        const newImages = [...showcaseData.galleryImages];
        newImages[index] = { ...newImages[index], imageUrl: url };
        handleShowcaseChange('galleryImages', newImages);
    };
    
    const inputClass = "w-full text-sm p-2 border border-gray-300 rounded bg-white text-gray-900 shadow-sm focus:ring-blue-500 focus:border-blue-500";

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800">Editor de Integraciones</h3>

            <div className="p-4 border rounded-md bg-gray-50 space-y-4">
                <div className="flex items-center gap-2 mb-3">
                    <Instagram className="h-5 w-5 text-pink-600" />
                    <h4 className="text-md font-semibold text-gray-700">Sección de Instagram</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Nombre de usuario</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">@</span>
                            <input 
                                type="text" 
                                value={showcaseData.username}
                                onChange={e => handleShowcaseChange('username', e.target.value)}
                                className={`${inputClass} pl-7`} 
                            />
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Nombre del Perfil</label>
                        <input type="text" value={showcaseData.profileName} onChange={e => handleShowcaseChange('profileName', e.target.value)} className={inputClass} />
                    </div>
                </div>

                <ToggleSwitch label="Perfil Verificado" checked={showcaseData.isVerified} onChange={e => handleShowcaseChange('isVerified', e.target.checked)} />

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Biografía</label>
                    <textarea value={showcaseData.bio} onChange={e => handleShowcaseChange('bio', e.target.value)} rows={3} className={inputClass} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Publicaciones</label>
                        <input type="number" value={showcaseData.postsCount} onChange={e => handleShowcaseChange('postsCount', parseInt(e.target.value, 10) || 0)} className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Seguidores</label>
                        <input type="text" value={showcaseData.followersCount} onChange={e => handleShowcaseChange('followersCount', e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Seguidos</label>
                        <input type="number" value={showcaseData.followingCount} onChange={e => handleShowcaseChange('followingCount', parseInt(e.target.value, 10) || 0)} className={inputClass} />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Foto de Perfil</label>
                    <ImageUploader imageUrl={showcaseData.profilePictureUrl} onImageChange={url => handleShowcaseChange('profilePictureUrl', url)} />
                </div>
                
                <div>
                    <h5 className="text-sm font-medium text-gray-600 mb-2">Imágenes de la Galería (6 imágenes)</h5>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        {showcaseData.galleryImages.slice(0, 6).map((image, index) => (
                             <div key={image.id}>
                                <label className="text-xs text-gray-500 block mb-1">Imagen {index + 1}</label>
                                <ImageUploader imageUrl={image.imageUrl} onImageChange={url => handleGalleryImageChange(index, url)} isCompact />
                            </div>
                        ))}
                    </div>
                     {showcaseData.galleryImages.length < 6 && <p className="text-xs text-red-500 mt-2">Faltan imágenes en la galería. Debe haber 6.</p>}
                </div>
            </div>
        </div>
    );
};

export default IntegrationsEditor;