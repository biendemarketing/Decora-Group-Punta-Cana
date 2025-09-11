import React, { useState } from 'react';
import type { Project } from '../types';
import { ChevronRight } from 'lucide-react';
import Lightbox from './Lightbox';

interface ProjectDetailPageProps {
  project: Project;
  onBack: () => void;
  onGoHome: () => void;
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ project, onBack, onGoHome }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
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
                <button
                  key={index}
                  onClick={() => openLightbox(index)}
                  className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5a1e38]"
                >
                  <img
                    src={image}
                    alt={`Galería del proyecto ${project.title} - imagen ${index + 1}`}
                    className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {lightboxOpen && (
        <Lightbox
          images={project.galleryImages}
          startIndex={selectedImageIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
};

export default ProjectDetailPage;
