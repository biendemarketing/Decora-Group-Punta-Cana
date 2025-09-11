import React from 'react';
import { CompanyValue } from '../types';
import { Check, Heart, Scale, Leaf } from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  Check, Heart, Scale, Leaf
};

interface ValuesSectionProps {
    values: CompanyValue[];
}

const ValuesSection: React.FC<ValuesSectionProps> = ({ values }) => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900">Nuestros Valores</h2>
        <p className="mt-4 text-lg text-gray-600">
          Los principios que guían cada uno de nuestros proyectos y decisiones.
        </p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {values.map(value => {
            const Icon = iconMap[value.icon];
            return (
              <div key={value.id} className="flex flex-col items-center">
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-[#fdecef] mb-4">
                  {Icon && <Icon className="h-10 w-10 text-[#5a1e38]" />}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{value.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;