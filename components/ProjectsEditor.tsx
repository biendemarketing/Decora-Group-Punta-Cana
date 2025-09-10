import React, { useState } from 'react';
import { Project, SubCategory } from '../types';
import { Plus, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import ImageUploader from './ImageUploader';

interface ProjectsEditorProps {
  projects: Project[];
  onProjectsChange: (newProjects: Project[]) => void;
  projectCategories: SubCategory[];
}

const ProjectsEditor: React.FC<ProjectsEditorProps> = ({ projects, onProjectsChange, projectCategories }) => {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreateNew = () => {
    setEditingProject({
      id: Date.now(), // Temporary ID, could be replaced by DB ID later
      title: '',
      category: projectCategories[0]?.name || '',
      imageUrl: 'https://via.placeholder.com/800x600',
      description: '',
      galleryImages: [],
    });
    setIsFormOpen(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(JSON.parse(JSON.stringify(project))); // Deep copy to avoid direct mutation
    setIsFormOpen(true);
  };

  const handleDelete = (projectId: number) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este proyecto? Esta acción no se puede deshacer.")) {
      onProjectsChange(projects.filter(p => p.id !== projectId));
    }
  };

  const handleSave = () => {
    if (!editingProject) return;
    
    const exists = projects.some(p => p.id === editingProject.id);
    if (exists) {
      onProjectsChange(projects.map(p => p.id === editingProject.id ? editingProject : p));
    } else {
      onProjectsChange([...projects, editingProject]);
    }
    setEditingProject(null);
    setIsFormOpen(false);
  };

  const handleCancel = () => {
    setEditingProject(null);
    setIsFormOpen(false);
  };
  
  const handleFieldChange = (field: keyof Project, value: any) => {
    if (editingProject) {
      setEditingProject({ ...editingProject, [field]: value });
    }
  };
  
  const handleAddGalleryImage = () => {
    if (editingProject) {
        handleFieldChange('galleryImages', [...editingProject.galleryImages, 'https://via.placeholder.com/1200x800']);
    }
  };

  const handleGalleryImageChange = (index: number, url: string) => {
    if(editingProject) {
        const newGallery = [...editingProject.galleryImages];
        newGallery[index] = url;
        handleFieldChange('galleryImages', newGallery);
    }
  };
  
  const handleDeleteGalleryImage = (index: number) => {
    if(editingProject) {
        const newGallery = editingProject.galleryImages.filter((_, i) => i !== index);
        handleFieldChange('galleryImages', newGallery);
    }
  };

  if (isFormOpen && editingProject) {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-gray-800">{editingProject.id ? 'Editar Proyecto' : 'Crear Proyecto'}</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título del Proyecto</label>
            <input type="text" value={editingProject.title} onChange={(e) => handleFieldChange('title', e.target.value)} className="mt-1 w-full border-gray-300 rounded-md shadow-sm text-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
            <select value={editingProject.category} onChange={(e) => handleFieldChange('category', e.target.value)} className="mt-1 w-full border-gray-300 rounded-md shadow-sm text-sm p-2">
              {projectCategories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea value={editingProject.description} onChange={(e) => handleFieldChange('description', e.target.value)} rows={4} className="mt-1 w-full border-gray-300 rounded-md shadow-sm text-sm p-2"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Imagen Principal</label>
            <ImageUploader imageUrl={editingProject.imageUrl} onImageChange={(url) => handleFieldChange('imageUrl', url)} />
          </div>
          <div>
            <h4 className="block text-sm font-medium text-gray-700 mb-2">Galería de Imágenes</h4>
            <div className="space-y-3">
                {editingProject.galleryImages.map((img, index) => (
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
        </div>
        <div className="flex justify-end gap-4 border-t pt-4">
          <button onClick={handleCancel} className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300">Cancelar</button>
          <button onClick={handleSave} className="px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">Guardar Proyecto</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">Gestionar Proyectos</h3>
        <button onClick={handleCreateNew} className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4" /> Crear Nuevo
        </button>
      </div>
      <div className="space-y-2 border rounded-md p-2 bg-gray-50">
        {projects.length > 0 ? projects.map(project => (
          <div key={project.id} className="flex items-center p-2 rounded-md bg-white border border-gray-200 shadow-sm">
            <img src={project.imageUrl} alt={project.title} className="h-10 w-10 object-cover rounded-md mr-4"/>
            <div className="flex-grow">
                <p className="text-sm font-semibold text-gray-900">{project.title}</p>
                <p className="text-xs text-gray-500">{project.category}</p>
            </div>
            <button onClick={() => handleEdit(project)} className="p-2 text-gray-500 hover:text-blue-600"><Edit className="h-4 w-4" /></button>
            <button onClick={() => handleDelete(project.id)} className="p-2 text-gray-500 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
          </div>
        )) : (
            <p className="text-center text-gray-500 p-4">No hay proyectos. ¡Crea el primero!</p>
        )}
      </div>
    </div>
  );
};

export default ProjectsEditor;