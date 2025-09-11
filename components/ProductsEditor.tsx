import React, { useState, useMemo } from 'react';
import { Product, NavigationData } from '../types';
import { Plus, Edit, Trash2, Search, Percent, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import ToggleSwitch from './ToggleSwitch';
import ImageUploader from './ImageUploader';
import { rawProducts, ALL_FINISHES } from '../constants'; 
import { processProducts } from '../App';

const ALL_MATERIALS = [...new Set(rawProducts.flatMap(p => p.materials))].sort();
const ALL_COLORS = [...new Set(rawProducts.flatMap(p => p.colors))].sort();
const ALL_SET_TYPES = [...new Set(rawProducts.map(p => p.setType).filter(Boolean))];

interface ProductsEditorProps {
  products: Product[];
  onProductsChange: (newProducts: Product[]) => void;
  navigationData: NavigationData;
}

const ProductsEditor: React.FC<ProductsEditorProps> = ({ products, onProductsChange, navigationData }) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceIncrease, setPriceIncrease] = useState('');
  const [priceDiscount, setPriceDiscount] = useState('');

  const subcategoriesForSelectedCategory = useMemo(() => {
    if (!editingProduct?.category) return [];
    const menuItem = navigationData.menuItems.find(item => item.title === editingProduct.category);
    return menuItem?.subCategories || [];
  }, [editingProduct?.category, navigationData.menuItems]);


  const filteredProducts = useMemo(() => {
    return products.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);
  
  const handleCreateNew = () => {
    setEditingProduct({
      id: Date.now(),
      name: '',
      description: '',
      price: 0,
      category: navigationData.menuItems[0]?.title || '',
      subcategory: '',
      dimensions: { width: 0, height: 0, depth: 0 },
      imageUrl: 'https://via.placeholder.com/400x300',
      images: [],
      materials: [],
      colors: [],
      finish: [],
      rating: 0,
      reviews: 0,
      hint: '',
      deliveryTime: 0,
      isVisible: true,
      isAvailable: true,
      hidePrice: false,
    });
    setIsFormOpen(true);
  };
  
  const handleEdit = (product: Product) => {
    setEditingProduct(JSON.parse(JSON.stringify(product)));
    setIsFormOpen(true);
  };

  const handleDelete = (productId: number) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      onProductsChange(products.filter(p => p.id !== productId));
    }
  };

  const handleSave = () => {
    if (!editingProduct) return;
    const exists = products.some(p => p.id === editingProduct.id);
    if (exists) {
      onProductsChange(products.map(p => p.id === editingProduct.id ? editingProduct : p));
    } else {
      onProductsChange([...products, editingProduct]);
    }
    setEditingProduct(null);
    setIsFormOpen(false);
  };
  
  const handleCancel = () => {
    setEditingProduct(null);
    setIsFormOpen(false);
  };

  const handleToggle = (productId: number, field: 'isVisible' | 'isAvailable' | 'hidePrice') => {
    onProductsChange(products.map(p => p.id === productId ? { ...p, [field]: !p[field] } : p));
  };
  
  const handleFieldChange = (field: keyof Product, value: any) => {
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [field]: value });
    }
  };

   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (editingProduct) {
        setEditingProduct(prev => ({
            ...prev!,
            category: e.target.value,
            subcategory: '', // Reset subcategory when category changes
        }));
    }
  };

  const handleDimensionChange = (dim: 'width' | 'height' | 'depth', value: string) => {
    if (editingProduct) {
        const newDimensions = {
            ...(editingProduct.dimensions || { width: 0, height: 0, depth: 0 }),
            [dim]: parseInt(value) || 0,
        };
        setEditingProduct({ ...editingProduct, dimensions: newDimensions });
    }
  };
  
  const handleMultiSelectChange = (field: 'materials' | 'colors' | 'finish', value: string) => {
    if (!editingProduct) return;
    const currentValues = (editingProduct[field] as string[] | undefined) || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    handleFieldChange(field, newValues);
  };
  
  const handleApplyPriceIncrease = () => {
    const percentage = parseFloat(priceIncrease);
    if (isNaN(percentage) || percentage <= 0) {
      alert("Por favor, introduce un porcentaje válido.");
      return;
    }
    if(window.confirm(`¿Seguro que quieres aumentar el precio de TODOS los productos en un ${percentage}%?`)) {
        const newProducts = products.map(p => ({
            ...p,
            price: parseFloat((p.price * (1 + percentage / 100)).toFixed(2))
        }));
        onProductsChange(newProducts);
        setPriceIncrease('');
    }
  };

  const handleApplyDiscount = () => {
    const percentage = parseFloat(priceDiscount);
    if (isNaN(percentage) || percentage <= 0 || percentage > 100) {
        alert("Por favor, introduce un porcentaje de descuento válido (1-100).");
        return;
    }
    if(window.confirm(`¿Seguro que quieres aplicar un descuento del ${percentage}% a TODOS los productos?`)) {
        const newProducts = products.map(p => ({
            ...p,
            price: parseFloat((p.price * (1 - percentage / 100)).toFixed(2))
        }));
        onProductsChange(newProducts);
        setPriceDiscount('');
    }
  };
  
  const handleRestorePrices = () => {
    if(window.confirm("¿Estás seguro de que quieres restaurar los precios originales de TODOS los productos? Esta acción no se puede deshacer.")) {
        const originalProducts = processProducts(rawProducts);
        const originalPriceMap = new Map(originalProducts.map(p => [p.id, p.price]));
        
        const restoredProducts = products.map(p => {
            const originalPrice = originalPriceMap.get(p.id);
            return {
                ...p,
                price: originalPrice !== undefined ? originalPrice : p.price,
            };
        });
        
        onProductsChange(restoredProducts);
    }
  };


  const FormView = () => {
    if (!editingProduct) return null;
    const inputClass = "w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500 shadow-sm";
    const images = editingProduct.images || []; // Guard against undefined images array
    
    return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800">{products.some(p => p.id === editingProduct.id) ? 'Editar Producto' : 'Crear Producto'}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" placeholder="Nombre del producto" value={editingProduct.name} onChange={e => handleFieldChange('name', e.target.value)} className={`md:col-span-2 ${inputClass}`}/>
          <textarea placeholder="Descripción" value={editingProduct.description} onChange={e => handleFieldChange('description', e.target.value)} className={`md:col-span-2 ${inputClass}`} rows={3}/>
          <input type="text" placeholder="SKU" value={editingProduct.sku || ''} onChange={e => handleFieldChange('sku', e.target.value)} className={inputClass}/>
          <input type="number" placeholder="Tiempo de entrega (días)" value={editingProduct.deliveryTime} onChange={e => handleFieldChange('deliveryTime', parseInt(e.target.value) || 0)} className={inputClass}/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="number" placeholder="Precio" value={editingProduct.price} onChange={e => handleFieldChange('price', parseFloat(e.target.value) || 0)} className={inputClass}/>
          <input type="number" placeholder="Precio Anterior (Oferta)" value={editingProduct.oldPrice || ''} onChange={e => handleFieldChange('oldPrice', parseFloat(e.target.value) || 0)} className={inputClass}/>
      </div>
      <div className="flex justify-around items-center bg-gray-50 p-3 rounded-md">
        <ToggleSwitch label="Visible en tienda" checked={!!editingProduct.isVisible} onChange={() => handleFieldChange('isVisible', !editingProduct.isVisible)} />
        <ToggleSwitch label="Disponible" checked={!!editingProduct.isAvailable} onChange={() => handleFieldChange('isAvailable', !editingProduct.isAvailable)} />
        <ToggleSwitch label="Ocultar Precio" checked={!!editingProduct.hidePrice} onChange={() => handleFieldChange('hidePrice', !editingProduct.hidePrice)} />
        <ToggleSwitch label="Luz LED" checked={!!editingProduct.ledLighting} onChange={() => handleFieldChange('ledLighting', !editingProduct.ledLighting)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <select value={editingProduct.category} onChange={handleCategoryChange} className={inputClass}>
            {navigationData.menuItems.filter(i => i.subCategories.length > 0 && !['proyectos', 'cotizar'].includes(i.key)).map(i => <option key={i.key} value={i.title}>{i.title}</option>)}
        </select>
        <select value={editingProduct.subcategory || ''} onChange={e => handleFieldChange('subcategory', e.target.value)} className={inputClass} disabled={subcategoriesForSelectedCategory.length === 0}>
          <option value="">Seleccionar subcategoría...</option>
          {subcategoriesForSelectedCategory.map(sub => <option key={sub.id} value={sub.name}>{sub.name}</option>)}
        </select>
        <select value={editingProduct.setType || ''} onChange={e => handleFieldChange('setType', e.target.value)} className={`${inputClass} md:col-span-2`}>
            <option value="">Tipo de Juego...</option>
            {ALL_SET_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
       <div>
        <h4 className="font-semibold mb-2 text-gray-800">Dimensiones (cm)</h4>
        <div className="grid grid-cols-3 gap-4">
            <input type="number" placeholder="Ancho" value={editingProduct.dimensions?.width || ''} onChange={e => handleDimensionChange('width', e.target.value)} className={inputClass}/>
            <input type="number" placeholder="Alto" value={editingProduct.dimensions?.height || ''} onChange={e => handleDimensionChange('height', e.target.value)} className={inputClass}/>
            <input type="number" placeholder="Profundidad" value={editingProduct.dimensions?.depth || ''} onChange={e => handleDimensionChange('depth', e.target.value)} className={inputClass}/>
        </div>
      </div>
      <div>
        <h4 className="font-semibold mb-2 text-gray-800">Materiales</h4>
        <div className="grid grid-cols-3 gap-2 p-2 border rounded max-h-32 overflow-y-auto">
            {ALL_MATERIALS.map(m => (
              <label key={m} className="flex items-center text-sm text-gray-800"><input type="checkbox" checked={(editingProduct.materials || []).includes(m)} onChange={() => handleMultiSelectChange('materials', m)} className="mr-2"/>{m}</label>
            ))}
        </div>
      </div>
       <div>
        <h4 className="font-semibold mb-2 text-gray-800">Colores</h4>
        <div className="grid grid-cols-3 gap-2 p-2 border rounded max-h-32 overflow-y-auto">
            {ALL_COLORS.map(c => (
              <label key={c} className="flex items-center text-sm text-gray-800"><input type="checkbox" checked={(editingProduct.colors || []).includes(c)} onChange={() => handleMultiSelectChange('colors', c)} className="mr-2"/>{c}</label>
            ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold mb-2 text-gray-800">Acabados</h4>
        <div className="grid grid-cols-3 gap-2 p-2 border rounded max-h-32 overflow-y-auto">
            {ALL_FINISHES.map(f => (
              <label key={f} className="flex items-center text-sm text-gray-800"><input type="checkbox" checked={(editingProduct.finish || []).includes(f)} onChange={() => handleMultiSelectChange('finish', f)} className="mr-2"/>{f}</label>
            ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold mb-2 text-gray-800">Imagen Destacada</h4>
        <ImageUploader imageUrl={editingProduct.imageUrl} onImageChange={url => handleFieldChange('imageUrl', url)}/>
      </div>
       <div>
        <h4 className="font-semibold mb-2 text-gray-800">Galería de Imágenes</h4>
        <div className="space-y-2">
            {images.map((img, index) => (
                <div key={index} className="flex items-center gap-2">
                    <ImageUploader imageUrl={img} onImageChange={url => { const imgs=[...images]; imgs[index]=url; handleFieldChange('images', imgs);}} isCompact/>
                    <button onClick={() => handleFieldChange('images', images.filter((_, i) => i !== index))} className="p-1 text-gray-400 hover:text-red-500"><Trash2 className="h-4 w-4"/></button>
                </div>
            ))}
            <button onClick={() => handleFieldChange('images', [...images, 'https://via.placeholder.com/400x300'])} className="text-sm p-2 border-dashed border-2 rounded w-full">Añadir imagen</button>
        </div>
      </div>
      <div className="flex justify-end gap-4 border-t pt-4">
        <button onClick={handleCancel} className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300">Cancelar</button>
        <button onClick={handleSave} className="px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">Guardar Producto</button>
      </div>
    </div>
  )};

  const ListView = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">Gestionar Productos</h3>
        <button onClick={handleCreateNew} className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4" /> Crear Producto
        </button>
      </div>
      <div className="p-4 bg-gray-50 rounded-md border grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="text-sm font-semibold text-gray-700">Aumento de Precio Global</label>
            <div className="flex items-center gap-2 mt-1">
                <input type="number" value={priceIncrease} onChange={e => setPriceIncrease(e.target.value)} placeholder="Ej: 5" className="p-2 border rounded w-24 bg-white text-gray-900"/>
                <Percent className="h-5 w-5 text-gray-500"/>
                <button onClick={handleApplyPriceIncrease} className="px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Aplicar</button>
            </div>
        </div>
        <div>
            <label className="text-sm font-semibold text-gray-700">Descuento de Precio Global</label>
            <div className="flex items-center gap-2 mt-1">
                <input type="number" value={priceDiscount} onChange={e => setPriceDiscount(e.target.value)} placeholder="Ej: 10" className="p-2 border rounded w-24 bg-white text-gray-900"/>
                <Percent className="h-5 w-5 text-gray-500"/>
                <button onClick={handleApplyDiscount} className="px-4 py-2 text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700">Aplicar</button>
            </div>
        </div>
        <div className="md:col-span-2 border-t pt-4">
             <button onClick={handleRestorePrices} className="w-full px-4 py-2 text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700">Restaurar Precios Originales</button>
        </div>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input type="text" placeholder="Buscar por nombre o SKU..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full p-2 pl-10 border rounded-md bg-white text-gray-900"/>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
            <thead className="bg-gray-100">
                <tr className="text-xs text-gray-600 uppercase">
                    <th className="p-2">Producto</th><th className="p-2">Precio</th><th className="p-2 text-center">Visible</th><th className="p-2 text-center">Disponible</th><th className="p-2">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {filteredProducts.map(p => (
                    <tr key={p.id} className="border-b hover:bg-gray-50">
                        <td className="p-2 flex items-center gap-2"><img src={p.imageUrl} className="h-10 w-10 object-cover rounded"/> <div><p className="font-semibold text-gray-900">{p.name}</p><p className="text-xs text-gray-500">SKU: {p.sku}</p></div></td>
                        <td className="p-2 font-mono text-gray-900">{p.hidePrice ? 'Oculto' : `$${p.price.toFixed(2)}`}</td>
                        <td className="p-2 text-center"><button onClick={() => handleToggle(p.id, 'isVisible')}>{p.isVisible ? <Eye className="h-5 w-5 text-green-500 mx-auto"/> : <EyeOff className="h-5 w-5 text-gray-400 mx-auto"/>}</button></td>
                        <td className="p-2 text-center"><button onClick={() => handleToggle(p.id, 'isAvailable')}>{p.isAvailable ? <CheckCircle className="h-5 w-5 text-green-500 mx-auto"/> : <XCircle className="h-5 w-5 text-red-500 mx-auto"/>}</button></td>
                        <td className="p-2">
                            <button onClick={() => handleEdit(p)} className="p-1 text-gray-500 hover:text-blue-600"><Edit className="h-4 w-4"/></button>
                            <button onClick={() => handleDelete(p.id)} className="p-1 text-gray-500 hover:text-red-600"><Trash2 className="h-4 w-4"/></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
  
  return isFormOpen && editingProduct ? <FormView /> : <ListView />;
};

export default ProductsEditor;
