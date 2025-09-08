import React from 'react';

const HiringCTA: React.FC = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center bg-gray-100 p-10 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900">¿Necesitas Empleo? ¡Estamos Contratando!</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Únete a nuestro equipo de apasionados por el diseño y la artesanía. Buscamos talento para seguir creciendo juntos.
        </p>
        <div className="mt-8">
          <a
            href="mailto:info@decoragroup.pc"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#5a1e38] hover:bg-[#4d182e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5a1e38] transition-colors"
          >
            Enviar Curriculum
          </a>
        </div>
      </div>
    </section>
  );
};

export default HiringCTA;
