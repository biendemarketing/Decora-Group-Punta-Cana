
import React from 'react';
import { MapPin } from 'lucide-react';
import { PROVINCES } from '../constants';

const StoreFinder: React.FC = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <MapPin className="mx-auto h-12 w-12 text-[#5a1e38]" />
        <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
          Encuentra las mejores tiendas de muebles cerca de ti
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Selecciona tu provincia para descubrir las tiendas aliadas en tu área.
        </p>
        <div className="mt-8 max-w-md mx-auto">
          <select
            id="province"
            name="province"
            className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-[#5a1e38] focus:border-[#5a1e38] sm:text-sm rounded-md shadow-sm"
          >
            <option>Seleccionar provincia...</option>
            {PROVINCES.map((province) => (
              <option key={province}>{province}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default StoreFinder;