import React from 'react';
import {
    LayoutDashboard, Settings, Image as ImageIcon, Briefcase, Star, Package, LayoutList,
    Calculator, BookOpen, BookCopy, FileText, Anchor, Link2, BarChart2, ShieldCheck, HardDrive
} from 'lucide-react';

type EditorType =
    'dashboard' | 'analytics' | 'media' | 'audit' |
    'menu' | 'slider' | 'settings' | 'projects' | 'popularCategories' | 'products' |
    'services' | 'workProcess' | 'blog' | 'catalogues' | 'pages' | 'footer' |
    'integrations' | 'vacancies' | 'quote';

interface AdminSidebarProps {
  activeEditor: EditorType;
  onSelectEditor: (editor: EditorType) => void;
}

const NavItem: React.FC<{
    id: EditorType;
    label: string;
    icon: React.ElementType;
    isActive: boolean;
    onClick: () => void;
}> = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
        key={id}
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors w-full text-left ${
            isActive
            ? 'bg-gray-800 text-white shadow-sm'
            : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
        }`}
    >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
    </button>
);

const NavGroup: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h3 className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</h3>
        <div className="space-y-1">
            {children}
        </div>
    </div>
);


const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeEditor, onSelectEditor }) => {
    const navStructure = [
        {
            group: 'Principal',
            items: [
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'analytics', label: 'Analíticas', icon: BarChart2 },
                { id: 'media', label: 'Archivos y Multimedia', icon: HardDrive },
                { id: 'audit', label: 'Auditoría', icon: ShieldCheck },
            ]
        },
        {
            group: 'Contenido del Sitio',
            items: [
                { id: 'pages', label: 'Páginas y Secciones', icon: FileText },
                { id: 'slider', label: 'Slider Principal', icon: ImageIcon },
                { id: 'popularCategories', label: 'Categorías Populares', icon: Star },
                { id: 'services', label: 'Servicios', icon: LayoutList },
                { id: 'projects', label: 'Proyectos', icon: Briefcase },
                { id: 'products', label: 'Productos', icon: Package },
                { id: 'catalogues', label: 'Catálogos', icon: BookCopy },
                { id: 'blog', label: 'Blog', icon: BookOpen },
            ]
        },
        {
            group: 'Configuración',
            items: [
                { id: 'settings', label: 'Ajustes Generales', icon: Settings },
                { id: 'menu', label: 'Menú Principal', icon: LayoutList },
                { id: 'footer', label: 'Pie de Página', icon: Anchor },
                { id: 'quote', label: 'Cotizador', icon: Calculator },
                { id: 'workProcess', label: 'Proceso de Trabajo', icon: Briefcase },
                { id: 'vacancies', label: 'Vacantes de Empleo', icon: Briefcase },
                { id: 'integrations', label: 'Integraciones', icon: Link2 },
            ]
        }
    ];

    return (
        <nav className="flex flex-col space-y-4">
            {navStructure.map(group => (
                <NavGroup key={group.group} title={group.group}>
                    {group.items.map(item => (
                        <NavItem
                            key={item.id}
                            id={item.id as EditorType}
                            label={item.label}
                            icon={item.icon}
                            isActive={activeEditor === item.id}
                            onClick={() => onSelectEditor(item.id as EditorType)}
                        />
                    ))}
                </NavGroup>
            ))}
        </nav>
    );
};

export default AdminSidebar;
