import type { Catalogue } from '../types';

export const GOOGLE_FONTS = ['Poppins', 'Roboto', 'Montserrat', 'Lato', 'Playfair Display'];

export const CATALOGUE_COVER_TEMPLATES = [
    { id: 'minimalist_light', name: 'Minimalista Claro', preview: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MCAxMDUiPjxyZWN0IHdpZHRoPSI4MCIgaGVpZ2h0PSIxMDUiIGZpbGw9IiNmOWZhZmIiLz48cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZGg0PSI0MCIgZmlsbD0iI2RlZGVkZSIgcng9IjIiLz48cmVjdCB4PSIxNSIgeT0iNzUiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1IiBmaWxsPSIjY2NjIiByeD0iMiIvPjxyZWN0IHg9IjI1IiB5PSI4NSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMiIGZpbGw9IiNkZGQiIHJ4PSIyIi8+PC9zdmc+', imageSlots: 1 },
    { id: 'elegant_dark', name: 'Elegante Oscuro', preview: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MCAxMDUiPjxyZWN0IHdpZHRoPSI4MCIgaGVpZ2h0PSIxMDUiIGZpbGw9IiMyZDNlNGUiLz48cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iIzQwNDA0MCIgcng9IjIiLz48cmVjdCB4PSIxNSIgeT0iNzUiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1IiBmaWxsPSIjY2NjIiByeD0iMiIvPjxyZWN0IHg9IjI1IiB5PSI4NSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMiIGZpbGw9IiNkZGQiIHJ4PSIyIi8+PC9zdmc+', imageSlots: 1 },
    { id: 'modern_grid', name: 'Mosaico Moderno', preview: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MCAxMDUiPjxyZWN0IHdpZHRoPSI4MCIgaGVpZ-h0PSIxMDUiIGZpbGw9IiNmOWZhZmIiLz48cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iI2RlZGVkZSIgcng9IjIiLz48cmVjdCB4PSI0MiIgeT0iMTAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iI2RlZGVkZSIgcng9IjIiLz48cmVjdCB4PSIxMCIgeT0iNDIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iI2RlZGVkZSIgcng9IjIiLz48cmVjdCB4PSI0MiIgeT0iNDIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iI2RlZGVkZSIgcng9IjIiLz48cmVjdCB4PSIxMCIgeT0iODIiIHdpZHRoPSI2MiIgaGVpZ2h0PSI4IiBmaWxsPSIjY2NjIiByeD0iMiIvPjwvc3ZnPg==', imageSlots: 4 },
    { id: 'corporate_dark', name: 'Corporativo Oscuro', preview: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MCAxMDUiPjxyZWN0IHdpZHRoPSI4MCIgaGVpZ2h0PSIxMDUiIGZpbGw9IiMyZDNlNGUiLz48cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSIyNSIgZmlsbD0iIzQwNDA0MCIgcng9IjIiLz48cmVjdCB4PSIxMCIgeT0iNDUiIHdpZHRoPSIyNSIgaGVpZ2h0PSI1MCIgZmlsbD0iIzQwNDA0MCIgcng9IjIiLz48cmVjdCB4PSI0MCIgeT0iNDUiIHdpZHRoPSIzMCIgaGVpZ2h0PSI1MCIgZmlsbD0iIzYxNjE2MSIgcng9IjIiLz48cmVjdCB4PSIxMCIgeT0iMTAwIiB3aWR0aD0iNjAiIGhlaWdodD0iMiIgZmlsbD0iI2NjYyIvPjwvc3ZnPg==', imageSlots: 1 },
    { id: 'asymmetric_clean', name: 'Asimétrico Limpio', preview: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MCAxMDUiPjxyZWN0IHdpZHRoPSI4MCIgaGVpZ2h0PSIxMDUiIGZpbGw9IiNmOWZhZmIiLz48cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSIyNSIgaGVpZ2h0PSI4NSIgZmlsbD0iI2RlZGVkZSIgcng9IjIiLz48cmVjdCB4PSI0MCIgeT0iMTAiIHdpZHRoPSIzMCIgaGVpZ2h0PSI0MCIgZmlsbD0iI2RlZGVkZSIgcng9IjIiLz48cmVjdCB4PSI0MCIgeT0iNTUiIHdpZHRoPSIzMCIgaGVpZ2h0PSI0MCIgZmlsbD0iI2RlZGVkZSIgcng9IjIiLz48cmVjdCB4PSIxMCIgeT0iMTAwIiB3aWR0aD0iNjAiIGhlaWdodD0iMiIgZmlsbD0iI2NjYyIvPjwvc3ZnPg==', imageSlots: 3 },
];

export const CATALOGUE_PAGE_TEMPLATES = [
    { id: 'grid', name: 'Cuadrícula', preview: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MCAxMDUiPjxyZWN0IHdpZHRoPSI4MCIgaGVpZ2h0PSIxMDUiIGZpbGw9IiNmOWZhZmIiLz48cmVjdCB4PSIxMCIgeT0iOSIgd2lkdGg9IjYwIiBoZWlnaHQ9IjUiIGZpbGw9IiNlMGUwZTAiIHJ4PSIyIi8+PHJlY3QgeD0iMTAiIHk9IjI0IiB3aWR0aD0iMjgiIGhlaWdodD0iMzIiIGZpbGw9IiNkZWRlZGUiIHJ4PSIyIi8+PHJlYWN0IHg9IjQyIiB5PSIyNCIgd2lkdGg9IjI4IiBoZWlnaHQ9IjMyIiBmaWxsPSIjZGVkZWRlIiByeD0iMiIvPjxyZWN0IHg9IjEwIiB5PSI2MSIgd2lkdGg9IjI4IiBoZWlnaHQ9IjMyIiBmaWxsPSIjZGVkZWRlIiByeD0iMiIvPjxyZWN0IHg9IjQyIiB5PSI2MSIgd2lkdGg9IjI4IiBoZWlnaHQ9IjMyIiBmaWxsPSIjZGVkZWRlIiByeD0iMiIvPjwvc3ZnPg==', productsPerPageOptions: [2, 4, 6] },
    { id: 'list', name: 'Lista', preview: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MCAxMDUiPjxyZWN0IHdpZHRoPSI4MCIgaGVpZ2h0PSIxMDUiIGZpbGw9IiNmOWZhZmIiLz48cmVjdCB4PSIxMCIgeT0iOSIgd2lkdGg9IjYwIiBoZWlnaHQ9IjUiIGZpbGw9IiNlMGUwZTAiIHJ4PSIyIi8+PHJlYWN0IHg9IjEwIiB5PSIyNCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjIyIiBmaWxsPSIjZGVkZWRlIiByeD0iMiIvPjxyZWN0IHg9IjEwIiB5PSI1MSIgd2lkdGg9IjYwIiBoZWlnaHQ9IjIyIiBmaWxsPSIjZGVkZWRlIiByeD0iMiIvPjxyZWN0IHg9IjEwIiB5PSI3OCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjIyIiBmaWxsPSIjZGVkZWRlIiByeD0iMiIvPjwvc3ZnPg==', productsPerPageOptions: [2, 3, 4] },
    { id: 'collage', name: 'Collage', preview: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MCAxMDUiPjxyZWN0IHdpZHRoPSI4MCIgaGVpZ2h0PSIxMDUiIGZpbGw9IiNmOWZhZmIiLz48cmVjdCB4PSIxMCIgeT0iOSIgd2lkdGg9IjYwIiBoZWlnaHQ9IjUiIGZpbGw9IiNlMGUwZTAiIHJ4PSIyIi8+PHJlYWN0IHg9IjEwIiB5PSIyNCIgd2lkdGg9IjM1IiBoZWlnaHQ9IjY4IiBmaWxsPSIjZGVkZWRlIiByeD0iMiIvPjxyZWN0IHg9IjUwIiB5PSIyNCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjMyIiBmaWxsPSIjZGVkZWRlIiByeD0iMiIvPjxyZWN0IHg9IjUwIiB5PSI2MCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjMyIiBmaWxsPSIjZGVkZWRlIiByeD0iMiIvPjwvc3ZnPg==', productsPerPageOptions: [3] },
    { id: 'list-2-col', name: 'Lista 2 Columnas', preview: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MCAxMDUiPjxyZWN0IHdpZHRoPSI4MCIgaGVpZ2h0PSIxMDUiIGZpbGw9IiNmOWZhZmIiLz48cmVjdCB4PSIxMCIgeT0iOSIgd2lkdGg9IjYwIiBoZWlnaHQ9IjUiIGZpbGw9IiNlMGUwZTAiIHJ4PSIyIi8+PHJlYWN0IHg9IjEwIiB5PSIyNCIgd2lkdGg9IjI4IiBoZWlnaHQ9IjIyIiBmaWxsPSIjZGVkZWRlIiByeD0iMiIvPjxyZWN0IHg9IjQyIiB5PSIyNCIgd2lkdGg9IjI4IiBoZWlnaHQ9IjIyIiBmaWxsPSIjZGVkZWRlIiByeD0iMiIvPjxyZWN0IHg9IjEwIiB5PSI1MSIgd2lkdGg9IjI4IiBoZWlnaHQ9IjIyIiBmaWxsPSIjZGVkZWRlIiByeD0iMiIvPjxyZWN0IHg9IjQyIiB5PSI1MSIgd2lkdGg9IjI4IiBoZWlnaHQ9IjIyIiBmaWxsPSIjZGVkZWRlIiByeD0iMiIvPjxyZWN0IHg9IjEwIiB5PSI3OCIgd2lkdGg9IjI4IiBoZWlnaHQ9IjIyIiBmaWxsPSIjZGVkZWRlIiByeD0iMiIvPjxyZWN0IHg9IjQyIiB5PSI3OCIgd2lkdGg9IjI4IiBoZWlnaHQ9IjIyIiBmaWxsPSIjZGVkZWRlIiByeD0iMiIvPjwvc3ZnPg==', productsPerPageOptions: [4, 6, 8] },
];

export const CATALOGUE_BACK_COVER_TEMPLATES = [
    { id: 'classic', name: 'Clásico', preview: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MCAxMDUiPjxyZWN0IHdpZHRoPSI4MCIgaGVpZ2h0PSIxMDUiIGZpbGw9IiNmOWZhZmIiLz48cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSIxNSIgZmlsbD0iI2RlZGVkZSIgcng9IjIiLz48cmVjdCB4PSIxMCIgeT0iMzUiIHdpZHRoPSIyNSIgaGVpZ2h0PSI1MCIgZmlsbD0iI2RlZGVkZSIgcng9IjIiLz48cmVjdCB4PSI0NSIgeT0iMzUiIHdpZHRoPSIyNSIgaGVpZ2h0PSI1MCIgZmlsbD0iI2RlZGVkZSIgcng9IjIiLz48cmVjdCB4PSIxMCIgeT0iOTUiIHdpZHRoPSI2MCIgaGVpZ2h0PSI1IiBmaWxsPSIjY2NjIiByeD0iMiIvPjwvc3ZnPg==' },
    { id: 'modern', name: 'Moderno', preview: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MCAxMDUiPjxyZWN0IHdpZHRoPSI4MCIgaGVpZ2h0PSIxMDUiIGZpbGw9IiMyZDNlNGUiLz48cmVjdCB4PSI1MCIgeT0iMCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjEwNSIgZmlsbD0iIzQwNDA0MCIvPjxyZWN0IHg9IjEwIiB5PSIxNSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjUiIGZpbGw9IiNmZmYiLz48cmVjdCB4PSIxMCIgeT0iMzUiIHdpZHRoPSIyMCIgaGVpZ2h0PSIzIiBmaWxsPSIjY2NjIi8+PHJlY3QgeD0iMTAiIHk9IjQ1IiB3aWR0aD0iMjAiIGhlaWdodD0iMyIgZmlsbD0iI2NjYyIvPjxyZWN0IHg9IjYwIiB5PSI4NSIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjY2NjIiByeD0iNTAiLz48L3N2Zz4=' },
    { id: 'minimal', name: 'Minimalista', preview: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MCAxMDUiPjxyZWN0IHdpZHRoPSI4MCIgaGVpZ2h0PSIxMDUiIGZpbGw9IiNmOWZhZmIiLz48cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgZmlsbD0iI2RlZGVkZSIgcng9IjUwIi8+PHJlY3QgeT0iOTUiIHdpZHRoPSI4MCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2RlZGVkZSIvPjwvc3ZnPg==' },
];

export const INITIAL_CATALOGUES: Catalogue[] = [
  {
    id: crypto.randomUUID(),
    title: "Colección Verano 2024",
    description: "Descubre las últimas tendencias en mobiliario para exteriores y terrazas. Diseños frescos y resistentes para disfrutar del clima caribeño.",
    featuredImage: "https://picsum.photos/id/1011/300/400",
    isVisible: true,
    type: 'pdf',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: crypto.randomUUID(),
    title: "Guía de Materiales y Acabados",
    description: "Una guía completa para ayudarte a elegir los materiales y acabados perfectos para tu proyecto. Compara maderas, metales, telas y más.",
    featuredImage: "https://picsum.photos/id/1074/300/400",
    isVisible: true,
    type: 'drive',
    driveUrl: 'https://docs.google.com/document/d/1_G3-l4_4_.../edit?usp=sharing',
  },
  {
    id: crypto.randomUUID(),
    title: "Proyectos de Cocinas Destacados",
    description: "Inspírate con una selección de nuestros mejores proyectos de cocinas a medida. Diseños funcionales y elegantes para el corazón de tu hogar.",
    featuredImage: "https://picsum.photos/id/292/300/400",
    isVisible: true,
    type: 'gallery',
    galleryImages: [
      'https://picsum.photos/id/292/800/600',
      'https://picsum.photos/id/43/800/600',
      'https://picsum.photos/id/48/800/600',
      'https://picsum.photos/id/49/800/600',
      'https://picsum.photos/id/53/800/600',
      'https://picsum.photos/id/1072/800/600'
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Mobiliario de Oficina 2024",
    description: "Soluciones ergonómicas y de diseño para espacios de trabajo productivos. Desde escritorios hasta sillería y almacenamiento.",
    featuredImage: "https://picsum.photos/id/180/300/400",
    isVisible: true,
    type: 'pdf',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: crypto.randomUUID(),
    title: "Inspiración: Espacios Infantiles",
    description: "Ideas creativas y muebles funcionales para las habitaciones de los más pequeños. Diseños que crecen con ellos.",
    featuredImage: "https://img.furniture1.eu/v7/_f1_/images/desktop_menu/menu-childrens-room-side-image.jpg",
    isVisible: true,
    type: 'gallery',
    galleryImages: [
      'https://picsum.photos/id/219/800/600',
      'https://picsum.photos/id/309/800/600',
      'https://picsum.photos/id/326/800/600',
      'https://picsum.photos/id/1039/800/600'
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Catálogo Técnico de Herrajes",
    description: "Especificaciones técnicas y detalles de nuestra selección de herrajes de alta calidad para puertas, gabinetes y más.",
    featuredImage: "https://picsum.photos/id/1080/300/400",
    isVisible: false,
    type: 'drive',
    driveUrl: 'https://docs.google.com/spreadsheets/d/1_G3-l4_4_.../edit?usp=sharing',
  }
];
