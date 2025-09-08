import React from 'react';
import TimelineSection from './TimelineSection';
import MissionVisionSection from './MissionVisionSection';
import ValuesSection from './ValuesSection';
import ClientLogos from './ClientLogos';
import WhyChooseUs from './WhyChooseUs';
import TeamSection from './TeamSection';
import HiringCTA from './HiringCTA';
import ContactForm from './ContactForm';

const AboutUsPage: React.FC = () => {
  return (
    <main className="bg-white">
      {/* Nuestra Historia Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-900">Nuestra Historia</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
          Desde nuestros humildes comienzos hasta convertirnos en un referente del diseño y la fabricación de muebles en Punta Cana, nuestra pasión por la artesanía y la calidad ha sido el motor de nuestro crecimiento. Creemos en la creación de espacios que no solo son hermosos, sino también funcionales y duraderos.
        </p>
      </section>

      <TimelineSection />
      <MissionVisionSection />
      <ValuesSection />
      <ClientLogos />
      <WhyChooseUs />
      <TeamSection />
      <HiringCTA />
      <section className="py-16 bg-gray-50">
        <ContactForm />
      </section>
    </main>
  );
};

export default AboutUsPage;