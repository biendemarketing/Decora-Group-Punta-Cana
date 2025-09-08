import React from 'react';
import type { Product } from '../types';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onProductSelect: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductSelect }) => {
  return (
    <div 
      className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col cursor-pointer"
      onClick={() => onProductSelect(product)}
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        <button 
          onClick={(e) => { e.stopPropagation(); /* handle favorite */ }} 
          className="absolute top-3 right-3 bg-white/70 p-2 rounded-full text-gray-500 hover:text-red-500 hover:bg-white transition-all"
        >
          <Heart className="h-5 w-5" />
        </button>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-base font-semibold text-gray-800">
          {product.name}
        </h3>
        {product.description && (
          <p className="mt-1 text-sm text-gray-500 h-10 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="flex-grow"></div>
        <p className="text-lg font-bold text-gray-900 mt-2">
          RD${product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;