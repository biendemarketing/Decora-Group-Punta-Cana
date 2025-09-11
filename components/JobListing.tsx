import React from 'react';
import { JobVacancy } from '../types';
import { Eye, MessageSquare, Mail, FileText, Briefcase, Wrench, DraftingCompass, ClipboardList } from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  Briefcase,
  Wrench,
  DraftingCompass,
  ClipboardList,
  Default: Briefcase,
};

interface JobListingProps {
  vacancy: JobVacancy;
  onViewDetail: (job: JobVacancy) => void;
  onApply: (jobTitle: string) => void;
}

const JobListing: React.FC<JobListingProps> = ({ vacancy, onViewDetail, onApply }) => {
  const whatsappLink = `https://wa.me/18494561963?text=Hola,%20estoy%20interesado/a%20en%20la%20vacante%20de%20${encodeURIComponent(vacancy.title)}.`;
  const mailLink = `mailto:decoraempleo@gmail.com?subject=Aplicación%20para%20vacante:%20${encodeURIComponent(vacancy.title)}`;
  const Icon = iconMap[vacancy.icon] || iconMap.Default;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
      <div className="flex items-center gap-4 flex-grow">
        <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-[#fdecef] rounded-lg">
            <Icon className="h-6 w-6 text-[#5a1e38]" />
        </div>
        <div>
            <h4 className="text-base font-semibold text-gray-800">{vacancy.title}</h4>
            <p className="text-xs text-gray-500">{vacancy.summary}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-start sm:justify-end gap-2 w-full sm:w-auto">
        <button onClick={() => onViewDetail(vacancy)} className="flex items-center text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md transition-colors">
          <Eye className="h-3 w-3 mr-1.5" /> Ver puesto
        </button>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-xs font-medium text-white bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded-md transition-colors">
          <MessageSquare className="h-3 w-3 mr-1.5" /> WhatsApp
        </a>
        <a href={mailLink} className="flex items-center text-xs font-medium text-white bg-blue-500 hover:bg-blue-600 px-3 py-1.5 rounded-md transition-colors">
          <Mail className="h-3 w-3 mr-1.5" /> Correo
        </a>
        <button onClick={() => onApply(vacancy.title)} className="flex items-center text-xs font-medium text-white bg-gray-700 hover:bg-gray-800 px-3 py-1.5 rounded-md transition-colors">
          <FileText className="h-3 w-3 mr-1.5" /> Formulario
        </button>
      </div>
    </div>
  );
};

export default JobListing;