import React from 'react';
import QuoteHero from './QuoteHero';
import ProjectTypeSelector from './ProjectTypeSelector';
import OurPassionSection from './OurPassionSection';
import { QuoteType } from '../types';

interface CustomQuotePageProps {
  projectTypes: QuoteType[];
  onSelectQuoteType: (type: string) => void;
}

const CustomQuotePage: React.FC<CustomQuotePageProps> = ({ projectTypes, onSelectQuoteType }) => {
  return (
    <main>
      <QuoteHero />
      <ProjectTypeSelector projectTypes={projectTypes} onSelectQuoteType={onSelectQuoteType} />
      <OurPassionSection />
    </main>
  );
};

export default CustomQuotePage;