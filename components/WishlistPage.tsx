
import React from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '../App';
import ProductGrid from './ProductGrid';
import { Product } from '../types';

interface WishlistPageProps {
  onProductSelect: (product: Product) => void;
}

const WishlistPage: React.FC<WishlistPageProps> = ({ onProductSelect }) => {
  const { wishlistItems } = useWishlist();

  return (
    <main className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mi Lista de Deseos</h1>

        {wishlistItems.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-lg shadow">
            <Heart className="mx-auto h-16 w-16 text-gray-400" />
            <h2 className="mt-4 text-xl font-semibold text-gray-800">Tu lista de deseos está vacía</h2>
            <p className="mt-2 text-gray-600">
              Guarda los productos que te encantan haciendo clic en el corazón.
            </p>
          </div>
        ) : (
          <ProductGrid products={wishlistItems} onProductSelect={onProductSelect} />
        )}
      </div>
    </main>
  );
};

export default WishlistPage;
