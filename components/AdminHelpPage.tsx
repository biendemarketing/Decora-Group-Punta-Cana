import React, { useState, useMemo } from 'react';
import { HelpTopic } from '../types';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';
import iconMap from '../utils/iconMap';

interface AccordionItemProps {
    topic: HelpTopic;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ topic }) => {
    const [isOpen, setIsOpen] = useState(false);
    const Icon = topic.icon ? iconMap[topic.icon] || HelpCircle : HelpCircle;
    return (
        <div className="border-b border-gray-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full py-4 text-left"
                aria-expanded={isOpen}
            >
                <h3 className="text-base font-medium text-gray-900 flex items-center gap-3">
                    <Icon className="h-5 w-5 text-gray-500" />
                    {topic.title}
                </h3>
                <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="pb-5 pl-11">
                    <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{topic.content}</p>
                </div>
            )}
        </div>
    );
};

interface AdminHelpPageProps {
    adminTopics: HelpTopic[];
}

const AdminHelpPage: React.FC<AdminHelpPageProps> = ({ adminTopics }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const topicsBySection = useMemo(() => {
        const sections: { [key: string]: HelpTopic[] } = {
            'Principal': [],
            'Contenido del Sitio': [],
            'Configuración': [],
            'Soporte': [],
        };

        const lowerCaseSearch = searchTerm.toLowerCase();
        const filteredTopics = adminTopics.filter(topic => 
            topic.title.toLowerCase().includes(lowerCaseSearch) || 
            topic.content.toLowerCase().includes(lowerCaseSearch)
        );

        filteredTopics.forEach(topic => {
            if (topic.section && sections[topic.section]) {
                sections[topic.section].push(topic);
            }
        });

        return sections;
    }, [adminTopics, searchTerm]);

    const totalResults = Object.values(topicsBySection).reduce((sum, topics) => sum + topics.length, 0);

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">Centro de Ayuda para Administradores</h2>
                <p className="text-gray-500 mt-1">Encuentra guías y explicaciones para cada módulo del panel.</p>
            </div>
             <div className="relative max-w-lg mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar en la guía..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full text-base"
                />
            </div>
            
            {totalResults > 0 ? (
                Object.entries(topicsBySection).map(([section, topics]) => (
                    topics.length > 0 && (
                        <div key={section}>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2 px-2">{section}</h3>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                {topics.map(topic => <AccordionItem key={topic.id} topic={topic} />)}
                            </div>
                        </div>
                    )
                ))
            ) : (
                 <p className="text-center text-gray-500 py-12">No se encontraron resultados para "{searchTerm}".</p>
            )}
        </div>
    );
};

export default AdminHelpPage;