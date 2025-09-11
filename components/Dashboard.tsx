import React from 'react';
import { NavigationData, Product, Project } from '../types';
import { Package, Briefcase, FileText, Activity, BookOpen } from 'lucide-react';

interface DashboardProps {
  navigationData: NavigationData;
  projectsData: Project[];
  productsData: Product[];
}

const StatCard: React.FC<{ icon: React.ElementType, title: string, value: string | number, color: string }> = ({ icon: Icon, title, value, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-start">
    <div className={`p-3 rounded-full mr-4 ${color}`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ navigationData, projectsData, productsData }) => {
  const totalProducts = productsData.length;
  const totalProjects = projectsData.length;
  const totalPages = navigationData.customPages.length;
  const totalBlogPosts = navigationData.blogPosts.length;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-500">Bienvenido al panel de administración de Decora Group.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Package} title="Total de Productos" value={totalProducts} color="bg-blue-500" />
        <StatCard icon={Briefcase} title="Total de Proyectos" value={totalProjects} color="bg-green-500" />
        <StatCard icon={FileText} title="Páginas Personalizadas" value={totalPages} color="bg-indigo-500" />
        <StatCard icon={BookOpen} title="Posts del Blog" value={totalBlogPosts} color="bg-yellow-500" />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center"><Activity className="mr-2"/> Actividad Reciente</h3>
        <div className="text-center text-gray-500 py-8">
          <p>La funcionalidad de registro de actividad estará disponible próximamente.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
