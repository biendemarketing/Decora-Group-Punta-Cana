import React, { useState, useRef } from 'react';
import { ServiceItem, QuoteType } from '../types';
import { GripVertical, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import ImageUploader from './ImageUploader';

interface ServicesEditorProps {
  services: ServiceItem[];
  onServicesChange: (newServices: ServiceItem[]) => void;
  quoteTypes: QuoteType[];
}

const ServicesEditor: React.FC<ServicesEditorProps> = ({ services, onServicesChange, quoteTypes }) => {
  const [openServiceId, setOpenServiceId] = useState<string | null>(services.length > 0 ? services[0].id : null);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleServiceChange = (id: string, field: keyof ServiceItem, value: string) => {
    const newServices = services.map(service => service.id === id ? { ...service, [field]: value } : service);
    onServicesChange(newServices);
  };

  const handleAddService = () => {
    const newService: ServiceItem = {
      id: crypto.randomUUID(),
      title: "Nuevo Servicio",
      description: "Descripción del nuevo servicio.",
      imageUrl: "https://via.placeholder.com/150",
      buttonText: "Cotizar",
      quoteType: quoteTypes[0]?.quoteType || ''
    };
    onServicesChange([...services, newService]);
    setOpenServiceId(newService.id);
  };

  const handleDeleteService = (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este servicio?")) {
      onServicesChange(services.filter(service => service.id !== id));
    }
  };

  const handleSort = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const newServices = [...services];
    const draggedItemContent = newServices.splice(dragItem.current, 1)[0];
    newServices.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    onServicesChange(newServices);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-800">Editor de Sección de Servicios</h3>
      <div className="space-y-2 border rounded-md p-2 bg-gray-50">
        {services.map((service, index) => (
          <div key={service.id}>
            <div 
              draggable 
              onDragStart={() => dragItem.current = index} 
              onDragEnter={() => dragOverItem.current = index} 
              onDragEnd={handleSort} 
              onDragOver={(e) => e.preventDefault()}
              className="flex items-center p-2 rounded-md shadow-sm bg-white border border-gray-200 cursor-grab"
            >
              <GripVertical className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
              <span className="flex-grow text-sm font-medium text-gray-900 truncate">{service.title}</span>
              <button onClick={() => setOpenServiceId(openServiceId === service.id ? null : service.id)} className="p-1 text-gray-500 hover:text-blue-600">
                {openServiceId === service.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              <button onClick={() => handleDeleteService(service.id)} className="p-1 text-gray-400 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            {openServiceId === service.id && (
              <div className="p-4 border-x border-b border-gray-200 bg-white space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Título</label>
                  <input type="text" value={service.title} onChange={(e) => handleServiceChange(service.id, 'title', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm text-sm p-2 bg-white text-gray-900"/>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Descripción</label>
                  <textarea value={service.description} onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)} rows={3} className="w-full border-gray-300 rounded-md shadow-sm text-sm p-2 bg-white text-gray-900"/>
                </div>
                 <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Texto del Botón</label>
                  <input type="text" value={service.buttonText} onChange={(e) => handleServiceChange(service.id, 'buttonText', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm text-sm p-2 bg-white text-gray-900"/>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Enlazar a Cotizador</label>
                  <select value={service.quoteType} onChange={(e) => handleServiceChange(service.id, 'quoteType', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm text-sm p-2 bg-white text-gray-900">
                     {quoteTypes.map(type => <option key={type.id} value={type.quoteType}>{type.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Imagen</label>
                  <ImageUploader imageUrl={service.imageUrl} onImageChange={(url) => handleServiceChange(service.id, 'imageUrl', url)} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={handleAddService} className="w-full flex items-center justify-center gap-2 p-2 mt-2 border-2 border-dashed rounded-md text-sm text-gray-600 hover:bg-gray-100 hover:border-gray-400">
        <Plus className="h-4 w-4" /> Añadir Servicio
      </button>
    </div>
  );
};

export default ServicesEditor;