

import type { Product, Project } from './types';

export const NAV_LINKS = [
  "Sala", "Dormitorio", "Cocina", 
  "Recibidor", "Oficina", "Baño", "Muebles infantiles", "Puertas", "Blog", "Proyectos", "Cotizar a medida"
];

export const HERO_SLIDES = [
  {
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1920&auto=format&fit=crop",
    title: "Diseño y Calidad Insuperables",
    subtitle: "Muebles que transforman tu espacio",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1920&auto=format&fit=crop",
    title: "Entrega Garantizada y Segura",
    subtitle: "Recibe tus muebles justo a tiempo, sin prepago.",
  },
   {
    imageUrl: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1920&auto=format&fit=crop",
    title: "Estilo Que Inspira",
    subtitle: "Descubre colecciones que definen tu hogar.",
  },
];

export const PROYECTOS_SUB_CATEGORIES = [
  { name: 'Cocinas Personalizadas', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/kitchen_sets.png' },
  { name: 'Baños Modernos', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/bathroom_sets.png' },
  { name: 'Muebles a Medida', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/modular_furniture.png' },
  { name: 'Diseño de Interiores', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/desktop_menu/menu-living-room-side-image.jpg' },
  { name: 'Puertas de Interior y Exterior', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/hallway_sets.png' },
  { name: 'Mobiliario de Oficina', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/office_furniture_sets.png' },
  { name: 'Proyectos Comerciales', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/desktop_menu/menu-office-side-image.jpg' },
];

// This now mirrors the mega menu for consistency
export const DESIGN_CATEGORIES = PROYECTOS_SUB_CATEGORIES;

export const SALA_SUB_CATEGORIES = [
  { name: 'Juegos de muebles de sala', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/wall_units.png' },
  { name: 'Gaveteros', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/chest_of_drawers.png' },
  { name: 'Mesas de centro', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/coffee_tables.png' },
  { name: 'Muebles TV', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/tv_tables.png' },
  { name: 'Armarios', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/wardrobes.png' },
  { name: 'Aparadores', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/cabinets.png' },
  { name: 'Estanterías', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/shelves.png' },
  { name: 'Juegos de mesas y sillas', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/dining_sets.png' },
  { name: 'Mesas', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/oval_table.png' },
  { name: 'Sillas', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/chairs_new_1.png' },
  { name: 'Todos los muebles de sala', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/all_furniture.png' },
];

export const DORMITORIO_SUB_CATEGORIES = [
  { name: 'Camas', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/bed-menu.png' },
  { name: 'Juegos de dormitorio', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/bedroom_sets.png' },
  { name: 'Armarios', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/wardrobes.png' },
  { name: 'Gaveteros', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/chest_of_drawers.png' },
  { name: 'Colchones', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/mattresses.png' },
  { name: 'Mesitas de noche', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/bedside_tables.png' },
  { name: 'Tocadores', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/makeup_tables.png' },
  { name: 'Aparadores', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/cabinets.png' },
  { name: 'Estanterías', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/shelves.png' },
  { name: 'Paneles de pared suaves', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/soft_wall_panels.png' },
  { name: 'Somieres', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/bed_slats.png' },
  { name: 'Todos los muebles de dormitorio', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/all_furniture.png' },
];

export const COCINA_SUB_CATEGORIES = [
  { name: 'Juegos de cocina', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/kitchen_sets.png' },
  { name: 'Armarios de cocinas modulares', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/modular_kitchen.png' },
  { name: 'Juegos de comedor', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/dining_sets.png' },
  { name: 'Mesas', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/kitchen_tables.png' },
  { name: 'Sillas', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/chairs_new_1.png' },
  { name: 'Mesas de bar', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/bar_tables.png' },
  { name: 'Sillas de barra', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/bar_chair.png' },
  { name: 'Bancos esquineros', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/kitchen_corners.png' },
  { name: 'Todos los muebles de cocina y comedor', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/all_furniture.png' },
];

export const RECIBIDOR_SUB_CATEGORIES = [
  { name: 'Juegos de pasillo', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/hallway_sets.png' },
  { name: 'Zapateros', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/shoe_cabinets.png' },
  { name: 'Armarios', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/wardrobes.png' },
  { name: 'Percheros', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/racks1.png' },
  { name: 'Gaveteros', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/chest_of_drawers.png' },
  { name: 'Estanterías', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/shelves.png' },
  { name: 'Aparadores', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/cabinets.png' },
  { name: 'Paneles de pared suaves', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/soft_wall_panels.png' },
  { name: 'Consolas', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/console_tables.png' },
  { name: 'Todos los muebles de recibidor', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/all_furniture.png' },
];

export const OFICINA_SUB_CATEGORIES = [
  { name: 'Juegos de oficina en casa', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/office_furniture_sets.png' },
  { name: 'Mesas de oficina', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/office_tables.png' },
  { name: 'Sillas de oficina', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/office_chairs.png' },
  { name: 'Estanterías', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/shelves.png' },
  { name: 'Armarios', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/wardrobes.png' },
  { name: 'Aparadores', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/cabinets.png' },
  { name: 'Gaveteros', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/chest_of_drawers.png' },
  { name: 'Archivadores', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/drawer_blocks.png' },
  { name: 'Mesas de ordenador esquinera', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/corner_tables.png' },
  { name: 'Escritorios de altura regulable', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/adjusting_tables.png' },
  { name: 'Todos los muebles de oficina en casa', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/all_furniture.png' },
];

export const BANO_SUB_CATEGORIES = [
  { name: 'Juegos de muebles de baño', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/bathroom_sets.png' },
  { name: 'Armarios de baño', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/bathroom_standing_cabinets.png' },
  { name: 'Estanterías de baño', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/bathroom_shelves.png' },
  { name: 'Todos los muebles de baño', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/all_furniture.png' },
];

export const INFANTILES_SUB_CATEGORIES = [
  { name: 'Juegos', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/children_room_sets.png' },
  { name: 'Camas', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/children_beds.png' },
  { name: 'Literas', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/bunk_beds.png' },
  { name: 'Armarios', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/children_wardrobes.png' },
  { name: 'Escritorios', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/children_tables.png' },
  { name: 'Gaveteros', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/chest_of_drawers.png' },
  { name: 'Estanterías', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/shelves.png' },
  { name: 'Sillas', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/children_chairs.png' },
  { name: 'Aparadores', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/children_cabinets.png' },
  { name: 'Mesitas de noche', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/children_bedside_tables.png' },
  { name: 'Pufs', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/bean_bags.png' },
  { name: 'Todo el mobiliario infantil', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/all_furniture.png' },
];

export const PUERTAS_SUB_CATEGORIES = [
  { name: 'Puertas Interiores', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/hallway_sets.png' },
  { name: 'Puertas Exteriores', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/hallway_sets.png' },
  { name: 'Revestimiento de pared', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/soft_wall_panels.png' },
  { name: 'Todas las Puertas', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/all_furniture.png' },
];

export const ALL_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Cocina Moderna en Apartamento Urbano',
    category: 'Cocinas Personalizadas',
    imageUrl: 'https://picsum.photos/id/43/800/600',
    description: 'Diseño y fabricación de una cocina a medida con acabados de lujo, optimizando el espacio y la funcionalidad. Se utilizaron materiales de alta gama como cuarzo para la encimera y madera lacada en alto brillo para los gabinetes. La iluminación LED integrada resalta la elegancia del diseño.',
    galleryImages: [
      'https://picsum.photos/id/43/1200/800',
      'https://picsum.photos/id/48/1200/800',
      'https://picsum.photos/id/49/1200/800',
      'https://picsum.photos/id/53/1200/800',
    ]
  },
  {
    id: 2,
    title: 'Oficinas Corporativas "Innova Cowork"',
    category: 'Proyectos Comerciales',
    imageUrl: 'https://picsum.photos/id/180/800/600',
    description: 'Mobiliario completo para un espacio de coworking de 500m². Se diseñaron estaciones de trabajo ergonómicas, áreas de descanso colaborativas y salas de reuniones equipadas con la última tecnología. El objetivo fue crear un ambiente moderno, inspirador y funcional que fomente la productividad.',
    galleryImages: [
      'https://picsum.photos/id/180/1200/800',
      'https://picsum.photos/id/219/1200/800',
      'https://picsum.photos/id/309/1200/800',
      'https://picsum.photos/id/326/1200/800',
    ]
  },
  {
    id: 3,
    title: 'Residencia Familiar estilo Tropical Chic',
    category: 'Diseño de Interiores',
    imageUrl: 'https://picsum.photos/id/106/800/600',
    description: 'Proyecto integral de diseño de interiores para una villa en Punta Cana. Se combinaron elementos naturales como madera y ratán con textiles frescos y una paleta de colores neutros para crear un ambiente relajado y sofisticado. Cada mueble fue seleccionado o diseñado a medida para complementar la arquitectura del espacio.',
    galleryImages: [
      'https://picsum.photos/id/106/1200/800',
      'https://picsum.photos/id/1011/1200/800',
      'https://picsum.photos/id/1039/1200/800',
      'https://picsum.photos/id/1054/1200/800',
    ]
  },
  {
    id: 4,
    title: 'Baño Spa en Suite Principal',
    category: 'Baños Modernos',
    imageUrl: 'https://picsum.photos/id/1073/800/600',
    description: 'Transformación de un baño principal en un oasis de relajación tipo spa. Se instaló una ducha con efecto lluvia, una bañera exenta y un tocador doble flotante. El uso de porcelanato de gran formato y detalles en madera de teca crea una atmósfera de lujo y confort.',
    galleryImages: [
      'https://picsum.photos/id/1073/1200/800',
      'https://picsum.photos/id/1072/1200/800',
      'https://picsum.photos/id/1071/1200/800',
      'https://picsum.photos/id/1070/1200/800',
    ]
  },
  {
    id: 5,
    title: 'Librería a Medida para Sala de Estar',
    category: 'Muebles a Medida',
    imageUrl: 'https://picsum.photos/id/24/800/600',
    description: 'Diseño e instalación de una librería de pared a pared y de suelo a techo. Fabricada en madera de roble macizo con detalles en metal negro, esta pieza se convierte en el punto focal de la sala de estar, ofreciendo un amplio espacio de almacenamiento y exhibición.',
    galleryImages: [
      'https://picsum.photos/id/24/1200/800',
      'https://picsum.photos/id/25/1200/800',
      'https://picsum.photos/id/26/1200/800',
      'https://picsum.photos/id/27/1200/800',
    ]
  },
  {
    id: 6,
    title: 'Cocina Abierta con Isla Central',
    category: 'Cocinas Personalizadas',
    imageUrl: 'https://picsum.photos/id/292/800/600',
    description: 'Creación de una cocina de concepto abierto, perfecta para el entretenimiento. La gran isla central funciona como área de preparación y como barra de desayuno. Los acabados en tonos grises y madera natural aportan calidez y modernidad al espacio.',
    galleryImages: [
      'https://picsum.photos/id/292/1200/800',
      'https://picsum.photos/id/293/1200/800',
      'https://picsum.photos/id/294/1200/800',
      'https://picsum.photos/id/295/1200/800',
    ]
  },
  {
    id: 7,
    title: 'Diseño y Mobiliario para Startup Tecnológica',
    category: 'Mobiliario de Oficina',
    imageUrl: 'https://picsum.photos/id/326/800/600',
    description: 'Creación de un ambiente de trabajo dinámico y colaborativo para una startup. Incluye escritorios de altura regulable, áreas de brainstorming con pizarras y mobiliario de descanso para fomentar la creatividad y el bienestar de los empleados.',
    galleryImages: [
      'https://picsum.photos/id/326/1200/800',
      'https://picsum.photos/id/435/1200/800',
      'https://picsum.photos/id/145/1200/800',
      'https://picsum.photos/id/30/1200/800',
    ]
  },
  {
    id: 8,
    title: 'Puertas de Madera Noble para Residencia de Lujo',
    category: 'Puertas de Interior y Exterior',
    imageUrl: 'https://picsum.photos/id/1013/800/600',
    description: 'Fabricación a medida de todas las puertas interiores y la puerta principal para una residencia de lujo. Se utilizó madera de roble macizo con un diseño minimalista y herrajes de alta gama para un acabado impecable y duradero.',
    galleryImages: [
      'https://picsum.photos/id/1013/1200/800',
      'https://picsum.photos/id/1014/1200/800',
      'https://picsum.photos/id/1016/1200/800',
      'https://picsum.photos/id/1018/1200/800',
    ]
  },
  {
    id: 9,
    title: 'Baño de Visitas con Estilo Industrial',
    category: 'Baños Modernos',
    imageUrl: 'https://picsum.photos/id/1069/800/600',
    description: 'Diseño de un baño para visitas con un marcado estilo industrial. Combina un lavabo de hormigón pulido, grifería en negro mate y un espejo con marco de metal. La pared de ladrillo visto añade carácter y calidez al espacio compacto.',
    galleryImages: [
        'https://picsum.photos/id/1069/1200/800',
        'https://picsum.photos/id/1068/1200/800',
        'https://picsum.photos/id/1067/1200/800',
        'https://picsum.photos/id/1066/1200/800',
    ]
  }
];

const rawProducts = [
  {
    id: 1752700000061,
    category: "Muebles",
    name: "Gavetero Orlviro 105",
    description: "Un gavetero elegante y funcional para tu hogar.",
    price: 269,
    rating: 4,
    reviews: 15,
    images: ["https://img.muebles.es/detailed/3800/comoda-orlviro-105_3800236.jpg?w=300&h=225&p=fw"],
    hint: "gavetero moderno",
    deliveryTime: "Aproximadamente en 13 días laborales",
    dimensions: { width: 82, height: 85.4, depth: 40 },
    materials: ["Aglomerado laminado"],
    colors: ["Marrón", "Negro"],
    setType: "Sólido"
  },
  {
    id: 1752700000062,
    category: "Muebles",
    name: "Gavetero Livluo 102",
    description: "Un gavetero elegante y funcional para tu hogar.",
    price: 439,
    rating: 4,
    reviews: 15,
    images: ["https://img.muebles.es/detailed/3795/comoda-livluo-102_3795889.jpg?w=300&h=225&p=fw"],
    hint: "gavetero moderno",
    deliveryTime: "Aproximadamente en 13 días laborales",
    dimensions: { width: 160, height: 89.9, depth: 40 },
    materials: ["MDF"],
    colors: ["Beige"],
    setType: "Sólido"
  },
  {
    id: 1752700000063,
    category: "Muebles",
    name: "Gavetero Livluo 103",
    description: "Un gavetero elegante y funcional para tu hogar.",
    price: 375,
    rating: 4,
    reviews: 15,
    images: ["https://img.muebles.es/detailed/3795/comoda-livluo-103_3795993.jpg?w=300&h=225&p=fw"],
    hint: "gavetero moderno",
    deliveryTime: "Aproximadamente en 13 días laborales",
    dimensions: { width: 115, height: 89.8, depth: 40 },
    materials: ["MDF"],
    colors: ["Beige"],
    setType: "Sólido",
    ledLighting: true
  },
  {
    id: 1752700000064,
    category: "Muebles",
    name: "Gavetero Kailua 2393",
    description: "Un gavetero elegante y funcional para tu hogar.",
    price: 389,
    rating: 4,
    reviews: 15,
    images: ["https://img.muebles.es/detailed/3792/comoda-kailua-2393-antracita_3792768.jpg?w=300&h=225&p=fw"],
    hint: "gavetero moderno",
    deliveryTime: "Aproximadamente en 23 días laborales",
    dimensions: { width: 72, height: 77, depth: 45 },
    materials: ["Aglomerado laminado"],
    colors: ["Gris"],
    setType: "Partes separadas"
  },
  {
    id: 1752700000065,
    category: "Muebles",
    name: "Gavetero Kailua 2394",
    description: "Un gavetero elegante y funcional para tu hogar.",
    price: 579,
    rating: 4,
    reviews: 15,
    images: ["https://img.muebles.es/detailed/3793/comoda-kailua-2394-antracita_3793054.jpg?w=300&h=225&p=fw"],
    hint: "gavetero moderno",
    deliveryTime: "Aproximadamente en 23 días laborales",
    dimensions: { width: 100, height: 85, depth: 45 },
    materials: ["Aglomerado laminado", "Metal"],
    colors: ["Gris"],
    setType: "Partes separadas"
  },
  {
    id: 1752700000066,
    category: "Muebles",
    name: "Gavetero Marelbe 102",
    description: "Un gavetero elegante y funcional para tu hogar.",
    price: 259,
    rating: 4,
    reviews: 15,
    images: ["https://img.muebles.es/detailed/3793/comoda-marelbe-102_3793222.jpg?w=300&h=225&p=fw"],
    hint: "gavetero moderno",
    deliveryTime: "Aproximadamente en 23 días laborales",
    dimensions: { width: 72, height: 74, depth: 43 },
    materials: ["Madera"],
    colors: ["Marrón"],
    setType: "Sólido"
  },
  {
    id: 1752700000067,
    category: "Muebles",
    name: "Gavetero Comfivo Larmire 102",
    description: "Un gavetero elegante y funcional para tu hogar.",
    price: 210,
    rating: 4,
    reviews: 15,
    images: ["https://img.muebles.es/detailed/3410/comoda-comfivo-larmire-102-blanco_3410627.jpg?w=300&h=225&p=fw", "https://img.muebles.es/detailed/3410/comoda-comfivo-larmire-102-negro_3410697.jpg?w=60&h=60&p=fw"],
    hint: "gavetero moderno",
    deliveryTime: "Aproximadamente en 8 días laborales",
    dimensions: { width: 80, height: 75, depth: 40 },
    materials: ["MDF"],
    colors: ["Blanco", "Negro"],
    setType: "Sólido"
  },
  {
    id: 1752700000068,
    category: "Muebles",
    name: "Gavetero Comfivo Fersoe 100",
    description: "Un gavetero elegante y funcional para tu hogar.",
    price: 226,
    rating: 4,
    reviews: 15,
    images: ["https://img.muebles.es/detailed/3790/comoda-comfivo-fersoe-100-cachemira_3790137.jpg?w=300&h=225&p=fw", "https://img.muebles.es/detailed/3790/comoda-comfivo-fersoe-100-blanco_3790134.jpg?w=60&h=60&p=fw"],
    hint: "gavetero moderno",
    deliveryTime: "Aproximadamente en 8 días laborales",
    dimensions: { width: 141, height: 93, depth: 41 },
    materials: ["Aglomerado laminado"],
    colors: ["Beige", "Blanco"],
    setType: "Partes separadas",
    ledLighting: true
  },
  {
    id: 1752700000069,
    category: "Muebles",
    name: "Gavetero Comfivo Fersoe 104",
    description: "Un gavetero elegante y funcional para tu hogar.",
    price: 289,
    rating: 4,
    reviews: 15,
    images: ["https://img.muebles.es/detailed/3790/comoda-comfivo-fersoe-104-cachemira_3790464.jpg?w=300&h=225&p=fw", "https://img.muebles.es/detailed/2643/comoda-comfivo-fersoe-104-blanco_2643088.jpg?w=60&h=60&p=fw"],
    hint: "gavetero moderno",
    deliveryTime: "Aproximadamente en 8 días laborales",
    dimensions: { width: 120, height: 93, depth: 41 },
    materials: ["Aglomerado laminado"],
    colors: ["Beige", "Blanco"],
    setType: "Partes separadas",
    ledLighting: false
  },
  {
    id: 1752700000070,
    category: "Muebles",
    name: "Gavetero Alfere 121",
    description: "Un gavetero elegante y funcional para tu hogar.",
    price: 220,
    rating: 4,
    reviews: 15,
    images: ["https://img.muebles.es/detailed/3777/comoda-alfere-121-blanco_3777376.jpg?w=300&h=225&p=fw", "https://img.muebles.es/detailed/3777/comoda-alfere-121-roble-wotan_3777382.jpg?w=60&h=60&p=fw"],
    hint: "gavetero moderno",
    deliveryTime: "Aproximadamente en 10 días laborales",
    dimensions: { width: 80, height: 85.1, depth: 40 },
    materials: ["Madera"],
    colors: ["Blanco", "Marrón"],
    setType: "Sólido"
  },
  {
    id: 1752700000071,
    category: "Muebles",
    name: "Gavetero Sorsale 101",
    description: "Un gavetero elegante y funcional para tu hogar.",
    price: 339,
    rating: 4,
    reviews: 15,
    images: ["https://img.muebles.es/detailed/3775/comoda-sorsale-101_3775144.jpg?w=300&h=225&p=fw"],
    hint: "gavetero moderno",
    deliveryTime: "Aproximadamente en 13 días laborales",
    dimensions: { width: 103.2, height: 132, depth: 42 },
    materials: ["Madera", "Metal"],
    colors: ["Marrón", "Negro"],
    setType: "Sólido"
  },
  {
    id: 1752700000072,
    category: "Muebles",
    name: "Gavetero Austin 364",
    description: "Un gavetero elegante y funcional para tu hogar.",
    price: 309,
    rating: 4,
    reviews: 15,
    images: ["https://img.muebles.es/detailed/4127/comoda-austin-364-congo_4127427.jpg?w=300&h=225&p=fw", "https://img.muebles.es/detailed/3775/comoda-austin-364-roble-wotan_3775333.jpg?w=60&h=60&p=fw"],
    hint: "gavetero moderno",
    deliveryTime: "Aproximadamente en 10 días laborales",
    dimensions: { width: 132, height: 91.2, depth: 35 },
    materials: ["Madera"],
    colors: ["Marrón"],
    setType: "Sólido",
    ledLighting: true
  },
  {
    id: 1752700000073,
    category: "Muebles",
    name: "Gavetero Sorsale 103",
    description: "Un gavetero elegante y funcional para tu hogar.",
    price: 339,
    rating: 4,
    reviews: 15,
    images: ["https://img.muebles.es/detailed/3775/comoda-sorsale-103_3775347.jpg?w=300&h=225&p=fw"],
    hint: "gavetero moderno",
    deliveryTime: "Aproximadamente en 13 días laborales",
    dimensions: { width: 193.2, height: 90.2, depth: 42 },
    materials: ["Madera", "Metal"],
    colors: ["Marrón", "Negro"],
    setType: "Sólido"
  },
  {
    id: 1752700000074,
    category: "Muebles",
    name: "Gavetero Sorsale 104",
    description: "Un gavetero elegante y funcional para tu hogar.",
    price: 299,
    rating: 4,
    reviews: 15,
    images: ["https://img.muebles.es/detailed/3775/comoda-sorsale-104_3775509.jpg?w=300&h=225&p=fw"],
    hint: "gavetero moderno",
    deliveryTime: "Aproximadamente en 13 días laborales",
    dimensions: { width: 153.2, height: 90.2, depth: 42 },
    materials: ["Madera", "Metal"],
    colors: ["Marrón", "Negro"],
    setType: "Sólido",
    ledLighting: true
  },
  {
    id: 1752700000075,
    category: "Muebles",
    name: "Gavetero Sorsale 105",
    description: "Un gavetero elegante y funcional para tu hogar.",
    price: 239,
    rating: 4,
    reviews: 15,
    images: ["https://img.muebles.es/detailed/3775/comoda-sorsale-105_3775540.jpg?w=300&h=225&p=fw"],
    hint: "gavetero moderno",
    deliveryTime: "Aproximadamente en 13 días laborales",
    dimensions: { width: 103.2, height: 90.2, depth: 42 },
    materials: ["Madera", "Metal"],
    colors: ["Marrón", "Negro"],
    setType: "Sólido"
  },
  {
    id: 1752700000076,
    category: "Muebles",
    name: "Gavetero Salcira 100",
    description: "Un gavetero elegante y funcional para tu hogar.",
    price: 439,
    rating: 4,
    reviews: 15,
    images: ["https://img.muebles.es/detailed/3773/comoda-salcira-100_3773377.jpg?w=300&h=225&p=fw"],
    hint: "gavetero moderno",
    deliveryTime: "Aproximadamente en 8 días laborales",
    dimensions: { width: 103, height: 80, depth: 39 },
    materials: ["MDF", "Vidrio templado"],
    colors: ["Marrón", "Gris"],
    setType: "Sólido"
  },
  {
    id: 1752700000077,
    category: "Muebles",
    name: "Gavetero Comfivo Virfera 100",
    description: "Un gavetero elegante y funcional para tu hogar.",
    price: 239,
    rating: 4,
    reviews: 15,
    images: ["https://img.muebles.es/detailed/3780/comoda-comfivo-virfera-100-blanco-blanco-brillante_3780685.jpg?w=300&h=225&p=fw"],
    hint: "gavetero moderno",
    deliveryTime: "Aproximadamente en 4 días laborales",
    dimensions: { width: 100, height: 85, depth: 40 },
    materials: ["Aglomerado laminado"],
    colors: ["Blanco"],
    setType: "Partes separadas",
    ledLighting: true
  },
  {
    id: 1752700000078,
    category: "Muebles",
    name: "Gavetero Sarasota 174",
    description: "Un gavetero elegante y funcional para tu hogar.",
    price: 369,
    rating: 4,
    reviews: 15,
    images: ["https://img.muebles.es/detailed/3642/comoda-sarasota-174-madera-gris-blanco-brillante_3642181.jpg?w=300&h=225&p=fw", "https://img.muebles.es/detailed/3642/comoda-sarasota-174-roble-wotan-blanco-brillante_3642185.jpg?w=60&h=60&p=fw"],
    hint: "gavetero moderno",
    deliveryTime: "Aproximadamente en 13 días laborales",
    dimensions: { width: 150, height: 68, depth: 40 },
    materials: ["Aglomerado laminado", "Vidrio"],
    colors: ["Gris", "Blanco", "Marrón"],
    setType: "Sólido"
  },
  {
    id: 1752700000154,
    category: "Muebles",
    name: "Mesa de centro SP5585",
    description: "Una mesa de centro elegante y funcional para tu hogar.",
    price: 439,
    rating: 4,
    reviews: 15,
    images: ["https://img.muebles.es/detailed/4121/mesa-de-centro-sp5585_4121558.jpg?w=300&h=225&p=fw"],
    hint: "mesa de centro",
    deliveryTime: "Aproximadamente en 5 días laborales",
    dimensions: { width: 130, height: 38, depth: 60 },
    materials: ["Vidrio templado", "Metal"],
    colors: ["Negro"],
    setType: "Sólido"
  },
  {
    id: 1752700000247,
    category: "Sala",
    subcategory: "Muebles de TV",
    name: "Mueble TV Elbvelu 125",
    description: "Un gavetero elegante y funcional para tu hogar.",
    price: 119,
    rating: 4,
    reviews: 15,
    images: ["https://img.muebles.es/detailed/3617/mueble-tv-elbvelu-125-roble-artisan_3617765.jpg?w=300&h=225&p=fw"],
    hint: "mueble tv",
    deliveryTime: "Aproximadamente en 13 días laborales",
    dimensions: { width: 140, height: 36, depth: 40 },
    materials: ["Madera"],
    colors: ["Marrón"],
    setType: "Partes separadas"
  },
  {
    id: 1752700000301,
    category: "Puertas",
    name: "Puerta Interior de Roble Clásico",
    description: "Puerta de madera de roble macizo con un acabado natural, perfecta para interiores tradicionales.",
    price: 350,
    rating: 5,
    reviews: 22,
    images: ["https://picsum.photos/id/1013/400/300"],
    hint: "puerta interior madera",
    deliveryTime: "Aproximadamente en 15 días laborales",
    dimensions: { width: 90, height: 210, depth: 4 },
    materials: ["Madera de Roble"],
    colors: ["Marrón"],
    setType: "Sólido"
  },
  {
    id: 1752700000302,
    category: "Puertas",
    name: "Puerta Exterior de Metal Moderna",
    description: "Puerta de seguridad de alta resistencia con diseño minimalista en metal negro.",
    price: 780,
    rating: 4.5,
    reviews: 18,
    images: ["https://picsum.photos/id/1014/400/300"],
    hint: "puerta exterior seguridad",
    deliveryTime: "Aproximadamente en 25 días laborales",
    dimensions: { width: 100, height: 220, depth: 6 },
    materials: ["Metal", "Acero"],
    colors: ["Negro"],
    setType: "Sólido"
  },
  {
    id: 1752700000303,
    category: "Puertas",
    name: "Panel de Revestimiento 3D",
    description: "Panel decorativo de pared con diseño geométrico en 3D para crear un punto focal en cualquier habitación.",
    price: 85,
    rating: 4,
    reviews: 30,
    images: ["https://picsum.photos/id/1016/400/300"],
    hint: "revestimiento pared decorativo",
    deliveryTime: "Aproximadamente en 10 días laborales",
    dimensions: { width: 50, height: 50, depth: 2 },
    materials: ["PVC", "Yeso"],
    colors: ["Blanco"],
    setType: "Partes separadas"
  }
];

const parseDeliveryTime = (timeString?: string): number => {
  if (!timeString) return 99; // Default for items without delivery time
  const match = timeString.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 99;
};

const mapCategory = (p: any): string => {
    if (p.category === 'Salón' || p.category === 'Sala') return 'Sala';
    if (p.category === 'Puertas') return 'Puertas';
    const lowerName = p.name.toLowerCase();
    const lowerHint = p.hint.toLowerCase();

    if (lowerHint.includes('mueble tv') || lowerHint.includes('mesa de centro') || lowerHint.includes('aparador')) {
        return 'Sala';
    }
    if (lowerHint.includes('gavetero')) {
        return 'Dormitorio';
    }
    return 'Sala'; // Default category
};

export const ALL_PRODUCTS: Product[] = rawProducts.map((p: any) => ({
  id: p.id,
  name: p.name,
  price: p.price,
  imageUrl: p.images[0].replace('?w=300&h=225&p=fw', '?w=400&h=300&p=fw'),
  category: mapCategory(p),
  description: p.description,
  materials: p.materials || ["Aglomerado laminado"],
  colors: p.colors || ["Marrón"],
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
  specs: {
    'Entrega': p.deliveryTime || 'No especificado',
    'Ancho': p.dimensions ? `${p.dimensions.width} cm` : 'N/A',
    'Alto': p.dimensions ? `${p.dimensions.height} cm` : 'N/A',
    'Fondo': p.dimensions ? `${p.dimensions.depth} cm` : 'N/A',
    'Materiales': (p.materials && p.materials.length > 0) ? p.materials.join(', ') : 'No especificado',
    'Colores': (p.colors && p.colors.length > 0) ? p.colors.join(', ') : 'No especificado',
    'Código del artículo': String(p.id),
  },
  additionalInfo: p.ledLighting ? [{ icon: 'Led', text: 'Iluminación LED' }] : [],
}));

export const PRODUCT_DETAIL_DATA: Product = ALL_PRODUCTS[0];

export const MATERIALS = [...new Set(ALL_PRODUCTS.flatMap(p => p.materials))].sort();
export const COLORS = [...new Set(ALL_PRODUCTS.flatMap(p => p.colors))].sort();
export const SET_TYPES = [...new Set(ALL_PRODUCTS.map(p => p.setType).filter(Boolean))] as ('Sólido' | 'Partes separadas')[];

export const DELIVERY_TIMES = [
  { label: 'Hasta 5 días laborales', value: '5' },
  { label: 'Hasta 10 días laborales', value: '10' },
  { label: 'Hasta 15 días laborales', value: '15' },
  { label: 'Más 15 días laborales', value: '15+' },
];

export const COLOR_MAP: { [key: string]: string } = {
  'Blanco': '#FFFFFF',
  'Amarillo': '#FFEB3B',
  'Verde': '#4CAF50',
  'Verde azulado': '#009688',
  'Azul': '#2196F3',
  'Rojo': '#B71C1C',
  'Beige': '#D2B48C',
  'Marrón': '#795548',
  'Gris': '#9E9E9E',
  'Negro': '#212121',
};


export const MAX_PRICE = 20000;
export const MIN_PRICE = 0;

export const PROVINCES = [
    "Santo Domingo", "Distrito Nacional", "La Altagracia", "Puerto Rico", "Azua", "Bahoruco", "Barahona", "Dajabón", "Duarte", "El Seibo", "Elías Piña", "Espaillat", "Hato Mayor", "Independencia", "La Romana", "La Vega", "María Trinidad Sánchez", "Monseñor Nouel", "Montecristi", "Monte Plata", "Pedernales", "Peravia", "Puerto Plata", "Hermanas Mirabal", "Samaná", "San Cristóbal", "San Juan", "San Pedro de Macorís", "Sánchez Ramírez", "Santiago", "Santiago Rodríguez", "Valverde"
];


// FIX: Export STORES constant to fix import error in PartnerLogos.tsx.
export const STORES = [
    "Muebles Omar", "La Curacao", "Tiendas Corripio", "Plaza Lama"
];

export const SERVICES_DATA = [
  {
    title: 'Closets',
    description: 'Somos expertos en sacar el mejor provecho del espacio con diseños de closets a medida.',
    imageUrl: 'https://hom.com.do/wp-content/uploads/2025/02/closet-u.jpg',
    buttonText: 'Cotizar tu nuevo closet',
    quoteType: 'Closets',
  },
  {
    title: 'Cocinas',
    description: 'Diseño y construcción de cocinas optimizadas para mejor uso y eficiencia.',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop',
    buttonText: 'Cotizar tu nueva cocina',
    quoteType: 'Cocinas',
  },
  {
    title: 'Muebles Personalizados',
    description: 'Diseño o solicitud de mobiliario con funciones especiales.',
    imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format&fit=crop',
    buttonText: 'Cotizar',
    quoteType: 'Muebles Personalizados',
  },
  {
    title: 'Mobiliario Comercial',
    description: 'Construcción de tiendas, anaqueles, tramería, estantes, counters, etc...',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop',
    buttonText: 'Cotizar',
    quoteType: 'Mobiliario Comercial',
  },
  {
    title: 'Construcciones Especializadas',
    description: 'Desde el revestimiento de una pared hasta la construcción de una tiny house.',
    imageUrl: 'https://images.unsplash.com/photo-1512211756210-85090ea05c0b?q=80&w=800&auto=format&fit=crop',
    buttonText: 'Cotizar',
    quoteType: 'Construcciones Especializadas',
  },
];

export const QUOTE_PROJECT_TYPES = [
  {
    title: 'TV Wall',
    description: 'Espacios de muebles de TV y similares.',
    imageUrl: 'https://hom.com.do/wp-content/uploads/2024/08/tv-wall-hom-9.jpg',
    quoteType: 'TV Wall',
  },
  {
    title: 'Closets',
    description: 'Reach in, walk in y personalizados.',
    imageUrl: 'https://hom.com.do/wp-content/uploads/2025/02/closet-u.jpg',
    quoteType: 'Closets',
  },
  {
    title: 'Cocinas',
    description: 'Modulares personalizados.',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop',
    quoteType: 'Cocinas',
  },
  {
    title: 'Muebles Personalizados',
    description: 'Diseño o solicitud de mobiliario con funciones especiales.',
    imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format&fit=crop',
    quoteType: 'Muebles Personalizados',
  },
  {
    title: 'Mobiliario Comercial',
    description: 'Construcción de tiendas, anaqueles, tramería, estantes, counters, etc...',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop',
    quoteType: 'Mobiliario Comercial',
  },
  {
    title: 'Construcciones Especializadas',
    description: 'Desde el revestimiento de una pared hasta la construcción de una tiny house.',
    imageUrl: 'https://images.unsplash.com/photo-1512211756210-85090ea05c0b?q=80&w=800&auto=format&fit=crop',
    quoteType: 'Construcciones Especializadas',
  },
];


export const WORK_PROCESS_STEPS = [
  {
    title: 'Cotiza',
    description: 'A través de nuestra plataforma digital o enviando los planos y solicitando visita de reconocimiento.',
    icon: 'FileText',
  },
  {
    title: 'Asesoría',
    description: 'Se optimiza el proceso con la asesoría del equipo de diseño y producción.',
    icon: 'Edit3',
  },
  {
    title: 'Presupuesto',
    description: 'Recibes un presupuesto detallado y con el alcance del proyecto.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Ejecución',
    description: 'Ejecución y control de calidad de tu proyecto.',
    icon: 'BookOpen',
  },
];

export const TV_WALL_STYLES = [
    { name: 'Clásico', price: 200, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/08/tv-wall-hom-7.jpg' },
    { name: 'Clásico Vitrina', price: 255, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/08/tv-wall-hom-2.jpg' },
    { name: 'Trilogy', price: 294, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/08/tv-wall-hom-6.jpg' },
    { name: 'Trilogy Shell', price: 348, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/08/tv-wall-hom-4.jpg' },
    { name: 'Bay Vitrina', price: 397, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/08/tv-wall-hom-5.jpg' },
    { name: 'Bay Dual', price: 414, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/08/tv-wall-hom-1.jpg' },
    { name: 'Librelux', price: 436, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/08/tv-wall-hom-3.jpg' },
    { name: 'Librelux Shell', price: 448, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/08/tv-wall-hom-8.jpg' },
    { name: 'MegaLux', price: 461, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/08/tv-wall-hom-9.jpg' },
];

export const INSTALLATION_OPTIONS = [
    { label: 'Instalación sobre pared de cemento.', price: 300, multiplier: 1.15 },
    { label: 'Instalación sobre pared de Sheetrock.', price: 450, multiplier: 1.2 },
    { label: 'Remoción de espacio existente e instalación de la nueva.', price: 650, multiplier: 1.2 },
    { label: 'Sin instalación.', price: 0, multiplier: 0 },
];

export const PAYMENT_OPTIONS = [
    '70% con la orden, 30% contra entrega.',
    'Pago de contacto al poner la orden (- 10%)',
    'Pago Mensual por 6 meses + 10%.',
];

// New constants for Closet Quote Form
export const CLOSET_TYPES = [
  { name: 'Closet Tipo U', value: 9, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/02/closet-u.jpg' },
  { name: 'Closet Doble', value: 7, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/02/Closet-doble.jpg' },
  { name: 'Closet L', value: 6, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/02/Closet-L.jpg' },
  { name: 'Closet Simple', value: 5, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/02/closet-sencillo.jpg' },
  { name: 'Armario', value: 4, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/02/armario.jpg' },
];

export const CLOSET_MODULES = [
  { name: 'Perchero Simple', price: 350, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/06/m1-perchero-simple-768x1432.jpg' },
  { name: 'Perchero Doble', price: 350, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/06/m2-perchero-doble-768x1432.jpg' },
  { name: 'Perchero Doble Gaveta', price: 400, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/06/m3-perchero-doble-gaveta-768x1432.jpg' },
  { name: 'Módulo Tramos', price: 350, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/06/m4-modulo-tramos-768x1432.jpg' },
  { name: 'Módulo Percha Dos Gavetas', price: 420, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/06/m5-modulo-perchera-dos-gavetas-768x1432.jpg' },
  { name: 'Módulo Percha Tres Gavetas', price: 460, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/06/m6-modulo-perchera-tres-gavetas-768x1432.jpg' },
  { name: 'Módulo Tramos Dos Gavetas', price: 420, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/06/m7-modulo-tramos-dos-gavetas-768x1432.jpg' },
  { name: 'Módulo Tramos Perchero', price: 420, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/06/m8-modulo-tramos-percheros-768x1432.jpg' },
  { name: 'Módulo Tramos Dos Gavetas, Perchero', price: 460, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/06/m9-modulo-tramos-dos-gavetas-perchero-768x1432.jpg' },
  { name: 'Módulo Zapatera', price: 420, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/06/m10-modulo-zapatera-768x1432.jpg' },
  { name: 'Módulo Accesorios Zapatera', price: 450, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/06/m11-modulo-accesorios-zapatera-768x1432.jpg' },
  { name: 'Módulo Accesorios Dos Gavetas, Zapatera', price: 480, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/06/m12-modulo-accesorios-dos-gavetas-zapatera-768x1432.jpg' },
  { name: 'Módulo Esquina Tramos', price: 500, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/06/m13-modulo-esquina-tramos-768x1365.jpg' },
  { name: 'Módulo Esquina Perchero', price: 450, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/06/m14-modulo-esquina-perchero-768x1365.jpg' },
];

export const CLOSET_ACCESSORIES = [
  { name: 'Iluminación LED', price: 450, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/05/iluminacion-closet.jpg' },
  { name: 'Pantalonera Extraíble', price: 250, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/05/pantalonera-extraible.jpg' },
  { name: 'Porta Correa Extraíble', price: 180, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/05/porta-correa.jpg' },
  { name: 'Barra de Closet Desplegable', price: 200, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/05/barra-de-closet-desglegable-.jpg' },
  { name: 'Gaveta de Accesorios', price: 150, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/05/gavetas-de-accesorios.jpg' },
  { name: 'Perchero Extraíble', price: 150, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/05/perchero-extraible.jpg' },
];

// New constants for Kitchen Quote Form
export const KITCHEN_SIZES = [
  { name: 'Pequeña 8 módulos (10 m²)', price: 2500, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/cocina-pequena-hom.jpg' },
  { name: 'Mediana 12 módulos (15 m²)', price: 3510, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/cocina-mediana-hom.jpg' },
  { name: 'Grande 16 módulos (25 m²)', price: 5518, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/cocina-grande-hom.jpg' },
];

export const KITCHEN_STYLES = [
  { name: 'Un color, melamina tipo madera', multiplier: 1, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/cocina-un-colo-hom.jpg' },
  { name: 'Dos colores, melamina lisa y tipo madera', multiplier: 1.4, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/cocina-dos-colores-hom.jpg' },
  { name: 'Tres colores, melamina tipo lisa, madera y piedra', multiplier: 1.5, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/cocina-tres-colores.jpg' },
  { name: 'Madera preciosa (Roble)', multiplier: 2, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/cocina-roble-hom.jpg' },
];

export const KITCHEN_COUNTERTOPS = [
  { name: 'Sin tope', multiplier: 0, imageUrl: 'https://hom.com.do/wp-content/uploads/2025/05/none.png' },
  { name: 'Granito', multiplier: 0.6, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/granito.jpg' },
  { name: 'Cuarzo', multiplier: 0.9, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/cuarzo.jpg' },
  { name: 'Aglomerado', multiplier: 0.5, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/aglomerado.jpg' },
];

export const KITCHEN_SINKS = [
  { name: 'Fregadero Tradicional', price: 0, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/fregadero-tradicioanl.jpg' },
  { name: 'Fregadero Cuadrado', price: 100, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/fregadero-cuadrado.jpg' },
  { name: 'Fregadero Porcelana', price: 200, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/fregadero-porcelana.jpg' },
];

export const KITCHEN_FAUCETS = [
  { name: 'Tradicional Cromada', price: 0, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/plateada-curva.jpg' },
  { name: 'Tradicional Dorada', price: 0, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/dorada.jpg' },
  { name: 'Minimal Negra', price: 100, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/negra-recta.jpg' },
  { name: 'Moderna Negra', price: 150, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/negra-con-dorado.jpg' },
  { name: 'Boca Flexi', price: 175, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/negra-boca-flexible.jpg' },
  { name: '3 en 1 Extraíble', price: 200, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/clomada-3-en-1.jpg' },
];

export const KITCHEN_ACCESSORIES = [
    { name: 'Despensa con Gavetas', price: 750, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/despensa-con-gavetas.jpg' },
    { name: 'Despensa Extraíble', price: 850, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/despensa-extraible.jpg' },
    { name: 'Gaveta en Zócalo', price: 250, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/gaveta-zocalo.jpg' },
    { name: 'Mueble de Bandeja Esquina', price: 250, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/mueble-de-esquina.jpg' },
    { name: 'Gavetas de Esquina', price: 250, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/gaveta-de-esquina.jpg' },
    { name: 'Iluminación Bajo Gabinetes', price: 250, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/iluminacion-bajo-gabinetes.jpg' },
    { name: 'Iluminación Dentro de Gabinetes', price: 250, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/iluminacion-en-gabinetes.jpg' },
    { name: 'Especiero Extraíble', price: 160, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/especiero-extraible.jpg' },
    { name: 'Basurero Extraíble', price: 160, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/basurero-extraible.jpg' },
    { name: 'Gaveta Bajo Fregadero', price: 100, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/gaveta-bajo-fregadero.jpg' },
    { name: 'Escurridor de Gabinete Flotante', price: 250, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/escrurridor-de-gabinete.jpg' },
    { name: 'Toma Corriente de Tope', price: 250, imageUrl: 'https://hom.com.do/wp-content/uploads/2024/07/enchufe-de-counter.jpg' },
];


export const TIMELINE_DATA = [
  { year: 2018, description: "Nace Decora Group con la visión de transformar espacios en Punta Cana." },
  { year: 2019, description: "Inauguramos nuestro primer taller de fabricación, combinando tecnología y artesanía." },
  { year: 2021, description: "Expandimos nuestros servicios para incluir proyectos comerciales y de hotelería." },
  { year: 2023, description: "Lanzamos nuestra plataforma digital para ofrecer una experiencia de cotización innovadora." },
];

export const COMPANY_VALUES = [
  { icon: "Check", title: "Calidad y Excelencia", description: "Nos comprometemos a utilizar los mejores materiales y la artesanía más fina para entregar productos que superan los más altos estándares." },
  { icon: "Heart", title: "Pasión por el Diseño", description: "El diseño está en el corazón de todo lo que hacemos. Creamos piezas que son funcionales, hermosas y que inspiran la vida cotidiana." },
  { icon: "Scale", title: "Integridad y Transparencia", description: "Operamos con honestidad y claridad en cada interacción, construyendo relaciones de confianza con nuestros clientes, socios y equipo." },
  { icon: "Leaf", title: "Sostenibilidad", description: "Estamos dedicados a prácticas responsables, utilizando materiales sostenibles y procesos que minimizan nuestro impacto en el medio ambiente." },
];

export const CLIENT_LOGOS = [
  { url: 'https://tailwindui.com/img/logos/158x48/transistor-logo-gray-400.svg', alt: 'Transistor' },
  { url: 'https://tailwindui.com/img/logos/158x48/reform-logo-gray-400.svg', alt: 'Reform' },
  { url: 'https://tailwindui.com/img/logos/158x48/tuple-logo-gray-400.svg', alt: 'Tuple' },
  { url: 'https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-400.svg', alt: 'SavvyCal' },
  { url: 'https://tailwindui.com/img/logos/158x48/statamic-logo-gray-400.svg', alt: 'Statamic' },
  { url: 'https://tailwindui.com/img/logos/158x48/workcation-logo-gray-400.svg', alt: 'Workcation' },
  { url: 'https://tailwindui.com/img/logos/158x48/mirage-logo-gray-400.svg', alt: 'Mirage' },
  { url: 'https://tailwindui.com/img/logos/158x48/laravel-logo-gray-400.svg', alt: 'Laravel' },
  { url: 'https://tailwindui.com/img/logos/158x48/statickit-logo-gray-400.svg', alt: 'StaticKit' },
  { url: 'https://tailwindui.com/img/logos/158x48/tailwind-ui-logo-gray-400.svg', alt: 'Tailwind UI' },
  { url: 'https://tailwindui.com/img/logos/158x48/focus-application-logo-gray-400.svg', alt: 'Focus' },
  { url: 'https://tailwindui.com/img/logos/158x48/heimdal-logo-gray-400.svg', alt: 'Heimdal' },
];

export const WHY_CHOOSE_US_POINTS = [
    { icon: "Gem", title: "Calidad Insuperable", description: "Utilizamos solo los mejores materiales y acabados para garantizar muebles duraderos y de alta gama." },
    { icon: "Lightbulb", title: "Diseño Personalizado", description: "Cada proyecto es único. Creamos soluciones a medida que se adaptan perfectamente a tu estilo y necesidades." },
    { icon: "Award", title: "Artesanía Experta", description: "Nuestro equipo de artesanos cuenta con años de experiencia, cuidando cada detalle con pasión y precisión." },
    { icon: "Handshake", title: "Compromiso con el Cliente", description: "Tu satisfacción es nuestra prioridad. Te acompañamos en cada paso del proceso, desde el diseño hasta la instalación." },
    { icon: "TrendingUp", title: "Innovación Constante", description: "Estamos siempre a la vanguardia de las últimas tendencias y tecnologías para ofrecerte lo mejor del mercado." },
    { icon: "Users", title: "Equipo Profesional", description: "Contamos con un equipo multidisciplinar de diseñadores, arquitectos y técnicos para garantizar resultados excepcionales." },
];

export const TEAM_MEMBERS = [
    { name: "Juan Pérez", role: "CEO y Fundador", imageUrl: "https://i.pravatar.cc/150?img=1" },
    { name: "María González", role: "Directora de Diseño", imageUrl: "https://i.pravatar.cc/150?img=2" },
    { name: "Carlos Rodríguez", role: "Jefe de Producción", imageUrl: "https://i.pravatar.cc/150?img=3" },
    { name: "Ana Martínez", role: "Gerente de Proyectos", imageUrl: "https://i.pravatar.cc/150?img=4" },
];

export const JOB_VACANCIES = [
  { title: "Diseñador de Interiores Senior" },
  { title: "Ebanista / Carpintero Experto" },
  { title: "Gerente de Proyectos de Construcción" },
  { title: "Asistente Administrativo" },
];

export const PROJECT_TYPES_CONTACT = [
  "Muebles a Medida",
  "Diseño de Cocinas",
  "Diseño de Closets",
  "Mobiliario Comercial",
  "Diseño de Interiores Completo",
  "Otro"
];

export const DOMINICAN_REPUBLIC_LOCATIONS = {
  "Distrito Nacional": ["Distrito Nacional"],
  "Azua": ["Azua de Compostela", "Estebanía", "Guayabal", "Las Charcas", "Las Yayas de Viajama", "Padre Las Casas", "Peralta", "Pueblo Viejo", "Sabana Yegua", "Tábara Arriba"],
  "Bahoruco": ["Neiba", "Galván", "Los Ríos", "Tamayo", "Villa Jaragua"],
  "Barahona": ["Santa Cruz de Barahona", "Cabral", "El Peñón", "Enriquillo", "Fundación", "Jaquimeyes", "La Ciénaga", "Las Salinas", "Paraíso", "Polo", "Vicente Noble"],
  "Dajabón": ["Dajabón", "El Pino", "Loma de Cabrera", "Partido", "Restauración"],
  "Duarte": ["San Francisco de Macorís", "Arenoso", "Castillo", "Eugenio María de Hostos", "Las Guáranas", "Pimentel", "Villa Riva"],
  "El Seibo": ["Santa Cruz de El Seibo", "Miches"],
  "Elías Piña": ["Comendador", "Bánica", "El Llano", "Hondo Valle", "Juan Santiago", "Pedro Santana"],
  "Espaillat": ["Moca", "Cayetano Germosén", "Gaspar Hernández", "Jamao al Norte"],
  "Hato Mayor": ["Hato Mayor del Rey", "El Valle", "Sabana de la Mar"],
  "Hermanas Mirabal": ["Salcedo", "Tenares", "Villa Tapia"],
  "Independencia": ["Jimaní", "Cristóbal", "Duvergé", "La Descubierta", "Mella", "Postrer Río"],
  "La Altagracia": ["Salvaleón de Higüey", "San Rafael del Yuma", "Punta Cana"],
  "La Romana": ["La Romana", "Guaymate", "Villa Hermosa"],
  "La Vega": ["Concepción de La Vega", "Constanza", "Jarabacoa", "Jima Abajo"],
  "María Trinidad Sánchez": ["Nagua", "Cabrera", "El Factor", "Río San Juan"],
  "Monseñor Nouel": ["Bonao", "Maimón", "Piedra Blanca"],
  "Monte Cristi": ["San Fernando de Monte Cristi", "Castañuelas", "Guayubín", "Las Matas de Santa Cruz", "Pepillo Salcedo", "Villa Vásquez"],
  "Monte Plata": ["Monte Plata", "Bayaguana", "Peralvillo", "Sabana Grande de Boyá", "Yamasá"],
  "Pedernales": ["Pedernales", "Oviedo"],
  "Peravia": ["Baní", "Matanzas", "Nizao"],
  "Puerto Plata": ["San Felipe de Puerto Plata", "Altamira", "Guananico", "Imbert", "Los Hidalgos", "Luperón", "Sosúa", "Villa Isabela", "Villa Montellano"],
  "Samaná": ["Santa Bárbara de Samaná", "Las Terrenas", "Sánchez"],
  "San Cristóbal": ["San Cristóbal", "Bajos de Haina", "Cambita Garabitos", "Los Cacaos", "Sabana Grande de Palenque", "San Gregorio de Nigua", "Villa Altagracia", "Yaguate"],
  "San José de Ocoa": ["San José de Ocoa", "Rancho Arriba", "Sabana Larga"],
  "San Juan": ["San Juan de la Maguana", "Bohechío", "El Cercado", "Juan de Herrera", "Las Matas de Farfán", "Vallejuelo"],
  "San Pedro de Macorís": ["San Pedro de Macorís", "Consuelo", "Guayacanes", "Quisqueya", "Ramón Santana", "San José de los Llanos"],
  "Sánchez Ramírez": ["Cotuí", "Cevicos", "Fantino", "La Mata"],
  "Santiago": ["Santiago de los Caballeros", "Bisonó", "Jánico", "Licey al Medio", "Puñal", "Sabana Iglesia", "San José de las Matas", "Tamboril", "Villa González"],
  "Santiago Rodríguez": ["San Ignacio de Sabaneta", "Los Almácigos", "Monción"],
  "Santo Domingo": ["Santo Domingo Este", "Boca Chica", "Los Alcarrizos", "Pedro Brand", "San Antonio de Guerra", "Santo Domingo Norte", "Santo Domingo Oeste"],
  "Valverde": ["Mao", "Esperanza", "Laguna Salada"]
};

export const OUR_HISTORY_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=600', alt: 'Artesano trabajando en un taller de carpintería' },
  { url: 'https://images.unsplash.com/photo-1556761175-b413da4b248a?q=80&w=600', alt: 'Bocetos y planos de diseño de muebles sobre una mesa' },
  { url: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=600', alt: 'Sala de estar elegante con un proyecto de muebles finalizado' },
  { url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=600', alt: 'El equipo de Decora Group colaborando en un proyecto' },
];