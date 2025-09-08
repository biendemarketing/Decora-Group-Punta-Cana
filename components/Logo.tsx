import React from 'react';

const Logo: React.FC = () => {
  return (
    <button className="flex items-center gap-2 cursor-pointer">
      <img 
        src="https://firebasestorage.googleapis.com/v0/b/drossmediapro.appspot.com/o/decora%20group%2FLogo%20Decora%20Group-01.png?alt=media&token=790f60ef-0216-4181-ac70-bf781394543a"
        alt="Decora Group Logo"
        className="h-14"
      />
    </button>
  );
};

export default Logo;