import React from 'react';
import { WORK_PROCESS_STEPS } from '../constants';
import { FileText, Edit3, ShieldCheck, BookOpen } from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  FileText,
  Edit3,
  ShieldCheck,
  BookOpen,
};

const WorkProcessSection: React.FC = () => {
  return (
    <section 
      className="relative bg-cover bg-center py-20 px-4 sm:px-6 lg:px-8 bg-fixed" 
      style={{ backgroundImage: "url('https://picsum.photos/id/1071/1920/1080')" }}
    >
      <div className="absolute inset-0 bg-[#5a1e38]/90"></div>
      <div className="relative max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-16">Proceso de Trabajo con Decora Group</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {WORK_PROCESS_STEPS.map((step, index) => {
            const Icon = iconMap[step.icon];
            return (
              <div key={step.title} className="bg-gray-50/95 backdrop-blur-sm text-gray-800 rounded-lg shadow-xl p-8 flex flex-col items-center text-center transition-transform hover:scale-105">
                <div className="bg-[#fdecef] text-[#5a1e38] rounded-lg p-4 mb-6">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-[#5a1e38]">{`${index + 1}. ${step.title}`}</h3>
                <p className="mt-4 text-gray-600">
                  {index === 0 ? (
                     <>
                      A través de nuestra{' '}
                      <a href="#" className="text-blue-600 hover:underline">
                        plataforma digital
                      </a>{' '}
                      o enviando los planos y solicitando visita de reconocimiento.
                    </>
                  ) : (
                    step.description
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkProcessSection;