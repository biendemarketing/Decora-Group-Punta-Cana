import React, { useState } from 'react';
import { NavigationData } from '../types';
import { ChevronDown } from 'lucide-react';

interface FAQPageProps {
  faqContent: NavigationData['faqContent'];
}

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-5 text-left"
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        <ChevronDown className={`h-6 w-6 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pb-5 pr-12">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQPage: React.FC<FAQPageProps> = ({ faqContent }) => {
  return (
    <main className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">{faqContent.title}</h1>
          <p className="mt-4 text-xl text-gray-600">{faqContent.subtitle}</p>
        </div>
        <div className="space-y-4">
          {faqContent.faqs.map(faq => (
            <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default FAQPage;