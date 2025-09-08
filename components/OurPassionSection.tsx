import React from 'react';

const OurPassionSection: React.FC = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-red-500 font-semibold tracking-widest uppercase">Nuestra Pasión</span>
          <h2 className="mt-2 text-4xl font-bold text-gray-900">
            Proyectos hechos con calidad y criterio
          </h2>
        </div>
        <p className="text-lg text-gray-600 text-center leading-relaxed">
          Trabajamos con estándares internacionales de fabricación utilizando casi en su 100% materiales resistentes a la humedad, construimos 100% modular, optimizando cada espacio y respetando los principios estéticos de los diseños aprobados. Completa nuestros formularios y recibe una cotización instantáneamente.
        </p>
      </div>
    </section>
  );
};

export default OurPassionSection;