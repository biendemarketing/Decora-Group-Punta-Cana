import React from 'react';
import { AboutUsPageContent } from '../types';
import JobListing from './JobListing';

interface HiringCTAProps {
  content: AboutUsPageContent['hiring'];
}

const HiringCTA: React.FC<HiringCTAProps> = ({ content }) => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900">{content.title}</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          {content.text}
        </p>
        
        <div className="mt-12 space-y-4 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-800 text-left">Vacantes Disponibles</h3>
          {content.vacancies.map((job) => (
            <JobListing key={job.id} vacancy={job} />
          ))}
        </div>

        <div className="mt-10">
          <p className="text-gray-600 whitespace-pre-line">{content.closingText}</p>
        </div>
      </div>
    </section>
  );
};

export default HiringCTA;