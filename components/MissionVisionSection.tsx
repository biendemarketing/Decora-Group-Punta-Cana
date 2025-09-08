import React from 'react';
import { Eye, Target } from 'lucide-react';

const MissionVisionSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="text-center">
          <div className="inline-block p-4 bg-white rounded-full shadow-md mb-4">
            <Target className="h-10 w-10 text-[#5a1e38]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Misión</h2>
          <p className="mt-2 text-gray-600">
            Crear muebles y espacios que inspiren la vida cotidiana, combinando diseño innovador, funcionalidad excepcional y artesanía de la más alta calidad para superar las expectativas de nuestros clientes.
          </p>
        </div>
        <div className="text-center">
          <div className="inline-block p-4 bg-white rounded-full shadow-md mb-4">
            <Eye className="h-10 w-10 text-[#5a1e38]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Visión</h2>
          <p className="mt-2 text-gray-600">
            Ser la empresa líder en diseño y fabricación de mobiliario a medida en el Caribe, reconocida por nuestra excelencia, sostenibilidad y por transformar las ideas de nuestros clientes en realidades tangibles y duraderas.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
