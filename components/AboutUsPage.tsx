import React from 'react';
import TimelineSection from './TimelineSection';
import MissionVisionSection from './MissionVisionSection';
import ValuesSection from './ValuesSection';
import ClientLogos from './ClientLogos';
import WhyChooseUs from './WhyChooseUs';
import TeamSection from './TeamSection';
import HiringCTA from './HiringCTA';
import { AboutUsPageContent, PageSection } from '../types';

interface AboutUsPageProps {
  content: AboutUsPageContent;
}

const HistorySection: React.FC<{ content: any }> = ({ content }) => (
  <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gray-50">
    <h1 className="text-4xl font-bold text-gray-900">{content.title}</h1>
    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">{content.text}</p>
    <div className="mt-12 max-w-5xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {content.images.map((image: any) => (
          <div key={image.id} className="overflow-hidden rounded-lg shadow-lg aspect-w-1 aspect-h-1">
            <img src={image.url} alt={image.alt} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const sectionComponentMap: { [key: string]: React.FC<any> } = {
  history: HistorySection,
  timeline: ({ content }) => <TimelineSection events={content.events} />,
  missionVision: ({ content }) => <MissionVisionSection content={content} />,
  values: ({ content }) => <ValuesSection values={content.values} />,
  team: ({ content }) => <TeamSection members={content.members} />,
  hiring: ({ content }) => <HiringCTA content={content} />,
  clients: () => <ClientLogos />,
  whyChooseUs: () => <WhyChooseUs />,
};


const AboutUsPage: React.FC<AboutUsPageProps> = ({ content }) => {
  return (
    <main className="bg-white">
      {content.sections.map((section: PageSection) => {
        const Component = sectionComponentMap[section.type];
        return Component ? <Component key={section.id} content={section.content} /> : null;
      })}
    </main>
  );
};

export default AboutUsPage;