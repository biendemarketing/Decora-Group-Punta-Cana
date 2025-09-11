import React from 'react';
import TimelineSection from './TimelineSection';
import MissionVisionSection from './MissionVisionSection';
import ValuesSection from './ValuesSection';
import ClientLogos from './ClientLogos';
import WhyChooseUs from './WhyChooseUs';
import TeamSection from './TeamSection';
import HiringCTA from './HiringCTA';
import ContactForm from './ContactForm';
import { AboutUsPageContent } from '../types';

interface AboutUsPageProps {
  content: AboutUsPageContent;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ content }) => {
  return (
    <main className="bg-white">
      {/* Nuestra Historia Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-900">{content.historySection.title}</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
          {content.historySection.text}
        </p>
        {/* Gallery Section */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {content.historySection.images.map((image) => (
              <div key={image.id} className="overflow-hidden rounded-lg shadow-lg aspect-w-1 aspect-h-1">
                <img src={image.url} alt={image.alt} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <TimelineSection events={content.timeline} />
      <MissionVisionSection content={content.missionVision} />
      <ValuesSection values={content.values} />
      <ClientLogos />
      <WhyChooseUs />
      <TeamSection members={content.team} />
      <HiringCTA content={content.hiring} />
    </main>
  );
};

export default AboutUsPage;