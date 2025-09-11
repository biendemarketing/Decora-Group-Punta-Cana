
import React, { useState, useEffect, useRef } from 'react';
import TimelineSection from './TimelineSection';
import MissionVisionSection from './MissionVisionSection';
import ValuesSection from './ValuesSection';
import ClientLogos from './ClientLogos';
import WhyChooseUs from './WhyChooseUs';
import TeamSection from './TeamSection';
import HiringCTA from './HiringCTA';
import { Page, PageSection, JobVacancy, SectionType } from '../types';

interface GenericPageProps {
  pageData: Page;
  onViewJobDetail: (job: JobVacancy) => void;
  onApplyForJob: (jobTitle: string) => void;
}

const AnimatedSection: React.FC<{ children: React.ReactNode; index: number }> = ({ children, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`transition-opacity duration-1000 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {children}
    </div>
  );
};


const HistorySection: React.FC<{ content: any }> = ({ content }) => (
  <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gray-50">
    <h2 className="text-4xl font-bold text-gray-900">{content.title}</h2>
    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">{content.text}</p>
    <div className="mt-12 max-w-5xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {content.images.map((image: any) => (
          <div key={image.id} className="aspect-w-1 aspect-h-1">
            <img src={image.url} alt={image.alt} className="object-cover rounded-lg shadow-md w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Map section types to their respective components
const sectionComponents: { [key in SectionType]?: React.FC<any> } = {
  history: ({ content }) => <HistorySection content={content} />,
  timeline: ({ content }) => <TimelineSection events={content.events} />,
  missionVision: ({ content }) => <MissionVisionSection content={content} />,
  values: ({ content }) => <ValuesSection values={content.values} />,
  team: ({ content }) => <TeamSection members={content.members} />,
  hiring: ({ content, onViewJobDetail, onApplyForJob }) => <HiringCTA content={content} onViewJobDetail={onViewJobDetail} onApplyForJob={onApplyForJob} />,
  clients: () => <ClientLogos />,
  whyChooseUs: () => <WhyChooseUs />,
};


const GenericPage: React.FC<GenericPageProps> = ({ pageData, onViewJobDetail, onApplyForJob }) => {
  return (
    <main>
      {pageData.sections.map((section, index) => {
        const SectionComponent = sectionComponents[section.type];
        if (!SectionComponent) {
            return (
                <div key={section.id} className="py-10 text-center bg-red-100 text-red-700">
                    Advertencia: Componente para la sección de tipo '<strong>{section.type}</strong>' no está implementado.
                </div>
            );
        }
        
        return (
          <AnimatedSection key={section.id} index={index}>
            <SectionComponent content={section.content} onViewJobDetail={onViewJobDetail} onApplyForJob={onApplyForJob} />
          </AnimatedSection>
        );
      })}
    </main>
  );
};

export default GenericPage;
