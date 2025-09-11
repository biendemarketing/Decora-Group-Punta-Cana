import React from 'react';
import ContactInfo from './ContactInfo';
import LocationMap from './LocationMap';
import ContactForm from './ContactForm';
import { ContactContent } from '../types';

// FIX: Added props to the component to make it dynamic and fix type errors.
interface ContactPageProps {
  content: ContactContent;
}

const ContactPage: React.FC<ContactPageProps> = ({ content }) => {
  return (
    <main className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Contáctanos</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Estamos aquí para hacer realidad tu proyecto. Conversemos sobre tus ideas.
          </p>
        </div>
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Column: Info & Map */}
            <div className="p-8 sm:p-10 lg:p-12 space-y-10">
              {/* FIX: Pass content prop to child components. */}
              <ContactInfo content={content} />
              <LocationMap title={content.mapTitle} />
            </div>
            {/* Right Column: Form */}
            <div className="p-8 sm:p-10 lg:p-12 bg-gray-50">
              <ContactForm content={content} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
