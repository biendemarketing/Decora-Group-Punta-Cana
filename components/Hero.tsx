
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../constants';

interface HeroProps {
  onQuoteClick: () => void;
  onProjectsClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onQuoteClick, onProjectsClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? HERO_SLIDES.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === HERO_SLIDES.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  return (
    <div className="relative bg-gray-800 h-[60vh] min-h-[500px] w-full overflow-hidden">
      {/* Slides container */}
      <div className="absolute inset-0">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${currentIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            style={{ backgroundImage: `url('${slide.imageUrl}')` }}
          >
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>
        ))}
      </div>

      {/* Text content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight drop-shadow-lg">
          <span className="block">{HERO_SLIDES[currentIndex].title}</span>
        </h1>
        <p className="mt-4 text-xl sm:text-2xl text-gray-200 drop-shadow-md max-w-3xl">
          {HERO_SLIDES[currentIndex].subtitle}
        </p>
        
         <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={onQuoteClick}
              className="px-8 py-3 bg-[#5a1e38] text-white font-semibold rounded-md shadow-lg hover:bg-[#4d182e] transform hover:scale-105 transition-all duration-300"
            >
              Cotización automática
            </button>
            <button
              onClick={onProjectsClick}
              className="px-8 py-3 bg-black/30 backdrop-blur-sm text-white font-semibold rounded-md shadow-lg border border-white/20 hover:bg-white/20 transform hover:scale-105 transition-all duration-300"
            >
              Ver proyectos
            </button>
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 z-30 p-2 bg-white/20 rounded-full text-white hover:bg-white/40 transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 z-30 p-2 bg-white/20 rounded-full text-white hover:bg-white/40 transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Carousel Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
        {HERO_SLIDES.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;