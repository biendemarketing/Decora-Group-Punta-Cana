import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactInfo: React.FC = () => {
  const contactDetails = [
    { icon: Phone, title: 'Teléfono', value: '(849) 456-1963' },
    { icon: Mail, title: 'Email', value: 'decoragrouppc@gmail.com' },
    { icon: MapPin, title: 'Ubicación', value: 'CANATOWN Plaza & Centro de Logística, Av. Barceló, local 101, Veron, Punta Cana 23000' },
    { icon: Clock, title: 'Horarios', value: 'Lunes - Viernes: 9:00 AM - 6:00 PM | Sábados: 9:00 AM - 4:00 PM | Domingos: Cerrado' }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">Información de Contacto</h2>
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
