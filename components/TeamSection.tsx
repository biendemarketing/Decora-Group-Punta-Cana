import React from 'react';
import { TEAM_MEMBERS } from '../constants';

const TeamSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900">Conoce a Nuestro Equipo</h2>
        <p className="mt-4 text-lg text-gray-600">
          El talento y la dedicación detrás de cada proyecto exitoso.
        </p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {TEAM_MEMBERS.map(member => (
            <div key={member.name} className="flex flex-col items-center">
              <img src={member.imageUrl} alt={member.name} className="h-36 w-36 rounded-full object-cover shadow-lg mb-4" />
              <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
              <p className="text-sm text-[#5a1e38] font-semibold">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
