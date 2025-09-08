import React from 'react';
import { WHY_CHOOSE_US_POINTS } from '../constants';
import { Gem, Lightbulb, Award, Handshake, TrendingUp, Users } from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  Gem, Lightbulb, Award, Handshake, TrendingUp, Users
};

const WhyChooseUs: React.FC = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900">¿Por Qué Elegirnos?</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Nuestro compromiso es con la excelencia. Te ofrecemos una experiencia única y resultados que superan tus expectativas.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US_POINTS.map(point => {
            const Icon = iconMap[point.icon];
            return (
              <div key={point.title} className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[#5a1e38] mb-5">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{point.title}</h3>
                <p className="mt-2 text-gray-600">{point.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
