import React, { useState } from 'react';
import { Catalogue, CatalogueType } from '../types';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import ImageUploader from './ImageUploader';
import ToggleSwitch from './ToggleSwitch';

interface CataloguesEditorProps {
  catalogues: Catalogue[];
  onCataloguesChange: (newCatalogues: Catalogue[]) => void;
}

const CataloguesEditor: React.FC<CataloguesEditorProps> = ({ catalogues, onCataloguesChange }) => {
  const [editingCatalogue, setEditingCatalogue] = useState<Catalogue | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreateNew = () => {
    setEditingCatalogue({
      id: crypto.randomUUID(),
      title: '',
      description: '',
      featuredImage: 'https://via.placeholder.com/300x400',
      isVisible: true,
      type: 'pdf',
      galleryImages: [],
    });
    setIsFormOpen(true);
  };

  const handleEdit = (catalogue: Catalogue) => {
    setEditingCatalogue(JSON.parse(JSON.stringify(catalogue))); // Deep copy
    setIsFormOpen(true);
  };

  const handleDelete = (catalogueId: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este catálogo?")) {
      onCataloguesChange(catalogues.filter(c => c.id !== catalogueId));
    }
  };

  const handleSave = () => {
    if (!editingCatalogue) return;
    const exists = catalogues.some(c => c.id === editingCatalogue.id);
    const newCatalogues = exists
      ? catalogues.map(c => c.id === editingCatalogue.id ? editingCatalogue : c)
      : [...catalogues, editingCatalogue];
    onCataloguesChange(newCatalogues);
    setEditingCatalogue(null);
    setIsFormOpen(false);
  };

  const handleCancel = () => {
    setEditingCatalogue(null);
    setIsFormOpen(false);
  };

  const handleFieldChange = (field: keyof Catalogue, value: any) => {
    if (editingCatalogue) {
      setEditingCatalogue({ ...editingCatalogue, [field]: value });
    }
  };
  
  const handleAddGalleryImage = () => {
     if (editingCatalogue) {
      const currentImages = editingCatalogue.galleryImages || [];
      handleFieldChange('galleryImages', [...currentImages, 'https://via.placeholder.com/800x600']);
    }
  };

  const handleGalleryImageChange = (index: number, url: string) => {
     if(editingCatalogue) {
        const newGallery = [...(editingCatalogue.galleryImages || [])];
        newGallery[index] = url;
        handleFieldChange('galleryImages', newGallery);
    }
  };

  const handleDeleteGalleryImage = (index: number) => {
     if(editingCatalogue) {
        const newGallery = (editingCatalogue.galleryImages || []).filter((_, i) => i !== index);
        handleFieldChange('galleryImages', newGallery);
    }
  };

  const FormView = () => {
    if (!editingCatalogue) return null;
    const inputClass = "w-full text-sm p-2 border border-gray-300 rounded bg-white text-gray-900 shadow-sm focus:ring-blue-500 focus:border-blue-500";
    const catalogueTypes: { id: CatalogueType, label: string }[] = [
        { id: 'pdf', label: 'PDF' },
        { id: 'drive', label: 'Enlace de Drive' },
        { id: 'gallery', label: 'Galería de Imágenes' },
        { id: 'productCollection', label: 'Colección de Productos (Próximamente)' },
    ];

    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800">{catalogues.some(c => c.id === editingCatalogue.id) ? 'Editar Catálogo' : 'Crear Catálogo'}</h3>
        
        <input type="text" placeholder="Título del catálogo" value={editingCatalogue.title} onChange={e => handleFieldChange('title', e.target.value)} className={inputClass}/>
        <textarea placeholder="Descripción" value={editingCatalogue.description} onChange={e => handleFieldChange('description', e.target.value)} rows={3} className={inputClass}/>
        <ToggleSwitch label="Visible en el sitio web" checked={editingCatalogue.isVisible} onChange={e => handleFieldChange('isVisible', e.target.checked)} />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Imagen Destacada</label>
          <ImageUploader imageUrl={editingCatalogue.featuredImage} onImageChange={url => handleFieldChange('featuredImage', url)} />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Contenido</label>
            <select value={editingCatalogue.type} onChange={e => handleFieldChange('type', e.target.value)} className={inputClass}>
                {catalogueTypes.map(t => <option key={t.id} value={t.id} disabled={t.id === 'productCollection'}>{t.label}</option>)}
            </select>
        </div>

        {editingCatalogue.type === 'pdf' && (
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Archivo PDF</label>
                <p className="text-xs text-gray-500 mb-2">Sube tu PDF a un servicio como Google Drive o Dropbox y pega el enlace directo aquí.</p>
                <input type="text" placeholder="https://ejemplo.com/catalogo.pdf" value={editingCatalogue.pdfUrl || ''} onChange={e => handleFieldChange('pdfUrl', e.target.value)} className={inputClass}/>
            </div>
        )}

        {editingCatalogue.type === 'drive' && (
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enlace de Google Drive</label>
                <input type="text" placeholder="https://drive.google.com/..." value={editingCatalogue.driveUrl || ''} onChange={e => handleFieldChange('driveUrl', e.target.value)} className={inputClass}/>
            </div>
        )}

        {editingCatalogue.type === 'gallery' && (
             <div>
                <h4 className="block text-sm font-medium text-gray-700 mb-2">Imágenes de la Galería</h4>
                <div className="space-y-3">
                    {(editingCatalogue.galleryImages || []).map((img, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className="flex-grow">
                                <ImageUploader imageUrl={img} onImageChange={(url) => handleGalleryImageChange(index, url)} isCompact />
                            </div>
                            <button onClick={() => handleDeleteGalleryImage(index)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 className="h-4 w-4"/></button>
                        </div>
                    ))}
                </div>
                <button onClick={handleAddGalleryImage} className="w-full flex items-center justify-center gap-2 p-2 mt-3 border-2 border-dashed rounded-md text-sm text-gray-600 hover:bg-gray-100">
                    <Plus className="h-4 w-4" /> Añadir Imagen a Galería
                </button>
            </div>
        )}

        <div className="flex justify-end gap-4 border-t pt-4">
          <button onClick={handleCancel} className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300">Cancelar</button>
          <button onClick={handleSave} className="px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">Guardar Catálogo</button>
        </div>
      </div>
    );
  };
  
  const ListView = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">Gestionar Catálogos</h3>
        <button onClick={handleCreateNew} className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4" /> Crear Catálogo
        </button>
      </div>
      <div className="space-y-2 border rounded-md p-2 bg-gray-50">
        {catalogues.length > 0 ? catalogues.map(cat => (
          <div key={cat.id} className="flex items-center p-2 rounded-md bg-white border border-gray-200 shadow-sm">
            <img src={cat.featuredImage} alt={cat.title} className="h-10 w-10 object-cover rounded-md mr-4"/>
            <div className="flex-grow">
              <p className="text-sm font-semibold text-gray-900">{cat.title}</p>
              <p className="text-xs text-gray-500 capitalize">{cat.type}</p>
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

  return isFormOpen ? <FormView /> : <ListView />;
};

export default CataloguesEditor;