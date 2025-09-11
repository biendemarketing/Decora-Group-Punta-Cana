import React from 'react';

interface LocationMapProps {
    title: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ title }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <div className="mt-6 rounded-lg overflow-hidden border border-gray-200 h-80">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.3208858743023!2d-68.4174428!3d18.6046314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ea8eddd3399ddf1%3A0xf35faff73c90d5ab!2sDecora%20Group%20Punta%20Cana!5e0!3m2!1ses-419!2sdo!4v1757563731937!5m2!1ses-419!2sdo"
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