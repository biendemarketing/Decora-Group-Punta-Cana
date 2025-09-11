import React, { useState } from 'react';
import { Catalogue, NavigationData, Product, CatalogueType } from '../types';
import { Plus, Edit, Trash2, BookOpen, FilePlus, FileText, Image as ImageIcon, ExternalLink, Box } from 'lucide-react';
import CatalogueCreator from './CatalogueCreator';
import ImageUploader from './ImageUploader';
import ToggleSwitch from './ToggleSwitch';

interface CataloguesEditorProps {
  catalogues: Catalogue[];
  onCataloguesChange: (newCatalogues: Catalogue[]) => void;
  navigationData: NavigationData;
  productsData: Product[];
}

type EditorMode = 'list' | 'creator' | 'postEditor';

const CataloguesEditor: React.FC<CataloguesEditorProps> = ({ catalogues, onCataloguesChange, navigationData, productsData }) => {
  const [mode, setMode] = useState<EditorMode>('list');
  const [catalogueToEdit, setCatalogueToEdit] = useState<Catalogue | null>(null);
  const [showCreateOptions, setShowCreateOptions] = useState(false);

  const handleEdit = (catalogue: Catalogue) => {
    setCatalogueToEdit(catalogue);
    if (catalogue.type === 'generated') {
      setMode('creator');
    } else {
      setMode('postEditor');
    }
  };

  const handleDelete = (catalogueId: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este catálogo?")) {
      onCataloguesChange(catalogues.filter(c => c.id !== catalogueId));
    }
  };
  
  const handleCancel = () => {
    setMode('list');
    setCatalogueToEdit(null);
    setShowCreateOptions(false);
  };

  const handleCreatePostCatalogue = () => {
    setCatalogueToEdit({
      id: crypto.randomUUID(),
      title: 'Nuevo Catálogo',
      description: 'Descripción del nuevo catálogo.',
      featuredImage: 'https://via.placeholder.com/300x400',
      isVisible: true,
      type: 'pdf',
      pdfUrl: '',
      driveUrl: '',
      galleryImages: [],
      productIds: []
    });
    setMode('postEditor');
    setShowCreateOptions(false);
  };

  const handleCreateGeneratedCatalogue = () => {
    setCatalogueToEdit(null); // Creator handles new item state
    setMode('creator');
    setShowCreateOptions(false);
  };
  
  const handleSaveCatalogue = (catalogue: Catalogue) => {
    const exists = catalogues.some(c => c.id === catalogue.id);
    const newCatalogues = exists
      ? catalogues.map(c => c.id === catalogue.id ? catalogue : c)
      : [...catalogues, catalogue];
    onCataloguesChange(newCatalogues);
    handleCancel();
  };

  if (mode === 'creator') {
    return (
      <CatalogueCreator
        catalogueToEdit={catalogueToEdit}
        onSave={handleSaveCatalogue}
        onCancel={handleCancel}
        navigationData={navigationData}
        productsData={productsData}
      />
    );
  }

  if (mode === 'postEditor' && catalogueToEdit) {
    const inputClass = "w-full text-sm p-2 border border-gray-300 rounded bg-white text-gray-900 shadow-sm focus:ring-blue-500 focus:border-blue-500";
    
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800">{catalogues.some(c => c.id === catalogueToEdit.id) ? 'Editar Catálogo' : 'Crear Catálogo Tipo Post'}</h3>
            <input type="text" placeholder="Título" value={catalogueToEdit.title} onChange={e => setCatalogueToEdit({...catalogueToEdit, title: e.target.value})} className={inputClass} />
            <textarea placeholder="Descripción" value={catalogueToEdit.description} onChange={e => setCatalogueToEdit({...catalogueToEdit, description: e.target.value})} className={inputClass} rows={3} />
            <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Imagen de Portada (para listado)</label>
                <ImageUploader imageUrl={catalogueToEdit.featuredImage} onImageChange={url => setCatalogueToEdit({...catalogueToEdit, featuredImage: url})} />
            </div>
            <ToggleSwitch label="Visible en el sitio" checked={catalogueToEdit.isVisible} onChange={e => setCatalogueToEdit({...catalogueToEdit, isVisible: e.target.checked})} />
            <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Tipo de Catálogo</label>
                <select value={catalogueToEdit.type} onChange={e => setCatalogueToEdit({...catalogueToEdit, type: e.target.value as CatalogueType})} className={inputClass}>
                    <option value="pdf">PDF</option>
                    <option value="drive">Google Drive</option>
                    <option value="gallery">Galería de Imágenes</option>
                    <option value="productCollection">Colección de Productos</option>
                </select>
            </div>
            
            {catalogueToEdit.type === 'pdf' && <input type="text" placeholder="URL del PDF" value={catalogueToEdit.pdfUrl || ''} onChange={e => setCatalogueToEdit({...catalogueToEdit, pdfUrl: e.target.value})} className={inputClass} />}
            {catalogueToEdit.type === 'drive' && <input type="text" placeholder="URL de Google Drive" value={catalogueToEdit.driveUrl || ''} onChange={e => setCatalogueToEdit({...catalogueToEdit, driveUrl: e.target.value})} className={inputClass} />}
            {catalogueToEdit.type === 'gallery' && (
                <div>
                    <h4 className="text-sm font-semibold mb-2">Imágenes de la Galería</h4>
                    {catalogueToEdit.galleryImages?.map((img, i) => (
                        <div key={i} className="flex items-center gap-2 mb-2">
                           <ImageUploader imageUrl={img} onImageChange={url => {
                               const newImages = [...catalogueToEdit.galleryImages!];
                               newImages[i] = url;
                               setCatalogueToEdit({...catalogueToEdit, galleryImages: newImages});
                           }} isCompact/>
                           <button onClick={() => setCatalogueToEdit({...catalogueToEdit, galleryImages: catalogueToEdit.galleryImages!.filter((_, idx) => idx !== i)})} className="p-1 text-red-500"><Trash2 size={16}/></button>
                        </div>
                    ))}
                    <button onClick={() => setCatalogueToEdit({...catalogueToEdit, galleryImages: [...(catalogueToEdit.galleryImages || []), '']})} className="text-sm p-2 border-dashed border-2 rounded w-full">Añadir Imagen</button>
                </div>
            )}
            
            <div className="flex justify-end gap-2">
                <button onClick={handleCancel} className="px-4 py-2 text-sm rounded bg-gray-200">Cancelar</button>
                <button onClick={() => handleSaveCatalogue(catalogueToEdit)} className="px-4 py-2 text-sm rounded bg-blue-600 text-white">Guardar</button>
            </div>
        </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <BookOpen />
            Gestor de Catálogos
        </h3>
        <button onClick={() => setShowCreateOptions(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
          <FilePlus className="h-4 w-4" /> Crear Catálogo
        </button>
      </div>

      {showCreateOptions && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={handleCancel}>
            <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 max-w-sm w-full" onClick={e => e.stopPropagation()}>
                <h3 className="font-bold text-lg text-center text-gray-900">¿Qué tipo de catálogo quieres crear?</h3>
                <p className="text-sm text-gray-600 text-center">Elige una opción para empezar.</p>
                <div className="space-y-3 pt-2">
                    <button onClick={handleCreatePostCatalogue} className="w-full text-left flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 hover:border-gray-400">
                       <div className="p-2 bg-blue-100 rounded text-blue-600"><FileText className="h-5 w-5"/></div>
                       <div>
                           <span className="font-semibold text-gray-800">Tipo Post</span>
                           <p className="text-xs text-gray-500">Para PDF, enlaces de Drive o galerías de imágenes simples.</p>
                       </div>
                    </button>
                     <button onClick={handleCreateGeneratedCatalogue} className="w-full text-left flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 hover:border-gray-400">
                       <div className="p-2 bg-purple-100 rounded text-purple-600"><Box className="h-5 w-5"/></div>
                       <div>
                           <span className="font-semibold text-gray-800">Basado en Productos</span>
                           <p className="text-xs text-gray-500">Usa el diseñador avanzado para crear un catálogo PDF a partir de tus productos.</p>
                       </div>
                    </button>
                </div>
            </div>
        </div>
      )}

      <div className="space-y-2 border rounded-md p-2 bg-gray-50">
        {catalogues.length > 0 ? catalogues.map(cat => (
          <div key={cat.id} className="flex items-center p-2 rounded-md bg-white border border-gray-200 shadow-sm">
            <img src={cat.featuredImage} alt={cat.title} className="h-10 w-10 object-cover rounded-md mr-4"/>
            <div className="flex-grow">
              <p className="text-sm font-semibold text-gray-900">{cat.title}</p>
              <p className="text-xs text-gray-500 capitalize">{cat.type === 'generated' ? 'Basado en Productos' : `Post (${cat.type})`}</p>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${cat.isVisible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {cat.isVisible ? 'Visible' : 'Oculto'}
            </span>
            <button onClick={() => handleEdit(cat)} className="p-2 text-gray-500 hover:text-blue-600"><Edit className="h-4 w-4" /></button>
            <button onClick={() => handleDelete(cat.id)} className="p-2 text-gray-500 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
          </div>
        )) : (
          <p className="text-center text-gray-500 p-4">No hay catálogos. ¡Crea el primero!</p>
        )}
      </div>
    </div>
  );
};

export default CataloguesEditor;