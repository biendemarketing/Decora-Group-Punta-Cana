import React from 'react';
import type { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductSelect }) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-gray-300 rounded-lg bg-white">
        <h3 className="text-xl font-semibold text-gray-800">No se encontraron productos</h3>
        <p className="mt-2 text-gray-500">Intenta ajustar tus filtros para encontrar lo que buscas.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} onProductSelect={onProductSelect} index={index} />
      ))}
    </div>
  );
};

export default ProductGrid;