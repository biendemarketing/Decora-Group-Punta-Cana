import React from 'react';
import type { Project } from '../types';
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onProjectSelect: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onProjectSelect }) => {
  return (
    <div 
      className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col cursor-pointer"
      onClick={() => onProjectSelect(project)}
    >
      <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#5a1e38] transition-colors">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 flex-grow">
            {project.description.substring(0, 100)}...
        </p>
        <div className="mt-4 text-sm font-semibold text-[#5a1e38] flex items-center">
            Ver proyecto
            <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;