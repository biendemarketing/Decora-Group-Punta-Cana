import React from 'react';
import QuoteHero from './QuoteHero';
import ProjectTypeSelector from './ProjectTypeSelector';
import OurPassionSection from './OurPassionSection';

interface CustomQuotePageProps {
  onSelectQuoteType: (type: string) => void;
}

const CustomQuotePage: React.FC<CustomQuotePageProps> = ({ onSelectQuoteType }) => {
  return (
    <main>
      <QuoteHero />
      <ProjectTypeSelector onSelectQuoteType={onSelectQuoteType} />
      <OurPassionSection />
    </main>
  );
};

export default CustomQuotePage;