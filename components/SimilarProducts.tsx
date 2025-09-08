import React from 'react';
import type { Product } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SimilarProductsProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

const SimilarProductCard: React.FC<{ product: Product, onProductSelect: (product: Product) => void }> = ({ product, onProductSelect }) => (
  <button onClick={() => onProductSelect(product)} className="group w-64 flex-shrink-0 text-left">
    <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
      <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" />
    </div>
    <h3 className="mt-2 text-sm font-medium text-gray-800">{product.name}</h3>
    <p className="mt-1 text-base font-bold text-gray-900">{product.price.toLocaleString()} €</p>
  </button>
);

const SimilarProducts: React.FC<SimilarProductsProps> = ({ products, onProductSelect }) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.offsetWidth * 0.8;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      <div ref={scrollContainerRef} className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
        {products.map(product => (
          <SimilarProductCard key={product.id} product={product} onProductSelect={onProductSelect} />
        ))}
      </div>
      <button onClick={() => scroll('left')} className="absolute top-1/3 -left-5 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-all z-10 hidden md:flex">
        <ChevronLeft className="h-6 w-6 text-gray-700" />
      </button>
      <button onClick={() => scroll('right')} className="absolute top-1/3 -right-5 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-all z-10 hidden md:flex">
        <ChevronRight className="h-6 w-6 text-gray-700" />
      </button>
       <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    `}</style>
    </div>
  );
};

export default SimilarProducts;