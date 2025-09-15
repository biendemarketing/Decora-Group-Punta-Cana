import type { SubCategory, MenuItem, HeroSlide, PopularCategory, ServiceItem, WorkProcessSection, TopBarLink, TopBarBenefit } from '../types';
import { QUOTE_PROJECT_TYPES_DATA } from './quote';

export const generateSubCategory = (item: { name: string; imageUrl: string; title?: string, description?: string, quoteType?: string }): SubCategory => ({
  id: crypto.randomUUID(),
  name: item.name,
  imageUrl: item.imageUrl,
  title: item.title || item.name,
  description: item.description,
  quoteType: item.quoteType,
});

const SALA_SUB_CATEGORIES_DATA = [
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

const DORMITORIO_SUB_CATEGORIES_DATA = [
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

const COCINA_SUB_CATEGORIES_DATA = [
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

const RECIBIDOR_SUB_CATEGORIES_DATA = [
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

const OFICINA_SUB_CATEGORIES_DATA = [
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

const BANO_SUB_CATEGORIES_DATA = [
  { name: 'Juegos de muebles de baño', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/bathroom_sets.png' },
  { name: 'Armarios de baño', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/bathroom_standing_cabinets.png' },
  { name: 'Estanterías de baño', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/bathroom_shelves.png' },
  { name: 'Todos los muebles de baño', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/all_furniture.png' },
];

const INFANTILES_SUB_CATEGORIES_DATA = [
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

const PUERTAS_SUB_CATEGORIES_DATA = [
  { name: 'Puertas Interiores', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/hallway_sets.png' },
  { name: 'Puertas Exteriores', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/hallway_sets.png' },
  { name: 'Revestimiento de pared', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/soft_wall_panels.png' },
  { name: 'Todas las Puertas', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/all_furniture.png' },
];

const PROYECTOS_SUB_CATEGORIES_DATA = [
  { name: 'Cocinas Personalizadas', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/kitchen_sets.png' },
  { name: 'Baños Modernos', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/bathroom_sets.png' },
  { name: 'Muebles a Medida', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/modular_furniture.png' },
  { name: 'Diseño de Interiores', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/desktop_menu/menu-living-room-side-image.jpg' },
  { name: 'Puertas de Interior y Exterior', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/hallway_sets.png' },
  { name: 'Mobiliario de Oficina', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/category_icons/office_furniture_sets.png' },
  { name: 'Proyectos Comerciales', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/desktop_menu/menu-office-side-image.jpg' },
];

const HERRAJES_SUB_CATEGORIES_DATA = [
    { name: 'Lavamanos', imageUrl: 'https://picsum.photos/id/1070/100/100' },
    { name: 'Fregaderos', imageUrl: 'https://picsum.photos/id/1071/100/100' },
    { name: 'Correderas', imageUrl: 'https://picsum.photos/id/1072/100/100' },
    { name: 'Esquineros', imageUrl: 'https://picsum.photos/id/1073/100/100' },
    { name: 'Torres', imageUrl: 'https://picsum.photos/id/1074/100/100' },
    { name: 'Llavines', imageUrl: 'https://picsum.photos/id/1075/100/100' },
    { name: 'Patas', imageUrl: 'https://picsum.photos/id/1076/100/100' },
    { name: 'Tiradores', imageUrl: 'https://picsum.photos/id/1077/100/100' },
    { name: 'Bisagras', imageUrl: 'https://picsum.photos/id/1078/100/100' },
    { name: 'Llaves', imageUrl: 'https://picsum.photos/id/1079/100/100' },
];

const ELECTRODOMESTICOS_SUB_CATEGORIES_DATA = [
    { name: 'Estufas', imageUrl: 'https://picsum.photos/id/201/100/100' },
    { name: 'Neveras', imageUrl: 'https://picsum.photos/id/202/100/100' },
    { name: 'Lavadoras', imageUrl: 'https://picsum.photos/id/203/100/100' },
    { name: 'Hornos', imageUrl: 'https://picsum.photos/id/204/100/100' },
    { name: 'Microondas', imageUrl: 'https://picsum.photos/id/206/100/100' },
    { name: 'Campanas', imageUrl: 'https://picsum.photos/id/208/100/100' },
];

export const MENU_ITEMS_DATA: Omit<MenuItem, 'id'>[] = [
  { key: 'sala', title: "Sala", isVisible: true, featuredImageUrl: 'https://img.furniture1.eu/v7/_f1_/images/desktop_menu/menu-living-room-side-image.jpg', subCategories: SALA_SUB_CATEGORIES_DATA.map(generateSubCategory) },
  { key: 'dormitorio', title: "Dormitorio", isVisible: true, featuredImageUrl: 'https://img.furniture1.eu/v7/_f1_/images/desktop_menu/menu-bedroom-side-image.jpg', subCategories: DORMITORIO_SUB_CATEGORIES_DATA.map(generateSubCategory) },
  { key: 'cocina', title: "Cocina", isVisible: true, featuredImageUrl: 'https://img.furniture1.eu/v7/_f1_/images/desktop_menu/menu-kitchen-side-image.jpg', subCategories: COCINA_SUB_CATEGORIES_DATA.map(generateSubCategory) },
  { key: 'recibidor', title: "Recibidor", isVisible: true, featuredImageUrl: 'https://img.furniture1.eu/v7/_f1_/images/desktop_menu/menu-hallway-side-image.jpg', subCategories: RECIBIDOR_SUB_CATEGORIES_DATA.map(generateSubCategory) },
  { key: 'oficina', title: "Oficina", isVisible: true, featuredImageUrl: 'https://img.furniture1.eu/v7/_f1_/images/desktop_menu/menu-office-side-image.jpg', subCategories: OFICINA_SUB_CATEGORIES_DATA.map(generateSubCategory) },
  { key: 'bano', title: "Baño", isVisible: true, featuredImageUrl: 'https://img.furniture1.eu/v7/_f1_/images/desktop_menu/menu-bathroom-side-image.jpg', subCategories: BANO_SUB_CATEGORIES_DATA.map(generateSubCategory) },
  { key: 'infantiles', title: "Muebles infantiles", isVisible: true, featuredImageUrl: 'https://img.furniture1.eu/v7/_f1_/images/desktop_menu/menu-childrens-room-side-image.jpg', subCategories: INFANTILES_SUB_CATEGORIES_DATA.map(generateSubCategory) },
  { key: 'puertas', title: "Puertas", isVisible: true, featuredImageUrl: 'https://picsum.photos/id/1013/600/800', subCategories: PUERTAS_SUB_CATEGORIES_DATA.map(generateSubCategory) },
  { key: 'herrajes', title: "Herrajes y Accesorios", isVisible: true, featuredImageUrl: 'https://picsum.photos/id/1080/600/800', subCategories: HERRAJES_SUB_CATEGORIES_DATA.map(generateSubCategory) },
  { key: 'electrodomesticos', title: "Electrodomésticos", isVisible: true, featuredImageUrl: 'https://picsum.photos/id/225/600/800', subCategories: ELECTRODOMESTICOS_SUB_CATEGORIES_DATA.map(generateSubCategory) },
  { key: 'catalogues', title: "Catálogos", isVisible: true, featuredImageUrl: 'https://picsum.photos/id/367/600/800', subCategories: [] },
  { key: 'blog', title: "Blog", isVisible: true, featuredImageUrl: '', subCategories: [] },
  { key: 'proyectos', title: "Proyectos", isVisible: true, featuredImageUrl: 'https://picsum.photos/id/1076/600/800', subCategories: PROYECTOS_SUB_CATEGORIES_DATA.map(generateSubCategory) },
  { key: 'cotizar', title: "Cotizar a medida", isVisible: true, featuredImageUrl: 'https://picsum.photos/id/1076/600/800', subCategories: QUOTE_PROJECT_TYPES_DATA.map(item => generateSubCategory({ ...item, name: item.title })) },
];

export const HERO_SLIDES_DATA: Omit<HeroSlide, 'id'>[] = [
  {
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1920&auto=format&fit=crop",
    title: "Diseño y Calidad Insuperables",
    subtitle: "Muebles que transforman tu espacio",
    buttons: [
      { id: crypto.randomUUID(), text: "Cotización automática", link: 'quote', style: 'primary', icon: 'Calculator' },
      { id: crypto.randomUUID(), text: "Ver productos", link: 'products', style: 'secondary', icon: 'Eye' },
    ],
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1920&auto=format&fit=crop",
    title: "Entrega Garantizada y Segura",
    subtitle: "Recibe tus muebles justo a tiempo, sin prepago.",
    buttons: [
      { id: crypto.randomUUID(), text: "Nuestros Proyectos", link: 'projects', style: 'primary', icon: 'Wrench' },
    ],
  },
   {
    imageUrl: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1920&auto=format&fit=crop",
    title: "Estilo Que Inspira",
    subtitle: "Descubre colecciones que definen tu hogar.",
    buttons: [
      { id: crypto.randomUUID(), text: "Sobre Nosotros", link: 'about-us', style: 'secondary', icon: 'Users' },
      { id: crypto.randomUUID(), text: "Contáctanos", link: 'contact', style: 'primary', icon: 'Phone' },
    ],
  },
];

export const INITIAL_POPULAR_CATEGORIES: PopularCategory[] = [
    { id: crypto.randomUUID(), name: 'Salas', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/desktop_menu/menu-living-room-side-image.jpg', link: 'Sala' },
    { id: crypto.randomUUID(), name: 'Dormitorios', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/desktop_menu/menu-bedroom-side-image.jpg', link: 'Dormitorio' },
    { id: crypto.randomUUID(), name: 'Terrazas y Jardines', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/desktop_menu/menu-outdoors-side-image.jpg', link: 'Sala' },
    { id: crypto.randomUUID(), name: 'Oficinas en Casa', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/desktop_menu/menu-office-side-image.jpg', link: 'Oficina' },
];

export const INITIAL_SERVICES: ServiceItem[] = [
    { id: crypto.randomUUID(), title: 'Closets', description: 'Somos expertos en sacar el mejor provecho del espacio con diseños de closets a medida.', imageUrl: 'https://hom.com.do/wp-content/uploads/2025/02/closet-u.jpg', buttonText: 'Cotizar tu nuevo closet', quoteType: 'Closets' },
    { id: crypto.randomUUID(), title: 'Cocinas', description: 'Diseño y construcción de cocinas optimizadas para mejor uso y eficiencia.', imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop', buttonText: 'Cotizar tu nueva cocina', quoteType: 'Cocinas' },
    { id: crypto.randomUUID(), title: 'Muebles Personalizados', description: 'Diseño o solicitud de mobiliario con funciones especiales.', imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format&fit=crop', buttonText: 'Cotizar', quoteType: 'Muebles Personalizados' },
    { id: crypto.randomUUID(), title: 'Mobiliario Comercial', description: 'Construcción de tiendas, anaqueles, tramería, estantes, counters, etc...', imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop', buttonText: 'Cotizar', quoteType: 'Mobiliario Comercial' },
    { id: crypto.randomUUID(), title: 'Construcciones Especializadas', description: 'Desde el revestimiento de una pared hasta la construcción de una tiny house.', imageUrl: 'https://images.unsplash.com/photo-1512211756210-85090ea05c0b?q=80&w=800&auto=format&fit=crop', buttonText: 'Cotizar', quoteType: 'Construcciones Especializadas' },
];

export const INITIAL_WORK_PROCESS_SECTION: WorkProcessSection = {
    title: 'Proceso de Trabajo con Decora Group',
    backgroundImageUrl: 'https://picsum.photos/id/1071/1920/1080',
    steps: [
      {
        id: crypto.randomUUID(),
        title: 'Cotiza',
        description: 'A través de nuestra plataforma digital o enviando los planos y solicitando visita de reconocimiento.',
        icon: 'FileText',
      },
      {
        id: crypto.randomUUID(),
        title: 'Asesoría',
        description: 'Se optimiza el proceso con la asesoría del equipo de diseño y producción.',
        icon: 'Edit3',
      },
      {
        id: crypto.randomUUID(),
        title: 'Presupuesto',
        description: 'Recibes un presupuesto detallado y con el alcance del proyecto.',
        icon: 'ShieldCheck',
      },
      {
        id: crypto.randomUUID(),
        title: 'Ejecución',
        description: 'Ejecución y control de calidad de tu proyecto.',
        icon: 'BookOpen',
      },
    ],
};

export const INITIAL_TOP_BAR_LINKS: TopBarLink[] = [
    { id: 'about-us', text: 'Nosotros' },
    { id: 'faq', text: 'FAQ' },
    { id: 'help', text: 'Ayuda' },
    { id: 'contact', text: 'Contacto' },
];

export const INITIAL_TOP_BAR_BENEFITS: TopBarBenefit[] = [
    { id: crypto.randomUUID(), icon: 'Truck', text: 'Entrega gratis en Punta Cana' },
    { id: crypto.randomUUID(), icon: 'CreditCard', text: 'Pago a la entrega' },
    { id: crypto.randomUUID(), icon: 'ShieldCheck', text: '365 días - garantía' },
];

export const PREDEFINED_LINKS = [
    { key: 'products', label: 'Ver todos los productos' },
    { key: 'projects', label: 'Ver todos los proyectos' },
    { key: 'quote', label: 'Ir a Cotizar a Medida' },
    { key: 'about-us', label: 'Ir a Sobre Nosotros' },
    { key: 'contact', label: 'Ir a Contacto' },
    { key: 'blog', label: 'Ir al Blog' },
];
