import React, { useState, useEffect } from 'react';
import { Search, User, Menu, X, Phone, ShieldCheck, CreditCard, Truck, Heart, ShoppingCart, Camera, ChevronDown, Package, Gem, Lightbulb, Award, CheckCircle } from 'lucide-react';
import { NavigationData, SubCategory, TopBarLink, MenuItem, Catalogue } from '../types';
import Logo from './Logo';
import SalaMegaMenu from './SalonMegaMenu';
import DormitorioMegaMenu from './DormitorioMegaMenu';
import CocinaMegaMenu from './CocinaMegaMenu';
import RecibidorMegaMenu from './RecibidorMegaMenu';
import OficinaMegaMenu from './OficinaMegaMenu';
import BanoMegaMenu from './BanoMegaMenu';
import InfantilesMegaMenu from './InfantilesMegaMenu';
import ProyectosMegaMenu from './ProyectosMegaMenu';
import CotizarMegaMenu from './CotizarMegaMenu';
import PuertasMegaMenu from './PuertasMegaMenu';
import HerrajesMegaMenu from './HerrajesMegaMenu';
import ElectrodomesticosMegaMenu from './ElectrodomesticosMegaMenu';
import CataloguesMegaMenu from './CataloguesMegaMenu';
import { useCurrency, useCart, useWishlist } from '../App';

interface HeaderProps {
  navigationData: NavigationData;
  onSelectCategory: (category: string) => void;
  onSelectProjectCategory: (category: string) => void;
  onGoHome: () => void;
  onViewQuotePage: () => void;
  onSelectQuoteType: (type: string) => void;
  onViewAboutPage: () => void;
  onViewContactPage: () => void;
  onViewCart: () => void;
  onViewWishlist: () => void;
  onViewBlogPage: () => void;
  onViewCataloguesPage: () => void;
  onViewCatalogueDetail: (catalogue: Catalogue) => void;
  onNavigate: (key: string) => void;
  searchQuery: string;
  onSearch: (query: string) => void;
}

const megaMenuComponents: { [key: string]: React.FC<any> } = {
  sala: SalaMegaMenu,
  dormitorio: DormitorioMegaMenu,
  cocina: CocinaMegaMenu,
  recibidor: RecibidorMegaMenu,
  oficina: OficinaMegaMenu,
  bano: BanoMegaMenu,
  infantiles: InfantilesMegaMenu,
  puertas: PuertasMegaMenu,
  herrajes: HerrajesMegaMenu,
  electrodomesticos: ElectrodomesticosMegaMenu,
  catalogues: CataloguesMegaMenu,
  proyectos: ProyectosMegaMenu,
  cotizar: CotizarMegaMenu,
};

const benefitIconMap: { [key: string]: React.ElementType } = {
  Truck,
  CreditCard,
  ShieldCheck,
  Phone,
  Package,
  Gem,
  Lightbulb,
  Award,
  Heart,
  CheckCircle,
};


const Header: React.FC<HeaderProps> = ({ 
    navigationData,
    onSelectCategory, onSelectProjectCategory, onGoHome, onViewQuotePage, 
    onSelectQuoteType, onViewCart, onViewWishlist,
    onViewBlogPage, onViewCataloguesPage, onViewCatalogueDetail, onNavigate, searchQuery, onSearch
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileSubMenu, setOpenMobileSubMenu] = useState<string | null>(null);
  const [openMenuKey, setOpenMenuKey] = useState<string | null>(null);
  const [searchInputValue, setSearchInputValue] = useState(searchQuery);

  useEffect(() => {
    setSearchInputValue(searchQuery);
  }, [searchQuery]);

  const { currency, setCurrency } = useCurrency();
  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  
  const linkActions: { [key: string]: () => void } = {
    about: () => onNavigate('about'),
    faq: () => onNavigate('faq'),
    legal: () => onNavigate('legal'),
    contact: () => onNavigate('contact'),
  };

  const closeAllMegaMenus = () => {
    setOpenMenuKey(null);
  };
  
  const handleNavLinkClick = (menuItem: MenuItem) => {
    switch (menuItem.key) {
      case 'proyectos':
        onSelectProjectCategory(''); // Show all projects
        break;
      case 'cotizar':
        onViewQuotePage();
        break;
      case 'blog':
        onViewBlogPage();
        break;
      case 'catalogues':
        onViewCataloguesPage();
        break;
      default:
        onSelectCategory(menuItem.title);
        break;
    }
    closeAllMegaMenus();
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInputValue);
  };

  const handleMobileSubItemClick = (mainItem: MenuItem, subItem: SubCategory) => {
    if (mainItem.key === 'proyectos') {
      onSelectProjectCategory(subItem.name);
    } else if (mainItem.key === 'cotizar') {
      onSelectQuoteType(subItem.quoteType!);
    } else {
      onSelectCategory(subItem.name); // Or mainItem.title if you want the parent category page
    }
    setIsMenuOpen(false);
  };

  const visibleMenuItems = navigationData.menuItems.filter(item => item.isVisible);

  const renderMegaMenu = () => {
    if (!openMenuKey) return null;
    const MegaMenuComponent = megaMenuComponents[openMenuKey];
    const menuItem = navigationData.menuItems.find(item => item.key === openMenuKey);
    if (!MegaMenuComponent || !menuItem) return null;

    let props: any = {
        onClose: closeAllMegaMenus,
    };

    if (openMenuKey === 'catalogues') {
        props.catalogues = navigationData.catalogues.filter(c => c.isVisible);
        props.onViewCatalogue = onViewCatalogueDetail;
    } else {
        props.subCategories = menuItem.subCategories;
        props.featuredImageUrl = menuItem.featuredImageUrl;
        props.onSelectCategory = () => { handleNavLinkClick(menuItem); };
        props.onSelectProjectCategory = onSelectProjectCategory;
        props.onSelectQuoteType = onSelectQuoteType;
        if (openMenuKey === 'cotizar') {
            props.quoteTypes = menuItem.subCategories;
        }
    }

    return (
      <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t" onMouseEnter={() => setOpenMenuKey(openMenuKey)}>
        <MegaMenuComponent {...props} />
      </div>
    );
  }

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      {/* Top Info Bar */}
      <div className="hidden md:block bg-gray-100 text-gray-600 text-xs border-b border-gray-200">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-8">
          <div className="flex items-center space-x-4">
            {navigationData.topBarBenefits.map(benefit => {
              const Icon = benefitIconMap[benefit.icon];
              return (
                <div key={benefit.id} className="flex items-center">
                  {Icon && <Icon className="h-4 w-4 mr-1 text-[#5a1e38]" />}
                  {benefit.text}
                </div>
              );
            })}
          </div>
          <div className="flex items-center space-x-3">
             {navigationData.topBarLinks.map((link, index) => (
                <React.Fragment key={link.id}>
                    <button onClick={linkActions[link.id]} className="hover:text-[#5a1e38]">{link.text}</button>
                    {index < navigationData.topBarLinks.length -1 && <span className="text-gray-300">|</span>}
                </React.Fragment>
             ))}
             <span className="text-gray-300">|</span>
            <a href={navigationData.contactPhoneLink} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-[#5a1e38]">
              <Phone className="h-4 w-4 mr-1 text-[#5a1e38]"/> {navigationData.contactPhoneNumber}
            </a>
            <button 
              onClick={() => setCurrency(currency === 'USD' ? 'RD$' : 'USD')} 
              className="flex items-center px-2 py-1 rounded hover:bg-gray-200 transition-colors"
              aria-label={`Cambiar moneda. Actual: ${currency}`}
            >
              <span className="font-semibold text-xs">{currency}</span>
              <ChevronDown className="h-3 w-3 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center lg:flex-1">
             <button onClick={onGoHome} aria-label="Decora Group Home">
                <Logo src={navigationData.logoUrl} />
             </button>
          </div>
          
          <div className="hidden lg:flex flex-1 justify-center px-8">
            <form onSubmit={handleSearchSubmit} className="w-full max-w-lg relative">
              <input
                type="text"
                placeholder="Buscar productos, marcas y más..."
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
                className="w-full bg-white rounded-md py-3 pl-12 pr-14 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5a1e38] focus:border-transparent transition-all text-gray-900"
              />
              <Camera className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer"/>
              <button type="submit" className="absolute right-0 top-0 bottom-0 px-4 flex items-center bg-gray-100 rounded-r-md border-l border-gray-300 hover:bg-gray-200">
                <Search className="h-5 w-5 text-gray-600" />
              </button>
            </form>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 lg:flex-1 justify-end">
             <button className="p-2 rounded-full text-gray-600 hover:text-[#5a1e38] transition-colors">
              <User className="h-6 w-6" />
            </button>
            <button onClick={onViewWishlist} className="relative p-2 rounded-full text-gray-600 hover:text-[#5a1e38] transition-colors">
              <Heart className="h-6 w-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 bg-[#5a1e38] text-white text-xs rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>
             <button onClick={onViewCart} className="relative p-2 rounded-full text-gray-600 hover:text-[#5a1e38] transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 bg-[#5a1e38] text-white text-xs rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
            <div className="lg:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-gray-600 hover:bg-gray-100">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search Bar for Mobile/Tablet */}
      <div className="lg:hidden px-4 sm:px-6 pb-4 border-b border-gray-200">
        <form onSubmit={handleSearchSubmit} className="w-full relative">
          <input
            type="text"
            placeholder="Buscar productos, marcas y más..."
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
            className="w-full bg-gray-100 rounded-md py-3 pl-12 pr-14 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#5a1e38] focus:bg-white text-gray-900"
          />
          <Camera className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer"/>
          <button type="submit" className="absolute right-0 top-0 bottom-0 px-4 flex items-center">
              <Search className="h-5 w-5 text-gray-600" />
          </button>
        </form>
      </div>

      {/* Navigation Bar */}
      <nav 
        className="hidden lg:block border-t border-gray-200 relative"
        onMouseLeave={closeAllMegaMenus}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-12">
              <div className="flex space-x-8">
                {visibleMenuItems.map((item) => (
                  <a 
                    key={item.id} 
                    href="#"
                    onClick={(e) => { 
                      e.preventDefault(); 
                      handleNavLinkClick(item);
                    }}
                    className={`flex-shrink-0 text-gray-700 hover:text-[#5a1e38] font-medium transition-colors duration-200 text-sm tracking-wide 
                      ${openMenuKey === item.key ? 'text-[#5a1e38]' : ''}
                    `}
                    onMouseEnter={() => {
                       // Open mega menu for catalogues or items with subcategories
                      if (item.key === 'catalogues' || item.subCategories.length > 0) {
                        setOpenMenuKey(item.key);
                      } else {
                        closeAllMegaMenus();
                      }
                    }}
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
        </div>
        {renderMegaMenu()}
      </nav>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {visibleMenuItems.map((item) => {
              const isSubMenuOpen = openMobileSubMenu === item.key;
              const hasSubItems = item.subCategories.length > 0 || item.key === 'catalogues';
              
              if (!hasSubItems) {
                return (
                  <a key={item.key} href="#" onClick={(e) => { e.preventDefault(); handleNavLinkClick(item); setIsMenuOpen(false); }}
                    className="w-full block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#5a1e38] hover:bg-gray-50 text-left">
                    {item.title}
                  </a>
                );
              }

              return (
                <div key={item.key}>
                  <button onClick={() => setOpenMobileSubMenu(isSubMenuOpen ? null : item.key)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#5a1e38] hover:bg-gray-50 text-left"
                    aria-expanded={isSubMenuOpen}>
                    <span>{item.title}</span>
                    <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${isSubMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isSubMenuOpen && (
                     <div className="pl-6 pt-1 pb-2 space-y-1 border-l-2 ml-4">
                        {item.subCategories.map((subItem) => (
                           <a key={subItem.id} href="#" onClick={(e) => { e.preventDefault(); handleMobileSubItemClick(item, subItem); }}
                             className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-[#5a1e38] hover:bg-gray-100">
                             {subItem.name || subItem.title}
                           </a>
                        ))}
                     </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;