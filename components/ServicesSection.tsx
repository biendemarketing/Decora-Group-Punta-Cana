import React from 'react';
import { SERVICES_DATA } from '../constants';

interface ServicesSectionProps {
  onSelectQuoteType: (type: string) => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectQuoteType }) => {
  return (
    <section className="bg-[#5a1e38] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Intro Text */}
          <div className="flex flex-col justify-center text-white p-8 md:p-0">
            <h2 className="text-4xl font-bold">Nuestros Servicios</h2>
            <p className="mt-4 text-lg text-gray-200">
              Construimos con estandares modulares 100% lo que permite que nuestras creaciones sean trasladables y más duraderas.
            </p>
          </div>
          
          {/* Service Cards */}
          {SERVICES_DATA.map((service) => (
            <div key={service.title} className="bg-white text-gray-800 rounded-lg shadow-xl p-8 flex flex-col items-center text-center transition-transform hover:scale-105">
              <img src={service.imageUrl} alt={`Servicio de ${service.title} por Decora Group`} className="h-32 object-contain mb-6" />
              <h3 className="text-2xl font-bold text-[#5a1e38]">{service.title}</h3>
              <p className="mt-2 text-gray-600 flex-grow">{service.description}</p>
              {service.buttonText && (
                <button 
                  onClick={() => onSelectQuoteType(service.quoteType)}
                  className="mt-6 bg-[#5a1e38] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#4d182e] transition-colors"
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