import type { QuoteType, QuoteConfig, QuoteTemplateConfig } from '../types';

export const QUOTE_PROJECT_TYPES_DATA: QuoteType[] = [
  {
    id: crypto.randomUUID(),
    title: 'TV Wall',
    description: 'Espacios de muebles de TV y similares.',
    imageUrl: 'https://hom.com.do/wp-content/uploads/2024/08/tv-wall-hom-9.jpg',
    quoteType: 'TV Wall',
  },
  {
    id: crypto.randomUUID(),
    title: 'Closets',
    description: 'Reach in, walk in y personalizados.',
    imageUrl: 'https://hom.com.do/wp-content/uploads/2025/02/closet-u.jpg',
    quoteType: 'Closets',
  },
  {
    id: crypto.randomUUID(),
    title: 'Cocinas',
    description: 'Modulares personalizados.',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop',
    quoteType: 'Cocinas',
  },
  {
    id: crypto.randomUUID(),
    title: 'Muebles Personalizados',
    description: 'Diseño o solicitud de mobiliario con funciones especiales.',
    imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format&fit=crop',
    quoteType: 'Muebles Personalizados',
  },
  {
    id: crypto.randomUUID(),
    title: 'Mobiliario Comercial',
    description: 'Construcción de tiendas, anaqueles, tramería, estantes, counters, etc...',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop',
    quoteType: 'Mobiliario Comercial',
  },
  {
    id: crypto.randomUUID(),
    title: 'Construcciones Especializadas',
    description: 'Desde el revestimiento de una pared hasta la construcción de una tiny house.',
    imageUrl: 'https://images.unsplash.com/photo-1512211756210-85090ea05c0b?q=80&w=800&auto=format&fit=crop',
    quoteType: 'Construcciones Especializadas',
  },
];

export const INITIAL_QUOTE_TEMPLATE_CONFIG: QuoteTemplateConfig = {
  companyInfo: {
    name: 'Decora Group Punta Cana',
    addressLine1: 'CANATOWN Plaza & Centro de Logística',
    addressLine2: 'Av. Barceló, local 101, Veron, Punta Cana',
    rnc: '131-80470-5',
    email: 'decoragrouppc@gmail.com',
    phone: '(849) 456-1963',
  },
  labels: {
    mainTitle: 'COTIZACIÓN',
    quoteNumberLabel: 'No:',
    dateLabel: 'Fecha:',
    fromLabel: 'DE:',
    toLabel: 'PARA:',
    itemDescriptionHeader: 'Descripción',
    itemQuantityHeader: 'Cant.',
    itemUnitPriceHeader: 'Precio Unit.',
    itemTotalHeader: 'Total',
    subtotalLabel: 'Subtotal:',
    taxLabel: 'ITBIS (18%):',
    totalLabel: 'TOTAL:',
    footerTextLine1: 'Gracias por su interés en Decora Group.',
    footerTextLine2: 'Esta cotización es válida por 30 días. Los precios no incluyen instalación a menos que se especifique lo contrario.',
  },
  visibility: {
    showLogo: true,
    showQuoteNumber: true,
    showDate: true,
    showRnc: true,
    showTax: true,
  },
  style: {
    accentColor: '#5a1e38',
  },
};

export const INITIAL_QUOTE_CONFIG: QuoteConfig = {
    projectTypes: QUOTE_PROJECT_TYPES_DATA,
    tvWall: {
      styles: [
        { id: crypto.randomUUID(), name: 'Clásico', price: 200, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/08/tv-wall-hom-7.jpg' },
        { id: crypto.randomUUID(), name: 'Clásico Vitrina', price: 255, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/08/tv-wall-hom-2.jpg' },
        { id: crypto.randomUUID(), name: 'Trilogy', price: 294, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/08/tv-wall-hom-6.jpg' },
        { id: crypto.randomUUID(), name: 'Trilogy Shell', price: 348, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/08/tv-wall-hom-4.jpg' },
        { id: crypto.randomUUID(), name: 'Bay Vitrina', price: 397, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/08/tv-wall-hom-5.jpg' },
        { id: crypto.randomUUID(), name: 'Bay Dual', price: 414, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/08/tv-wall-hom-1.jpg' },
        { id: crypto.randomUUID(), name: 'Librelux', price: 436, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/08/tv-wall-hom-3.jpg' },
        { id: crypto.randomUUID(), name: 'Librelux Shell', price: 448, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/08/tv-wall-hom-8.jpg' },
        { id: crypto.randomUUID(), name: 'MegaLux', price: 461, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/08/tv-wall-hom-9.jpg' },
      ]
    },
    closet: {
      types: [
        { id: crypto.randomUUID(), name: 'Closet Tipo U', value: 9, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/02/closet-u.jpg' },
        { id: crypto.randomUUID(), name: 'Closet Doble', value: 7, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/02/Closet-doble.jpg' },
        { id: crypto.randomUUID(), name: 'Closet L', value: 6, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/02/Closet-L.jpg' },
        { id: crypto.randomUUID(), name: 'Closet Simple', value: 5, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/02/closet-sencillo.jpg' },
        { id: crypto.randomUUID(), name: 'Armario', value: 4, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/02/armario.jpg' },
      ],
      modules: [
        { id: crypto.randomUUID(), name: 'Perchero Simple', price: 350, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/06/m1-perchero-simple-768x1432.jpg' },
        { id: crypto.randomUUID(), name: 'Perchero Doble', price: 350, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/06/m2-perchero-doble-768x1432.jpg' },
        { id: crypto.randomUUID(), name: 'Perchero Doble Gaveta', price: 400, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/06/m3-perchero-doble-gaveta-768x1432.jpg' },
        { id: crypto.randomUUID(), name: 'Módulo Tramos', price: 350, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/06/m4-modulo-tramos-768x1432.jpg' },
        { id: crypto.randomUUID(), name: 'Módulo Percha Dos Gavetas', price: 420, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/06/m5-modulo-perchera-dos-gavetas-768x1432.jpg' },
        { id: crypto.randomUUID(), name: 'Módulo Percha Tres Gavetas', price: 460, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/06/m6-modulo-perchera-tres-gavetas-768x1432.jpg' },
        { id: crypto.randomUUID(), name: 'Módulo Tramos Dos Gavetas', price: 420, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/06/m7-modulo-tramos-dos-gavetas-768x1432.jpg' },
        { id: crypto.randomUUID(), name: 'Módulo Tramos Perchero', price: 420, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/06/m8-modulo-tramos-percheros-768x1432.jpg' },
        { id: crypto.randomUUID(), name: 'Módulo Tramos Dos Gavetas, Perchero', price: 460, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/06/m9-modulo-tramos-dos-gavetas-perchero-768x1432.jpg' },
        { id: crypto.randomUUID(), name: 'Módulo Zapatera', price: 420, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/06/m10-modulo-zapatera-768x1432.jpg' },
        { id: crypto.randomUUID(), name: 'Módulo Accesorios Zapatera', price: 450, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/06/m11-modulo-accesorios-zapatera-768x1432.jpg' },
        { id: crypto.randomUUID(), name: 'Módulo Accesorios Dos Gavetas, Zapatera', price: 480, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/06/m12-modulo-accesorios-dos-gavetas-zapatera-768x1432.jpg' },
        { id: crypto.randomUUID(), name: 'Módulo Esquina Tramos', price: 500, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/06/m13-modulo-esquina-tramos-768x1365.jpg' },
        { id: crypto.randomUUID(), name: 'Módulo Esquina Perchero', price: 450, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/06/m14-modulo-esquina-perchero-768x1365.jpg' },
      ],
      accessories: [
        { id: crypto.randomUUID(), name: 'Iluminación LED', price: 450, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/05/iluminacion-closet.jpg' },
        { id: crypto.randomUUID(), name: 'Pantalonera Extraíble', price: 250, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/05/pantalonera-extraible.jpg' },
        { id: crypto.randomUUID(), name: 'Porta Correa Extraíble', price: 180, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/05/porta-correa.jpg' },
        { id: crypto.randomUUID(), name: 'Barra de Closet Desplegable', price: 200, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/05/barra-de-closet-desglegable-.jpg' },
        { id: crypto.randomUUID(), name: 'Gaveta de Accesorios', price: 150, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/05/gavetas-de-accesorios.jpg' },
        { id: crypto.randomUUID(), name: 'Perchero Extraíble', price: 150, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/05/perchero-extraible.jpg' },
      ]
    },
    kitchen: {
      sizes: [
        { id: crypto.randomUUID(), name: 'Pequeña 8 módulos (10 m²)', price: 2500, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/cocina-pequena-hom.jpg' },
        { id: crypto.randomUUID(), name: 'Mediana 12 módulos (15 m²)', price: 3510, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/cocina-mediana-hom.jpg' },
        { id: crypto.randomUUID(), name: 'Grande 16 módulos (25 m²)', price: 5518, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/cocina-grande-hom.jpg' },
      ],
      styles: [
        { id: crypto.randomUUID(), name: 'Un color, melamina tipo madera', multiplier: 1, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/cocina-un-colo-hom.jpg', price: 0 },
        { id: crypto.randomUUID(), name: 'Dos colores, melamina lisa y tipo madera', multiplier: 1.4, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/cocina-dos-colores-hom.jpg', price: 0 },
        { id: crypto.randomUUID(), name: 'Tres colores, melamina tipo lisa, madera y piedra', multiplier: 1.5, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/cocina-tres-colores.jpg', price: 0 },
        { id: crypto.randomUUID(), name: 'Madera preciosa (Roble)', multiplier: 2, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/cocina-roble-hom.jpg', price: 0 },
      ],
      countertops: [
        { id: crypto.randomUUID(), name: 'Sin tope', multiplier: 0, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/05/none.png', price: 0 },
        { id: crypto.randomUUID(), name: 'Granito', multiplier: 0.6, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/granito.jpg', price: 0 },
        { id: crypto.randomUUID(), name: 'Cuarzo', multiplier: 0.9, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/cuarzo.jpg', price: 0 },
        { id: crypto.randomUUID(), name: 'Aglomerado', multiplier: 0.5, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/aglomerado.jpg', price: 0 },
      ],
      sinks: [
        { id: crypto.randomUUID(), name: 'Fregadero Tradicional', price: 0, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/fregadero-tradicioanl.jpg' },
        { id: crypto.randomUUID(), name: 'Fregadero Cuadrado', price: 100, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/fregadero-cuadrado.jpg' },
        { id: crypto.randomUUID(), name: 'Fregadero Porcelana', price: 200, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/fregadero-porcelana.jpg' },
      ],
      faucets: [
        { id: crypto.randomUUID(), name: 'Tradicional Cromada', price: 0, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/plateada-curva.jpg' },
        { id: crypto.randomUUID(), name: 'Tradicional Dorada', price: 0, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/dorada.jpg' },
        { id: crypto.randomUUID(), name: 'Minimal Negra', price: 100, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/negra-recta.jpg' },
        { id: crypto.randomUUID(), name: 'Moderna Negra', price: 150, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/negra-con-dorado.jpg' },
        { id: crypto.randomUUID(), name: 'Boca Flexi', price: 175, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/negra-boca-flexible.jpg' },
        { id: crypto.randomUUID(), name: '3 en 1 Extraíble', price: 200, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/clomada-3-en-1.jpg' },
      ],
      accessories: [
        { id: crypto.randomUUID(), name: 'Despensa con Gavetas', price: 750, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/despensa-con-gavetas.jpg' },
        { id: crypto.randomUUID(), name: 'Despensa Extraíble', price: 850, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/despensa-extraible.jpg' },
        { id: crypto.randomUUID(), name: 'Gaveta en Zócalo', price: 250, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/gaveta-zocalo.jpg' },
        { id: crypto.randomUUID(), name: 'Mueble de Bandeja Esquina', price: 250, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/mueble-de-esquina.jpg' },
        { id: crypto.randomUUID(), name: 'Gavetas de Esquina', price: 250, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/gaveta-de-esquina.jpg' },
        { id: crypto.randomUUID(), name: 'Iluminación Bajo Gabinetes', price: 250, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/iluminacion-bajo-gabinetes.jpg' },
        { id: crypto.randomUUID(), name: 'Iluminación Dentro de Gabinetes', price: 250, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/iluminacion-en-gabinetes.jpg' },
        { id: crypto.randomUUID(), name: 'Especiero Extraíble', price: 160, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/especiero-extraible.jpg' },
        { id: crypto.randomUUID(), name: 'Basurero Extraíble', price: 160, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/basurero-extraible.jpg' },
        { id: crypto.randomUUID(), name: 'Gaveta Bajo Fregadero', price: 100, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/gaveta-bajo-fregadero.jpg' },
        { id: crypto.randomUUID(), name: 'Escurridor de Gabinete Flotante', price: 250, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/escrurridor-de-gabinete.jpg' },
        { id: crypto.randomUUID(), name: 'Toma Corriente de Tope', price: 250, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/enchufe-de-counter.jpg' },
      ],
    },
    general: {
      installationOptions: [
        { id: crypto.randomUUID(), label: 'Instalación sobre pared de cemento.', price: 300, multiplier: 1.15 },
        { id: crypto.randomUUID(), label: 'Instalación sobre pared de Sheetrock.', price: 450, multiplier: 1.2 },
        { id: crypto.randomUUID(), label: 'Remoción de espacio existente e instalación de la nueva.', price: 650, multiplier: 1.2 },
        { id: crypto.randomUUID(), label: 'Sin instalación.', price: 0, multiplier: 0 },
      ],
      paymentOptions: [
        '70% con la orden, 30% contra entrega.',
        'Pago de contado al poner la orden (- 10%)',
        'Pago Mensual por 6 meses + 10%.',
      ]
    },
    template: INITIAL_QUOTE_TEMPLATE_CONFIG,
};