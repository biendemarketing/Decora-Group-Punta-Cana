import React, { useState } from 'react';
import { BarChart, Users, MapPin, FileText } from 'lucide-react';

type AnalyticsTab = 'visits' | 'geography' | 'content';

const Analytics: React.FC = () => {
    const [activeTab, setActiveTab] = useState<AnalyticsTab>('visits');

    const TabButton: React.FC<{ id: AnalyticsTab, label: string, icon: React.ElementType }> = ({ id, label, icon: Icon }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 ${
                activeTab === id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
        >
            <Icon className="h-5 w-5" /> {label}
        </button>
    );

    const PlaceholderContent: React.FC<{ title: string }> = ({ title }) => (
        <div className="bg-white p-8 rounded-b-lg border border-t-0 text-center text-gray-500">
            <BarChart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Datos de {title}</h3>
            <p className="mt-2">Esta sección está en desarrollo. Próximamente podrás ver analíticas detalladas aquí.</p>
        </div>
    );
    
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Analíticas Avanzadas</h2>
             <div className="border-b flex space-x-2">
                <TabButton id="visits" label="Visitas" icon={Users} />
                <TabButton id="geography" label="Geografía" icon={MapPin} />
                <TabButton id="content" label="Contenido" icon={FileText} />
             </div>
             <div>
                {activeTab === 'visits' && <PlaceholderContent title="Visitas" />}
                {activeTab === 'geography' && <PlaceholderContent title="Geografía" />}
                {activeTab === 'content' && <PlaceholderContent title="Contenido" />}
             </div>
        </div>
    );
};

export default Analytics;
