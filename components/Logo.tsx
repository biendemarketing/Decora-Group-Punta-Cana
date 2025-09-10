import React from 'react';

interface LogoProps {
  src: string;
}

const Logo: React.FC<LogoProps> = ({ src }) => {
  return (
    <button className="flex items-center gap-2 cursor-pointer">
      <img 
        src={src}
        alt="Decora Group Logo"
        className="h-14"
      />
    </button>
  );
};

export default Logo;