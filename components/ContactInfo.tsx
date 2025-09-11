import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { ContactContent } from '../types';

interface ContactInfoProps {
  content: ContactContent;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ content }) => {
  const contactDetails = [
    { icon: Phone, title: 'Teléfono', value: content.phone },
    { icon: Mail, title: 'Email', value: content.email },
    { icon: MapPin, title: 'Ubicación', value: content.address },
    { icon: Clock, title: 'Horarios', value: content.hours }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">{content.infoTitle}</h2>
      <div className="mt-6 space-y-4">
        {contactDetails.map((item, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-[#fdecef] rounded-full">
              <item.icon className="h-5 w-5 text-[#5a1e38]" />
            </div>
            <div className="ml-4">
              <p className="text-base font-semibold text-gray-900">{item.title}</p>
              <p className="mt-1 text-sm text-gray-600 whitespace-pre-line">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;