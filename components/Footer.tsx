
import React from 'react';
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin, Home, Menu, Heart, ShoppingCart } from 'lucide-react';
import FooterLogo from './FooterLogo';
import { FooterContent, FooterLink } from '../types';
import { useCart, useWishlist } from '../App';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
      className={className} 
      role="img" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.48 3.4 1.32 4.83l-1.39 5.22 5.38-1.38c1.37.77 2.94 1.23 4.59 1.23h.01c5.45 0 9.9-4.45 9.9-9.96 0-2.59-1.02-4.97-2.74-6.7C17.01 3.42 14.63 2.4 12.12 2.4c-.17 0-.34 0-.51.01zM12.05 3.67h-.01c.13 0 .26 0 .39.01C14.73 3.68 16.81 4.59 18.41 6.19c1.6 1.6 2.51 3.68 2.51 5.98 0 4.51-3.91 8.42-8.42 8.42h-.01c-1.5 0-2.94-.41-4.18-1.18l-.39-.23-3.04.78.8-2.97-.26-.42c-.84-1.33-1.29-2.86-1.29-4.47 0-4.51 3.91-8.42 8.42-8.42zm-3.22 3.62c-.14 0-.28 0-.42.24-.14.24-.75.85-.75 1.87 0 1.02.77 2.01.91 2.19.14.18 2 3.07 4.96 4.27 2.39 1.05 2.95.86 3.39.77.44-.09 1.48-.6 1.72-1.2.24-.6.24-1.08.15-1.22s-.28-.14-.52-.28c-.24-.14-1.48-.73-1.72-.82-.24-.09-.42-.05-.56.19s-.61.73-.75.91c-.14.18-.28.23-.52.09-.24-.14-1.05-.37-2-1.28-1.0-1-1.66-2.04-1.84-2.33s.14-.28.26-.4c.12-.12.28-.33.42-.51.14-.18.19-.32.28-.5s-.05-.37-.12-.52c-.07-.14-.62-1.48-.8-2.02-.16-.54-.34-.47-.48-.47z"/>
    </svg>
);

interface FooterProps {
  onViewAdminPage: () => void;
  content: FooterContent;
  footerLogoUrl: string;
  onSelectProjectCategory: (category: string) => void;
  onNavigate: (key: string, detail?: string) => void;
  isMenuOpen: boolean;
  view: string;
  onMenuToggle: (isOpen: boolean) => void;
}

const socialIconMap = {
    Facebook: Facebook,
    Instagram: Instagram,
    Youtube: Youtube,
    WhatsApp: WhatsAppIcon
};

const NavItem: React.FC<{
    label: string;
    icon: React.ElementType;
    isActive: boolean;
    onClick?: () => void;
    badgeCount?: number;
    href?: string;
}> = ({ label, icon: Icon, isActive, onClick, badgeCount = 0, href }) => {
    
    const content = (
      <>
        <div className="relative">
          <Icon className={`h-6 w-6 transition-colors ${isActive ? 'text-[#5a1e38]' : 'text-gray-600'}`} />
          {badgeCount > 0 && (
            <span className="absolute -top-2 -right-3 flex items-center justify-center h-5 w-5 bg-[#5a1e38] text-white text-[10px] font-bold rounded-full border-2 border-white">
              {badgeCount}
            </span>
          )}
        </div>
        <span className={`text-xs transition-colors ${isActive ? 'text-[#5a1e38] font-semibold' : 'text-gray-600'}`}>
          {label}
        </span>
      </>
    );

    if (href) {
        return (
             <a href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center space-y-1 flex-1 h-full">
                {content}
            </a>
        )
    }

    return (
        <button onClick={onClick} className="flex flex-col items-center justify-center space-y-1 flex-1 h-full">
            {content}
        </button>
    );
};

const Footer: React.FC<FooterProps> = ({ onViewAdminPage, content, footerLogoUrl, onSelectProjectCategory, onNavigate, isMenuOpen, view, onMenuToggle }) => {
  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  
  const renderLink = (link: FooterLink) => {
    switch(link.linkType) {
        case 'project-category':
          return (
            <button onClick={() => onSelectProjectCategory(link.url)} className="text-sm text-gray-400 hover:text-white text-left">
                {link.text}
            </button>
          );
        case 'page':
            return (
                <button onClick={() => onNavigate(link.url)} className="text-sm text-gray-400 hover:text-white text-left">
                    {link.text}
                </button>
            );
        case 'legal':
            return (
                 <button onClick={() => onNavigate('legalDetail', link.url)} className="text-xs text-gray-500 hover:text-gray-300">
                    {link.text}
                </button>
            )
        case 'url':
        default:
            return <a href={link.url} className="text-sm text-gray-400 hover:text-white">{link.text}</a>;
    }
  };

  return (
    <>
      <footer className="hidden md:block bg-[#121212] text-gray-300" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">Footer</h2>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Socials Column */}
            <div className="space-y-6">
              <FooterLogo src={footerLogoUrl} />
              <p className="text-sm text-gray-400">
                {content.description}
              </p>
              <div className="flex space-x-4">
                {content.socialLinks.map(social => {
                    const Icon = socialIconMap[social.platform];
                    return (
                        <a key={social.id} href={social.url} className="text-gray-400 hover:text-white"><span className="sr-only">{social.platform}</span><Icon className="h-6 w-6" /></a>
                    )
                })}
              </div>
            </div>
            
            {content.linkColumns.map(column => (
                <div key={column.id}>
                    <h3 className="text-base font-semibold text-white tracking-wider">{column.title}</h3>
                    <ul role="list" className="mt-4 space-y-3">
                        {column.links.map(link => <li key={link.id}>{renderLink(link)}</li>)}
                    </ul>
                </div>
            ))}

            {/* Contact Column */}
            <div>
              <h3 className="text-base font-semibold text-white tracking-wider">Contacto</h3>
               <div className="mt-4 space-y-4 text-sm text-gray-400">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0"/>
                    <span>{content.contactInfo.address}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0"/>
                    <span>{content.contactInfo.phone}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0"/>
                    <span>{content.contactInfo.email}</span>
                  </div>
               </div>
            </div>
          </div>
          
          <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm text-gray-500 text-center sm:text-left">
              {content.copyrightText}
              <button onClick={onViewAdminPage} className="ml-4 text-xs text-gray-600 hover:text-gray-400">Panel de Administración</button>
            </p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              {content.legalLinks.map(link => (
                <span key={link.id}>{renderLink(link)}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* --- Mobile Bottom Navigation Bar --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-2px_5px_rgba(0,0,0,0.05)] z-40">
        <div className="flex justify-around h-16 pb-[env(safe-area-inset-bottom)]">
          <NavItem label="Inicio" icon={Home} isActive={view === 'home'} onClick={() => onNavigate('home')} />
          <NavItem label="Menú" icon={Menu} isActive={isMenuOpen} onClick={() => onMenuToggle(!isMenuOpen)} />
          <NavItem label="Deseos" icon={Heart} isActive={view === 'wishlist'} onClick={() => onNavigate('wishlist')} badgeCount={wishlistCount} />
          <NavItem label="Carrito" icon={ShoppingCart} isActive={view === 'cart'} onClick={() => onNavigate('cart')} badgeCount={itemCount} />
          <NavItem label="Contacto" icon={WhatsAppIcon} isActive={false} href="https://wa.me/18494561963" />
        </div>
      </div>
    </>
  );
};

export default Footer;