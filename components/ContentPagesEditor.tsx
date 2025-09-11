
import React, { useState } from 'react';
import { NavigationData, Page, FAQItem, LegalPage, PageSection, TeamMember, CompanyValue, TimelineEvent, JobVacancy, SectionType, ContactContent } from '../types';
import { FileText, HelpCircle, Building, Plus, Trash2, GripVertical, Edit, Phone } from 'lucide-react';
import ImageUploader from './ImageUploader';
import IconSelector from './IconSelector';

interface ContentPagesEditorProps {
  navigationData: NavigationData;
  onNavigationChange: (newData: NavigationData) => void;
}

type ActiveTab = 'about' | 'faq' | 'legal' | 'contact';

const inputClass = "w-full text-sm p-2 border border-gray-300 rounded bg-white text-gray-900 shadow-sm focus:ring-blue-500 focus:border-blue-500";
const textareaClass = `${inputClass} h-24`;

const ListEditor = ({ items, onUpdate, renderItem, newItem, title, noun }: any) => {
    const handleUpdateItem = (id: string, newContent: any) => {
        onUpdate(items.map((item: any) => item.id === id ? { ...item, ...newContent } : item));
    };

    const handleAddItem = () => {
        onUpdate([...items, { ...newItem, id: crypto.randomUUID() }]);
    };

    const handleDeleteItem = (id: string) => {
        if (window.confirm(`¿Seguro que quieres eliminar este elemento?`)) {
            onUpdate(items.filter((item: any) => item.id !== id));
        }
    };
    
    const dragItem = React.useRef<number | null>(null);
    const dragOverItem = React.useRef<number | null>(null);
    const handleSort = () => {
        if (dragItem.current === null || dragOverItem.current === null) return;
        const newItems = [...items];
        const draggedItemContent = newItems.splice(dragItem.current, 1)[0];
        newItems.splice(dragOverItem.current, 0, draggedItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        onUpdate(newItems);
    };

    return (
        <div className="space-y-3">
            <h4 className="text-md font-semibold text-gray-800">{title}</h4>
            <div className="space-y-2">
                {items.map((item: any, index: number) => (
                    <div key={item.id} className="p-3 border rounded-md bg-white shadow-sm" draggable onDragStart={() => dragItem.current = index} onDragEnter={() => dragOverItem.current = index} onDragEnd={handleSort} onDragOver={(e) => e.preventDefault()}>
                        <div className="flex items-start gap-2">
                            <GripVertical className="h-5 w-5 text-gray-400 mt-1 cursor-grab flex-shrink-0" />
                            <div className="flex-grow">{renderItem(item, (updatedContent: any) => handleUpdateItem(item.id, updatedContent))}</div>
                            <button onClick={() => handleDeleteItem(item.id)} className="p-1 text-gray-400 hover:text-red-500"><Trash2 className="h-4 w-4"/></button>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={handleAddItem} className="w-full flex items-center justify-center gap-2 p-2 border-2 border-dashed rounded-md text-sm text-gray-600 hover:bg-gray-100 hover:border-gray-400">
                <Plus className="h-4 w-4" /> Añadir {noun}
            </button>
        </div>
    );
}

const sectionEditors: { [key in SectionType]?: React.FC<{ section: PageSection, onChange: (newSection: PageSection) => void }> } = {
    history: ({ section, onChange }) => {
        const handleImageChange = (index: number, field: 'url' | 'alt', value: string) => {
            const newImages = [...section.content.images];
            newImages[index] = { ...newImages[index], [field]: value };
            onChange({ ...section, content: { ...section.content, images: newImages }});
        };
        
        return (
            <div className="space-y-4">
                <div>
                    <label className="text-sm font-semibold">Título</label>
                    <input type="text" value={section.content.title} onChange={e => onChange({ ...section, content: { ...section.content, title: e.target.value }})} className={inputClass} />
                </div>
                <div>
                    <label className="text-sm font-semibold">Texto</label>
                    <textarea value={section.content.text} onChange={e => onChange({ ...section, content: { ...section.content, text: e.target.value }})} className={textareaClass} />
                </div>
                <div>
                    <h5 className="text-sm font-semibold mb-2">Galería de Imágenes</h5>
                    <div className="grid grid-cols-2 gap-4">
                        {(section.content.images || []).map((image: any, index: number) => (
                            <div key={image.id} className="space-y-2 p-2 border rounded bg-gray-50">
                                <ImageUploader 
                                    imageUrl={image.url}
                                    onImageChange={(url) => handleImageChange(index, 'url', url)}
                                    isCompact
                                />
                                <input 
                                    type="text"
                                    value={image.alt}
                                    onChange={(e) => handleImageChange(index, 'alt', e.target.value)}
                                    placeholder="Texto alternativo (SEO)"
                                    className={inputClass}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    },
    timeline: ({ section, onChange }) => (
         <ListEditor 
            title="Eventos de la Línea de Tiempo" noun="Evento"
            items={section.content.events}
            onUpdate={(newEvents: TimelineEvent[]) => onChange({ ...section, content: { ...section.content, events: newEvents }})}
            newItem={{ year: new Date().getFullYear(), description: ''}}
            renderItem={(item: TimelineEvent, update: any) => (
                <div className="grid grid-cols-4 gap-2">
                    <input type="number" value={item.year} onChange={e => update({ year: parseInt(e.target.value) || 0 })} className={`col-span-1 ${inputClass}`} />
                    <input type="text" value={item.description} onChange={e => update({ description: e.target.value })} className={`col-span-3 ${inputClass}`} />
                </div>
            )}
        />
    ),
    missionVision: ({ section, onChange }) => (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <h5 className="font-semibold text-sm mb-1">Misión</h5>
                <input type="text" value={section.content.mission.title} onChange={e => onChange({ ...section, content: { ...section.content, mission: { ...section.content.mission, title: e.target.value }}})} className={inputClass} />
                <textarea value={section.content.mission.text} onChange={e => onChange({ ...section, content: { ...section.content, mission: { ...section.content.mission, text: e.target.value }}})} className={`mt-2 ${textareaClass}`} />
            </div>
             <div>
                <h5 className="font-semibold text-sm mb-1">Visión</h5>
                <input type="text" value={section.content.vision.title} onChange={e => onChange({ ...section, content: { ...section.content, vision: { ...section.content.vision, title: e.target.value }}})} className={inputClass} />
                <textarea value={section.content.vision.text} onChange={e => onChange({ ...section, content: { ...section.content, vision: { ...section.content.vision, text: e.target.value }}})} className={`mt-2 ${textareaClass}`} />
            </div>
        </div>
    ),
     values: ({ section, onChange }) => (
        <ListEditor
            title="Valores de la Empresa" noun="Valor"
            items={section.content.values}
            onUpdate={(newValues: CompanyValue[]) => onChange({ ...section, content: { ...section.content, values: newValues } })}
            newItem={{ title: '', description: '', icon: 'Check' }}
            renderItem={(item: CompanyValue, update: any) => (
                <div className="space-y-2">
                    <input type="text" value={item.title} onChange={e => update({ title: e.target.value })} className={inputClass} placeholder="Título"/>
                    <textarea value={item.description} onChange={e => update({ description: e.target.value })} className={textareaClass} placeholder="Descripción"/>
                    <IconSelector selectedIcon={item.icon} onIconChange={icon => update({ icon })} />
                </div>
            )}
        />
    ),
     team: ({ section, onChange }) => (
        <ListEditor
            title="Miembros del Equipo" noun="Miembro"
            items={section.content.members}
            onUpdate={(newMembers: TeamMember[]) => onChange({ ...section, content: { ...section.content, members: newMembers } })}
            newItem={{ name: '', role: '', imageUrl: 'https://i.pravatar.cc/150' }}
            renderItem={(item: TeamMember, update: any) => (
                <div className="space-y-2">
                    <input type="text" value={item.name} onChange={e => update({ name: e.target.value })} className={inputClass} placeholder="Nombre"/>
                    <input type="text" value={item.role} onChange={e => update({ role: e.target.value })} className={inputClass} placeholder="Rol"/>
                    <ImageUploader imageUrl={item.imageUrl} onImageChange={url => update({ imageUrl: url })} isCompact />
                </div>
            )}
        />
    ),
    hiring: ({ section, onChange }) => (
        <div className="space-y-4">
             <input type="text" placeholder="Título Principal" value={section.content.title} onChange={e => onChange({ ...section, content: { ...section.content, title: e.target.value }})} className={inputClass} />
             <textarea placeholder="Texto introductorio" value={section.content.text} onChange={e => onChange({ ...section, content: { ...section.content, text: e.target.value }})} className={textareaClass} />
             <p className="text-xs text-gray-500">La gestión detallada de las vacantes se realiza en la sección "Vacantes" del menú principal.</p>
             <textarea placeholder="Texto de cierre" value={section.content.closingText} onChange={e => onChange({ ...section, content: { ...section.content, closingText: e.target.value }})} className={textareaClass} />
        </div>
    )
};

const ContactEditor: React.FC<{ content: ContactContent, onChange: (newContent: ContactContent) => void }> = ({ content, onChange }) => {
    const handleChange = (field: keyof ContactContent, value: string) => {
        onChange({ ...content, [field]: value });
    };

    return (
        <div className="space-y-4">
            <h4 className="text-md font-semibold text-gray-800">Contenido Página de Contacto</h4>
            <div className="p-3 border rounded-md bg-white shadow-sm space-y-3">
                 <div>
                    <label className="text-sm font-medium text-gray-700">Título del Formulario</label>
                    <input type="text" value={content.formTitle} onChange={e => handleChange('formTitle', e.target.value)} className={inputClass} />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">Subtítulo del Formulario</label>
                    <input type="text" value={content.formSubtitle} onChange={e => handleChange('formSubtitle', e.target.value)} className={inputClass} />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">Título de Información</label>
                    <input type="text" value={content.infoTitle} onChange={e => handleChange('infoTitle', e.target.value)} className={inputClass} />
                </div>
                 <div>
                    <label className="text-sm font-medium text-gray-700">Teléfono</label>
                    <input type="text" value={content.phone} onChange={e => handleChange('phone', e.target.value)} className={inputClass} />
                </div>
                 <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input type="email" value={content.email} onChange={e => handleChange('email', e.target.value)} className={inputClass} />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">Dirección</label>
                    <textarea value={content.address} onChange={e => handleChange('address', e.target.value)} className={textareaClass} />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">Horarios</label>
                    <textarea value={content.hours} onChange={e => handleChange('hours', e.target.value)} className={textareaClass} />
                </div>
                 <div>
                    <label className="text-sm font-medium text-gray-700">Título del Mapa</label>
                    <input type="text" value={content.mapTitle} onChange={e => handleChange('mapTitle', e.target.value)} className={inputClass} />
                </div>
            </div>
        </div>
    );
};


const ContentPagesEditor: React.FC<ContentPagesEditorProps> = ({ navigationData, onNavigationChange }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('about');
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);

  const handleAboutChange = (updatedAboutPage: Page) => {
    const newCustomPages = navigationData.customPages.map(p => p.slug === 'about-us' ? updatedAboutPage : p);
    onNavigationChange({ ...navigationData, customPages: newCustomPages });
  };
  
  const handleFaqChange = (newFaqs: FAQItem[]) => {
     onNavigationChange({ ...navigationData, faqContent: { ...navigationData.faqContent, faqs: newFaqs } });
  };

  const handleLegalChange = (newPages: LegalPage[]) => {
      onNavigationChange({ ...navigationData, legalContent: { pages: newPages } });
  };

  const handleContactChange = (newContent: ContactContent) => {
      onNavigationChange({ ...navigationData, contactPage: newContent });
  };

  const aboutUsPage = navigationData.customPages.find(p => p.slug === 'about-us');

  const handleSectionUpdate = (sectionId: string, updatedSection: PageSection) => {
    if (!aboutUsPage) return;
    const newSections = aboutUsPage.sections.map(s => s.id === sectionId ? updatedSection : s);
    handleAboutChange({ ...aboutUsPage, sections: newSections });
  };
  const handleSectionDelete = (sectionId: string) => {
     if (window.confirm("¿Seguro que quieres eliminar esta sección?")) {
        if (!aboutUsPage) return;
        const newSections = aboutUsPage.sections.filter(s => s.id !== sectionId);
        handleAboutChange({ ...aboutUsPage, sections: newSections });
     }
  };
   const handleSectionSort = (dragIndex: number, hoverIndex: number) => {
        if (!aboutUsPage) return;
        const newSections = [...aboutUsPage.sections];
        const draggedItem = newSections.splice(dragIndex, 1)[0];
        newSections.splice(hoverIndex, 0, draggedItem);
        handleAboutChange({ ...aboutUsPage, sections: newSections });
   };

  const TabButton = ({ id, label, icon: Icon }: { id: ActiveTab, label: string, icon: React.ElementType }) => (
    <button onClick={() => setActiveTab(id)} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 ${activeTab === id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
        <Icon className="h-5 w-5" /> {label}
    </button>
  );

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-800">Editor de Páginas de Contenido</h3>
      <div className="border-b flex space-x-2">
        <TabButton id="about" label="Nosotros" icon={Building} />
        <TabButton id="faq" label="FAQ" icon={HelpCircle} />
        <TabButton id="legal" label="Legal" icon={FileText} />
        <TabButton id="contact" label="Contacto" icon={Phone} />
      </div>
       <div className="p-4 bg-gray-50 rounded-b-lg border border-t-0">
         {activeTab === 'about' && (
            <div className="space-y-4">
                {aboutUsPage ? aboutUsPage.sections.map((section, index) => {
                    const EditorComponent = sectionEditors[section.type];
                    return (
                        <div key={section.id} className="p-3 border rounded-md bg-white shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-semibold text-gray-700 capitalize flex items-center gap-2"><GripVertical className="h-5 w-5 text-gray-400 cursor-grab" /> {section.type}</h4>
                                <div className="flex items-center gap-2">
                                     <button onClick={() => setEditingSectionId(editingSectionId === section.id ? null : section.id)} className="p-1 text-gray-500 hover:text-blue-600"><Edit className="h-4 w-4"/></button>
                                     <button onClick={() => handleSectionDelete(section.id)} className="p-1 text-gray-400 hover:text-red-500"><Trash2 className="h-4 w-4"/></button>
                                </div>
                            </div>
                            {editingSectionId === section.id && EditorComponent && (
                                <div className="border-t pt-4 mt-2">
                                    <EditorComponent section={section} onChange={(newSection) => handleSectionUpdate(section.id, newSection)} />
                                </div>
                            )}
                        </div>
                    );
                }) : <p>Página "Nosotros" no encontrada.</p>}
            </div>
         )}
         {activeTab === 'faq' && <ListEditor 
            title="Preguntas Frecuentes" noun="Pregunta"
            items={navigationData.faqContent.faqs}
            onUpdate={handleFaqChange}
            newItem={{ question: 'Nueva Pregunta', answer: 'Nueva Respuesta' }}
            renderItem={(item: FAQItem, update: any) => (
                <div className="space-y-2">
                    <input type="text" value={item.question} onChange={e => update({ question: e.target.value })} className={inputClass} placeholder="Pregunta"/>
                    <textarea value={item.answer} onChange={e => update({ answer: e.target.value })} className={textareaClass} placeholder="Respuesta"/>
                </div>
            )}
        />}
        {activeTab === 'legal' && <ListEditor 
            title="Páginas Legales" noun="Página"
            items={navigationData.legalContent.pages}
            onUpdate={handleLegalChange}
            newItem={{ title: 'Nueva Página', content: 'Contenido...' }}
            renderItem={(item: LegalPage, update: any) => (
                <div className="space-y-2">
                    <input type="text" value={item.title} onChange={e => update({ title: e.target.value })} className={inputClass} placeholder="Título de la Página"/>
                    <textarea value={item.content} onChange={e => update({ content: e.target.value })} className={textareaClass} placeholder="Contenido de la página"/>
                </div>
            )}
        />}
        {activeTab === 'contact' && (
            <ContactEditor content={navigationData.contactPage} onChange={handleContactChange} />
        )}
       </div>
    </div>
  );
};

export default ContentPagesEditor;
