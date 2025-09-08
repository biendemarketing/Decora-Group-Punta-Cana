
import React from 'react';
import { STORES } from '../constants';
import { Sofa, Building, Home } from 'lucide-react';

const PartnerLogos: React.FC = () => {
  const icons = [<Sofa key="1"/>, <Building key="2"/>, <Home key="3"/>, <Sofa key="4"/>];
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-semibold text-gray-800">Nuestras Tiendas Aliadas</h2>
        <div className="mt-8 flow-root">
          <div className="-mt-4 -ml-8 flex flex-wrap justify-center lg:-ml-4">
            {STORES.map((store, index) => (
              <div key={store} className="mt-4 ml-8 flex flex-grow flex-shrink-0 items-center justify-center lg:ml-4 lg:flex-grow-0">
                 <div className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors">
                    <span className="h-8 w-8">{icons[index % icons.length]}</span>
                    <span className="font-medium text-lg">{store}</span>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogos;
