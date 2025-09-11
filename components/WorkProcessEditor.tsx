import React, { useRef } from 'react';
import { WorkProcessSection, WorkProcessStep } from '../types';
import ImageUploader from './ImageUploader';
import IconSelector from './IconSelector';
import { GripVertical, Plus, Trash2 } from 'lucide-react';

interface WorkProcessEditorProps {
  workProcessSection: WorkProcessSection;
  onSectionChange: (newSection: WorkProcessSection) => void;
}

const WorkProcessEditor: React.FC<WorkProcessEditorProps> = ({ workProcessSection, onSectionChange }) => {
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleFieldChange = (field: keyof WorkProcessSection, value: any) => {
    onSectionChange({ ...workProcessSection, [field]: value });
  };

  const handleStepChange = (id: string, field: keyof WorkProcessStep, value: string) => {
    const newSteps = workProcessSection.steps.map(step =>
      step.id === id ? { ...step, [field]: value } : step
    );
    handleFieldChange('steps', newSteps);
  };

  const handleAddStep = () => {
    const newStep: WorkProcessStep = {
      id: crypto.randomUUID(),
      title: 'Nuevo Paso',
      description: 'Descripción del nuevo paso.',
      icon: 'FileText',
    };
    handleFieldChange('steps', [...workProcessSection.steps, newStep]);
  };

  const handleDeleteStep = (id: string) => {
    if (window.confirm("¿Seguro que quieres eliminar este paso?")) {
      handleFieldChange('steps', workProcessSection.steps.filter(s => s.id !== id));
    }
  };

  const handleSort = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const newSteps = [...workProcessSection.steps];
    const draggedItemContent = newSteps.splice(dragItem.current, 1)[0];
    newSteps.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    onSectionChange({ ...workProcessSection, steps: newSteps });
  };
  
  const inputClass = "w-full text-sm p-2 border border-gray-300 rounded bg-white text-gray-900 shadow-sm focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-800">Editor de "Proceso de Trabajo"</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Título de la Sección</label>
        <input type="text" value={workProcessSection.title} onChange={(e) => handleFieldChange('title', e.target.value)} className={inputClass} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Imagen de Fondo</label>
        <ImageUploader imageUrl={workProcessSection.backgroundImageUrl} onImageChange={(url) => handleFieldChange('backgroundImageUrl', url)} />
      </div>

      <div className="space-y-3">
        <h4 className="text-md font-semibold text-gray-700">Pasos del Proceso</h4>
        {workProcessSection.steps.map((step, index) => (
          <div key={step.id} draggable onDragStart={() => dragItem.current = index} onDragEnter={() => dragOverItem.current = index} onDragEnd={handleSort} onDragOver={(e) => e.preventDefault()}
            className="p-3 border rounded-md bg-gray-50 space-y-3 cursor-grab"
          >
            <div className="flex items-center gap-2">
              <GripVertical className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <input type="text" value={step.title} onChange={(e) => handleStepChange(step.id, 'title', e.target.value)} className={`flex-grow ${inputClass}`} />
              <button onClick={() => handleDeleteStep(step.id)} className="p-1 text-gray-400 hover:text-red-500 flex-shrink-0"><Trash2 className="h-4 w-4"/></button>
            </div>
            <textarea value={step.description} onChange={(e) => handleStepChange(step.id, 'description', e.target.value)} rows={2} className={inputClass} />
            <IconSelector selectedIcon={step.icon} onIconChange={(icon) => handleStepChange(step.id, 'icon', icon)} />
          </div>
        ))}
        <button onClick={handleAddStep} className="text-sm p-2 border-dashed border-2 rounded w-full flex items-center justify-center gap-2 hover:bg-gray-100 text-gray-600 hover:text-gray-800">
          <Plus className="h-4 w-4" /> Añadir Paso
        </button>
      </div>
    </div>
  );
};

export default WorkProcessEditor;