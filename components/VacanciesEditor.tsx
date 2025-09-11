import React, { useState } from 'react';
import { NavigationData, JobVacancy } from '../types';
import { Plus, Edit, Trash2 } from 'lucide-react';
import IconSelector from './IconSelector';

interface VacanciesEditorProps {
  navigationData: NavigationData;
  onNavigationChange: (newData: NavigationData) => void;
}

const VacanciesEditor: React.FC<VacanciesEditorProps> = ({ navigationData, onNavigationChange }) => {
  const [editingVacancy, setEditingVacancy] = useState<JobVacancy | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // FIX: Find 'about-us' page from customPages array.
  const aboutUsPage = navigationData.customPages.find(p => p.slug === 'about-us');

  // FIX: Add check to ensure the aboutUsPage was found.
  if (!aboutUsPage) {
    return <div className="p-4 bg-red-100 text-red-800 rounded-md">Error: La página "Nosotros" (slug: 'about-us') no fue encontrada.</div>;
  }

  // FIX: Find hiring section within the found aboutUsPage.
  const hiringSectionIndex = aboutUsPage.sections.findIndex(s => s.type === 'hiring');
  if (hiringSectionIndex === -1) {
    return <div className="p-4 bg-red-100 text-red-800 rounded-md">Error: No se encontró la sección 'hiring' en la configuración de la página "Nosotros".</div>;
  }
  const hiringSection = aboutUsPage.sections[hiringSectionIndex];
  const vacancies = hiringSection.content.vacancies || [];

  // FIX: Correctly update vacancies within the nested customPages structure.
  const updateVacancies = (newVacancies: JobVacancy[]) => {
    const newSections = [...aboutUsPage.sections];
    newSections[hiringSectionIndex] = {
      ...hiringSection,
      content: {
        ...hiringSection.content,
        vacancies: newVacancies,
      },
    };
    
    const updatedAboutUsPage = {
        ...aboutUsPage,
        sections: newSections,
    };

    const newCustomPages = navigationData.customPages.map(p =>
        p.id === aboutUsPage.id ? updatedAboutUsPage : p
    );

    onNavigationChange({
      ...navigationData,
      customPages: newCustomPages,
    });
  };

  const handleCreateNew = () => {
    setEditingVacancy({
      id: crypto.randomUUID(),
      title: '',
      icon: 'Briefcase',
      summary: '',
      location: 'Punta Cana',
      type: 'Jornada Completa',
      description: [],
      responsibilities: [],
      requirements: [],
    });
    setIsFormOpen(true);
  };

  const handleEdit = (vacancy: JobVacancy) => {
    setEditingVacancy(JSON.parse(JSON.stringify(vacancy)));
    setIsFormOpen(true);
  };

  const handleDelete = (vacancyId: string) => {
    if (window.confirm("¿Seguro que quieres eliminar esta vacante?")) {
      updateVacancies(vacancies.filter(v => v.id !== vacancyId));
    }
  };

  const handleSave = () => {
    if (!editingVacancy) return;
    const exists = vacancies.some(v => v.id === editingVacancy.id);
    const newVacancies = exists
      ? vacancies.map(v => v.id === editingVacancy.id ? editingVacancy : v)
      : [...vacancies, editingVacancy];
    updateVacancies(newVacancies);
    setEditingVacancy(null);
    setIsFormOpen(false);
  };
  
  const handleCancel = () => {
    setEditingVacancy(null);
    setIsFormOpen(false);
  };
  
  const handleFieldChange = (field: keyof JobVacancy, value: any) => {
    if (editingVacancy) {
      setEditingVacancy({ ...editingVacancy, [field]: value });
    }
  };

  const handleArrayFieldChange = (field: 'description' | 'responsibilities' | 'requirements', value: string) => {
    handleFieldChange(field, value.split('\n').filter(line => line.trim() !== ''));
  };

  const FormView = () => {
    if (!editingVacancy) return null;
    const inputClass = "w-full text-sm p-2 border border-gray-300 rounded bg-white text-gray-900 shadow-sm focus:ring-blue-500 focus:border-blue-500";
    
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800">{vacancies.some(v => v.id === editingVacancy.id) ? 'Editar Vacante' : 'Crear Vacante'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Título de la vacante" value={editingVacancy.title} onChange={e => handleFieldChange('title', e.target.value)} className={`md:col-span-2 ${inputClass}`}/>
            <textarea placeholder="Resumen corto" value={editingVacancy.summary} onChange={e => handleFieldChange('summary', e.target.value)} rows={2} className={`md:col-span-2 ${inputClass}`}/>
            
            <select value={editingVacancy.type} onChange={e => handleFieldChange('type', e.target.value)} className={inputClass}>
                <option value="Jornada Completa">Jornada Completa</option>
                <option value="Media Jornada">Media Jornada</option>
                <option value="Pasantía">Pasantía</option>
            </select>
            <input type="text" placeholder="Ubicación" value={editingVacancy.location} onChange={e => handleFieldChange('location', e.target.value)} className={inputClass}/>
            <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Icono</label>
                <IconSelector selectedIcon={editingVacancy.icon} onIconChange={icon => handleFieldChange('icon', icon)} />
            </div>
        </div>
        
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción (un párrafo por línea)</label>
            <textarea value={editingVacancy.description.join('\n')} onChange={e => handleArrayFieldChange('description', e.target.value)} rows={4} className={inputClass}/>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Responsabilidades (un punto por línea)</label>
            <textarea value={editingVacancy.responsibilities.join('\n')} onChange={e => handleArrayFieldChange('responsibilities', e.target.value)} rows={5} className={inputClass}/>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Requisitos (un punto por línea)</label>
            <textarea value={editingVacancy.requirements.join('\n')} onChange={e => handleArrayFieldChange('requirements', e.target.value)} rows={5} className={inputClass}/>
        </div>

        <div className="flex justify-end gap-4 border-t pt-4">
            <button onClick={handleCancel} className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300">Cancelar</button>
            <button onClick={handleSave} className="px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">Guardar Vacante</button>
        </div>
      </div>
    );
  };
  
  const ListView = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">Gestionar Vacantes</h3>
        <button onClick={handleCreateNew} className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4" /> Crear Vacante
        </button>
      </div>
      <div className="space-y-2 border rounded-md p-2 bg-gray-50">
        {vacancies.length > 0 ? vacancies.map(v => (
          <div key={v.id} className="flex items-center p-2 rounded-md bg-white border border-gray-200 shadow-sm">
            <div className="flex-grow">
              <p className="text-sm font-semibold text-gray-900">{v.title}</p>
              <p className="text-xs text-gray-500">{v.location} - {v.type}</p>
            </div>
            <button onClick={() => handleEdit(v)} className="p-2 text-gray-500 hover:text-blue-600"><Edit className="h-4 w-4" /></button>
            <button onClick={() => handleDelete(v.id)} className="p-2 text-gray-500 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
          </div>
        )) : (
          <p className="text-center text-gray-500 p-4">No hay vacantes activas.</p>
        )}
      </div>
    </div>
  );

  return isFormOpen ? <FormView /> : <ListView />;
};

export default VacanciesEditor;
