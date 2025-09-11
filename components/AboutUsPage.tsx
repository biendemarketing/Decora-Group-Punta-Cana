import React from 'react';
import TimelineSection from './TimelineSection';
import MissionVisionSection from './MissionVisionSection';
import ValuesSection from './ValuesSection';
import ClientLogos from './ClientLogos';
import WhyChooseUs from './WhyChooseUs';
import TeamSection from './TeamSection';
import HiringCTA from './HiringCTA';
import { Page, PageSection, JobVacancy } from '../types';

interface GenericPageProps {
  page: Page;
  onViewJobDetail: (job: JobVacancy) => void;
  onApplyForJob: (jobTitle: string) => void;
}

const HistorySection: React.FC<{ content: any }> = ({ content }) => (
  <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gray-50">
    <h2 className="text-4xl font-bold text-gray-900">{content.title}</h2>
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

const TextBlockSection: React.FC<{ content: any }> = ({ content }) => (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto prose lg:prose-xl text-gray-700">
            <h2 className="text-gray-900">{content.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: content.text }} />
        </div>
    </section>
);

const GallerySection: React.FC<{ content: any }> = ({ content }) => (
     <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{content.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {content.images.map((image: {id: string, url: string, alt: string}) => (
                    <div key={image.id} className="overflow-hidden rounded-lg shadow-lg aspect-w-1 aspect-h-1">
                        <img src={image.url} alt={image.alt} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300" />
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const HeroSection: React.FC<{ content: any }> = ({ content }) => (
  <section className="relative bg-cover bg-center h-96 flex items-center justify-center text-white" style={{ backgroundImage: `url('${content.imageUrl}')` }}>
    <div className="absolute inset-0 bg-black/50"></div>
    <div className="relative z-10 text-center px-4">
      <h1 className="text-5xl font-bold">{content.title}</h1>
      <p className="mt-4 text-xl">{content.subtitle}</p>
      {content.buttonText && <button className="mt-8 px-8 py-3 bg-[#5a1e38] rounded-md font-semibold hover:bg-[#4d182e] transition-colors">{content.buttonText}</button>}
    </div>
  </section>
);

const CtaSection: React.FC<{ content: any }> = ({ content }) => (
  <section className="bg-[#5a1e38]">
    <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-white sm:text-4xl">
        <span className="block">{content.title}</span>
      </h2>
      <a href={content.buttonLink} className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#5a1e38] bg-white hover:bg-gray-100 sm:w-auto">
        {content.buttonText}
      </a>
    </div>
  </section>
);


const sectionComponentMap: { [key: string]: React.FC<any> } = {
  history: HistorySection,
  timeline: ({ content }) => <TimelineSection events={content.events} />,
  missionVision: ({ content }) => <MissionVisionSection content={content} />,
  values: ({ content }) => <ValuesSection values={content.values} />,
  team: ({ content }) => <TeamSection members={content.members} />,
  hiring: ({ content, onViewJobDetail, onApplyForJob }) => <HiringCTA content={content} onViewJobDetail={onViewJobDetail} onApplyForJob={onApplyForJob} />,
  clients: () => <ClientLogos />,
  whyChooseUs: () => <WhyChooseUs />,
  textBlock: TextBlockSection,
  gallery: GallerySection,
  hero: HeroSection,
  cta: CtaSection,
  // Placeholders for other new types
  featureGrid: ({ content }) => <div className="p-8 text-center bg-gray-100">Feature Grid Section: {content.title}</div>,
  testimonials: ({ content }) => <div className="p-8 text-center bg-gray-200">Testimonials Section: {content.title}</div>,
};


const GenericPage: React.FC<GenericPageProps> = ({ page, onViewJobDetail, onApplyForJob }) => {
  return (
    <main className="bg-white">
      {page.sections.map((section: PageSection) => {
        const Component = sectionComponentMap[section.type];
        if (!Component) {
          console.warn(`No component found for section type: ${section.type}`);
          return null;
        }
        
        const props: any = { content: section.content };
        // Pass specific handlers only to the components that need them
        if (section.type === 'hiring') {
            props.onViewJobDetail = onViewJobDetail;
            props.onApplyForJob = onApplyForJob;
        }
        return <Component key={section.id} {...props} />;
      })}
    </main>
  );
};

export default GenericPage;