import React from 'react';
import { Eye, MessageSquare, Mail, FileText } from 'lucide-react';

interface JobListingProps {
  vacancy: { title: string };
}

const JobListing: React.FC<JobListingProps> = ({ vacancy }) => {
  const whatsappLink = `https://wa.me/18494561963?text=Hola,%20estoy%20interesado/a%20en%20la%20vacante%20de%20${encodeURIComponent(vacancy.title)}.`;
  const mailLink = `mailto:info@decoragroup.pc?subject=Aplicación%20para%20vacante:%20${encodeURIComponent(vacancy.title)}`;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
      <h4 className="text-base font-semibold text-gray-800 text-left flex-grow">{vacancy.title}</h4>
      <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2">
        <button className="flex items-center text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md transition-colors">
          <Eye className="h-3 w-3 mr-1.5" /> Ver puesto
        </button>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-xs font-medium text-white bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded-md transition-colors">
          <MessageSquare className="h-3 w-3 mr-1.5" /> WhatsApp
        </a>
        <a href={mailLink} className="flex items-center text-xs font-medium text-white bg-blue-500 hover:bg-blue-600 px-3 py-1.5 rounded-md transition-colors">
          <Mail className="h-3 w-3 mr-1.5" /> Correo
        </a>
        <button className="flex items-center text-xs font-medium text-white bg-gray-700 hover:bg-gray-800 px-3 py-1.5 rounded-md transition-colors">
          <FileText className="h-3 w-3 mr-1.5" /> Formulario
        </button>
      </div>
    </div>
  );
};

export default JobListing;
