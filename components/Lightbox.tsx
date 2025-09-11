import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: string[];
  startIndex: number;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, startIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nextImage, prevImage, onClose]);
  
  if (!images || images.length === 0) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative bg-white w-full h-full max-w-5xl max-h-[90vh] rounded-lg shadow-xl flex flex-col p-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close Button */}
        <div className="flex justify-end items-center flex-shrink-0 p-2">
            <span className="text-sm text-gray-600">{currentIndex + 1} / {images.length}</span>
            <button
                onClick={onClose}
                className="ml-4 p-2 rounded-full text-gray-600 bg-gray-100 hover:bg-gray-200"
                aria-label="Cerrar galería"
            >
                <X className="h-5 w-5" />
            </button>
        </div>

        {/* Image Display */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden">
          {images.map((image, index) => (
             <img
                key={index}
                src={image}
                alt={`Imagen de galería ${index + 1}`}
                className={`transition-opacity duration-300 ease-in-out absolute max-w-full max-h-full object-contain ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/50 rounded-full text-gray-800 hover:bg-white transition-colors"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/50 rounded-full text-gray-800 hover:bg-white transition-colors"
          aria-label="Siguiente imagen"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Lightbox;
