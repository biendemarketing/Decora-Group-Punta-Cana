
import React from 'react';
import iconMap from '../utils/iconMap';
import { Download, Book, Database, Package, Layers, HardDrive, Share2, Save } from 'lucide-react';

const Topic: React.FC<{ title: string; icon: React.ElementType; text: string; code?: string }> = ({ title, icon: Icon, text, code }) => (
  <div className="p-4 border rounded-lg bg-gray-50/50 break-inside-avoid">
    <h3 className="text-lg font-semibold text-[#5a1e38] flex items-center gap-2">
      <Icon className="h-5 w-5" />
      {title}
    </h3>
    <p className="mt-2 text-gray-700 text-base leading-relaxed whitespace-pre-line">{text}</p>
    {code && (
      <pre className="mt-4 p-3 bg-gray-800 text-white rounded-md text-sm overflow-x-auto">
        <code>{code}</code>
      </pre>
    )}
  </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section>
    <h2 className="text-2xl font-bold text-gray-800 pb-2 mb-6 border-b-2 border-gray-300">{title}</h2>
    <div className="space-y-6">
      {children}
    </div>
  </section>
);

const DocumentationPage: React.FC = () => {
  const lastUpdated = new Date().toLocaleDateString('es-DO', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="printable-area">
      {/* Header for both screen and print */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documentación Técnica del Sistema</h1>
          <p className="text-gray-600">Guía para desarrolladores y administradores sobre la estructura y funcionamiento del CMS.</p>
          <p className="text-xs text-gray-500 mt-1">Última actualización: {lastUpdated}</p>
        </div>
        <button 
          onClick={() => window.print()}
          className="no-print flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          <Download className="h-4 w-4" /> Descargar PDF
        </button>
      </div>

      {/* Main Content */}
      <div className="space-y-10">
        <Section title="Estructura de Datos (Types)">
          <Topic
            title="NavigationData"
            icon={Database}
            text="Este es el objeto principal que contiene la mayoría de los datos de configuración del sitio. Se guarda en localStorage bajo la clave `navigationData`. Incluye menús, sliders, contenido de páginas estáticas, configuraciones globales, etc."
            code={`interface NavigationData {\n  menuItems: MenuItem[];\n  heroSlides: HeroSlide[];\n  // ... y muchos más\n}`}
          />
          <Topic
            title="Product"
            icon={Package}
            text="Define la estructura de un producto individual. Los productos se guardan en localStorage bajo la clave `productsData`. La carga inicial se procesa desde `rawProducts` en `constants.ts` a través de `processProducts` en `App.tsx`."
            code={`interface Product {\n  id: number;\n  name: string;\n  price: number;\n  category: string;\n  // ...etc\n}`}
          />
          <Topic
            title="Page & PageSection"
            icon={Layers}
            text="Permite la creación de páginas personalizadas (como 'Quiénes Somos') utilizando un sistema de secciones o 'bloques'. Cada `Page` tiene un array de `PageSection`. El tipo de sección (`SectionType`) determina qué componente de React se renderiza y qué estructura tiene su `content`."
            code={`type SectionType = 'history' | 'timeline' | 'team' // ...etc\n\ninterface PageSection {\n  id: string;\n  type: SectionType;\n  content: any; // El contenido varía según el tipo\n}`}
          />
        </Section>
        
        <Section title="Flujo de Datos y Persistencia">
           <Topic
            title="LocalStorage"
            icon={HardDrive}
            text="El estado principal de la aplicación (datos de navegación, productos, proyectos) se persiste en el LocalStorage del navegador. Esto permite que los cambios realizados en el panel de administración se mantengan entre sesiones sin necesidad de un backend. Las claves principales son: `navigationData`, `projectsData`, y `productsData`."
          />
          <Topic
            title="Estado en React (useState & Context)"
            icon={Share2}
            text="El estado se carga desde LocalStorage al iniciar la aplicación en `App.tsx`. Se gestiona con `useState` y se comparte a través de la aplicación mediante React Context (`CurrencyContext`, `CartContext`, `WishlistContext`). Los cambios realizados en el AdminPanel actualizan un estado 'borrador' (draft state)."
          />
          <Topic
            title="Guardado de Cambios"
            icon={Save}
            text="Al hacer clic en 'Guardar Cambios' en el AdminPanel, la función `handleSaveChanges` en `App.tsx` se dispara. Esta función actualiza el estado principal de React con los datos del 'borrador' y sobrescribe las claves correspondientes en LocalStorage con la nueva información serializada en JSON."
          />
        </Section>
      </div>
    </div>
  );
};

export default DocumentationPage;