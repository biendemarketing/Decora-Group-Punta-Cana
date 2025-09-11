import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
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
  const trackRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isDraggingRef = useRef(false);
  const startPosRef = useRef(0);
  const currentTranslateRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  
  const [clonedCount, setClonedCount] = useState(0);

  // Memoize the slides to prevent re-renders
  const slides = useMemo(() => projectCategories, [projectCategories]);

  // Function to move to a specific slide index
  const goToSlide = useCallback((index: number, useTransition = true) => {
    if (!trackRef.current) return;
    const slideWidth = trackRef.current.children[0]?.clientWidth || 0;
    currentTranslateRef.current = -index * slideWidth;
    trackRef.current.style.transition = useTransition ? 'transform 0.5s ease-in-out' : 'none';
    trackRef.current.style.transform = `translateX(${currentTranslateRef.current}px)`;
  }, []);

  // Setup clones for infinite loop effect
  useEffect(() => {
    if (!trackRef.current || slides.length === 0) return;

    const track = trackRef.current;
    // Clear previous clones
    Array.from(track.children).forEach(child => {
      if (child.hasAttribute('data-clone')) track.removeChild(child);
    });

    // Determine how many items to clone based on what's visible
    const visibleItems = Math.floor(track.parentElement!.clientWidth / (track.children[0] as HTMLElement).offsetWidth);
    const count = Math.max(visibleItems, Math.min(slides.length, 5));
    setClonedCount(count);

    const originalSlides = Array.from(track.children);
    for (let i = 0; i < count; i++) {
        const clone = originalSlides[i].cloneNode(true) as HTMLElement;
        clone.setAttribute('data-clone', 'true');
        track.appendChild(clone);
    }
    for (let i = originalSlides.length - 1; i >= originalSlides.length - count; i--) {
        const clone = originalSlides[i].cloneNode(true) as HTMLElement;
        clone.setAttribute('data-clone', 'true');
        track.insertBefore(clone, track.firstChild);
    }
    
    goToSlide(count, false); // Initial position
  }, [slides, goToSlide]);


  const handleNext = useCallback(() => {
    if (!trackRef.current) return;
    const totalSlides = slides.length + 2 * clonedCount;
    const currentIndex = Math.round(-currentTranslateRef.current / (trackRef.current.children[0]?.clientWidth || 1));
    
    if (currentIndex >= slides.length + clonedCount) return; // Prevent fast-forwarding during loop reset
    goToSlide(currentIndex + 1);
  }, [slides.length, clonedCount, goToSlide]);

  const handlePrev = () => {
    if (!trackRef.current) return;
    const currentIndex = Math.round(-currentTranslateRef.current / (trackRef.current.children[0]?.clientWidth || 1));
    
    if (currentIndex <= clonedCount -1) return; // Prevent rewinding during loop reset
    goToSlide(currentIndex - 1);
  };
  
  // Autoplay functionality
  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(handleNext, 4000);
  }, [handleNext]);

  const stopAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };
  
  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [startAutoPlay]);


  // Handle the "jump" for the infinite loop effect
  const onTransitionEnd = () => {
    if (!trackRef.current) return;
    const slideWidth = trackRef.current.children[0]?.clientWidth || 1;
    const currentIndex = Math.round(-currentTranslateRef.current / slideWidth);

    if (currentIndex >= slides.length + clonedCount) {
        goToSlide(clonedCount, false);
    }
    if (currentIndex < clonedCount) {
        goToSlide(slides.length + clonedCount -1, false);
    }
  };

  // Drag functionality
  const getPositionX = (event: MouseEvent | TouchEvent) => {
    return event.type.includes('mouse') ? (event as MouseEvent).pageX : (event as TouchEvent).touches[0].clientX;
  };
  
  const dragStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDraggingRef.current = true;
    startPosRef.current = getPositionX(e.nativeEvent);
    stopAutoPlay();
    
    animationFrameRef.current = requestAnimationFrame(function animation() {
        if(trackRef.current) trackRef.current.style.transform = `translateX(${currentTranslateRef.current}px)`;
        if (isDraggingRef.current) requestAnimationFrame(animation);
    });
    
    if (trackRef.current) trackRef.current.style.transition = 'none';
  };

  const dragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const currentPosition = getPositionX(e.nativeEvent);
    const diff = currentPosition - startPosRef.current;
    currentTranslateRef.current += diff * 1.5; // Multiply for a better drag feel
    startPosRef.current = currentPosition;
  };

  const dragEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if(animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    
    const slideWidth = trackRef.current?.children[0]?.clientWidth || 1;
    const targetIndex = Math.round(-currentTranslateRef.current / slideWidth);

    goToSlide(targetIndex);
    startAutoPlay();
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
        
        <div 
          className="relative"
          onMouseEnter={stopAutoPlay}
          onMouseLeave={startAutoPlay}
        >
          <button 
            onClick={handlePrev}
            className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors hidden md:flex items-center justify-center"
            aria-label="Anterior"
          >
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </button>
          
          <div 
            className="overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={dragStart}
            onMouseMove={dragMove}
            onMouseUp={dragEnd}
            onMouseLeave={dragEnd}
            onTouchStart={dragStart}
            onTouchMove={dragMove}
            onTouchEnd={dragEnd}
          >
            <div 
              ref={trackRef}
              className="flex"
              onTransitionEnd={onTransitionEnd}
            >
              {slides.map((category) => {
                const Icon = iconMap[category.name] || iconMap['Default'];
                return (
                  <div key={category.id} className="min-w-0 shrink-0 grow-0 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 p-4">
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); onSelectProjectCategory(category.name); }}
                      className="flex flex-col items-center text-center group"
                      draggable="false"
                    >
                      <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-lg transform transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                        <img
                          src={category.imageUrl}
                          alt={category.name}
                          className="w-full h-full object-cover"
                          draggable="false"
                        />
                        <div className="absolute inset-0 bg-[#5a1e38]/75 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Icon className="h-9 w-9 text-white" />
                        </div>
                      </div>
                      <h3 className="mt-4 text-sm font-semibold text-gray-800 group-hover:text-[#5a1e38] transition-colors h-10 flex items-center">
                        {category.name}
                      </h3>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          <button 
            onClick={handleNext}
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors hidden md:flex items-center justify-center"
            aria-label="Siguiente"
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
    </div>
  );
};

export default DesignsCarousel;