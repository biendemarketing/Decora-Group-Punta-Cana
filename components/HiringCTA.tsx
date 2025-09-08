import React from 'react';
import { JOB_VACANCIES } from '../constants';
import JobListing from './JobListing';

const HiringCTA: React.FC = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900">¿Necesitas Empleo? ¡Estamos Contratando!</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Únete a nuestro equipo de apasionados por el diseño y la artesanía. Buscamos talento para seguir creciendo juntos.
        </p>
        
        <div className="mt-12 space-y-4 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-800 text-left">Vacantes Disponibles</h3>
          {JOB_VACANCIES.map((job) => (
            <JobListing key={job.title} vacancy={job} />
          ))}
        </div>

        <div className="mt-10">
          <p className="text-gray-600">¿No ves una posición para ti? Siempre estamos buscando personas con talento. <br/> Envíanos tu currículum a nuestro correo electrónico.</p>
        </div>
      </div>
    </section>
  );
};

export default HiringCTA;