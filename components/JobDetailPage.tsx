import React from 'react';
import { JobVacancy } from '../types';
import { ArrowLeft, Briefcase, MapPin, Clock, Check, MessageSquare, Mail, FileText } from 'lucide-react';

interface JobDetailPageProps {
    job: JobVacancy;
    onBack: () => void;
    onApply: (jobTitle: string) => void;
}

const DetailSection: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
    <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
        <ul className="space-y-2">
            {items.map((item, index) => (
                <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

const JobDetailPage: React.FC<JobDetailPageProps> = ({ job, onBack, onApply }) => {
    const whatsappLink = `https://wa.me/18494561963?text=Hola,%20estoy%20interesado/a%20en%20la%20vacante%20de%20${encodeURIComponent(job.title)}.`;
    const mailLink = `mailto:decoraempleo@gmail.com?subject=Aplicación%20para%20vacante:%20${encodeURIComponent(job.title)}`;

    return (
        <main className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <button onClick={onBack} className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver a Oportunidades
                </button>

                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <div className="border-b pb-6 mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {job.type}</span>
                            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</span>
                            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> Publicado recientemente</span>
                        </div>
                    </div>

                    <div className="prose prose-sm max-w-none text-gray-600 space-y-4">
                        {job.description.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                    
                    <div className="space-y-8 mt-8">
                        <DetailSection title="Responsabilidades Clave" items={job.responsibilities} />
                        <DetailSection title="Requisitos y Calificaciones" items={job.requirements} />
                    </div>

                     <div className="mt-10 border-t pt-8 text-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">¿Interesado en esta oportunidad?</h3>
                        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                            Puedes contactarnos directamente a través de estos medios o llenar nuestro formulario de aplicación.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-medium text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md transition-colors">
                                <MessageSquare className="h-4 w-4 mr-2" /> Vía WhatsApp
                            </a>
                            <a href={mailLink} className="flex items-center text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition-colors">
                                <Mail className="h-4 w-4 mr-2" /> Enviar Correo
                            </a>
                            <button onClick={() => onApply(job.title)} className="flex items-center text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-md transition-colors">
                                <FileText className="h-4 w-4 mr-2" /> Llenar Formulario
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default JobDetailPage;