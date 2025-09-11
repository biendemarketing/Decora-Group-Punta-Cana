import React, { useState, useEffect, useRef } from 'react';
import { PopularCategory } from '../types';

interface CategoryGridProps {
  popularCategories: PopularCategory[];
  onSelectCategory: (categoryName: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ popularCategories, onSelectCategory }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className={`bg-gray-50 py-10 transition-opacity duration-1000 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Categorías Populares</h2>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 gap-x-6">
          {popularCategories.map((category) => (
            <div key={category.id} className="group relative">
              <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden aspect-w-1 aspect-h-1 group-hover:opacity-75 transition-opacity duration-300">
                <img
                  src={category.imageUrl}
                  alt={`Muebles para ${category.name} de alta calidad`}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-800 text-center">
                <button onClick={() => onSelectCategory(category.link)} className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {category.name}
                </button>
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;