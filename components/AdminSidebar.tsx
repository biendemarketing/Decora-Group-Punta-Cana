import React from 'react';
import { LayoutDashboard, Settings, Image as ImageIcon, Grid, Briefcase, Star, Package, LayoutList, Calculator, ClipboardList, BookOpen } from 'lucide-react';

type EditorType = 'menu' | 'slider' | 'settings' | 'projects' | 'popularCategories' | 'products' | 'services' | 'quote' | 'workProcess' | 'blog';

interface AdminSidebarProps {
  activeEditor: EditorType;
  onSelectEditor: (editor: EditorType) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeEditor, onSelectEditor }) => {
  const menuItems = [
    { id: 'settings', label: 'Logos y Barra Superior', icon: Settings },
    { id: 'menu', label: 'Menú Principal', icon: LayoutDashboard },
    { id: 'slider', label: 'Slider Principal', icon: ImageIcon },
    { id: 'popularCategories', label: 'Categorías Populares', icon: Star },
    { id: 'services', label: 'Servicios', icon: LayoutList },
    { id: 'workProcess', label: 'Proceso de Trabajo', icon: ClipboardList },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'quote', label: 'Cotizador', icon: Calculator },
    { id: 'projects', label: 'Proyectos', icon: Briefcase },
    { id: 'products', label: 'Productos', icon: Package },
  ];

  return (
    <nav className="flex flex-col space-y-2">
      {menuItems.map(item => (
        <button
          key={item.id}
          onClick={() => onSelectEditor(item.id as EditorType)}
          className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors w-full text-left ${
            activeEditor === item.id
              ? 'bg-gray-800 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
          }`}
        >
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </button>
      ))}
      {/* Informational Item */}
      <div className="relative group pt-2 mt-2 border-t">
         <div
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors w-full text-left text-gray-500 bg-gray-100 cursor-help`}
          >
            <Grid className="h-5 w-5" />
            <span>Explora Diseños</span>
        </div>
        <div className="absolute left-full ml-2 w-48 p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
          Se gestiona desde "Menú Principal" seleccionando la categoría "Proyectos".
        </div>
      </div>
    </nav>
  );
};

export default AdminSidebar;