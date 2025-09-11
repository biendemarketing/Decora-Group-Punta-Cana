import React, { useState, useMemo } from 'react';
import { HelpTopic } from '../types';
import { ChevronDown, Search } from 'lucide-react';

interface AccordionItemProps {
    topic: HelpTopic;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ topic }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full py-5 text-left"
                aria-expanded={isOpen}
            >
                <h3 className="text-lg font-medium text-gray-900">{topic.title}</h3>
                <ChevronDown className={`h-6 w-6 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="pb-5 pr-12">
                    <p className="text-gray-600 whitespace-pre-line">{topic.content}</p>
                </div>
            )}
        </div>
    );
};

interface HelpPageProps {
    title: string;
    subtitle: string;
    topics: HelpTopic[];
}

const HelpPage: React.FC<HelpPageProps> = ({ title, subtitle, topics }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTopics = useMemo(() => {
        const lowerCaseSearch = searchTerm.toLowerCase();
        return topics.filter(topic => 
            topic.title.toLowerCase().includes(lowerCaseSearch) || topic.content.toLowerCase().includes(lowerCaseSearch)
        );
    }, [topics, searchTerm]);

    return (
        <main className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
                    <p className="mt-4 text-xl text-gray-600">{subtitle}</p>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-md">
                     <div className="relative mb-6">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar en la guía..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full text-base"
                        />
                    </div>
                    
                    <div className="space-y-4">
                        {filteredTopics.length > 0 ? (
                            filteredTopics.map(topic => <AccordionItem key={topic.id} topic={topic} />)
                        ) : (
                            <p className="text-center text-gray-500 py-8">No se encontraron resultados para "{searchTerm}".</p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default HelpPage;