
import React, { useState, useMemo, useCallback, useEffect, createContext, useContext } from 'react';
import type { Filters, Product, Project, CartItem, NavigationData, PopularCategory, Catalogue } from './types';
import { INITIAL_PROJECTS, MAX_PRICE, MIN_PRICE, INITIAL_NAVIGATION_DATA, rawProducts, COLOR_MAP } from './constants';
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
import CartPage from './components/CartPage';
import QuoteCheckoutPage from './components/QuoteCheckoutPage';
import QuoteTemplate from './components/QuoteTemplate';
import WishlistPage from './components/WishlistPage';
import BlogPage from './components/BlogPage';
import AdminPanel from './components/AdminPanel';
import LoginPage from './components/LoginPage';
import CataloguesPage from './components/CataloguesPage';
import CatalogueDetailPage from './components/CatalogueDetailPage';
import FAQPage from './components/FAQPage';
import LegalPage from './components/LegalPage';


// --- CURRENCY CONTEXT ---
type Currency = 'USD' | 'RD$';
interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  exchangeRate: number;
  formatPrice: (priceInUsd: number) => string;
}
const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);
export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) throw new Error('useCurrency must be used within a CurrencyProvider');
  return context;
};

// --- CART CONTEXT ---
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
}
const CartContext = createContext<CartContextType | undefined>(undefined);
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) throw new Error('useCart must be used within a CartProvider');
  return context;
};

const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item => (item.id === productId ? { ...item, quantity } : item))
      );
    }
  };
  
  const clearCart = () => setCartItems([]);
  
  const itemCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

// --- WISHLIST CONTEXT ---
interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isProductInWishlist: (productId: number) => boolean;
  wishlistCount: number;
}
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
};

const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlistItems(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product: Product) => {
    setWishlistItems(prevItems => {
      if (!prevItems.some(item => item.id === product.id)) {
        return [...prevItems, product];
      }
      return prevItems;
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const isProductInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const wishlistCount = useMemo(() => wishlistItems.length, [wishlistItems]);

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isProductInWishlist, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
};


const PRODUCTS_PER_PAGE = 30;

type View = 'home' | 'category' | 'productDetail' | 'projects' | 'projectDetail' | 'quote' | 'quoteForm' | 'about' | 'contact' | 'cart' | 'checkout' | 'printQuote' | 'wishlist' | 'blog' | 'login' | 'admin' | 'catalogues' | 'catalogueDetail' | 'faq' | 'legal';

interface CustomerInfo {
    name: string;
    email: string;
    phone: string;
    address: string;
}

const updateSEO = (title: string, description: string, structuredData?: object) => {
  document.title = title;
  
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute('content', description);
  
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);
  
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute('content', description);

  const twitterTitle = document.querySelector('meta[property="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute('content', title);

  const twitterDescription = document.querySelector('meta[property="twitter:description"]');
  if (twitterDescription) twitterDescription.setAttribute('content', description);
  
  const existingSchema = document.getElementById('json-ld-schema');
  if (existingSchema) existingSchema.remove();
  
  if (structuredData) {
    const script = document.createElement('script');
    script.id = 'json-ld-schema';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }
};

interface AppContentProps {
  navigationData: NavigationData;
  projectsData: Project[];
  productsData: Product[];
  onSaveChanges: (data: { navigation: NavigationData, projects: Project[], products: Product[] }) => void;
}

export const processProducts = (products: any[]): Product[] => {
  
    const parseDeliveryTime = (timeString?: string): number => {
      if (!timeString) return 99;
      const match = timeString.match(/(\d+)/);
      return match ? parseInt(match[1], 10) : 99;
    };

    const mapProductToCategory = (p: any): { category: string; subcategory?: string } => {
        const lowerName = p.name.toLowerCase();
        const lowerHint = p.hint.toLowerCase();
        const combinedText = `${lowerName} ${lowerHint}`;

        if (combinedText.includes('tirador')) return { category: 'Herrajes y Accesorios', subcategory: 'Tiradores' };
        if (combinedText.includes('bisagra')) return { category: 'Herrajes y Accesorios', subcategory: 'Bisagras' };
        if (combinedText.includes('lavamanos')) return { category: 'Herrajes y Accesorios', subcategory: 'Lavamanos' };
        if (combinedText.includes('fregadero')) return { category: 'Herrajes y Accesorios', subcategory: 'Fregaderos' };
        if (combinedText.includes('estufa')) return { category: 'Electrodomésticos', subcategory: 'Estufas' };
        if (combinedText.includes('nevera')) return { category: 'Electrodomésticos', subcategory: 'Neveras' };
        
        if (p.category === 'Puertas') return { category: 'Puertas' };
        if (combinedText.includes('mueble tv')) return { category: 'Sala', subcategory: 'Muebles TV' };
        if (combinedText.includes('mesa de centro')) return { category: 'Sala', subcategory: 'Mesas de centro' };
        if (combinedText.includes('gavetero')) return { category: 'Dormitorio', subcategory: 'Gaveteros' };
        if (p.category === 'Salón' || p.category === 'Sala') return { category: 'Sala' };

        return { category: 'Muebles' };
    };

  return products.map((p: any) => {
    const { category, subcategory } = mapProductToCategory(p);
    const specs: { [key: string]: string } = {
        'Entrega': p.deliveryTime || 'No especificado',
        'Ancho': p.dimensions ? `${p.dimensions.width} cm` : 'N/A',
        'Alto': p.dimensions ? `${p.dimensions.height} cm` : 'N/A',
        'Fondo': p.dimensions ? `${p.dimensions.depth} cm` : 'N/A',
        'Materiales': (p.materials && p.materials.length > 0) ? p.materials.join(', ') : 'No especificado',
        'Colores': (p.colors && p.colors.length > 0) ? p.colors.join(', ') : 'No especificado',
        'Código del artículo': String(p.id),
      };
      
      if (p.finish && p.finish.length > 0) {
        specs['Acabado'] = p.finish.join(', ');
      }

    return {
      id: p.id,
      name: p.name,
      price: p.price,
      oldPrice: p.oldPrice,
      imageUrl: p.images[0].replace('?w=300&h=225&p=fw', '?w=400&h=300&p=fw'),
      category: category,
      subcategory: subcategory,
      description: p.description,
      materials: p.materials || ["Aglomerado laminado"],
      colors: p.colors || ["Marrón"],
      finish: p.finish || [],
      dimensions: p.dimensions,
      images: p.images.map((img: string) => img.startsWith('http') ? img : `https://decoragrouppuntacana.com/${img}`),
      sku: String(p.id),
      rating: p.rating,
      reviews: p.reviews,
      reviewsCount: p.reviews,
      hint: p.hint,
      deliveryTime: parseDeliveryTime(p.deliveryTime),
      setType: p.setType,
      ledLighting: p.ledLighting,
      specs: specs,
      additionalInfo: p.ledLighting ? [{ icon: 'Led', text: 'Iluminación LED' }] : [],
      isVisible: p.isVisible !== false,
      isAvailable: p.isAvailable !== false,
      hidePrice: p.hidePrice === true,
    };
  });
};

const AppContent: React.FC<AppContentProps> = ({ navigationData, projectsData, productsData, onSaveChanges }) => {
  const { cartItems } = useCart();
  const { formatPrice } = useCurrency();
  
  const [view, setView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedProjectCategory, setSelectedProjectCategory] = useState<string | null>(null);
  const [selectedQuoteType, setSelectedQuoteType] = useState<string | null>(null);
  const [selectedCatalogue, setSelectedCatalogue] = useState<Catalogue | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({ name: '', email: '', phone: '', address: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [filters, setFilters] = useState<Filters>({
    priceRange: { min: MIN_PRICE, max: MAX_PRICE },
    deliveryTime: [],
    setType: [],
    ledLighting: null,
    materials: [],
    colors: [],
    category: [],
  });
  
  useEffect(() => {
    if (view === 'admin' || view === 'login') return;
    window.scrollTo(0, 0);
  }, [view, selectedProduct, selectedProject]);

  useEffect(() => {
    let title = "Decora Group - Muebles a Medida y Diseño de Interiores en Punta Cana";
    let description = "Descubre muebles de diseño y proyectos de interiorismo a medida en Punta Cana. Decora Group te ofrece calidad, estilo y funcionalidad para transformar tu hogar o negocio.";
    let structuredData: any = {};

    switch(view) {
        case 'productDetail':
            if (selectedProduct) {
                title = `${selectedProduct.name} | ${selectedProduct.category} | Decora Group`;
                description = selectedProduct.description;
            }
            break;
        case 'category':
            if (filters.category.length > 0) {
                const categoryTitle = filters.category.length === 1 ? filters.category[0] : 'Varios';
                title = `${categoryTitle} | Decora Group`;
                description = `Explora nuestra colección de ${categoryTitle.toLowerCase()}. Encuentra diseños de alta calidad para tu hogar en Decora Group.`;
            } else {
                 title = `Todos Nuestros Productos | Decora Group`;
                 description = `Explora toda nuestra colección de productos. Encuentra diseños de alta calidad para tu hogar en Decora Group.`;
            }
            break;
    }
    updateSEO(title, description, structuredData);
  }, [view, selectedProduct, filters, selectedProject, selectedProjectCategory, selectedQuoteType]);

  const resetFilters = useCallback(() => {
    setFilters({
      priceRange: { min: MIN_PRICE, max: MAX_PRICE }, deliveryTime: [], setType: [], ledLighting: null, materials: [], colors: [], category: [],
    });
    setCurrentPage(1);
  }, []);

  const resetToHome = () => {
    setView('home');
    resetFilters();
    setSelectedProduct(null);
    setSelectedProject(null);
    setSelectedProjectCategory(null);
    setSelectedQuoteType(null);
    setSelectedCatalogue(null);
    setCurrentPage(1);
    setSearchQuery('');
  }
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const productGridElement = document.getElementById('product-grid-section');
    if (productGridElement) {
        productGridElement.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFilterChange = useCallback((newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  }, []);

  const handleProductSelect = useCallback((product: Product) => {
    setSelectedProduct(product);
    setView('productDetail');
  }, []);

  const handleSelectCategory = useCallback((category: string) => {
    setSearchQuery('');
    setView('category');
    setCurrentPage(1);
    // Reset all filters and set the new category
    setFilters({
      priceRange: { min: MIN_PRICE, max: MAX_PRICE },
      deliveryTime: [],
      setType: [],
      ledLighting: null,
      materials: [],
      colors: [],
      category: category === 'Todos los productos' ? [] : [category],
    });
  }, []);

  const handleSelectProjectCategory = useCallback((category: string) => {
    setSelectedProjectCategory(category);
    setView('projects');
  }, []);

  const handleProjectSelect = useCallback((project: Project) => {
    setSelectedProject(project);
    setView('projectDetail');
  }, []);

  const handleViewCatalogues = useCallback(() => {
    setView('catalogues');
  }, []);

  const handleViewCatalogueDetail = useCallback((catalogue: Catalogue) => {
    setSelectedCatalogue(catalogue);
    setView('catalogueDetail');
  }, []);
  
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    handleFilterChange({ category: [] }); // Search across all categories
    setView('category');
    setCurrentPage(1);
  }, [handleFilterChange]);

  const handleSelectQuoteType = useCallback((type: string) => {
    const whatsappServices = ['Muebles Personalizados', 'Mobiliario Comercial', 'Construcciones Especializadas'];
    if (whatsappServices.includes(type)) {
      const message = `Hola Decora Group, me gustaría solicitar una cotización para: ${type}.`;
      const whatsappUrl = `https://wa.me/18494561963?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      setSelectedQuoteType(type);
      setView('quoteForm');
    }
  }, []);

  const handlePrintQuote = useCallback(() => {
    setView('printQuote');
    setTimeout(() => {
        window.print();
        setView('checkout'); 
    }, 500);
  }, []);

  const handleWhatsAppQuote = () => {
    let message = `Hola Decora Group, quisiera solicitar una cotización para los siguientes artículos:\n\n`;
    cartItems.forEach(item => {
        message += `* ${item.name} (x${item.quantity}) - ${formatPrice(item.price * item.quantity)}\n`;
    });
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    message += `\n*Total Estimado:* ${formatPrice(subtotal)}\n\n`;
    message += `*Mis datos son:*\n`;
    message += `Nombre: ${customerInfo.name}\n`;
    message += `Email: ${customerInfo.email}\n`;
    message += `Teléfono: ${customerInfo.phone}\n`;
    message += `Dirección: ${customerInfo.address}\n`;

    const whatsappUrl = `https://wa.me/18494561963?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setView('admin');
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setView('home');
  };

  const handleNavigate = useCallback((key: string) => {
    const menuItem = navigationData.menuItems.find(item => item.key === key);
    if(menuItem) {
      handleSelectCategory(menuItem.title);
      return;
    }

    switch (key) {
      case 'products':
        handleSelectCategory("Todos los productos");
        break;
      case 'projects':
        setSelectedProjectCategory(null);
        setView('projects');
        break;
      case 'quote':
        setView('quote');
        break;
      case 'about':
        setView('about');
        break;
      case 'contact':
        setView('contact');
        break;
      case 'blog':
        setView('blog');
        break;
      case 'catalogues':
        setView('catalogues');
        break;
      case 'faq':
        setView('faq');
        break;
      case 'legal':
        setView('legal');
        break;
      default:
        resetToHome();
        break;
    }
  }, [handleSelectCategory, navigationData.menuItems]);

  const filteredProducts = useMemo(() => {
    const visibleProducts = productsData.filter(p => p.isVisible !== false);
    
    const baseProducts = searchQuery
      ? visibleProducts.filter(product => {
          const term = searchQuery.toLowerCase();
          return (
            product.name.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term) ||
            product.category.toLowerCase().includes(term) ||
            (product.subcategory && product.subcategory.toLowerCase().includes(term)) ||
            product.hint.toLowerCase().includes(term)
          );
        })
      : visibleProducts;

    return baseProducts.filter(product => {
      const { category, priceRange, materials, colors, deliveryTime, setType, ledLighting } = filters;
      
      if (category.length > 0 && !category.includes(product.category)) return false;
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
  }, [filters, searchQuery, productsData]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const filteredProjects = useMemo(() => {
    if (!selectedProjectCategory) return projectsData;
    return projectsData.filter(project => project.category === selectedProjectCategory);
  }, [selectedProjectCategory, projectsData]);
  
  const getCategoryPageTitle = () => {
    if (searchQuery) {
      return `Resultados para "${searchQuery}"`;
    }
    if (filters.category.length === 1) {
      return filters.category[0];
    }
    if (filters.category.length > 1) {
      return 'Productos Seleccionados';
    }
    return 'Todos Nuestros Productos';
  };
  
  const materialsForFilter = useMemo(() => [...new Set(productsData.flatMap(p => p.materials))].sort(), [productsData]);
  const colorsForFilter = useMemo(() => [...new Set(productsData.flatMap(p => p.colors))].sort(), [productsData]);
  const setTypesForFilter = useMemo(() => [...new Set(productsData.map(p => p.setType).filter(Boolean))] as ('Sólido' | 'Partes separadas')[], [productsData]);


  // --- RENDER LOGIC ---
  if (view === 'login') return <LoginPage onLogin={handleLogin} />;

  if (view === 'admin') {
    if (!isAuthenticated) {
      setView('login');
      return <LoginPage onLogin={handleLogin} />;
    }
    return <AdminPanel 
             initialNavigationData={navigationData} 
             initialProjectsData={projectsData} 
             initialProductsData={productsData}
             onSaveChanges={onSaveChanges} 
             onLogout={handleLogout} 
           />;
  }

  if (view === 'printQuote') return <QuoteTemplate customerInfo={customerInfo} />;

  const instagramImages = projectsData.slice(0, 6).map(p => p.imageUrl);

  return (
    <div className="bg-gray-50">
      <Header 
          navigationData={navigationData}
          onSelectCategory={handleSelectCategory} 
          onSelectProjectCategory={handleSelectProjectCategory}
          onGoHome={resetToHome} 
          onViewQuotePage={() => setView('quote')}
          onSelectQuoteType={handleSelectQuoteType}
          onViewAboutPage={() => setView('about')}
          onViewContactPage={() => setView('contact')}
          onViewCart={() => setView('cart')}
          onViewWishlist={() => setView('wishlist')}
          onViewBlogPage={() => setView('blog')}
          onViewCataloguesPage={handleViewCatalogues}
          onViewCatalogueDetail={handleViewCatalogueDetail}
          onNavigate={handleNavigate}
          searchQuery={searchQuery}
          onSearch={handleSearch}
      />
      
      {(() => {
          switch(view) {
              case 'legal': return <LegalPage legalContent={navigationData.legalContent} />;
              case 'faq': return <FAQPage faqContent={navigationData.faqContent} />;
              case 'catalogueDetail': return <CatalogueDetailPage catalogue={selectedCatalogue!} onBack={handleViewCatalogues} />;
              case 'catalogues': return <CataloguesPage catalogues={navigationData.catalogues} onCatalogueSelect={handleViewCatalogueDetail} />;
              case 'blog': return <BlogPage blogPosts={navigationData.blogPosts} blogCategories={navigationData.blogCategories} />;
              case 'cart': return <CartPage onContinueShopping={() => handleSelectCategory("Todos los productos")} onCheckout={() => setView('checkout')} />;
              case 'wishlist': return <WishlistPage onProductSelect={handleProductSelect} />;
              case 'checkout':
                  return <QuoteCheckoutPage 
                      customerInfo={customerInfo}
                      onCustomerInfoChange={setCustomerInfo}
                      onPrintQuote={handlePrintQuote}
                      onWhatsAppQuote={handleWhatsAppQuote}
                      onGoBackToCart={() => setView('cart')}
                      onContinueShopping={() => handleSelectCategory("Todos los productos")}
                  />;
              case 'about': return <AboutUsPage content={navigationData.aboutUsPage} />;
              // FIX: Pass the 'content' prop to ContactPage to fix the error.
              case 'contact': return <ContactPage content={navigationData.contactPage} />;
              case 'quoteForm': return <QuoteFormPage projectType={selectedQuoteType!} onBack={() => setView('quote')} quoteConfig={navigationData.quoteConfig} />;
              case 'quote': return <CustomQuotePage projectTypes={navigationData.quoteConfig.projectTypes} onSelectQuoteType={handleSelectQuoteType} />;
              case 'projectDetail': return <ProjectDetailPage project={selectedProject!} onBack={() => setView('projects')} onGoHome={resetToHome} />;
              case 'projects':
                  return (
                      <main>
                          <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
                              <div className="max-w-7xl mx-auto">
                                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-12">
                                  Proyectos{selectedProjectCategory ? `: ${selectedProjectCategory}` : ''}
                                  </h1>
                                  <ProjectGrid projects={filteredProjects} onProjectSelect={handleProjectSelect} />
                              </div>
                          </div>
                      </main>
                  );
              case 'productDetail':
                  return <ProductDetailPage product={selectedProduct!} onBack={() => setView('category')} onCategorySelect={handleSelectCategory} products={productsData} />;
              case 'category':
                   return (
                      <main>
                      <div id="product-grid-section" className="bg-white py-12 px-4 sm:px-6 lg:px-8">
                          <div className="max-w-7xl mx-auto">
                          <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-12">
                            {getCategoryPageTitle()}
                          </h1>
                          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
                              <aside className="lg:col-span-1">
                                <FilterSidebar 
                                  filters={filters} 
                                  onFilterChange={handleFilterChange} 
                                  onResetFilters={resetFilters}
                                  materials={materialsForFilter}
                                  colors={colorsForFilter}
                                  setTypes={setTypesForFilter}
                                  colorMap={COLOR_MAP}
                                />
                              </aside>
                              <div className="lg:col-span-3 mt-8 lg:mt-0">
                              <ProductGrid products={paginatedProducts} onProductSelect={handleProductSelect} />
                              {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
                              </div>
                          </div>
                          </div>
                      </div>
                      </main>
                  );
              case 'home':
              default:
                  const contactFormSection = navigationData.contactPage;
                  return (
                      <main>
                          <Hero heroSlides={navigationData.heroSlides} onNavigate={handleNavigate} />
                          <DesignsCarousel 
                            projectCategories={navigationData.menuItems.find(item => item.key === 'proyectos')?.subCategories || []}
                            onSelectProjectCategory={handleSelectProjectCategory} 
                            onViewAllProjects={() => { setSelectedProjectCategory(null); setView('projects'); }} 
                          />
                          <CategoryGrid 
                            popularCategories={navigationData.popularCategories}
                            onSelectCategory={handleSelectCategory}
                          />
                          <div id="product-grid-section" className="bg-white py-12 px-4 sm:px-6 lg:px-8">
                              <div className="max-w-7xl mx-auto">
                                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-4">Descubre Nuestra Selección</h2>
                                  <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-12">Explora nuestra selección de muebles de alta calidad. Usa los filtros para encontrar la pieza ideal para ti.</p>
                                  <div className="lg:grid lg:grid-cols-4 lg:gap-8">
                                      <aside className="lg:col-span-1">
                                         <FilterSidebar 
                                            filters={filters} 
                                            onFilterChange={handleFilterChange} 
                                            onResetFilters={resetFilters}
                                            materials={materialsForFilter}
                                            colors={colorsForFilter}
                                            setTypes={setTypesForFilter}
                                            colorMap={COLOR_MAP}
                                          />
                                      </aside>
                                      <div className="lg:col-span-3 mt-8 lg:mt-0">
                                          <ProductGrid products={filteredProducts.slice(0, 30)} onProductSelect={handleProductSelect} />
                                          <div className="text-center mt-12"><button onClick={() => handleSelectCategory("Todos los productos")} className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#5a1e38] hover:bg-[#4d182e]">Ver más productos</button></div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <ServicesSection services={navigationData.services} onSelectQuoteType={handleSelectQuoteType} />
                          <WorkProcessSection workProcessSection={navigationData.workProcessSection} />
                          <MagazineSection magazineSection={navigationData.magazineSection} blogPosts={navigationData.blogPosts} blogCategories={navigationData.blogCategories} />
                          <InstagramEmbed 
                            images={instagramImages} 
                            username={navigationData.instagramFeed.username}
                            profilePictureUrl={navigationData.logoUrl}
                          />
                          <section className="py-16 bg-gray-50">
                              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                  <div className="text-center mb-16"><h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{contactFormSection.infoTitle}</h2><p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">Estamos aquí para hacer realidad tu proyecto. Conversemos sobre tus ideas.</p></div>
                                  <div className="bg-white shadow-xl rounded-2xl overflow-hidden"><div className="grid grid-cols-1 lg:grid-cols-2">
                                  <div className="p-8 sm:p-10 lg:p-12 space-y-10">
                                    <ContactInfo content={contactFormSection} />
                                    <LocationMap title={contactFormSection.mapTitle} />
                                  </div>
                                  <div className="p-8 sm:p-10 lg:p-12 bg-gray-50"><ContactForm content={contactFormSection} /></div>
                                  </div></div>
                              </div>
                          </section>
                      </main>
                  );
          }
      })()}
      <Footer 
        content={navigationData.footerContent}
        // FIX: Pass the footerLogoUrl from navigationData to the Footer component.
        footerLogoUrl={navigationData.footerLogoUrl}
        onViewAdminPage={() => setView(isAuthenticated ? 'admin' : 'login')} 
      />
    </div>
  );
};

const App: React.FC = () => {
  const [navigationData, setNavigationData] = useState<NavigationData>(INITIAL_NAVIGATION_DATA);
  const [projectsData, setProjectsData] = useState<Project[]>(INITIAL_PROJECTS);
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [currency, setCurrency] = useState<Currency>('USD');

  useEffect(() => {
    const storedNavData = localStorage.getItem('navigationData');
    if (storedNavData) {
      try {
        const parsedData = JSON.parse(storedNavData);
        // Add a check for new blog properties to ensure backward compatibility
        if (parsedData && Array.isArray(parsedData.menuItems) && parsedData.quoteConfig && parsedData.footerContent) {
          // Initialize catalogues if it doesn't exist
          if (!parsedData.catalogues) {
            parsedData.catalogues = [];
          }
          setNavigationData(parsedData);
        } else {
          // If data is old/malformed, reset to initial
          localStorage.setItem('navigationData', JSON.stringify(INITIAL_NAVIGATION_DATA));
          setNavigationData(INITIAL_NAVIGATION_DATA);
        }
      } catch (error) {
        console.error("Error parsing navigation data from localStorage", error);
        localStorage.setItem('navigationData', JSON.stringify(INITIAL_NAVIGATION_DATA));
        setNavigationData(INITIAL_NAVIGATION_DATA);
      }
    }
    
    const storedProjectsData = localStorage.getItem('projectsData');
    if (storedProjectsData) {
        try {
            const parsedData = JSON.parse(storedProjectsData);
            if (Array.isArray(parsedData)) {
                setProjectsData(parsedData);
            } else {
                 localStorage.removeItem('projectsData');
            }
        } catch (error) {
            console.error("Error parsing projects data from localStorage", error);
            localStorage.removeItem('projectsData');
        }
    }

    const storedProductsData = localStorage.getItem('productsData');
    if (storedProductsData) {
        try {
            const parsedData = JSON.parse(storedProductsData);
            if (Array.isArray(parsedData)) {
                setProductsData(parsedData);
            } else {
                 localStorage.removeItem('productsData');
            }
        } catch (error) {
            console.error("Error parsing products data from localStorage", error);
            localStorage.removeItem('productsData');
        }
    } else {
        setProductsData(processProducts(rawProducts));
    }
  }, []);

  const handleSaveChanges = (data: { navigation: NavigationData, projects: Project[], products: Product[] }) => {
    setNavigationData(data.navigation);
    setProjectsData(data.projects);
    setProductsData(data.products);
    localStorage.setItem('navigationData', JSON.stringify(data.navigation));
    localStorage.setItem('projectsData', JSON.stringify(data.projects));
    localStorage.setItem('productsData', JSON.stringify(data.products));
    alert("Cambios guardados exitosamente!");
  };
  
  const exchangeRate = navigationData.exchangeRate;

  const formatPrice = useMemo(() => (priceInUsd: number) => {
    if (priceInUsd === undefined || priceInUsd === null) priceInUsd = 0;
    if (currency === 'USD') {
      return `US$ ${priceInUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      const priceInDop = priceInUsd * exchangeRate;
      return `RD$ ${priceInDop.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  }, [currency, exchangeRate]);

  const currencyContextValue = {
    currency, setCurrency, exchangeRate, formatPrice,
  };

  return (
    <CurrencyContext.Provider value={currencyContextValue}>
      <CartProvider>
        <WishlistProvider>
          <AppContent 
            navigationData={navigationData} 
            projectsData={projectsData}
            productsData={productsData}
            onSaveChanges={handleSaveChanges} 
          />
        </WishlistProvider>
      </CartProvider>
    </CurrencyContext.Provider>
  );
};

export default App;
