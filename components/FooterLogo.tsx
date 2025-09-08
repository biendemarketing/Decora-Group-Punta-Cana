import React from 'react';

const FooterLogo: React.FC = () => {
  return (
    <a href="#" className="flex items-center gap-3" aria-label="Decora Group Home">
       <img 
          src="https://firebasestorage.googleapis.com/v0/b/drossmediapro.appspot.com/o/decora%20group%2FLogo%20Decora%20Group-02.png?alt=media&token=26271fa9-9ba9-42c7-8804-fc47a85b5159"
          alt="Decora Group Footer Logo"
          className="h-16"
        />
    </a>
  );
};

export default FooterLogo;