import React from 'react';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  services: ServiceItem[];
  onSelectQuoteType: (type: string) => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onSelectQuoteType }) => {
  return (
    <section className="bg-[#5a1e38] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 items-stretch">
          
          {services.map((service) => (
            <div key={service.id} className="bg-white text-gray-800 rounded-lg shadow-xl p-8 flex flex-col items-center text-center transition-transform hover:scale-105">
              <img src={service.imageUrl} alt={`Servicio de ${service.title} por Decora Group`} className="h-24 object-contain mb-6" />
              <h3 className="text-2xl font-bold text-[#5a1e38]">{service.title}</h3>
              <p className="mt-2 text-gray-600 flex-grow">{service.description}</p>
              {service.buttonText && (
                <button 
                  onClick={() => onSelectQuoteType(service.quoteType)}
                  className="mt-6 bg-white border border-[#5a1e38] text-[#5a1e38] font-semibold py-2 px-6 rounded-lg hover:bg-[#5a1e38] hover:text-white transition-colors"
                >
                  {service.buttonText}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;