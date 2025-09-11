import React, { useState } from 'react';
import { BarChart, Users, MapPin, FileText, Clock, TrendingUp, UserCheck, ArrowUp, ArrowDown } from 'lucide-react';

type AnalyticsTab = 'visits' | 'geography' | 'content';

const StatCard: React.FC<{ title: string; value: string; icon: React.ElementType; change: string; changeType: 'increase' | 'decrease' }> = ({ title, value, icon: Icon, change, changeType }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full bg-gray-100`}>
        <Icon className="h-6 w-6 text-gray-600" />
      </div>
    </div>
    <div className="flex items-center mt-4 text-sm">
      {changeType === 'increase' ? (
        <ArrowUp className="h-4 w-4 text-green-500" />
      ) : (
        <ArrowDown className="h-4 w-4 text-red-500" />
      )}
      <span className={`ml-1 font-semibold ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>{change}</span>
      <span className="ml-2 text-gray-500">vs semana anterior</span>
    </div>
  </div>
);

const SimpleBarChart: React.FC<{ data: { day: string; visits: number }[] }> = ({ data }) => {
  const maxVisits = Math.max(...data.map(d => d.visits), 0);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="font-bold text-lg text-gray-800 mb-4">Tráfico de los Últimos 7 Días</h3>
        <div className="flex justify-between items-end h-64 gap-2">
            {data.map(item => (
                <div key={item.day} className="flex-1 flex flex-col items-center justify-end gap-2 group">
                    <div className="relative">
                        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{item.visits} visitas</span>
                        <div 
                            className="w-full bg-blue-200 rounded-t-md hover:bg-blue-500 transition-colors"
                            style={{ height: `${(item.visits / maxVisits) * 100}%` }}
                        ></div>
                    </div>
                    <span className="text-xs text-gray-500">{item.day}</span>
                </div>
            ))}
        </div>
    </div>
  );
};

const DataTable: React.FC<{ headers: string[], data: any[], renderRow: (item: any) => JSX.Element }> = ({ headers, data, renderRow }) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <table className="w-full text-sm text-left">
            <thead className="bg-gray-50">
                <tr>
                    {headers.map(h => <th key={h} className="p-4 font-semibold text-gray-600 uppercase">{h}</th>)}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {data.map(item => renderRow(item))}
            </tbody>
        </table>
    </div>
);

const Analytics: React.FC = () => {
    const [activeTab, setActiveTab] = useState<AnalyticsTab>('visits');

    const simulatedData = {
        visits: {
            stats: [
                { title: "Total de Visitas", value: "12,482", icon: Users, change: "+5.2%", changeType: 'increase' as const },
                { title: "Visitantes Únicos", value: "8,921", icon: UserCheck, change: "+3.1%", changeType: 'increase' as const },
                { title: "Duración Media", value: "4m 32s", icon: Clock, change: "-1.8%", changeType: 'decrease' as const },
                { title: "Tasa de Rebote", value: "42.3%", icon: TrendingUp, change: "+0.5%", changeType: 'increase' as const },
            ],
            traffic: [
                { day: 'Lun', visits: 1650 }, { day: 'Mar', visits: 1820 }, { day: 'Mié', visits: 1750 },
                { day: 'Jue', visits: 1980 }, { day: 'Vie', visits: 2340 }, { day: 'Sáb', visits: 2510 }, { day: 'Dom', visits: 2190 },
            ],
        },
        geography: [
            { flag: '🇩🇴', country: "República Dominicana", visits: 7890 }, { flag: '🇺🇸', country: "Estados Unidos", visits: 2345 },
            { flag: '🇨🇦', country: "Canadá", visits: 612 }, { flag: '🇪🇸', country: "España", visits: 456 },
            { flag: '🇨🇴', country: "Colombia", visits: 321 }, { flag: '🇻🇪', country: "Venezuela", visits: 289 },
        ],
        content: [
            { path: "/productos/cocinas", views: 4567 }, { path: "/cotizar", views: 3123 },
            { path: "/proyectos/cocinas-personalizadas", views: 2890 }, { path: "/productos/closets", views: 2543 },
            { path: "/blog/tendencias-2024", views: 1987 },
        ]
    };

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

    const renderContent = () => {
        switch(activeTab) {
            case 'visits':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {simulatedData.visits.stats.map(stat => <StatCard key={stat.title} {...stat} />)}
                        </div>
                        <SimpleBarChart data={simulatedData.visits.traffic} />
                    </div>
                );
            case 'geography':
                 return <DataTable
                    headers={['País', 'Visitas']}
                    data={simulatedData.geography}
                    renderRow={(item) => (
                        <tr key={item.country}>
                            <td className="p-4 flex items-center gap-3"><span className="text-2xl">{item.flag}</span> <span className="font-medium text-gray-800">{item.country}</span></td>
                            <td className="p-4 font-medium text-gray-700">{item.visits.toLocaleString()}</td>
                        </tr>
                    )}
                />;
            case 'content':
                return <DataTable
                    headers={['Página', 'Vistas']}
                    data={simulatedData.content}
                    renderRow={(item) => (
                        <tr key={item.path}>
                            <td className="p-4 font-medium text-blue-600 hover:underline cursor-pointer">{item.path}</td>
                            <td className="p-4 font-medium text-gray-700">{item.views.toLocaleString()}</td>
                        </tr>
                    )}
                />;
            default: return null;
        }
    }
    
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Analíticas Avanzadas</h2>
             <div className="border-b flex space-x-2">
                <TabButton id="visits" label="Visitas" icon={Users} />
                <TabButton id="geography" label="Geografía" icon={MapPin} />
                <TabButton id="content" label="Contenido" icon={FileText} />
             </div>
             <div>
                {renderContent()}
             </div>
        </div>
    );
};

export default Analytics;
