import React, { useState } from 'react';
import { NavigationData, BlogPost, BlogCategory, BlogTag } from '../types';
import { Plus, Trash2, Edit } from 'lucide-react';
import ImageUploader from './ImageUploader';

interface BlogEditorProps {
  navigationData: NavigationData;
  onNavigationChange: (newData: NavigationData) => void;
}

type ActiveTab = 'posts' | 'categories' | 'tags' | 'settings';

const BlogEditor: React.FC<BlogEditorProps> = ({ navigationData, onNavigationChange }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('posts');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  
  const inputClass = "w-full text-sm p-2 border border-gray-300 rounded bg-white text-gray-900 shadow-sm focus:ring-blue-500 focus:border-blue-500";
  
  // --- Section Settings Handlers ---
  const handleSettingsChange = (field: keyof NavigationData['magazineSection'], value: string) => {
    const newMagazineSection = { ...navigationData.magazineSection, [field]: value };
    onNavigationChange({ ...navigationData, magazineSection: newMagazineSection });
  };
  
  // --- Category Handlers ---
  const handleAddCategory = () => {
    const name = prompt("Nombre de la nueva categoría:");
    if (name) {
      const newCategory: BlogCategory = { id: crypto.randomUUID(), name };
      onNavigationChange({ ...navigationData, blogCategories: [...navigationData.blogCategories, newCategory] });
    }
  };
  const handleDeleteCategory = (id: string) => {
    if (window.confirm("¿Seguro? Se eliminará esta categoría de todas las publicaciones.")) {
      const newCategories = navigationData.blogCategories.filter(c => c.id !== id);
      const newPosts = navigationData.blogPosts.map(p => p.categoryId === id ? { ...p, categoryId: '' } : p);
      onNavigationChange({ ...navigationData, blogCategories: newCategories, blogPosts: newPosts });
    }
  };
  
  // --- Tag Handlers ---
  const handleAddTag = () => {
    const name = prompt("Nombre de la nueva etiqueta:");
    if (name) {
      const newTag: BlogTag = { id: crypto.randomUUID(), name };
      onNavigationChange({ ...navigationData, blogTags: [...navigationData.blogTags, newTag] });
    }
  };
  const handleDeleteTag = (id: string) => {
     if (window.confirm("¿Seguro? Se eliminará esta etiqueta de todas las publicaciones.")) {
      const newTags = navigationData.blogTags.filter(t => t.id !== id);
      const newPosts = navigationData.blogPosts.map(p => ({...p, tagIds: p.tagIds.filter(tagId => tagId !== id) }));
      onNavigationChange({ ...navigationData, blogTags: newTags, blogPosts: newPosts });
    }
  };
  
  // --- Post Handlers ---
  const handleSavePost = () => {
    if (!editingPost) return;
    const exists = navigationData.blogPosts.some(p => p.id === editingPost.id);
    const newPosts = exists 
      ? navigationData.blogPosts.map(p => p.id === editingPost.id ? editingPost : p)
      : [...navigationData.blogPosts, editingPost];
    onNavigationChange({ ...navigationData, blogPosts: newPosts });
    setEditingPost(null);
  };
  const handleCreatePost = () => setEditingPost({ id: crypto.randomUUID(), title: '', description: '', imageUrl: 'https://via.placeholder.com/600x400', author: '', date: new Date().toISOString(), categoryId: '', tagIds: [] });
  const handleDeletePost = (id: string) => {
     if (window.confirm("¿Seguro que quieres eliminar esta publicación?")) {
        onNavigationChange({ ...navigationData, blogPosts: navigationData.blogPosts.filter(p => p.id !== id) });
     }
  };
  
  if (editingPost) {
    return (
      <div className="space-y-4 text-gray-900">
        <h3 className="text-lg font-bold text-gray-800">Editar Publicación</h3>
        <input type="text" placeholder="Título" value={editingPost.title} onChange={e => setEditingPost({...editingPost, title: e.target.value})} className={inputClass} />
        <textarea placeholder="Descripción/Contenido" value={editingPost.description} onChange={e => setEditingPost({...editingPost, description: e.target.value})} rows={5} className={inputClass} />
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Autor" value={editingPost.author} onChange={e => setEditingPost({...editingPost, author: e.target.value})} className={inputClass} />
          <input type="date" value={editingPost.date.split('T')[0]} onChange={e => setEditingPost({...editingPost, date: new Date(e.target.value).toISOString()})} className={inputClass} />
        </div>
        <ImageUploader imageUrl={editingPost.imageUrl} onImageChange={url => setEditingPost({...editingPost, imageUrl: url})} />
        <select value={editingPost.categoryId} onChange={e => setEditingPost({...editingPost, categoryId: e.target.value})} className={inputClass}>
          <option value="">Seleccionar Categoría</option>
          {navigationData.blogCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <div>
          <h4 className="text-sm font-medium mb-2 text-gray-700">Etiquetas</h4>
          <div className="grid grid-cols-3 gap-2 p-2 border rounded max-h-24 overflow-y-auto">
            {navigationData.blogTags.map(tag => (
              <label key={tag.id} className="flex items-center text-sm text-gray-800"><input type="checkbox" checked={editingPost.tagIds.includes(tag.id)} onChange={() => {
                const newTags = editingPost.tagIds.includes(tag.id) ? editingPost.tagIds.filter(t => t !== tag.id) : [...editingPost.tagIds, tag.id];
                setEditingPost({...editingPost, tagIds: newTags});
              }} className="mr-2" />{tag.name}</label>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={() => setEditingPost(null)} className="px-4 py-2 text-sm rounded-md bg-gray-200">Cancelar</button>
          <button onClick={handleSavePost} className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white">Guardar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b flex space-x-2">
        {(['posts', 'categories', 'tags', 'settings'] as ActiveTab[]).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
        ))}
      </div>
      
      {activeTab === 'posts' && <div className="space-y-2">
          <button onClick={handleCreatePost} className="flex items-center gap-2 p-2 text-sm rounded bg-green-600 text-white w-full justify-center"><Plus className="h-4 w-4"/>Nueva Publicación</button>
          {navigationData.blogPosts.map(post => <div key={post.id} className="flex items-center p-2 border rounded bg-white">
              <img src={post.imageUrl} className="h-10 w-10 object-cover rounded mr-3" alt={post.title}/>
              <span className="flex-grow text-sm font-semibold text-gray-900">{post.title}</span>
              <button onClick={() => setEditingPost(post)} className="p-1 text-gray-500 hover:text-blue-600"><Edit className="h-4 w-4"/></button>
              <button onClick={() => handleDeletePost(post.id)} className="p-1 text-gray-500 hover:text-red-600"><Trash2 className="h-4 w-4"/></button>
          </div>)}
      </div>}

      {activeTab === 'categories' && <div className="space-y-2">
          <button onClick={handleAddCategory} className="flex items-center gap-2 p-2 text-sm rounded bg-green-600 text-white w-full justify-center"><Plus className="h-4 w-4"/>Nueva Categoría</button>
          {navigationData.blogCategories.map(cat => <div key={cat.id} className="flex items-center p-2 border rounded bg-white">
              <span className="flex-grow text-sm text-gray-900">{cat.name}</span>
              <button onClick={() => handleDeleteCategory(cat.id)} className="p-1 text-gray-500 hover:text-red-600"><Trash2 className="h-4 w-4"/></button>
          </div>)}
      </div>}
      
      {activeTab === 'tags' && <div className="space-y-2">
          <button onClick={handleAddTag} className="flex items-center gap-2 p-2 text-sm rounded bg-green-600 text-white w-full justify-center"><Plus className="h-4 w-4"/>Nueva Etiqueta</button>
          {navigationData.blogTags.map(tag => <div key={tag.id} className="flex items-center p-2 border rounded bg-white">
              <span className="flex-grow text-sm text-gray-900">{tag.name}</span>
              <button onClick={() => handleDeleteTag(tag.id)} className="p-1 text-gray-500 hover:text-red-600"><Trash2 className="h-4 w-4"/></button>
          </div>)}
      </div>}
      
      {activeTab === 'settings' && <div className="space-y-4">
          <div><label className="block text-sm font-medium mb-1 text-gray-700">Título de Sección</label><input type="text" value={navigationData.magazineSection.title} onChange={e => handleSettingsChange('title', e.target.value)} className={inputClass}/></div>
          <div><label className="block text-sm font-medium mb-1 text-gray-700">Subtítulo de Sección</label><input type="text" value={navigationData.magazineSection.subtitle} onChange={e => handleSettingsChange('subtitle', e.target.value)} className={inputClass}/></div>
      </div>}
    </div>
  );
};

export default BlogEditor;