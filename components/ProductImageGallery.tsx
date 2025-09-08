import React, { useState } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  alt: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, alt }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4 sticky top-24">
      <div className="aspect-square w-full rounded-lg overflow-hidden border border-gray-200">
        <img
          src={mainImage}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setMainImage(image)}
            className={`aspect-square w-full rounded-md overflow-hidden border-2 transition-all ${
              mainImage === image ? 'border-[#5a1e38]' : 'border-transparent hover:border-gray-300'
            }`}
          >
            <img
              src={image}
              alt={`${alt} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;