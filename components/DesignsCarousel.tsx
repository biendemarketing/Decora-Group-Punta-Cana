import React, { useRef } from 'react';
import { SubCategory } from '../types';
import { 
  ArrowLeft, 
  ArrowRight,
  UtensilsCrossed,
  Bath,
  Sofa,
  Palette,
  DoorOpen,
  Building,
  Store,
  Sparkles
} from 'lucide-react';

interface DesignsCarouselProps {
  projectCategories: SubCategory[];
  onSelectProjectCategory: (category: string) => void;
  onViewAllProjects: () => void;
}

const iconMap: { [key: string]: React.ElementType } = {
  'Cocinas Personalizadas': UtensilsCrossed,
  'Baños Modernos': Bath,
  'Muebles a Medida': Sofa,
  'Diseño de Interiores': Palette,
  'Puertas de Interior y Exterior': DoorOpen,
  'Mobiliario de Oficina': Building,
  'Proyectos Comerciales': Store,
  'Default': Sparkles
};


const DesignsCarousel: React.FC<DesignsCarouselProps> = ({ projectCategories, onSelectProjectCategory, onViewAllProjects }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.offsetWidth * 0.75;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Explora Nuestros Diseños</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            Soluciones a medida para cada rincón de tu vida. Calidad, estilo y funcionalidad en cada proyecto.
          </p>
        </div>
        
        <div className="relative flex items-center">
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors hidden md:block"
            aria-label="Scroll left"
          >
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex items-start space-x-8 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          >
            {projectCategories.map((category) => {
              const Icon = iconMap[category.name] || iconMap['Default'];
              return (
              <a 
                href="#" 
                key={category.id} 
                onClick={(e) => { e.preventDefault(); onSelectProjectCategory(category.name); }}
                className="flex-shrink-0 w-40 text-center group snap-center"
              >
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-white transform group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#5a1e38]/75 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="mt-4 text-sm font-semibold text-gray-800 group-hover:text-[#5a1e38] transition-colors">
                  {category.name}
                </h3>
              </a>
              );
            })}
          </div>

          <button 
            onClick={() => scroll('right')}
            className="absolute -right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors hidden md:block"
            aria-label="Scroll right"
          >
            <ArrowRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={onViewAllProjects}
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#5a1e38] hover:bg-[#4d182e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5a1e38] transition-colors"
          >
            Ver todos los proyectos
          </button>
        </div>
      </div>
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

export default DesignsCarousel;