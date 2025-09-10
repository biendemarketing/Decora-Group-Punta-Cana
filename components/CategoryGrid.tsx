import React from 'react';
import { PopularCategory } from '../types';

interface CategoryGridProps {
  popularCategories: PopularCategory[];
  onSelectCategory: (categoryName: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ popularCategories, onSelectCategory }) => {
  return (
    <div className="bg-gray-50 py-10">
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
