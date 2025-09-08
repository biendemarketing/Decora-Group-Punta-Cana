import React from 'react';
import { CLIENT_LOGOS } from '../constants';

const ClientLogos: React.FC = () => {
  return (
    <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900">Clientes que Confían en Nosotros</h2>
        <p className="mt-4 text-lg text-gray-600">
          Construimos relaciones duraderas basadas en la calidad y la confianza.
        </p>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {CLIENT_LOGOS.map((logo, index) => (
            <div key={index} className="flex justify-center">
              <img src={logo.url} alt={logo.alt} className="h-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
