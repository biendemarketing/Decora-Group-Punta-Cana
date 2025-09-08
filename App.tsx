import React, { useState, useMemo, useCallback, useEffect } from 'react';
import type { Filters, Product, Project } from './types';
import { ALL_PRODUCTS, ALL_PROJECTS, MAX_PRICE, MIN_PRICE, PRODUCT_DETAIL_DATA } from './constants';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import MagazineSection from './components/MagazineSection';
import FilterSidebar from './components/FilterSidebar';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import InstagramEmbed from './components/InstagramEmbed';
import ProductDetailPage from './components/ProductDetailPage';
import DesignsCarousel from './components/DesignsCarousel';
import ProjectGrid from './components/ProjectGrid';
import ProjectDetailPage from './components/ProjectDetailPage';
import CustomQuotePage from './components/CustomQuotePage';
import ServicesSection from './components/ServicesSection';
import WorkProcessSection from './components/WorkProcessSection';
import QuoteFormPage from './components/QuoteFormPage';
import Pagination from './components/Pagination';
import AboutUsPage from './components/AboutUsPage';
import ContactPage from './components/ContactPage';
import ContactInfo from './components/ContactInfo';
import LocationMap from './components/LocationMap';
import ContactForm from './components/ContactForm';

const PRODUCTS_PER_PAGE = 30;

const updateSEO = (title: string, description: string, structuredData?: object) => {
  document.title = title;
  
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }
  
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);
  
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute('content', description);

  const twitterTitle = document.querySelector('meta[property="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute('content', title);

  const twitterDescription = document.querySelector('meta[property="twitter:description"]');
  if (twitterDescription) twitterDescription.setAttribute('content', description);

  // Remove existing structured data
  const existingSchema = document.getElementById('json-ld-schema');
  if (existingSchema) {
    existingSchema.remove();
  }
  
  // Add new structured data
  if (structuredData) {
    const script = document.createElement('script');
    script.id = 'json-ld-schema';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }
};


const App: React.FC = () => {
  // Product state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Project state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedProjectCategory, setSelectedProjectCategory] = useState<string | null>(null);
  const [isViewingAllProjects, setIsViewingAllProjects] = useState<boolean>(false);
  
  // Quote Page state
  const [isViewingQuotePage, setIsViewingQuotePage] = useState<boolean>(false);
  const [selectedQuoteType, setSelectedQuoteType] = useState<string | null>(null);

  // Static Pages state
  const [isViewingAboutPage, setIsViewingAboutPage] = useState<boolean>(false);
  const [isViewingContactPage, setIsViewingContactPage] = useState<boolean>(false);


  const [filters, setFilters] = useState<Filters>({
    priceRange: { min: MIN_PRICE, max: MAX_PRICE },
    deliveryTime: [],
    setType: [],
    ledLighting: null,
    materials: [],
    colors: [],
  });

  useEffect(() => {
    // Default SEO for homepage
    let title = "Decora Group - Muebles a Medida y Diseño de Interiores en Punta Cana";
    let description = "Descubre muebles de diseño y proyectos de interiorismo a medida en Punta Cana. Decora Group te ofrece calidad, estilo y funcionalidad para transformar tu hogar o negocio.";
    let structuredData: any = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Decora Group",
      "url": "https://decoragrouppuntacana.com/",
      "logo": "https://decoragrouppuntacana.com/icon.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-849-456-1963",
        "contactType": "customer service"
      }
    };

    if (selectedProduct) {
      title = `${selectedProduct.name} | ${selectedProduct.category} | Decora Group`;
      description = selectedProduct.description;
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": selectedProduct.name,
        "image": selectedProduct.images,
        "description": selectedProduct.description,
        "sku": selectedProduct.sku,
        "brand": {
            "@type": "Brand",
            "name": "Decora Group"
        },
        "offers": {
            "@type": "Offer",
            "url": window.location.href,
            "priceCurrency": "DOP",
            "price": selectedProduct.price.toFixed(2),
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": selectedProduct.rating,
          "reviewCount": selectedProduct.reviewsCount
        }
      };
    } else if (selectedCategory) {
      const categoryTitle = selectedCategory === 'Todos los productos' ? 'Todos Nuestros Productos' : selectedCategory;
      title = `${categoryTitle} | Decora Group`;
      description = `Explora nuestra colección de ${selectedCategory.toLowerCase()}. Encuentra diseños de alta calidad para tu hogar en Decora Group.`;
      structuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Inicio",
          "item": "https://decoragrouppuntacana.com/"
        },{
          "@type": "ListItem",
          "position": 2,
          "name": categoryTitle
        }]
      };
    } else if (selectedProject) {
        title = `${selectedProject.title} | Proyectos | Decora Group`;
        description = selectedProject.description;
         structuredData = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": selectedProject.title,
            "image": selectedProject.galleryImages,
            "author": {
                "@type": "Organization",
                "name": "Decora Group"
            },
            "publisher": {
                "@type": "Organization",
                "name": "Decora Group",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://decoragrouppuntacana.com/icon.png"
                }
            },
            "description": selectedProject.description
         };
    } else if (isViewingAllProjects || selectedProjectCategory) {
        const projectTitle = selectedProjectCategory || "Todos Nuestros Proyectos";
        title = `${projectTitle} | Proyectos | Decora Group`;
        description = `Explora los proyectos de ${projectTitle.toLowerCase()} realizados por Decora Group. Inspiración y calidad para tu próximo diseño.`;
    } else if (isViewingQuotePage || selectedQuoteType) {
        const quoteTitle = selectedQuoteType || "Cotizar a medida";
        title = `Cotización para ${quoteTitle} | Decora Group`;
        description = `Obtén una cotización personalizada para tu proyecto de ${quoteTitle.toLowerCase()} con Decora Group. Calidad y diseño a tu medida.`;
    } else if (isViewingAboutPage) {
        title = "Sobre Nosotros | Decora Group";
        description = "Conoce la historia, misión, visión y valores de Decora Group. Descubre por qué somos líderes en diseño de muebles a medida en Punta Cana.";
    } else if (isViewingContactPage) {
        title = "Contáctanos | Decora Group";
        description = "Ponte en contacto con Decora Group para tus proyectos de diseño de interiores y muebles a medida en Punta Cana. Estamos aquí para ayudarte.";
    }
    
    updateSEO(title, description, structuredData);

  }, [selectedProduct, selectedCategory, selectedProject, isViewingAllProjects, selectedProjectCategory, isViewingQuotePage, selectedQuoteType, isViewingAboutPage, isViewingContactPage]);

  const resetAllViews = () => {
    setSelectedProduct(null);
    setSelectedCategory(null);
    setSelectedProject(null);
    setSelectedProjectCategory(null);
    setIsViewingAllProjects(false);
    setIsViewingQuotePage(false);
    setSelectedQuoteType(null);
    setIsViewingAboutPage(false);
    setIsViewingContactPage(false);
    setCurrentPage(1);
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleFilterChange = useCallback((newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      priceRange: { min: MIN_PRICE, max: MAX_PRICE },
      deliveryTime: [],
      setType: [],
      ledLighting: null,
      materials: [],
      colors: [],
    });
    setCurrentPage(1);
  }, []);

  // Product Navigation
  const handleProductSelect = useCallback((product: Product) => {
    const productWithFullData = ALL_PRODUCTS.find(p => p.id === product.id) || PRODUCT_DETAIL_DATA;
    setSelectedProduct({ ...productWithFullData, name: product.name, price: product.price, imageUrl: product.imageUrl, category: product.category });
  }, []);

  const handleBackToProductList = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  const handleSelectCategory = useCallback((category: string) => {
    resetAllViews();
    setSelectedCategory(category);
    resetFilters();
  }, [resetFilters]);

  // Project Navigation
  const handleSelectProjectCategory = useCallback((category: string) => {
    resetAllViews();
    setSelectedProjectCategory(category);
  }, []);

  const handleProjectSelect = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);
  
  const handleBackToProjectList = useCallback(() => {
    setSelectedProject(null);
  }, []);
  
  const handleViewAllProjects = useCallback(() => {
    resetAllViews();
    setIsViewingAllProjects(true);
  }, []);
  
  // Quote Page Navigation
  const handleViewQuotePage = useCallback(() => {
    resetAllViews();
    setIsViewingQuotePage(true);
  }, []);
  
  const handleSelectQuoteType = useCallback((type: string) => {
    resetAllViews();
    setSelectedQuoteType(type);
  }, []);

  const handleBackToQuotePage = useCallback(() => {
    setSelectedQuoteType(null);
    setIsViewingQuotePage(true);
  }, []);

  // Static Pages Navigation
  const handleViewAboutPage = useCallback(() => {
    resetAllViews();
    setIsViewingAboutPage(true);
  }, []);
  
  const handleViewContactPage = useCallback(() => {
    resetAllViews();
    setIsViewingContactPage(true);
  }, []);


  // Global Navigation
  const handleGoHome = useCallback(() => {
    resetAllViews();
  }, []);

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(product => {
      if (selectedCategory && selectedCategory !== 'Todos los productos' && product.category !== selectedCategory) return false;
      
      const { priceRange, materials, colors, deliveryTime, setType, ledLighting } = filters;

      if (product.price < priceRange.min || product.price > priceRange.max) return false;
      if (materials.length > 0 && !materials.some(m => product.materials.includes(m))) return false;
      if (colors.length > 0 && !colors.some(c => product.colors.includes(c))) return false;
      if (setType.length > 0 && (!product.setType || !setType.includes(product.setType))) return false;
      
      if (ledLighting) {
        const hasLed = product.ledLighting === true;
        if (ledLighting === 'Si' && !hasLed) return false;
        if (ledLighting === 'No' && hasLed) return false;
      }
      
      if (deliveryTime.length > 0) {
        const matchesDelivery = deliveryTime.some(time => {
          if (time === '5') return product.deliveryTime <= 5;
          if (time === '10') return product.deliveryTime <= 10;
          if (time === '15') return product.deliveryTime <= 15;
          if (time === '15+') return product.deliveryTime > 15;
          return false;
        });
        if (!matchesDelivery) return false;
      }

      return true;
    });
  }, [filters, selectedCategory]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const filteredProjects = useMemo(() => {
    if (!selectedProjectCategory) return [];
    return ALL_PROJECTS.filter(project => project.category === selectedProjectCategory);
  }, [selectedProjectCategory]);

  const renderContent = () => {
    if (isViewingAboutPage) {
      return <AboutUsPage />;
    }
    
    if (isViewingContactPage) {
        return <ContactPage />;
    }

    if (selectedQuoteType) {
      return <QuoteFormPage projectType={selectedQuoteType} onBack={handleBackToQuotePage} />;
    }
    
    if (isViewingQuotePage) {
      return <CustomQuotePage onSelectQuoteType={handleSelectQuoteType} />;
    }
    
    if (selectedProject) {
      return (
        <main>
          <ProjectDetailPage 
            project={selectedProject} 
            onBack={handleBackToProjectList}
            onGoHome={handleGoHome}
          />
        </main>
      );
    }

    if (isViewingAllProjects) {
       return (
        <main>
           <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-12">
                  Todos Nuestros Proyectos
                </h2>
                <ProjectGrid projects={ALL_PROJECTS} onProjectSelect={handleProjectSelect} />
              </div>
           </div>
        </main>
      )
    }
    
    if (selectedProjectCategory) {
      return (
        <main>
           <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-12">
                  Proyectos: {selectedProjectCategory}
                </h1>
                <ProjectGrid projects={filteredProjects} onProjectSelect={handleProjectSelect} />
              </div>
           </div>
        </main>
      )
    }

    if (selectedProduct) {
      return (
        <main>
          <ProductDetailPage 
            product={selectedProduct} 
            onBack={handleBackToProductList}
            onCategorySelect={handleSelectCategory}
          />
        </main>
      );
    }

    if (selectedCategory) {
      return (
        <main>
          <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-12">
                {selectedCategory === 'Todos los productos' ? 'Todos Nuestros Productos' : selectedCategory}
              </h1>
              <div className="lg:grid lg:grid-cols-4 lg:gap-8">
                <aside className="lg:col-span-1">
                  <FilterSidebar 
                    filters={filters} 
                    onFilterChange={handleFilterChange} 
                    onResetFilters={resetFilters} 
                  />
                </aside>
                <div className="lg:col-span-3 mt-8 lg:mt-0">
                  <ProductGrid products={paginatedProducts} onProductSelect={handleProductSelect} />
                   {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      );
    }
    
    return (
       <main>
        <Hero 
          onQuoteClick={handleViewQuotePage}
          onProjectsClick={handleViewAllProjects}
        />
        <DesignsCarousel onSelectProjectCategory={handleSelectProjectCategory} onViewAllProjects={handleViewAllProjects} />
        <CategoryGrid />
        <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-4">Descubre Nuestra Selección</h2>
            <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-12">
              Explora nuestra selección de muebles de alta calidad. Usa los filtros para encontrar la pieza ideal para ti.
            </p>
            <div className="lg:grid lg:grid-cols-4 lg:gap-8">
              <aside className="lg:col-span-1">
                <FilterSidebar 
                  filters={filters} 
                  onFilterChange={handleFilterChange} 
                  onResetFilters={resetFilters} 
                />
              </aside>
              <div className="lg:col-span-3 mt-8 lg:mt-0">
                <ProductGrid products={filteredProducts.slice(0, 30)} onProductSelect={handleProductSelect} />
                 <div className="text-center mt-12">
                  <button
                    onClick={() => handleSelectCategory("Todos los productos")}
                    className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#5a1e38] hover:bg-[#4d182e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5a1e38] transition-colors"
                  >
                    Ver más productos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ServicesSection onSelectQuoteType={handleSelectQuoteType} />
        <WorkProcessSection />
        <MagazineSection />
        <InstagramEmbed />
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Contáctanos</h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Estamos aquí para hacer realidad tu proyecto. Conversemos sobre tus ideas.
              </p>
            </div>
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 sm:p-10 lg:p-12 space-y-10">
                  <ContactInfo />
                  <LocationMap />
                </div>
                <div className="p-8 sm:p-10 lg:p-12 bg-gray-50">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  };

  return (
    <div className="bg-gray-50">
      <Header 
        onSelectCategory={handleSelectCategory} 
        onSelectProjectCategory={handleSelectProjectCategory}
        onGoHome={handleGoHome} 
        onViewQuotePage={handleViewQuotePage}
        onSelectQuoteType={handleSelectQuoteType}
        onViewAboutPage={handleViewAboutPage}
        onViewContactPage={handleViewContactPage}
      />
      {renderContent()}
      <Footer />
    </div>
  );
};

export default App;