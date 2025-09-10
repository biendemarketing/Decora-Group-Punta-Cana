
import React from 'react';
import type { Product } from '../types';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCurrency, useCart, useWishlist } from '../App';

interface ProductCardProps {
  product: Product;
  onProductSelect: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductSelect }) => {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isProductInWishlist } = useWishlist();
  
  const isInWishlist = isProductInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigating to product page
    addToCart(product, 1);
  };
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div 
      className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      <div 
        className="aspect-w-1 aspect-h-1 w-full overflow-hidden cursor-pointer"
        onClick={() => onProductSelect(product)}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        <button 
          onClick={handleWishlistToggle} 
          className="absolute top-3 right-3 bg-white/70 p-2 rounded-full text-gray-500 hover:text-red-500 hover:bg-white transition-all z-10"
          aria-label={isInWishlist ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          <Heart className={`h-5 w-5 transition-all ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end">
            <button 
                onClick={handleAddToCart}
                className="flex items-center gap-2 bg-[#5a1e38] text-white text-sm font-semibold px-4 py-2 rounded-md shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#4d182e]"
            >
                <ShoppingCart className="h-4 w-4" />
                Añadir al carrito
            </button>
        </div>

      </div>
      <div 
        className="p-4 flex flex-col flex-grow cursor-pointer"
        onClick={() => onProductSelect(product)}
      >
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
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
