
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../constants';

const Hero: React.FC = () => {
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
    <div className="relative bg-gray-800 h-[50vh] min-h-[450px] w-full overflow-hidden">
      {/* Slides container */}
      <div className="absolute inset-0">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${currentIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            style={{ backgroundImage: `url('${slide.imageUrl}')` }}
          >
            <div className="absolute inset-0 bg-black opacity-30"></div>
          </div>
        ))}
      </div>

      {/* Text content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white flex flex-col items-center justify-center h-full">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`transition-opacity duration-1000 ease-in-out absolute ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block">{slide.title}</span>
            </h1>
            <p className="mt-4 text-2xl sm:text-3xl text-gray-200">
              {slide.subtitle}
            </p>
          </div>
        ))}
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