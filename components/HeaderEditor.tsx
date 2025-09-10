import React, { useState, useRef } from 'react';
import { NavigationData, SubCategory, MenuItem } from '../types';
import { Trash2, GripVertical, Plus, Eye, EyeOff } from 'lucide-react';
import ImageUploader from './ImageUploader';

interface HeaderEditorProps {
  navigationData: NavigationData;
  onNavigationChange: (newData: NavigationData) => void;
}

const HeaderEditor: React.FC<HeaderEditorProps> = ({ navigationData, onNavigationChange }) => {
  const [selectedMenuItemId, setSelectedMenuItemId] = useState<string | null>(null);

  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);

  const selectedMenuItem = navigationData.menuItems.find(item => item.id === selectedMenuItemId);

  const handleNavigationChange = (updatedMenuItems: MenuItem[]) => {
    onNavigationChange({
      ...navigationData,
      menuItems: updatedMenuItems,
    });
  };
  
  // --- Main Menu Handlers ---
  
  const handleAddMenuItem = () => {
    const key = `new_item_${Date.now()}`;
    const newItem: MenuItem = {
      id: crypto.randomUUID(),
      key: key,
      title: "Nueva Categoría",
      isVisible: true,
      featuredImageUrl: "https://via.placeholder.com/300x400",
      subCategories: [],
    };
    handleNavigationChange([...navigationData.menuItems, newItem]);
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    const updatedItems = navigationData.menuItems.map(item =>
      item.id === id ? { ...item, ...updates } : item
    );
    handleNavigationChange(updatedItems);
  };

  const handleMainMenuSort = () => {
    const newMenuItems = [...navigationData.menuItems];
    const draggedItemContent = newMenuItems.splice(dragItem.current, 1)[0];
    newMenuItems.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    handleNavigationChange(newMenuItems);
  };
  
  // --- Subcategory Handlers ---

  const updateSubCategories = (menuItemId: string, updatedSubCategories: SubCategory[]) => {
    const updatedItems = navigationData.menuItems.map(item => 
      item.id === menuItemId ? { ...item, subCategories: updatedSubCategories } : item
    );
    handleNavigationChange(updatedItems);
  };

  const handleSubCategoryChange = (index: number, field: keyof SubCategory, value: string) => {
    if (!selectedMenuItem) return;
    const subCategories = [...selectedMenuItem.subCategories];
    subCategories[index] = { ...subCategories[index], [field]: value };
    updateSubCategories(selectedMenuItem.id, subCategories);
  };

  const handleAddSubCategory = () => {
    if (!selectedMenuItem) return;
    const newSubCategory: SubCategory = {
      id: crypto.randomUUID(),
      name: "Nueva Subcategoría",
      imageUrl: "https://via.placeholder.com/100",
    };
    const subCategories = [...selectedMenuItem.subCategories, newSubCategory];
    updateSubCategories(selectedMenuItem.id, subCategories);
  };
  
  const handleDeleteSubCategory = (index: number) => {
    if (!selectedMenuItem) return;
    if (window.confirm("¿Estás seguro de que quieres eliminar esta subcategoría?")) {
      const subCategories = selectedMenuItem.subCategories.filter((_, i) => i !== index);
      updateSubCategories(selectedMenuItem.id, subCategories);
    }
  };

  const handleSubCategorySort = () => {
    if (!selectedMenuItem) return;
    const subCategories = [...selectedMenuItem.subCategories];
    const draggedItemContent = subCategories.splice(dragItem.current, 1)[0];
    subCategories.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    updateSubCategories(selectedMenuItem.id, subCategories);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-2 text-gray-800">Menú Principal</h3>
        <div className="space-y-2 p-2 border rounded-md bg-gray-50">
          {navigationData.menuItems.map((item, index) => (
            <div key={item.id} draggable onDragStart={() => dragItem.current = index} onDragEnter={() => dragOverItem.current = index} onDragEnd={handleMainMenuSort} onDragOver={(e) => e.preventDefault()}
              className={`flex items-center p-2 rounded-md shadow-sm cursor-grab border ${selectedMenuItemId === item.id ? 'bg-blue-50 border-blue-400' : 'bg-white border-gray-200'}`}
              onClick={() => setSelectedMenuItemId(item.id)}
            >
              <GripVertical className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
              <input type="text" value={item.title} onChange={(e) => updateMenuItem(item.id, { title: e.target.value })} 
                className="flex-grow bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1 text-sm font-medium text-gray-900" 
              />
              <button onClick={(e) => { e.stopPropagation(); updateMenuItem(item.id, { isVisible: !item.isVisible }); }}
                className={`p-1 rounded ${item.isVisible ? 'text-green-600 hover:bg-green-100' : 'text-gray-400 hover:bg-gray-100'}`}
              >
                {item.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
            </div>
          ))}
        </div>
         <button onClick={handleAddMenuItem} className="w-full flex items-center justify-center gap-2 p-2 mt-2 border-2 border-dashed rounded-md text-sm text-gray-600 hover:bg-gray-100 hover:border-gray-400">
            <Plus className="h-4 w-4" /> Crear Categoría
        </button>
      </div>

      {selectedMenuItem && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-bold mb-2 text-gray-800">Editar: <span className="text-blue-600">{selectedMenuItem.title}</span></h3>
          
          {selectedMenuItem.subCategories.length > 0 && (
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Imagen Destacada (Mega Menú)</label>
              <ImageUploader 
                imageUrl={selectedMenuItem.featuredImageUrl}
                onImageChange={(url) => updateMenuItem(selectedMenuItem.id, { featuredImageUrl: url })}
              />
            </div>
          )}

          <h4 className="text-md font-semibold mt-6 mb-2 text-gray-700">Subcategorías</h4>
          <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 border rounded-md p-2 bg-gray-50">
            {selectedMenuItem.subCategories.map((sub, index) => (
              <div key={sub.id} draggable onDragStart={() => dragItem.current = index} onDragEnter={() => dragOverItem.current = index} onDragEnd={handleSubCategorySort} onDragOver={(e) => e.preventDefault()}
                className="p-3 border rounded-md space-y-3 bg-white shadow-sm cursor-grab">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <GripVertical className="h-5 w-5 text-gray-400 mr-2" />
                    <input type="text" value={sub.name} onChange={(e) => handleSubCategoryChange(index, 'name', e.target.value)}
                      className="font-semibold text-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1 text-gray-900" />
                  </div>
                  <button onClick={() => handleDeleteSubCategory(index)} className="p-1 text-gray-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                </div>
                <div>
                   <label className="block text-xs font-medium text-gray-600 mb-1">Icono</label>
                   <ImageUploader 
                      imageUrl={sub.imageUrl}
                      onImageChange={(url) => handleSubCategoryChange(index, 'imageUrl', url)}
                      isCompact={true}
                    />
                </div>
              </div>
            ))}
            <button onClick={handleAddSubCategory} className="w-full flex items-center justify-center gap-2 p-2 mt-2 border-2 border-dashed rounded-md text-sm text-gray-600 hover:bg-gray-100 hover:border-gray-400">
              <Plus className="h-4 w-4" /> Añadir Subcategoría
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderEditor;