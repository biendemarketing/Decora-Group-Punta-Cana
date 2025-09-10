import React, { useState, useRef } from 'react';
import { NavigationData, SubCategory } from '../types';
import { Trash2, GripVertical, Plus, Upload } from 'lucide-react';

interface HeaderEditorProps {
  navigationData: NavigationData;
  onNavigationChange: (newData: NavigationData) => void;
}

const HeaderEditor: React.FC<HeaderEditorProps> = ({ navigationData, onNavigationChange }) => {
  const [selectedMenuKey, setSelectedMenuKey] = useState<keyof Omit<NavigationData, 'navLinks' | 'logoUrl' | 'footerLogoUrl' | 'topBarLinks'> | ''>('');

  // Drag state
  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);

  const handleFileChange = (file: File, callback: (base64: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const updateSubCategory = (menuKey: string, updatedSubCategories: SubCategory[]) => {
    onNavigationChange({
      ...navigationData,
      [menuKey]: updatedSubCategories,
    });
  };

  const handleSubCategoryChange = (index: number, field: keyof SubCategory, value: string) => {
    if (!selectedMenuKey) return;
    const subCategories = [...(navigationData[selectedMenuKey] as SubCategory[])];
    const itemToUpdate = { ...subCategories[index] };
    if (field === 'name' || field === 'title') {
      itemToUpdate.title = value;
      itemToUpdate.name = value;
    } else {
      (itemToUpdate as any)[field] = value;
    }
    subCategories[index] = itemToUpdate;
    updateSubCategory(selectedMenuKey, subCategories);
  };

  const handleAddSubCategory = () => {
    if (!selectedMenuKey) return;
    const newSubCategory: SubCategory = {
      name: "Nueva Subcategoría",
      title: "Nueva Subcategoría",
      imageUrl: "https://via.placeholder.com/100",
    };
    const subCategories = [...(navigationData[selectedMenuKey] as SubCategory[]), newSubCategory];
    updateSubCategory(selectedMenuKey, subCategories);
  };
  
  const handleDeleteSubCategory = (index: number) => {
    if (!selectedMenuKey) return;
    if (window.confirm("¿Estás seguro de que quieres eliminar esta subcategoría?")) {
      const subCategories = (navigationData[selectedMenuKey] as SubCategory[]).filter((_, i) => i !== index);
      updateSubCategory(selectedMenuKey, subCategories);
    }
  };

  // Drag handlers for main menu
  const handleMainMenuSort = () => {
    const newNavLinks = [...navigationData.navLinks];
    const draggedItemContent = newNavLinks.splice(dragItem.current, 1)[0];
    newNavLinks.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    onNavigationChange({ ...navigationData, navLinks: newNavLinks });
  };
  
  // Drag handlers for subcategories
  const handleSubCategorySort = () => {
    if (!selectedMenuKey) return;
    const subCategories = [...(navigationData[selectedMenuKey] as SubCategory[])];
    const draggedItemContent = subCategories.splice(dragItem.current, 1)[0];
    subCategories.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    updateSubCategory(selectedMenuKey, subCategories);
  };

  const menuKeyMapping: { [key: string]: keyof Omit<NavigationData, 'navLinks' | 'logoUrl' | 'footerLogoUrl' | 'topBarLinks'> } = {
    "Sala": "sala", "Dormitorio": "dormitorio", "Cocina": "cocina", "Recibidor": "recibidor",
    "Oficina": "oficina", "Baño": "bano", "Muebles infantiles": "infantiles", "Puertas": "puertas",
    "Proyectos": "proyectos", "Cotizar a medida": "cotizar",
  };
  
  const getSubcategories = (): SubCategory[] => selectedMenuKey ? (navigationData[selectedMenuKey] as SubCategory[]) : [];

  return (
    <div className="space-y-6 text-gray-900">
      <div>
        <h3 className="text-lg font-bold mb-2">Orden del Menú Principal</h3>
        <div className="space-y-2 p-2 border rounded-md bg-gray-50">
          {navigationData.navLinks.map((link, index) => (
            <div key={link} draggable onDragStart={() => dragItem.current = index} onDragEnter={() => dragOverItem.current = index} onDragEnd={handleMainMenuSort} onDragOver={(e) => e.preventDefault()}
              className="flex items-center p-2 bg-white rounded-md shadow-sm cursor-grab border text-gray-900">
              <GripVertical className="h-5 w-5 text-gray-400 mr-2" />
              <span>{link}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-2">Editar Subcategorías</h3>
        <select value={selectedMenuKey} onChange={(e) => setSelectedMenuKey(e.target.value as any)}
          className="w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#5a1e38] focus:border-[#5a1e38] sm:text-sm rounded-md bg-white text-gray-900">
          <option value="">-- Elige una sección del menú --</option>
          {navigationData.navLinks.filter(link => menuKeyMapping[link]).map(link => (
            <option key={link} value={menuKeyMapping[link]}>{link}</option>
          ))}
        </select>
      </div>

      {selectedMenuKey && (
        <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 border-t pt-4">
          {getSubcategories().map((sub, index) => (
            <div key={index} draggable onDragStart={() => dragItem.current = index} onDragEnter={() => dragOverItem.current = index} onDragEnd={handleSubCategorySort} onDragOver={(e) => e.preventDefault()}
              className="p-4 border rounded-md space-y-3 bg-gray-50 cursor-grab">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <GripVertical className="h-5 w-5 text-gray-400 mr-2" />
                  <p className="font-semibold text-sm">Item {index + 1}</p>
                </div>
                <button onClick={() => handleDeleteSubCategory(index)} className="p-1 text-gray-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600">Texto</label>
                <input type="text" value={sub.title || sub.name} onChange={(e) => handleSubCategoryChange(index, 'name', e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-sm p-2 bg-white text-gray-900" />
              </div>
              <div className="flex items-end gap-2">
                <img src={sub.imageUrl} alt="preview" className="w-12 h-12 rounded border bg-white object-contain" />
                <div className="flex-grow">
                  <label className="block text-xs font-medium text-gray-600">Icono</label>
                  <label className="mt-1 cursor-pointer flex items-center justify-center gap-2 w-full border-gray-300 rounded-md shadow-sm text-sm p-2 bg-white border hover:bg-gray-50">
                    <Upload className="h-4 w-4 text-gray-500"/>
                    <span className="text-xs text-gray-600">Subir imagen</span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files && handleFileChange(e.target.files[0], (base64) => handleSubCategoryChange(index, 'imageUrl', base64))} />
                  </label>
                </div>
              </div>
            </div>
          ))}
          <button onClick={handleAddSubCategory} className="w-full flex items-center justify-center gap-2 p-2 mt-4 border-2 border-dashed rounded-md text-sm text-gray-600 hover:bg-gray-100 hover:border-gray-400">
            <Plus className="h-4 w-4" /> Añadir Subcategoría
          </button>
        </div>
      )}
    </div>
  );
};

export default HeaderEditor;
