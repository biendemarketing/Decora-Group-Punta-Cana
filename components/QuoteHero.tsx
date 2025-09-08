import React from 'react';

const QuoteHero: React.FC = () => {
  return (
    <section 
      className="relative bg-cover bg-center h-80 flex items-center justify-center text-white"
      style={{ backgroundImage: "url('https://picsum.photos/id/1071/1920/1080')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl font-bold">Cotiza tu Proyecto</h1>
        <div className="w-20 h-0.5 bg-white mx-auto my-4"></div>
        <p className="max-w-xl mx-auto text-lg text-gray-200">
          Recibe el estimado para la realización de tu proyecto de cocina o mobiliario personalizado.
        </p>
      </div>
    </section>
  );
};

export default QuoteHero;