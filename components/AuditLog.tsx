import React from 'react';
import { ShieldCheck, User, Clock } from 'lucide-react';

const mockLogs = [
    { id: 1, user: 'admin@decoragroup.pc', action: 'Actualizó la sección "Slider Principal"', timestamp: 'Hace 5 minutos' },
    { id: 2, user: 'admin@decoragroup.pc', action: 'Guardó cambios en "Ajustes del Sitio"', timestamp: 'Hace 2 horas' },
    { id: 3, user: 'admin@decoragroup.pc', action: 'Añadió un nuevo producto: "Sofá Nórdico Gris"', timestamp: 'Hace 1 día' },
    { id: 4, user: 'admin@decoragroup.pc', action: 'Inició sesión', timestamp: 'Hace 1 día' },
];

const AuditLog: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Auditoría</h2>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center"><ShieldCheck className="mr-2"/> Registro de Cambios</h3>
                <div className="space-y-4">
                    {mockLogs.map(log => (
                        <div key={log.id} className="p-3 border rounded-md bg-gray-50 flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-3 p-2 bg-gray-200 rounded-full"><User className="h-4 w-4 text-gray-600"/></div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">{log.action}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                                    <span>por <span className="font-semibold">{log.user}</span></span>
                                    <span className="flex items-center gap-1"><Clock className="h-3 w-3"/>{log.timestamp}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                 <div className="text-center text-gray-500 py-8 border-t mt-6">
                    <p>Esta es una vista de ejemplo. La auditoría completa estará disponible próximamente.</p>
                </div>
            </div>
        </div>
    );
};

export default AuditLog;
