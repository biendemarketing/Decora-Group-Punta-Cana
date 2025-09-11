import React, { useState, useMemo } from 'react';
import { Catalogue, NavigationData, Product, CatalogueConfig } from '../types';
import { CATALOGUE_COVER_TEMPLATES, CATALOGUE_PAGE_TEMPLATES } from '../constants';
import ImageUploader from './ImageUploader';
import ToggleSwitch from './ToggleSwitch';
import { Save, X, Layers, Image as ImageIcon, Eye, Book, Palette } from 'lucide-react';
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
    customImageUrls: [''],
    showTitle: true,
    showSubtitle: true,
    showLogo: true,
    logoPosition: 'top-left',
    logoSize: 'medium',
  },
  backCover: {
    showLogo: true,
    showCompanyName: true,
    showAddress: true,
    showPhone: true,
    showEmail: true,
    showSocials: true,
    customTitle: 'Contáctanos',
    customText: 'Estamos listos para hacer tu proyecto realidad.',
  },
  pageTemplateId: 'grid',
  includedCategoryIds: [],
  includedSubCategoryIds: [],
  layout: 'grid',
  hidePrices: false,
  showPageNumbers: true,
});

const CoverPreview = ({ config, logoUrl }: { config: CatalogueConfig['cover'], logoUrl: string }) => {
    const template = CATALOGUE_COVER_TEMPLATES.find(t => t.id === config.templateId);
    if (!template) return <div className="h-full bg-gray-200 flex items-center justify-center text-gray-500">Selecciona una plantilla</div>;

    const logoSizeClass = { small: 'h-12', medium: 'h-20', large: 'h-28' }[config.logoSize];
    const logoContainerClass = {
        'top-left': 'top-8 left-8 items-start',
        'top-center': 'top-8 left-1/2 -translate-x-1/2 items-center',
        'middle-center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center',
        'bottom-left': 'bottom-8 left-8 items-start',
        'bottom-center': 'bottom-8 left-1/2 -translate-x-1/2 items-center'
    }[config.logoPosition];

    // This is a simplified JSX representation of the actual print styles.
    // It's for visual feedback, not a 1:1 replica of the PDF.
    return (
        <div className="aspect-[8.5/11] w-full bg-gray-100 border shadow-lg relative overflow-hidden text-gray-800">
             {/* Background Images */}
             {template.id === 'minimalist_light' && <div className="absolute inset-0 bg-white"><img src={config.customImageUrls[0]} className="w-2/3 h-2/3 object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" /></div>}
             {template.id === 'elegant_dark' && <div className="absolute inset-0 bg-gray-800"><img src={config.customImageUrls[0]} className="w-full h-full object-cover opacity-80" /></div>}
             {template.id === 'modern_grid' && <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2 p-4">{[0,1,2,3].map(i => <div key={i} className="bg-gray-300"><img src={config.customImageUrls[i]} className="w-full h-full object-cover"/></div>)}</div>}
             {template.id === 'corporate_dark' && <div className="absolute inset-0 bg-gray-800"><div className="absolute left-0 top-0 bottom-0 w-1/3 bg-gray-900"></div><div className="absolute right-8 top-8 bottom-8 w-1/2 bg-gray-300"><img src={config.customImageUrls[0]} className="w-full h-full object-cover"/></div></div>}
             {template.id === 'asymmetric_clean' && <div className="absolute inset-0 bg-white p-4 flex gap-4"><div className="w-2/3 h-full bg-gray-300"><img src={config.customImageUrls[0]} className="w-full h-full object-cover"/></div><div className="w-1/3 h-full flex flex-col gap-4"><div className="h-1/2 bg-gray-300"><img src={config.customImageUrls[1]} className="w-full h-full object-cover"/></div><div className="h-1/2 bg-gray-300"><img src={config.customImageUrls[2]} className="w-full h-full object-cover"/></div></div></div>}
            
            {/* Overlay Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center">
                 {config.showTitle && <h1 className={`font-bold ${template.id.includes('dark') ? 'text-white' : 'text-gray-900'}`} style={{fontSize: '2rem', textShadow: '1px 1px 3px rgba(0,0,0,0.2)'}}>{config.title}</h1>}
                 {config.showSubtitle && <p className={`mt-2 text-lg ${template.id.includes('dark') ? 'text-gray-200' : 'text-gray-600'}`}>{config.subtitle}</p>}
            </div>

            {/* Logo */}
            {config.showLogo && (
                <div className={`absolute flex flex-col ${logoContainerClass}`}>
                    <img src={logoUrl} alt="Logo Preview" className={`${logoSizeClass} object-contain`} />
                </div>
            )}
        </div>
    );
}

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

  const selectedCoverTemplate = CATALOGUE_COVER_TEMPLATES.find(t => t.id === config.cover.templateId);

  const inputClass = "w-full text-sm p-2 border border-gray-300 rounded bg-white text-gray-900 shadow-sm focus:ring-[#5a1e38] focus:border-[#5a1e38]";
  const sectionClass = "p-4 border rounded-md bg-gray-50 space-y-4";
  const sectionTitleClass = "font-bold text-lg text-gray-800 flex items-center gap-2 text-[#5a1e38]";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between items-start">
            <div>
                <h2 className="text-xl font-bold text-gray-800">{catalogueToEdit ? 'Editar Catálogo' : 'Crear Catálogo Basado en Productos'}</h2>
                <p className="text-sm text-gray-500">Diseña un catálogo personalizado para tus clientes.</p>
            </div>
            <div className="flex gap-2">
                 <button type="button" onClick={onCancel} className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300">
                    <X className="h-4 w-4" /> Cancelar
                </button>
                <button type="submit" className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-[#5a1e38] hover:bg-[#4d182e]">
                    <Save className="h-4 w-4" /> Guardar
                </button>
            </div>
        </div>
        
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="space-y-6">
            <div className={sectionClass}>
                <h3 className={sectionTitleClass}><ImageIcon /> Diseño de Portada</h3>
                <div className="flex gap-2 flex-wrap">
                    {CATALOGUE_COVER_TEMPLATES.map(t => (
                        <div key={t.id} onClick={() => handleCoverChange('templateId', t.id)} className={`cursor-pointer rounded-lg border-4 p-1 ${config.cover.templateId === t.id ? 'border-[#5a1e38]' : 'border-transparent hover:border-gray-300'}`}>
                            <img src={t.preview} title={t.name} className="h-20 w-auto object-contain bg-white rounded-sm" />
                            <p className="text-xs text-center mt-1">{t.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className={sectionClass}>
                <h3 className={sectionTitleClass}><Layers /> Contenido del Catálogo</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto border rounded p-2 bg-white">
                  {productCategories.map(cat => (
                    <div key={cat.id}>
                      <label className="font-semibold flex items-center text-gray-800"><input type="checkbox" checked={config.includedCategoryIds.includes(cat.id)} onChange={() => handleCategoryToggle(cat.id)} className="mr-2"/>{cat.title}</label>
                      <div className="pl-6 space-y-1 mt-1">
                        {cat.subCategories.map(sub => <label key={sub.id} className="text-sm flex items-center text-gray-700"><input type="checkbox" checked={config.includedSubCategoryIds.includes(sub.id)} onChange={() => handleSubCategoryToggle(sub.id)} className="mr-2"/>{sub.name}</label>)}
                      </div>
                    </div>
                  ))}
                </div>
            </div>

            <div className={sectionClass}>
                <h3 className={sectionTitleClass}><Palette/> Diseño de Páginas y Opciones</h3>
                <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Plantilla de Página de Productos</label>
                    <div className="grid grid-cols-3 gap-4">
                        {CATALOGUE_PAGE_TEMPLATES.map(template => (
                            <div key={template.id} onClick={() => handleConfigChange({ pageTemplateId: template.id as any, layout: template.id as any })} className={`cursor-pointer rounded-lg border-4 p-1 text-center ${config.pageTemplateId === template.id ? 'border-[#5a1e38]' : 'border-transparent hover:border-gray-300'}`}>
                                <img src={template.preview} alt={template.name} className="w-full h-auto bg-white rounded-md" />
                                <span className="text-xs font-semibold mt-1 block text-gray-700">{template.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <ToggleSwitch label="Ocultar precios en el catálogo" checked={config.hidePrices} onChange={e => handleConfigChange({ hidePrices: e.target.checked })} />
                <ToggleSwitch label="Mostrar números de página" checked={config.showPageNumbers} onChange={e => handleConfigChange({ showPageNumbers: e.target.checked })} />
            </div>

        </div>

        <div className="lg:sticky top-24">
            <h3 className="font-bold text-center mb-2">Previsualización de Portada</h3>
            <CoverPreview config={config.cover} logoUrl={navigationData.logoUrl} />
            <div className="mt-4 p-4 bg-white rounded-lg border shadow-sm space-y-2">
                <h4 className="font-semibold text-sm">Controles de Portada</h4>
                <ToggleSwitch label="Mostrar Título" checked={config.cover.showTitle} onChange={e => handleCoverChange('showTitle', e.target.checked)} />
                {config.cover.showTitle && <input type="text" placeholder="Título de Portada" value={config.cover.title} onChange={e => handleCoverChange('title', e.target.value)} className={inputClass} />}
                
                <ToggleSwitch label="Mostrar Subtítulo" checked={config.cover.showSubtitle} onChange={e => handleCoverChange('showSubtitle', e.target.checked)} />
                {config.cover.showSubtitle && <input type="text" placeholder="Subtítulo de Portada" value={config.cover.subtitle} onChange={e => handleCoverChange('subtitle', e.target.value)} className={inputClass} />}
                
                <ToggleSwitch label="Mostrar Logo" checked={config.cover.showLogo} onChange={e => handleCoverChange('showLogo', e.target.checked)} />
                {config.cover.showLogo && <div className="grid grid-cols-2 gap-2">
                    <select value={config.cover.logoPosition} onChange={e => handleCoverChange('logoPosition', e.target.value)} className={inputClass}><option value="top-left">Arriba Izq.</option><option value="top-center">Arriba Centro</option><option value="middle-center">Centro</option><option value="bottom-left">Abajo Izq.</option><option value="bottom-center">Abajo Centro</option></select>
                    <select value={config.cover.logoSize} onChange={e => handleCoverChange('logoSize', e.target.value)} className={inputClass}><option value="small">Pequeño</option><option value="medium">Mediano</option><option value="large">Grande</option></select>
                </div>}

                {selectedCoverTemplate && [...Array(selectedCoverTemplate.imageSlots)].map((_, i) => (
                    <div key={i}>
                        <label className="text-xs font-medium text-gray-600">Imagen {i + 1}</label>
                        <ImageUploader imageUrl={config.cover.customImageUrls[i] || ''} onImageChange={url => {
                            const newUrls = [...config.cover.customImageUrls];
                            newUrls[i] = url;
                            handleCoverChange('customImageUrls', newUrls);
                        }} isCompact/>
                    </div>
                ))}
            </div>
             <div className="mt-4 p-4 bg-white rounded-lg border shadow-sm space-y-2">
                <h3 className={sectionTitleClass}><Book /> Contraportada</h3>
                <input type="text" placeholder="Título (Ej: Contáctanos)" value={config.backCover.customTitle} onChange={e => handleBackCoverChange('customTitle', e.target.value)} className={inputClass} />
                <textarea placeholder="Texto adicional" value={config.backCover.customText} onChange={e => handleBackCoverChange('customText', e.target.value)} className={inputClass} rows={2}/>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                    <ToggleSwitch label="Mostrar Logo" checked={config.backCover.showLogo} onChange={e => handleBackCoverChange('showLogo', e.target.checked)} />
                    <ToggleSwitch label="Mostrar Nombre" checked={config.backCover.showCompanyName} onChange={e => handleBackCoverChange('showCompanyName', e.target.checked)} />
                    <ToggleSwitch label="Mostrar Dirección" checked={config.backCover.showAddress} onChange={e => handleBackCoverChange('showAddress', e.target.checked)} />
                    <ToggleSwitch label="Mostrar Teléfono" checked={config.backCover.showPhone} onChange={e => handleBackCoverChange('showPhone', e.target.checked)} />
                    <ToggleSwitch label="Mostrar Email" checked={config.backCover.showEmail} onChange={e => handleBackCoverChange('showEmail', e.target.checked)} />
                    <ToggleSwitch label="Mostrar Redes" checked={config.backCover.showSocials} onChange={e => handleBackCoverChange('showSocials', e.target.checked)} />
                </div>
            </div>
             <button type="button" onClick={() => setIsPreviewOpen(true)} className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white border hover:bg-gray-50">
                <Eye className="h-4 w-4" /> Vista Previa Completa
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