import React, { useState, useMemo } from 'react';
import { Catalogue, NavigationData, Product, CatalogueConfig } from '../types';
import { CATALOGUE_COVER_TEMPLATES } from '../constants';
import ImageUploader from './ImageUploader';
import ToggleSwitch from './ToggleSwitch';
import { Save, X, Layers, Image, LayoutGrid, List, Eye } from 'lucide-react';
import CataloguePreview from './CataloguePreview';

interface CatalogueCreatorProps {
  catalogueToEdit: Catalogue | null;
  onSave: (catalogue: Catalogue) => void;
  onCancel: () => void;
  navigationData: NavigationData;
  productsData: Product[];
}

const getDefaultConfig = (navigationData: NavigationData): CatalogueConfig => ({
  cover: {
    type: 'template',
    templateId: CATALOGUE_COVER_TEMPLATES[0].id,
    title: 'Nuestro Nuevo Catálogo',
    subtitle: new Date().getFullYear().toString(),
    showLogo: true,
    showSocials: true,
  },
  backCover: {
    type: 'template',
    templateId: CATALOGUE_COVER_TEMPLATES[0].id,
    title: 'Contáctanos',
    subtitle: navigationData.contactPhoneNumber,
    showLogo: true,
    showSocials: true,
  },
  includedCategoryIds: [],
  includedSubCategoryIds: [],
  layout: 'grid',
  hidePrices: false,
});

const CatalogueCreator: React.FC<CatalogueCreatorProps> = ({ catalogueToEdit, onSave, onCancel, navigationData, productsData }) => {
  const [catalogue, setCatalogue] = useState<Partial<Catalogue>>(() => 
    catalogueToEdit || {
      id: crypto.randomUUID(),
      title: 'Nuevo Catálogo de Productos',
      description: 'Un catálogo generado a partir de nuestra selección de productos.',
      featuredImage: 'https://via.placeholder.com/300x400',
      isVisible: true,
      type: 'generated',
      config: getDefaultConfig(navigationData),
    }
  );
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const config = catalogue.config!;

  const handleConfigChange = (newConfig: Partial<CatalogueConfig>) => {
    setCatalogue(prev => ({ ...prev, config: { ...prev!.config!, ...newConfig } }));
  };

  const handleCoverChange = (field: keyof CatalogueConfig['cover'], value: any) => {
    handleConfigChange({ cover: { ...config.cover, [field]: value } });
  };
  
  const handleBackCoverChange = (field: keyof CatalogueConfig['backCover'], value: any) => {
    handleConfigChange({ backCover: { ...config.backCover, [field]: value } });
  };
  
  const handleCategoryToggle = (id: string) => {
    const included = config.includedCategoryIds.includes(id);
    const newIds = included
      ? config.includedCategoryIds.filter(catId => catId !== id)
      : [...config.includedCategoryIds, id];
    handleConfigChange({ includedCategoryIds: newIds });
  };
  
  const handleSubCategoryToggle = (id: string) => {
     const included = config.includedSubCategoryIds.includes(id);
    const newIds = included
      ? config.includedSubCategoryIds.filter(subId => subId !== id)
      : [...config.includedSubCategoryIds, id];
    handleConfigChange({ includedSubCategoryIds: newIds });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(catalogue as Catalogue);
  };
  
  const productCategories = useMemo(() => navigationData.menuItems.filter(item => item.subCategories.length > 0 && !['proyectos', 'cotizar'].includes(item.key)), [navigationData]);

  const inputClass = "w-full text-sm p-2 border border-gray-300 rounded bg-white text-gray-900 shadow-sm focus:ring-blue-500 focus:border-blue-500";
  const sectionClass = "p-4 border rounded-md bg-gray-50 space-y-4";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-800">{catalogueToEdit ? 'Editar Catálogo' : 'Crear Catálogo Basado en Productos'}</h2>
        <p className="text-sm text-gray-500">Diseña un catálogo personalizado para tus clientes.</p>
      </div>

      <div className={sectionClass}>
        <h3 className="font-bold text-lg text-gray-700">Información General</h3>
        <input type="text" placeholder="Título del Catálogo" value={catalogue.title} onChange={e => setCatalogue(p => ({ ...p, title: e.target.value }))} className={inputClass} />
        <textarea placeholder="Descripción" value={catalogue.description} onChange={e => setCatalogue(p => ({ ...p, description: e.target.value }))} rows={2} className={inputClass}/>
        <ToggleSwitch label="Visible en el sitio" checked={catalogue.isVisible!} onChange={e => setCatalogue(p => ({ ...p, isVisible: e.target.checked }))} />
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Imagen de Portada (para listado)</label>
          <ImageUploader imageUrl={catalogue.featuredImage!} onImageChange={url => setCatalogue(p => ({ ...p, featuredImage: url }))} />
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className="font-bold text-lg text-gray-700 flex items-center gap-2"><Image /> Portada</h3>
        <div className="flex gap-2">
            <button type="button" onClick={() => handleCoverChange('type', 'template')} className={`text-sm px-3 py-1 rounded ${config.cover.type === 'template' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>Plantillas</button>
            <button type="button" onClick={() => handleCoverChange('type', 'custom')} className={`text-sm px-3 py-1 rounded ${config.cover.type === 'custom' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>Personalizada</button>
        </div>
        {config.cover.type === 'template' ? (
            <div className="grid grid-cols-3 gap-2">
                {CATALOGUE_COVER_TEMPLATES.map(t => <img key={t.id} src={t.previewUrl} onClick={() => handleCoverChange('templateId', t.id)} className={`cursor-pointer rounded border-4 ${config.cover.templateId === t.id ? 'border-blue-500' : 'border-transparent'}`} />)}
            </div>
        ) : (
            <ImageUploader imageUrl={config.cover.customImageUrl || ''} onImageChange={url => handleCoverChange('customImageUrl', url)} />
        )}
        <input type="text" placeholder="Título de Portada" value={config.cover.title} onChange={e => handleCoverChange('title', e.target.value)} className={inputClass} />
        <input type="text" placeholder="Subtítulo de Portada" value={config.cover.subtitle} onChange={e => handleCoverChange('subtitle', e.target.value)} className={inputClass} />
        <ToggleSwitch label="Mostrar Logo" checked={config.cover.showLogo} onChange={e => handleCoverChange('showLogo', e.target.checked)} />
        <ToggleSwitch label="Mostrar Redes Sociales" checked={config.cover.showSocials} onChange={e => handleCoverChange('showSocials', e.target.checked)} />
      </div>

      <div className={sectionClass}>
        <h3 className="font-bold text-lg text-gray-700 flex items-center gap-2"><Layers /> Contenido del Catálogo</h3>
        <p className="text-xs text-gray-600">Selecciona las categorías y subcategorías que deseas incluir.</p>
        <div className="space-y-2 max-h-60 overflow-y-auto border rounded p-2 bg-white">
          {productCategories.map(cat => (
            <div key={cat.id}>
              <label className="font-semibold flex items-center text-gray-800"><input type="checkbox" checked={config.includedCategoryIds.includes(cat.id)} onChange={() => handleCategoryToggle(cat.id)} className="mr-2"/>{cat.title}</label>
              <div className="pl-6 space-y-1 mt-1">
                {cat.subCategories.map(sub => <label key={sub.id} className="text-sm flex items-center text-gray-800"><input type="checkbox" checked={config.includedSubCategoryIds.includes(sub.id)} onChange={() => handleSubCategoryToggle(sub.id)} className="mr-2"/>{sub.name}</label>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={sectionClass}>
          <h3 className="font-bold text-lg text-gray-700">Diseño y Opciones</h3>
           <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Vista de productos</label>
              <div className="flex gap-2">
                  <button type="button" onClick={() => handleConfigChange({ layout: 'grid' })} className={`flex items-center gap-2 text-sm px-3 py-2 rounded ${config.layout === 'grid' ? 'bg-blue-600 text-white' : 'bg-white border text-gray-800'}`}><LayoutGrid className="h-4 w-4"/> Cuadrícula</button>
                  <button type="button" onClick={() => handleConfigChange({ layout: 'list' })} className={`flex items-center gap-2 text-sm px-3 py-2 rounded ${config.layout === 'list' ? 'bg-blue-600 text-white' : 'bg-white border text-gray-800'}`}><List className="h-4 w-4"/> Lista</button>
              </div>
          </div>
          <ToggleSwitch label="Ocultar precios en el catálogo" checked={config.hidePrices} onChange={e => handleConfigChange({ hidePrices: e.target.checked })} />
      </div>
      
      {/* Back Cover Editor (simplified, mirrors cover) */}
       <div className={sectionClass}>
        <h3 className="font-bold text-lg text-gray-700">Contraportada</h3>
        <input type="text" placeholder="Título" value={config.backCover.title} onChange={e => handleBackCoverChange('title', e.target.value)} className={inputClass} />
        <input type="text" placeholder="Subtítulo" value={config.backCover.subtitle} onChange={e => handleBackCoverChange('subtitle', e.target.value)} className={inputClass} />
      </div>

      <div className="flex justify-between items-center gap-4 border-t pt-6">
        <button type="button" onClick={() => setIsPreviewOpen(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white border hover:bg-gray-50">
            <Eye className="h-4 w-4" /> Vista Previa
        </button>
        <div className="flex gap-4">
            <button type="button" onClick={onCancel} className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300">
                <X className="h-4 w-4" /> Cancelar
            </button>
            <button type="submit" className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4" /> Guardar Catálogo
            </button>
        </div>
      </div>
      
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex flex-col p-2 sm:p-4">
            <div className="flex justify-between items-center bg-white p-2 rounded-t-lg flex-shrink-0">
                <h3 className="font-bold text-gray-800">Vista Previa del Catálogo</h3>
                <button onClick={() => setIsPreviewOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
                    <X className="h-5 w-5 text-gray-600"/>
                </button>
            </div>
            <div className="bg-gray-400 flex-grow overflow-auto rounded-b-lg">
                <CataloguePreview
                    catalogue={catalogue as Catalogue} 
                    products={productsData} 
                    navigationData={navigationData} 
                />
            </div>
        </div>
      )}
    </form>
  );
};

export default CatalogueCreator;
