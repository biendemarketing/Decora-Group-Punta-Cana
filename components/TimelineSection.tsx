import React from 'react';
import { TIMELINE_DATA } from '../constants';

const TimelineSection: React.FC = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nuestra Trayectoria</h2>
        <div className="relative">
          <div className="absolute left-1/2 w-0.5 h-full bg-gray-200 -translate-x-1/2"></div>
          {TIMELINE_DATA.map((item, index) => (
            <div key={item.year} className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-[#5a1e38] shadow-xl w-12 h-12 rounded-full">
                <h3 className="mx-auto font-semibold text-lg text-white">{item.year}</h3>
              </div>
              <div className={`order-1 ${index % 2 === 0 ? 'bg-[#fdecef]' : 'bg-gray-100'} rounded-lg shadow-xl w-5/12 px-6 py-4`}>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
