import React from 'react';
import { Facebook, Instagram, Youtube, ArrowUp } from 'lucide-react';
import FooterLogo from './FooterLogo';

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
  footerLogoUrl: string;
}

const Footer: React.FC<FooterProps> = ({ onViewAdminPage, footerLogoUrl }) => {
  const servicesLinks = [
    "Cocinas Personalizadas", "Closets y Walk-in", "Baños Modernos", 
    "Muebles a Medida", "Mobiliario de Oficina", "Proyectos Comerciales"
  ];
  const quickLinks = ["Inicio", "Quiénes Somos", "Galería", "Blog", "Contacto"];
  const legalLinks = ["Política de Privacidad", "Términos y Condiciones", "Aviso Legal", "Política de Cookies"];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <footer className="bg-[#121212] text-gray-300" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">Footer</h2>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Socials Column */}
            <div className="space-y-6">
              <FooterLogo src={footerLogoUrl} />
              <p className="text-sm text-gray-400">
                Transformamos espacios con diseños únicos y funcionales, creando ambientes que reflejan tu estilo de vida.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white"><span className="sr-only">Facebook</span><Facebook className="h-6 w-6" /></a>
                <a href="#" className="text-gray-400 hover:text-white"><span className="sr-only">Instagram</span><Instagram className="h-6 w-6" /></a>
                <a href="#" className="text-gray-400 hover:text-white"><span className="sr-only">YouTube</span><Youtube className="h-6 w-6" /></a>
                <a href="#" className="text-gray-400 hover:text-white"><span className="sr-only">WhatsApp</span><WhatsAppIcon className="h-6 w-6" /></a>
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h3 className="text-base font-semibold text-white tracking-wider">Servicios</h3>
              <ul role="list" className="mt-4 space-y-3">
                {servicesLinks.map(item => <li key={item}><a href="#" className="text-sm text-gray-400 hover:text-white">{item}</a></li>)}
              </ul>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="text-base font-semibold text-white tracking-wider">Enlaces Rápidos</h3>
              <ul role="list" className="mt-4 space-y-3">
                {quickLinks.map(item => <li key={item}><a href="#" className="text-sm text-gray-400 hover:text-white">{item}</a></li>)}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-base font-semibold text-white tracking-wider">Contacto</h3>
               <div className="mt-4 space-y-3 text-sm text-gray-400">
                  <p>Punta Cana, Rep. Dominicana</p>
                  <p>(849) 456-1963</p>
                  <p>info@decoragroup.pc</p>
               </div>
            </div>
          </div>
          
          <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm text-gray-500 text-center sm:text-left">
              &copy; {new Date().getFullYear()} Decora Group. Todos los derechos reservados.
              <button onClick={onViewAdminPage} className="ml-4 text-xs text-gray-600 hover:text-gray-400">Panel de Administración</button>
            </p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              {legalLinks.map(item => (
                <a href="#" key={item} className="text-xs text-gray-500 hover:text-gray-300">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center space-y-3">
         <button 
           onClick={scrollToTop}
           className="h-12 w-12 flex items-center justify-center bg-gray-300 text-gray-800 rounded-full shadow-lg hover:bg-white transition-colors"
           aria-label="Volver arriba"
         >
          <ArrowUp className="h-6 w-6" />
        </button>
        <a 
          href="https://wa.me/18494561963" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="h-14 w-14 flex items-center justify-center bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
          aria-label="Contactar por WhatsApp"
        >
          <WhatsAppIcon className="h-8 w-8" />
        </a>
      </div>
    </>
  );
};

export default Footer;