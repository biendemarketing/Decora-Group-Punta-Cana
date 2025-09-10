import React from 'react';

interface FooterLogoProps {
  src: string;
}

const FooterLogo: React.FC<FooterLogoProps> = ({ src }) => {
  return (
    <a href="#" className="flex items-center gap-3" aria-label="Decora Group Home">
       <img 
          src={src}
          alt="Decora Group Footer Logo"
          className="h-16"
        />
    </a>
  );
};

export default FooterLogo;