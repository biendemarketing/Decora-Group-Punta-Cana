import React, { useState } from 'react';
import { QuoteConfig } from '../types';
import { Plus, Trash2, Settings, Tv, DoorClosed, Utensils } from 'lucide-react';
import ImageUploader from './ImageUploader';

interface QuoteEditorProps {
  quoteConfig: QuoteConfig;
  onQuoteConfigChange: (newConfig: QuoteConfig) => void;
}

type ActiveTab = 'general' | 'projectTypes' | 'tvWall' | 'closet' | 'kitchen';

const OptionListEditor = ({ title, options, onUpdate, optionType }: any) => {
    
    const inputClass = "w-full text-sm p-2 border border-gray-300 rounded bg-white text-gray-900 shadow-sm focus:ring-blue-500 focus:border-blue-500";

    const handleAdd = () => {
        const newItem: any = { id: crypto.randomUUID(), name: "Nuevo", price: 0, imageUrl: "https://via.placeholder.com/150" };
        if(optionType === 'closetType') newItem.value = 1;
        if(optionType === 'style' || optionType === 'countertop') newItem.multiplier = 1;
        onUpdate([...options, newItem]);
    };

    const handleDelete = (id: string) => {
        onUpdate(options.filter((opt: any) => opt.id !== id));
    };

    const handleChange = (id: string, field: string, value: any) => {
        onUpdate(options.map((opt: any) => opt.id === id ? {...opt, [field]: value} : opt));
    };

    return (
        <div className="space-y-4">
            <h4 className="text-md font-bold text-gray-800">{title}</h4>
            <div className="space-y-2">
                {options.map((option: any) => (
                    <div key={option.id} className="p-3 border rounded-md bg-gray-50 space-y-3">
                        <div className="flex justify-between items-center gap-2">
                            <input 
                                type="text" 
                                value={option.name} 
                                onChange={(e) => handleChange(option.id, 'name', e.target.value)} 
                                className={`flex-grow ${inputClass}`}
                            />
                            <button onClick={() => handleDelete(option.id)} className="p-1 text-gray-400 hover:text-red-500 flex-shrink-0"><Trash2 className="h-4 w-4"/></button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {'price' in option && <input type="number" value={option.price} onChange={(e) => handleChange(option.id, 'price', parseFloat(e.target.value) || 0)} className={inputClass} placeholder="Precio"/>}
                            {'multiplier' in option && <input type="number" step="0.1" value={option.multiplier} onChange={(e) => handleChange(option.id, 'multiplier', parseFloat(e.target.value) || 0)} className={inputClass} placeholder="Multiplicador"/>}
                            {'value' in option && <input type="number" value={option.value} onChange={(e) => handleChange(option.id, 'value', parseInt(e.target.value) || 0)} className={inputClass} placeholder="Capacidad"/>}
                        </div>
                        <ImageUploader imageUrl={option.imageUrl} onImageChange={(url) => handleChange(option.id, 'imageUrl', url)} isCompact/>
                    </div>
                ))}
            </div>
            <button onClick={handleAdd} className="text-sm p-2 border-dashed border-2 rounded w-full flex items-center justify-center gap-2 hover:bg-gray-100 text-gray-600 hover:text-gray-800"><Plus className="h-4 w-4"/>Añadir Opción</button>
        </div>
    );
}

const QuoteEditor: React.FC<QuoteEditorProps> = ({ quoteConfig, onQuoteConfigChange }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('general');
  
  const handleUpdate = (section: keyof QuoteConfig, data: any) => {
    onQuoteConfigChange({ ...quoteConfig, [section]: data });
  };
  
  const handleGeneralUpdate = (field: keyof QuoteConfig['general'], data: any) => {
     onQuoteConfigChange({ ...quoteConfig, general: {...quoteConfig.general, [field]: data}});
  };
  
  const TabButton = ({ id, label, icon: Icon }: { id: ActiveTab, label: string, icon: React.ElementType }) => (
    <button onClick={() => setActiveTab(id)} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 ${activeTab === id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
        <Icon className="h-5 w-5" /> {label}
    </button>
  );

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-800">Editor del Cotizador</h3>
      <div className="border-b flex space-x-2">
        <TabButton id="general" label="General" icon={Settings} />
        <TabButton id="projectTypes" label="Tipos de Proyecto" icon={Plus}/>
        <TabButton id="tvWall" label="TV Wall" icon={Tv}/>
        <TabButton id="closet" label="Closets" icon={DoorClosed}/>
        <TabButton id="kitchen" label="Cocinas" icon={Utensils}/>
      </div>
      <div className="p-4 bg-gray-50 rounded-b-lg border border-t-0">
        {activeTab === 'general' && (
            <div className="space-y-6">
                <OptionListEditor title="Opciones de Instalación" options={quoteConfig.general.installationOptions} onUpdate={(data:any) => handleGeneralUpdate('installationOptions', data)} />
                {/* Editor for payment options (simple text array) could be added here if needed */}
            </div>
        )}
         {activeTab === 'projectTypes' && <OptionListEditor title="Tipos de Proyectos para Cotizar" options={quoteConfig.projectTypes} onUpdate={(data:any) => handleUpdate('projectTypes', data)} />}
        {activeTab === 'tvWall' && <OptionListEditor title="Estilos de TV Wall" options={quoteConfig.tvWall.styles} onUpdate={(data:any) => handleUpdate('tvWall', {...quoteConfig.tvWall, styles: data})} />}
        {activeTab === 'closet' && (
            <div className="space-y-8">
                <OptionListEditor title="Tipos de Closet" options={quoteConfig.closet.types} onUpdate={(data:any) => handleUpdate('closet', {...quoteConfig.closet, types: data})} optionType="closetType" />
                <OptionListEditor title="Módulos de Closet" options={quoteConfig.closet.modules} onUpdate={(data:any) => handleUpdate('closet', {...quoteConfig.closet, modules: data})} />
                <OptionListEditor title="Accesorios de Closet" options={quoteConfig.closet.accessories} onUpdate={(data:any) => handleUpdate('closet', {...quoteConfig.closet, accessories: data})} />
            </div>
        )}
        {activeTab === 'kitchen' && (
             <div className="space-y-8">
                <OptionListEditor title="Tamaños de Cocina" options={quoteConfig.kitchen.sizes} onUpdate={(data:any) => handleUpdate('kitchen', {...quoteConfig.kitchen, sizes: data})} />
                <OptionListEditor title="Estilos de Cocina" options={quoteConfig.kitchen.styles} onUpdate={(data:any) => handleUpdate('kitchen', {...quoteConfig.kitchen, styles: data})} optionType="style" />
                <OptionListEditor title="Topes de Cocina" options={quoteConfig.kitchen.countertops} onUpdate={(data:any) => handleUpdate('kitchen', {...quoteConfig.kitchen, countertops: data})} optionType="countertop" />
                <OptionListEditor title="Fregaderos" options={quoteConfig.kitchen.sinks} onUpdate={(data:any) => handleUpdate('kitchen', {...quoteConfig.kitchen, sinks: data})} />
                <OptionListEditor title="Mezcladoras (Llaves)" options={quoteConfig.kitchen.faucets} onUpdate={(data:any) => handleUpdate('kitchen', {...quoteConfig.kitchen, faucets: data})} />
                <OptionListEditor title="Accesorios de Cocina" options={quoteConfig.kitchen.accessories} onUpdate={(data:any) => handleUpdate('kitchen', {...quoteConfig.kitchen, accessories: data})} />
            </div>
        )}
      </div>
    </div>
  );
};

export default QuoteEditor;