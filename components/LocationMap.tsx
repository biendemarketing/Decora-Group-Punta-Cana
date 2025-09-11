import React from 'react';

// FIX: Added props to the component to make it dynamic and fix type errors.
interface LocationMapProps {
    title: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ title }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <div className="mt-6 rounded-lg overflow-hidden border border-gray-200 h-80">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.226394592758!2d-68.45524192569762!3d18.69802446452814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ea8ed039886a10b%3A0x6b823e8f8a113d31!2sDecora%20Group%20Punta%20Cana!5e0!3m2!1sen!2sdo!4v1700000000000!5m2!1sen!2sdo"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación de Decora Group Punta Cana"
        ></iframe>
      </div>
    </div>
  );
};

export default LocationMap;
