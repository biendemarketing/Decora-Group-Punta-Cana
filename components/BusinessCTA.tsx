
import React from 'react';

const BusinessCTA: React.FC = () => {
  return (
    <div className="bg-green-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span className="block">¿Tienes una tienda de muebles?</span>
          <span className="block text-green-200">Únete a la red Decora Group.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-800 bg-white hover:bg-green-50"
            >
              Llega a miles de clientes
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCTA;
