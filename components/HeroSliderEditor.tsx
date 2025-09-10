import React, { useState, useRef } from 'react';
import { HeroSlide, HeroButton } from '../types';
import { PREDEFINED_LINKS } from '../constants';
import ImageUploader from './ImageUploader';
import { GripVertical, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface HeroSliderEditorProps {
  slides: HeroSlide[];
  onSlidesChange: (newSlides: HeroSlide[]) => void;
}

const availableIcons = ['Calculator', 'Eye', 'Wrench', 'Users', 'Phone', 'Default'];

const HeroSliderEditor: React.FC<HeroSliderEditorProps> = ({ slides, onSlidesChange }) => {
  const [openSlideId, setOpenSlideId] = useState<string | null>(slides.length > 0 ? slides[0].id : null);
  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);

  const handleSlideChange = (id: string, field: keyof HeroSlide, value: any) => {
    const newSlides = slides.map(slide => slide.id === id ? { ...slide, [field]: value } : slide);
    onSlidesChange(newSlides);
  };

  const handleAddSlide = () => {
    const newSlide: HeroSlide = {
      id: crypto.randomUUID(),
      title: "Nuevo Título",
      subtitle: "Nuevo subtítulo para la diapositiva.",
      imageUrl: "https://via.placeholder.com/1920x1080",
      buttons: [],
    };
    onSlidesChange([...slides, newSlide]);
    setOpenSlideId(newSlide.id);
  };

  const handleDeleteSlide = (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta diapositiva?")) {
      onSlidesChange(slides.filter(slide => slide.id !== id));
    }
  };

  const handleSlideSort = () => {
    const newSlides = [...slides];
    const draggedItemContent = newSlides.splice(dragItem.current, 1)[0];
    newSlides.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    onSlidesChange(newSlides);
  };

  const handleButtonChange = (slideId: string, buttonId: string, field: keyof HeroButton, value: any) => {
    const newSlides = slides.map(slide => {
      if (slide.id === slideId) {
        const newButtons = slide.buttons.map(button => 
          button.id === buttonId ? { ...button, [field]: value } : button
        );
        return { ...slide, buttons: newButtons };
      }
      return slide;
    });
    onSlidesChange(newSlides);
  };

  const handleAddButton = (slideId: string) => {
    const newButton: HeroButton = {
      id: crypto.randomUUID(),
      text: "Botón",
      link: PREDEFINED_LINKS[0].key,
      style: 'primary',
      icon: 'Default',
    };
    const newSlides = slides.map(slide => 
      slide.id === slideId ? { ...slide, buttons: [...slide.buttons, newButton] } : slide
    );
    onSlidesChange(newSlides);
  };

  const handleDeleteButton = (slideId: string, buttonId: string) => {
     const newSlides = slides.map(slide => {
      if (slide.id === slideId) {
        return { ...slide, buttons: slide.buttons.filter(b => b.id !== buttonId) };
      }
      return slide;
    });
    onSlidesChange(newSlides);
  };


  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-800">Editor de Diapositivas</h3>
      <div className="space-y-2 border rounded-md p-2 bg-gray-50">
        {slides.map((slide, index) => (
          <div key={slide.id}>
            <div 
              draggable 
              onDragStart={() => dragItem.current = index} 
              onDragEnter={() => dragOverItem.current = index} 
              onDragEnd={handleSlideSort} 
              onDragOver={(e) => e.preventDefault()}
              className="flex items-center p-2 rounded-md shadow-sm bg-white border border-gray-200 cursor-grab"
            >
              <GripVertical className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
              <span className="flex-grow text-sm font-medium text-gray-900 truncate">{slide.title}</span>
              <button onClick={() => setOpenSlideId(openSlideId === slide.id ? null : slide.id)} className="p-1 text-gray-500 hover:text-blue-600">
                {openSlideId === slide.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              <button onClick={() => handleDeleteSlide(slide.id)} className="p-1 text-gray-400 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            {openSlideId === slide.id && (
              <div className="p-4 border-x border-b border-gray-200 bg-white space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Título</label>
                  <input type="text" value={slide.title} onChange={(e) => handleSlideChange(slide.id, 'title', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm text-sm p-2 bg-white text-gray-900"/>
                </div>
                 <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Subtítulo</label>
                  <input type="text" value={slide.subtitle} onChange={(e) => handleSlideChange(slide.id, 'subtitle', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm text-sm p-2 bg-white text-gray-900"/>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Imagen de Fondo</label>
                  <ImageUploader imageUrl={slide.imageUrl} onImageChange={(url) => handleSlideChange(slide.id, 'imageUrl', url)} />
                </div>
                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold mb-2">Botones</h4>
                  <div className="space-y-3">
                    {slide.buttons.map(button => (
                      <div key={button.id} className="p-3 border rounded-md bg-gray-50 space-y-2">
                         <div className="flex justify-between items-center">
                            <p className="text-xs font-medium text-gray-600">Botón</p>
                            <button onClick={() => handleDeleteButton(slide.id, button.id)} className="p-1 text-gray-400 hover:text-red-600"><Trash2 className="h-4 w-4"/></button>
                         </div>
                         <input type="text" placeholder="Texto del botón" value={button.text} onChange={(e) => handleButtonChange(slide.id, button.id, 'text', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm text-sm p-2"/>
                         <select value={button.link} onChange={(e) => handleButtonChange(slide.id, button.id, 'link', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm text-sm p-2">
                            {PREDEFINED_LINKS.map(link => <option key={link.key} value={link.key}>{link.label}</option>)}
                         </select>
                         <div className="grid grid-cols-2 gap-2">
                             <select value={button.style} onChange={(e) => handleButtonChange(slide.id, button.id, 'style', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm text-sm p-2">
                                <option value="primary">Primario</option>
                                <option value="secondary">Secundario</option>
                             </select>
                             <select value={button.icon} onChange={(e) => handleButtonChange(slide.id, button.id, 'icon', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm text-sm p-2">
                                {availableIcons.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                             </select>
                         </div>
                      </div>
                    ))}
                    {slide.buttons.length < 2 && (
                      <button onClick={() => handleAddButton(slide.id)} className="w-full flex items-center justify-center gap-2 p-2 mt-2 border-2 border-dashed rounded-md text-sm text-gray-600 hover:bg-gray-100 hover:border-gray-400">
                        <Plus className="h-4 w-4" /> Añadir Botón
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={handleAddSlide} className="w-full flex items-center justify-center gap-2 p-2 mt-2 border-2 border-dashed rounded-md text-sm text-gray-600 hover:bg-gray-100 hover:border-gray-400">
        <Plus className="h-4 w-4" /> Añadir Diapositiva
      </button>
    </div>
  );
};

export default HeroSliderEditor;