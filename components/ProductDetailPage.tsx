
import React from 'react';
import type { Product } from '../types';
import { ChevronRight } from 'lucide-react';
import { ALL_PRODUCTS } from '../constants';
import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo';
import ProductDetailsTable from './ProductDetailsTable';
import AdditionalInfo from './AdditionalInfo';
import SimilarProducts from './SimilarProducts';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onCategorySelect: (category: string) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onBack, onCategorySelect }) => {
  // FIX: Changed filter from `p.style === product.style` to `p.category === product.category` as the `style` property does not exist on the Product type.
  const similarProducts = ALL_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <button onClick={onBack} className="hover:text-gray-700">Decora Group</button>
        <ChevronRight className="h-4 w-4 mx-1 flex-shrink-0" />
        <button onClick={() => onCategorySelect(product.category)} className="hover:text-gray-700">{product.category}</button>
        <ChevronRight className="h-4 w-4 mx-1 flex-shrink-0" />
        <span className="font-medium text-gray-600 truncate">{product.name}</span>
      </nav>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
        <div>
          <ProductImageGallery images={product.images || [product.imageUrl]} alt={product.name} />
        </div>
        <div>
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Details Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Medidas y características</h2>
        {product.specs && <ProductDetailsTable specs={product.specs} />}
      </div>
      
      {/* Additional Info Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Información adicional</h2>
        {product.additionalInfo && <AdditionalInfo info={product.additionalInfo} />}
      </div>

      {/* Similar Products Section */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Productos similares</h2>
        <SimilarProducts products={similarProducts} onProductSelect={() => {}} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
