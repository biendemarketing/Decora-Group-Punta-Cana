import React from 'react';
import type { Project } from '../types';
import { ChevronRight } from 'lucide-react';

interface ProjectDetailPageProps {
  project: Project;
  onBack: () => void;
  onGoHome: () => void;
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ project, onBack, onGoHome }) => {

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <button onClick={onGoHome} className="hover:text-gray-700">Decora Group</button>
        <ChevronRight className="h-4 w-4 mx-1 flex-shrink-0" />
        <button onClick={onBack} className="hover:text-gray-700">Proyectos</button>
        <ChevronRight className="h-4 w-4 mx-1 flex-shrink-0" />
        <span className="font-medium text-gray-600 truncate">{project.title}</span>
      </nav>

      {/* Main Project Content */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>
        <p className="text-lg text-gray-600 mb-8">{project.description}</p>
        
        {/* Image Gallery */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Galería del Proyecto</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.galleryImages.map((image, index) => (
              <div key={index} className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`Galería del proyecto ${project.title} - imagen ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;