import React, { useState } from 'react';
import { HelpContent, HelpTopic } from '../types';
import { Plus, Trash2, User, Shield } from 'lucide-react';
import IconSelector from './IconSelector';

interface HelpEditorProps {
    helpContent: HelpContent;
    onHelpContentChange: (newContent: HelpContent) => void;
}

const inputClass = "w-full text-sm p-2 border border-gray-300 rounded bg-white text-gray-900 shadow-sm focus:ring-blue-500 focus:border-blue-500";
const textareaClass = `${inputClass} h-24`;
const sectionOptions: HelpTopic['section'][] = ['Principal', 'Contenido del Sitio', 'Configuración', 'Soporte'];

const HelpTopicEditor: React.FC<{
    topics: HelpTopic[];
    onUpdate: (newTopics: HelpTopic[]) => void;
    isAdminEditor?: boolean;
}> = ({ topics, onUpdate, isAdminEditor = false }) => {
    
    const handleTopicChange = (id: string, field: keyof HelpTopic, value: any) => {
        onUpdate(topics.map(topic => topic.id === id ? { ...topic, [field]: value } : topic));
    };

    const handleDeleteTopic = (id: string) => {
        if (window.confirm("¿Seguro que quieres eliminar este tópico de ayuda?")) {
            onUpdate(topics.filter(t => t.id !== id));
        }
    };

    return (
        <div className="space-y-3">
            {topics.map(topic => (
                <div key={topic.id} className="p-3 border rounded-md bg-white shadow-sm space-y-2">
                    <div className="flex justify-between items-center">
                        <input type="text" value={topic.title} onChange={e => handleTopicChange(topic.id, 'title', e.target.value)} placeholder="Título del tópico" className={`font-semibold ${inputClass}`} />
                        <button onClick={() => handleDeleteTopic(topic.id)} className="p-1 text-gray-400 hover:text-red-500"><Trash2 className="h-4 w-4"/></button>
                    </div>
                    <textarea value={topic.content} onChange={e => handleTopicChange(topic.id, 'content', e.target.value)} placeholder="Contenido del tópico" rows={4} className={textareaClass} />
                    {isAdminEditor && (
                        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                            <div>
                                <label className="text-xs font-medium text-gray-600 block mb-1">Sección del Panel</label>
                                <select value={topic.section || ''} onChange={e => handleTopicChange(topic.id, 'section', e.target.value)} className={inputClass}>
                                    {sectionOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>
                             <div>
                                <label className="text-xs font-medium text-gray-600 block mb-1">Icono</label>
                                <IconSelector selectedIcon={topic.icon || 'Default'} onIconChange={icon => handleTopicChange(topic.id, 'icon', icon)} />
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

const HelpEditor: React.FC<HelpEditorProps> = ({ helpContent, onHelpContentChange }) => {
    const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user');
    
    const handleAddTopic = (isUser: boolean) => {
        const newTopic: HelpTopic = {
            id: crypto.randomUUID(),
            title: 'Nuevo Tópico',
            content: 'Contenido del tópico...',
        };
        if (isUser) {
            onHelpContentChange({ ...helpContent, userTopics: [...helpContent.userTopics, newTopic] });
        } else {
            newTopic.section = 'Principal';
            newTopic.icon = 'LayoutDashboard';
            onHelpContentChange({ ...helpContent, adminTopics: [...helpContent.adminTopics, newTopic] });
        }
    };
    
    const TabButton: React.FC<{ tabId: 'user' | 'admin', label: string, icon: React.ElementType }> = ({ tabId, label, icon: Icon }) => (
         <button
            onClick={() => setActiveTab(tabId)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 ${
                activeTab === tabId
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
        >
            <Icon className="h-5 w-5" /> {label}
        </button>
    );

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800">Editor de Ayuda y Guía</h3>
            
            <div className="space-y-4 p-4 border rounded-md bg-gray-50">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Título Principal (Página de Ayuda de Usuario)</label>
                    <input type="text" value={helpContent.title} onChange={e => onHelpContentChange({...helpContent, title: e.target.value})} className={inputClass} />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Subtítulo (Página de Ayuda de Usuario)</label>
                    <input type="text" value={helpContent.subtitle} onChange={e => onHelpContentChange({...helpContent, subtitle: e.target.value})} className={inputClass} />
                </div>
            </div>

            <div className="border-b flex space-x-2">
                <TabButton tabId="user" label="Guía de Usuario" icon={User} />
                <TabButton tabId="admin" label="Guía de Administrador" icon={Shield} />
            </div>

            {activeTab === 'user' && (
                <div>
                    <HelpTopicEditor 
                        topics={helpContent.userTopics}
                        onUpdate={(newTopics) => onHelpContentChange({...helpContent, userTopics: newTopics})}
                    />
                    <button onClick={() => handleAddTopic(true)} className="w-full flex items-center justify-center gap-2 p-2 mt-3 border-2 border-dashed rounded-md text-sm text-gray-600 hover:bg-gray-100 hover:border-gray-400">
                        <Plus className="h-4 w-4" /> Añadir Tópico de Usuario
                    </button>
                </div>
            )}
            
            {activeTab === 'admin' && (
                <div>
                    <HelpTopicEditor 
                        topics={helpContent.adminTopics}
                        onUpdate={(newTopics) => onHelpContentChange({...helpContent, adminTopics: newTopics})}
                        isAdminEditor
                    />
                     <button onClick={() => handleAddTopic(false)} className="w-full flex items-center justify-center gap-2 p-2 mt-3 border-2 border-dashed rounded-md text-sm text-gray-600 hover:bg-gray-100 hover:border-gray-400">
                        <Plus className="h-4 w-4" /> Añadir Tópico de Administrador
                    </button>
                </div>
            )}
        </div>
    );
};

export default HelpEditor;