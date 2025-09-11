
import React, { useState } from 'react';
import type { Product } from '../types';
import { Star, Truck, ShieldCheck, CheckCircle, Package, Minus, Plus, Heart, XCircle } from 'lucide-react';
import { useCurrency, useCart, useWishlist } from '../App';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isProductInWishlist } = useWishlist();

  const isInWishlist = isProductInWishlist(product.id);
  
  const benefits = [
    { icon: Truck, text: "Entrega y subida a domicilio gratis" },
    { icon: CheckCircle, text: "Devolución gratuita" },
    { icon: Package, text: "Sin pago por adelantado" },
    { icon: ShieldCheck, text: "365 días - garantía" },
  ];

  const handleAddToCart = () => {
    if (!product.isAvailable) return;
    addToCart(product, quantity);
    // Optionally show a confirmation message
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="flex flex-col space-y-5">
      {/* Title and Rating */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{product.name}</h1>
        {product.description && (
            <p className="mt-4 text-base text-gray-600">
                {product.description}
            </p>
        )}
        <div className="flex items-center mt-4 space-x-2 text-sm">
          <p className="text-gray-600">Código del artículo: {product.sku}</p>
          <span className="text-gray-300">|</span>
          <div className="flex items-center">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating || 0) ? 'fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
            <a href="#" className="ml-2 text-sm font-medium text-[#5a1e38] hover:text-[#4d182e]">{product.reviewsCount} opiniones</a>
          </div>
        </div>
      </div>
      
      {/* Price */}
      {!product.hidePrice && (
        <div className="flex items-baseline gap-4">
          <p className="text-4xl font-extrabold text-gray-900">{formatPrice(product.price)}</p>
          {product.oldPrice && product.oldPrice > product.price && (
            <p className="text-2xl font-medium text-gray-400 line-through">{formatPrice(product.oldPrice)}</p>
          )}
        </div>
      )}
      
      {/* Benefits */}
      <div className="border-t border-b border-gray-200 py-4">
        <div className="space-y-3">
          {benefits.map(benefit => (
            <div key={benefit.text} className="flex items-center text-sm">
              <benefit.icon className="h-5 w-5 mr-2 text-green-600 flex-shrink-0" />
              <span className="text-gray-700">{benefit.text}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Color Selector */}
      <div>
        <h3 className="text-sm font-medium text-gray-900">Color: <span className="font-normal text-gray-600">Blanco + Hormigón</span></h3>
        <div className="flex items-center space-x-2 mt-2">
            <button className="h-10 w-10 rounded border-2 border-[#5a1e38] overflow-hidden">
                <img src={product.images ? product.images[0] : ''} alt="Blanco + Hormigón" className="w-full h-full object-cover"/>
            </button>
            <button className="h-10 w-10 rounded border-2 border-transparent hover:border-gray-400 overflow-hidden">
                <img src={product.images ? product.images[1] : ''} alt="Roble" className="w-full h-full object-cover"/>
            </button>
        </div>
      </div>

      {/* Quantity and Add to Cart */}
      <div className="flex items-stretch space-x-4 pt-4">
         <div className="flex items-center border border-gray-300 rounded-md">
            <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="p-3 text-gray-500 hover:text-gray-800 disabled:opacity-50" disabled={!product.isAvailable}><Minus className="h-4 w-4" /></button>
            <input type="text" value={quantity} readOnly className="w-12 text-center border-l border-r border-gray-300 focus:outline-none" />
            <button onClick={() => setQuantity(prev => prev + 1)} className="p-3 text-gray-500 hover:text-gray-800 disabled:opacity-50" disabled={!product.isAvailable}><Plus className="h-4 w-4" /></button>
         </div>
         <button 
            onClick={handleAddToCart}
            disabled={!product.isAvailable}
            className="flex-1 bg-[#5a1e38] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#4d182e] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
         >
            {product.isAvailable ? 'Añadir al carrito' : <> <XCircle className="h-5 w-5"/> Agotado </>}
         </button>
         <button
            onClick={handleWishlistToggle}
            className="p-3 border border-gray-300 rounded-md text-gray-500 hover:text-red-500 hover:border-red-400 transition-colors"
            aria-label={isInWishlist ? "Quitar de la lista de deseos" : "Añadir a la lista de deseos"}
          >
            <Heart className={`h-6 w-6 transition-all ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
      </div>
    </div>
  );
};

export default ProductInfo;