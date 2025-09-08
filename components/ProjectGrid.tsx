import React from 'react';
import type { Project } from '../types';
import ProjectCard from './ProjectCard';

interface ProjectGridProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, onProjectSelect }) => {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-gray-300 rounded-lg bg-white">
        <h3 className="text-xl font-semibold text-gray-800">No se encontraron proyectos</h3>
        <p className="mt-2 text-gray-500">Próximamente tendremos más proyectos en esta categoría.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} onProjectSelect={onProjectSelect} />
      ))}
    </div>
  );
};

export default ProjectGrid;