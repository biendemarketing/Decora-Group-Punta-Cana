import React, { useState } from 'react';
import { Search, User, Menu, X, Phone, ShieldCheck, CreditCard, Truck, Heart, ShoppingCart, Camera, ChevronDown } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import Logo from './Logo';
import SalonMegaMenu from './SalonMegaMenu';
import DormitorioMegaMenu from './DormitorioMegaMenu';
import CocinaMegaMenu from './CocinaMegaMenu';
import RecibidorMegaMenu from './RecibidorMegaMenu';
import OficinaMegaMenu from './OficinaMegaMenu';
import BanoMegaMenu from './BanoMegaMenu';
import InfantilesMegaMenu from './InfantilesMegaMenu';
import ProyectosMegaMenu from './ProyectosMegaMenu';
import CotizarMegaMenu from './CotizarMegaMenu';

interface HeaderProps {
  onSelectCategory: (category: string) => void;
  onSelectProjectCategory: (category: string) => void;
  onGoHome: () => void;
  onViewQuotePage: () => void;
  onSelectQuoteType: (type: string) => void;
  onViewAboutPage: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSelectCategory, onSelectProjectCategory, onGoHome, onViewQuotePage, onSelectQuoteType, onViewAboutPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSalonMenuOpen, setIsSalonMenuOpen] = useState(false);
  const [isDormitorioMenuOpen, setIsDormitorioMenuOpen] = useState(false);
  const [isCocinaMenuOpen, setIsCocinaMenuOpen] = useState(false);
  const [isRecibidorMenuOpen, setIsRecibidorMenuOpen] = useState(false);
  const [isOficinaMenuOpen, setIsOficinaMenuOpen] = useState(false);
  const [isBanoMenuOpen, setIsBanoMenuOpen] = useState(false);
  const [isInfantilesMenuOpen, setIsInfantilesMenuOpen] = useState(false);
  const [isProyectosMenuOpen, setIsProyectosMenuOpen] = useState(false);
  const [isCotizarMenuOpen, setIsCotizarMenuOpen] = useState(false);


  const closeAllMegaMenus = () => {
    setIsSalonMenuOpen(false);
    setIsDormitorioMenuOpen(false);
    setIsCocinaMenuOpen(false);
    setIsRecibidorMenuOpen(false);
    setIsOficinaMenuOpen(false);
    setIsBanoMenuOpen(false);
    setIsInfantilesMenuOpen(false);
    setIsProyectosMenuOpen(false);
    setIsCotizarMenuOpen(false);
  };
  
  const handleNavLinkClick = (link: string) => {
    if (link === 'Proyectos') {
      onGoHome();
    } else if (link === 'Cotizar a medida') {
      onViewQuotePage();
    } else {
      onSelectCategory(link);
    }
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      {/* Top Info Bar */}
      <div className="hidden md:block bg-gray-100 text-gray-600 text-xs border-b border-gray-200">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center"><Truck className="h-4 w-4 mr-1 text-[#5a1e38]"/> Entrega gratis en Punta Cana</div>
            <div className="flex items-center"><CreditCard className="h-4 w-4 mr-1 text-[#5a1e38]"/> Pago a la entrega</div>
            <div className="flex items-center"><ShieldCheck className="h-4 w-4 mr-1 text-[#5a1e38]"/> 365 días - garantía</div>
          </div>
          <div className="flex items-center space-x-3">
             <button onClick={onViewAboutPage} className="hover:text-[#5a1e38]">Nosotros</button>
             <span className="text-gray-300">|</span>
             <a href="#" className="hover:text-[#5a1e38]">FAQ</a>
             <span className="text-gray-300">|</span>
             <a href="#" className="hover:text-[#5a1e38]">Aviso Legal y Términos y Condiciones</a>
             <span className="text-gray-300">|</span>
             <a href="#" className="hover:text-[#5a1e38]">Contacto</a>
             <span className="text-gray-300">|</span>
            <div className="flex items-center"><Phone className="h-4 w-4 mr-1 text-[#5a1e38]"/> (849) 456-1963</div>
            <button className="flex items-center">
              ES <ChevronDown className="h-3 w-3 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center lg:flex-1">
             <button onClick={onGoHome} aria-label="Decora Group Home">
                <Logo />
             </button>
          </div>
          
          <div className="hidden lg:flex flex-1 justify-center px-8">
             <div className="w-full max-w-lg relative">
               <input
                type="text"
                placeholder="Buscar productos, marcas y más..."
                className="w-full bg-white rounded-md py-3 pl-12 pr-14 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5a1e38] focus:border-transparent transition-all"
               />
               <Camera className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer"/>
               <button className="absolute right-0 top-0 bottom-0 px-4 flex items-center bg-gray-100 rounded-r-md border-l border-gray-300 hover:bg-gray-200">
                 <Search className="h-5 w-5 text-gray-600" />
               </button>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 lg:flex-1 justify-end">
             <button className="p-2 rounded-full text-gray-600 hover:text-[#5a1e38] transition-colors">
              <User className="h-6 w-6" />
            </button>
            <button className="p-2 rounded-full text-gray-600 hover:text-[#5a1e38] transition-colors">
              <Heart className="h-6 w-6" />
            </button>
             <button className="relative p-2 rounded-full text-gray-600 hover:text-[#5a1e38] transition-colors">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 bg-[#5a1e38] text-white text-xs rounded-full">0</span>
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
        <div className="w-full relative">
            <input
            type="text"
            placeholder="Buscar productos, marcas y más..."
            className="w-full bg-gray-100 rounded-md py-3 pl-12 pr-14 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#5a1e38] focus:bg-white"
            />
            <Camera className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer"/>
            <button className="absolute right-0 top-0 bottom-0 px-4 flex items-center">
                <Search className="h-5 w-5 text-gray-600" />
            </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav 
        className="hidden lg:block border-t border-gray-200 relative"
        onMouseLeave={closeAllMegaMenus}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-12">
              <div className="flex space-x-8">
                {NAV_LINKS.map((link) => (
                  <a 
                    key={link} 
                    href="#"
                    onClick={(e) => { 
                      e.preventDefault(); 
                      handleNavLinkClick(link);
                    }}
                    className={`flex-shrink-0 text-gray-700 hover:text-[#5a1e38] font-medium transition-colors duration-200 text-sm tracking-wide 
                      ${link === 'Salón' && isSalonMenuOpen ? 'text-[#5a1e38]' : ''}
                      ${link === 'Dormitorio' && isDormitorioMenuOpen ? 'text-[#5a1e38]' : ''}
                      ${link === 'Cocina' && isCocinaMenuOpen ? 'text-[#5a1e38]' : ''}
                      ${link === 'Recibidor' && isRecibidorMenuOpen ? 'text-[#5a1e38]' : ''}
                      ${link === 'Oficina' && isOficinaMenuOpen ? 'text-[#5a1e38]' : ''}
                      ${link === 'Baño' && isBanoMenuOpen ? 'text-[#5a1e38]' : ''}
                      ${link === 'Muebles infantiles' && isInfantilesMenuOpen ? 'text-[#5a1e38]' : ''}
                      ${link === 'Proyectos' && isProyectosMenuOpen ? 'text-[#5a1e38]' : ''}
                       ${link === 'Cotizar a medida' && isCotizarMenuOpen ? 'text-[#5a1e38]' : ''}
                    `}
                    onMouseEnter={() => {
                      closeAllMegaMenus();
                      if (link === 'Salón') setIsSalonMenuOpen(true);
                      else if (link === 'Dormitorio') setIsDormitorioMenuOpen(true);
                      else if (link === 'Cocina') setIsCocinaMenuOpen(true);
                      else if (link === 'Recibidor') setIsRecibidorMenuOpen(true);
                      else if (link === 'Oficina') setIsOficinaMenuOpen(true);
                      else if (link === 'Baño') setIsBanoMenuOpen(true);
                      else if (link === 'Muebles infantiles') setIsInfantilesMenuOpen(true);
                      else if (link === 'Proyectos') setIsProyectosMenuOpen(true);
                      else if (link === 'Cotizar a medida') setIsCotizarMenuOpen(true);
                    }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
        </div>
        {isSalonMenuOpen && (
          <div 
            className="absolute top-full left-0 w-full bg-white shadow-lg border-t"
            onMouseEnter={() => setIsSalonMenuOpen(true)}
          >
            <SalonMegaMenu onSelectCategory={() => onSelectCategory('Salón')} onClose={closeAllMegaMenus} />
          </div>
        )}
        {isDormitorioMenuOpen && (
          <div 
            className="absolute top-full left-0 w-full bg-white shadow-lg border-t"
            onMouseEnter={() => setIsDormitorioMenuOpen(true)}
          >
            <DormitorioMegaMenu onSelectCategory={() => onSelectCategory('Dormitorio')} onClose={closeAllMegaMenus} />
          </div>
        )}
        {isCocinaMenuOpen && (
          <div 
            className="absolute top-full left-0 w-full bg-white shadow-lg border-t"
            onMouseEnter={() => setIsCocinaMenuOpen(true)}
          >
            <CocinaMegaMenu onSelectCategory={() => onSelectCategory('Cocina')} onClose={closeAllMegaMenus} />
          </div>
        )}
         {isRecibidorMenuOpen && (
          <div 
            className="absolute top-full left-0 w-full bg-white shadow-lg border-t"
            onMouseEnter={() => setIsRecibidorMenuOpen(true)}
          >
            <RecibidorMegaMenu onSelectCategory={() => onSelectCategory('Recibidor')} onClose={closeAllMegaMenus} />
          </div>
        )}
        {isOficinaMenuOpen && (
          <div 
            className="absolute top-full left-0 w-full bg-white shadow-lg border-t"
            onMouseEnter={() => setIsOficinaMenuOpen(true)}
          >
            <OficinaMegaMenu onSelectCategory={() => onSelectCategory('Oficina')} onClose={closeAllMegaMenus} />
          </div>
        )}
        {isBanoMenuOpen && (
          <div 
            className="absolute top-full left-0 w-full bg-white shadow-lg border-t"
            onMouseEnter={() => setIsBanoMenuOpen(true)}
          >
            <BanoMegaMenu onSelectCategory={() => onSelectCategory('Baño')} onClose={closeAllMegaMenus} />
          </div>
        )}
        {isInfantilesMenuOpen && (
          <div 
            className="absolute top-full left-0 w-full bg-white shadow-lg border-t"
            onMouseEnter={() => setIsInfantilesMenuOpen(true)}
          >
            <InfantilesMegaMenu onSelectCategory={() => onSelectCategory('Muebles infantiles')} onClose={closeAllMegaMenus} />
          </div>
        )}
        {isProyectosMenuOpen && (
          <div 
            className="absolute top-full left-0 w-full bg-white shadow-lg border-t"
            onMouseEnter={() => setIsProyectosMenuOpen(true)}
          >
            <ProyectosMegaMenu onSelectProjectCategory={onSelectProjectCategory} onClose={closeAllMegaMenus} />
          </div>
        )}
        {isCotizarMenuOpen && (
          <div 
            className="absolute top-full left-0 w-full bg-white shadow-lg border-t"
            onMouseEnter={() => setIsCotizarMenuOpen(true)}
          >
            <CotizarMegaMenu onSelectQuoteType={onSelectQuoteType} onClose={closeAllMegaMenus} />
          </div>
        )}
      </nav>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
              <a 
                key={link} 
                href="#" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  handleNavLinkClick(link);
                  setIsMenuOpen(false); 
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#5a1e38] hover:bg-gray-50">
                {link}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
