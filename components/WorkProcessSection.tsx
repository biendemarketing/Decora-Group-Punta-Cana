import React from 'react';
import { WorkProcessSection as WorkProcessSectionType } from '../types';
import { FileText, Edit3, ShieldCheck, BookOpen } from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  FileText,
  Edit3,
  ShieldCheck,
  BookOpen,
};

interface WorkProcessSectionProps {
  workProcessSection: WorkProcessSectionType;
}

const WorkProcessSection: React.FC<WorkProcessSectionProps> = ({ workProcessSection }) => {
  if (!workProcessSection) {
    return null; // Return nothing if the whole section data is missing
  }

  const { title, backgroundImageUrl, steps = [] } = workProcessSection;

  return (
    <section 
      className="relative bg-cover bg-center py-20 px-4 sm:px-6 lg:px-8 bg-fixed" 
      style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
    >
      <div className="absolute inset-0 bg-[#5a1e38]/90"></div>
      <div className="relative max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-16">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = iconMap[step.icon];
            return (
              <div key={step.id} className="bg-gray-50/95 backdrop-blur-sm text-gray-800 rounded-lg shadow-xl p-8 flex flex-col items-center text-center transition-transform hover:scale-105">
                <div className="bg-[#fdecef] text-[#5a1e38] rounded-lg p-4 mb-6">
                  {Icon && <Icon className="h-8 w-8" />}
                </div>
                <h3 className="text-xl font-bold text-[#5a1e38]">{`${index + 1}. ${step.title}`}</h3>
                <p className="mt-4 text-gray-600">
                  {step.description}
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