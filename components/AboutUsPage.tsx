import React from 'react';
import TimelineSection from './TimelineSection';
import MissionVisionSection from './MissionVisionSection';
import ValuesSection from './ValuesSection';
import ClientLogos from './ClientLogos';
import WhyChooseUs from './WhyChooseUs';
import TeamSection from './TeamSection';
import HiringCTA from './HiringCTA';
import ContactForm from './ContactForm';
import { OUR_HISTORY_IMAGES } from '../constants';

const AboutUsPage: React.FC = () => {
  return (
    <main className="bg-white">
      {/* Nuestra Historia Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-900">Nuestra Historia</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
          Desde nuestros humildes comienzos hasta convertirnos en un referente del diseño y la fabricación de muebles en Punta Cana, nuestra pasión por la artesanía y la calidad ha sido el motor de nuestro crecimiento. Creemos en la creación de espacios que no solo son hermosos, sino también funcionales y duraderos.
        </p>
        {/* Gallery Section */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {OUR_HISTORY_IMAGES.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-lg aspect-w-1 aspect-h-1">
                <img src={image.url} alt={image.alt} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <TimelineSection />
      <MissionVisionSection />
      <ValuesSection />
      <ClientLogos />
      <WhyChooseUs />
      <TeamSection />
      <HiringCTA />
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900">Ponte en Contacto</h2>
                <p className="mt-4 text-lg text-gray-600">¿Tienes alguna pregunta o un proyecto en mente? Nos encantaría saber de ti.</p>
            </div>
            <ContactForm />
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;