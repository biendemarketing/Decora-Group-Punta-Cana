import React from 'react';
import { PopularCategory, MenuItem } from '../types';
import { GripVertical, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import ImageUploader from './ImageUploader';

interface PopularCategoriesEditorProps {
  categories: PopularCategory[];
  onCategoriesChange: (newCategories: PopularCategory[]) => void;
  menuItems: MenuItem[];
}

const PopularCategoriesEditor: React.FC<PopularCategoriesEditorProps> = ({ categories, onCategoriesChange, menuItems }) => {
  const [openCategoryId, setOpenCategoryId] = React.useState<string | null>(categories.length > 0 ? categories[0].id : null);
  const dragItem = React.useRef<any>(null);
  const dragOverItem = React.useRef<any>(null);

  const handleCategoryChange = (id: string, field: keyof PopularCategory, value: any) => {
    const newCategories = categories.map(cat => cat.id === id ? { ...cat, [field]: value } : cat);
    onCategoriesChange(newCategories);
  };

  const handleAddCategory = () => {
    const newCategory: PopularCategory = {
      id: crypto.randomUUID(),
      name: "Nueva Categoría",
      imageUrl: "https://via.placeholder.com/400",
      link: menuItems[0]?.title || '',
    };
    onCategoriesChange([...categories, newCategory]);
    setOpenCategoryId(newCategory.id);
  };

  const handleDeleteCategory = (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta categoría popular?")) {
      onCategoriesChange(categories.filter(cat => cat.id !== id));
    }
  };

  const handleSort = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const newCategories = [...categories];
    const draggedItemContent = newCategories.splice(dragItem.current, 1)[0];
    newCategories.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    onCategoriesChange(newCategories);
  };
  
  const productMenuItems = menuItems.filter(item => !['blog', 'proyectos', 'cotizar'].includes(item.key));

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-800">Editor de Categorías Populares</h3>
      <div className="space-y-2 border rounded-md p-2 bg-gray-50">
        {categories.map((cat, index) => (
          <div key={cat.id}>
            <div 
              draggable 
              onDragStart={() => dragItem.current = index} 
              onDragEnter={() => dragOverItem.current = index} 
              onDragEnd={handleSort} 
              onDragOver={(e) => e.preventDefault()}
              className="flex items-center p-2 rounded-md shadow-sm bg-white border border-gray-200 cursor-grab"
            >
              <GripVertical className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
              <span className="flex-grow text-sm font-medium text-gray-900 truncate">{cat.name}</span>
              <button onClick={() => setOpenCategoryId(openCategoryId === cat.id ? null : cat.id)} className="p-1 text-gray-500 hover:text-blue-600">
                {openCategoryId === cat.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              <button onClick={() => handleDeleteCategory(cat.id)} className="p-1 text-gray-400 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            {openCategoryId === cat.id && (
              <div className="p-4 border-x border-b border-gray-200 bg-white space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Nombre a mostrar</label>
                  <input type="text" value={cat.name} onChange={(e) => handleCategoryChange(cat.id, 'name', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm text-sm p-2 bg-white text-gray-900"/>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Enlazar a la categoría de productos</label>
                  <select value={cat.link} onChange={(e) => handleCategoryChange(cat.id, 'link', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm text-sm p-2 bg-white text-gray-900">
                     {productMenuItems.map(item => <option key={item.key} value={item.title}>{item.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Imagen</label>
                  <ImageUploader imageUrl={cat.imageUrl} onImageChange={(url) => handleCategoryChange(cat.id, 'imageUrl', url)} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={handleAddCategory} className="w-full flex items-center justify-center gap-2 p-2 mt-2 border-2 border-dashed rounded-md text-sm text-gray-600 hover:bg-gray-100 hover:border-gray-400">
        <Plus className="h-4 w-4" /> Añadir Categoría Popular
      </button>
    </div>
  );
};

export default PopularCategoriesEditor;
