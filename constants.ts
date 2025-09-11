import type { Product, Project, NavigationData, SubCategory, MenuItem, BlogCategory, BlogTag, BlogPost, Catalogue, FooterContent, AboutUsPageContent, FAQItem, LegalContent, InstagramShowcaseData, ContactContent, JobVacancy } from './types';

const generateSubCategory = (item: { name: string; imageUrl: string; title?: string, description?: string, quoteType?: string }): SubCategory => ({
  id: crypto.randomUUID(),
  name: item.name,
  imageUrl: item.imageUrl,
  title: item.title || item.name,
  description: item.description,
  quoteType: item.quoteType,
});

export const GOOGLE_FONTS = ['Poppins', 'Roboto', 'Montserrat', 'Lato', 'Playfair Display'];

export const CATALOGUE_COVER_TEMPLATES = [
    { id: 'minimalist_light', name: 'Minimalista Claro', preview: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MCAxMDUiPjxyZWN0IHdpZHRoPSI4MCIgaGVpZ2h0PSIxMDUiIGZpbGw9IiNmOWZhZmIiLz48cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZzh0PSI0MCIgZmlsbD0iI2RlZGVkZSIgcng9IjIiLz48cmVjdCB4PSIxNSIgeT0iNzUiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1IiBmaWxsPSIjY2NjIiByeD0iMiIvPjxyZWN0IHg9IjI1IiB5PSI4NSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMiIGZpbGw9IiNkZGQiIHJ4PSIyIi8+PC9zdmc+', imageSlots: 1 },
    { id: 'elegant_dark', name: 'Elegante Oscuro', preview: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MCAxMDUiPjxyZWN0IHdpZHRoPSI4MCIgaGVpZ2h0PSIxMDUiIGZpbGw9IiMyZDNlNGUiLz48cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iIzQwNDA0MCIgcng9IjIiLz48cmVjdCB4PSIxNSIgeT0iNzUiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1IiBmaWxsPSIjY2NjIiByeD0iMiIvPjxyZWN0IHg9IjI1IiB5PSI4NSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMiIGZpbGw9IiNkZGQiIHJ4PSIyIi8+PC9zdmc+', imageSlots: 1 },
    { id: 'modern_grid', name: 'Mosaico Moderno', preview: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MCAxMDUiPjxyZWN0IHdpZHRoPSI4MCIgaGVpZ2h0PSIxMDUiIGZpbGw9IiNmOWZhZmIiLz48cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iI2RlZGVkZSIgcng9IjIiLz48cmVjdCB4PSI0MiIgeT0iMTAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iI2RlZGVkZSIgcng9IjIiLz48cmVjdCB4PSIxMCIgeT0iNDIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iI2RlZGVkZSIgcng9IjIiLz48cmVjdCB4PSI0MiIgeT0iNDIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iI2RlZGVkZSIgcng9IjIiLz48cmVjdCB4PSIxMCIgeT0iODIiIHdpZHRoPSI2MiIgaGVpZ2h0PSI4IiBmaWxsPSIjY2NjIiByeD0iMiIvPjwvc3ZnPg==', imageSlots: 4 },
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

const QUOTE_PROJECT_TYPES_DATA = [
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

const MENU_ITEMS_DATA: Omit<MenuItem, 'id'>[] = [
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

const HERO_SLIDES_DATA: Omit<NavigationData['heroSlides'][0], 'id'>[] = [
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
      { id: crypto.randomUUID(), text: "Sobre Nosotros", link: 'about', style: 'secondary', icon: 'Users' },
      { id: crypto.randomUUID(), text: "Contáctanos", link: 'contact', style: 'primary', icon: 'Phone' },
    ],
  },
];

const INITIAL_BLOG_CATEGORIES: BlogCategory[] = [
  { id: 'cat1', name: 'Inspiración' },
  { id: 'cat2', name: 'Tendencias' },
  { id: 'cat3', name: 'Guías' },
];

const INITIAL_BLOG_TAGS: BlogTag[] = [
  { id: 'tag1', name: 'Terrazas' },
  { id: 'tag2', name: 'Caribe' },
  { id: 'tag3', name: 'Colores' },
  { id: 'tag4', name: 'Sofás' },
];

const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: crypto.randomUUID(),
    title: "5 Ideas para tu Terraza en el Caribe",
    description: "Aprovecha al máximo tu espacio exterior con estas ideas de diseño tropical que combinan comodidad, estilo y resistencia a los elementos.",
    imageUrl: "https://picsum.photos/id/1011/600/400",
    author: "Ana Martínez",
    date: new Date('2024-07-20T10:00:00Z').toISOString(),
    categoryId: 'cat1',
    tagIds: ['tag1', 'tag2'],
  },
  {
    id: crypto.randomUUID(),
    title: "Colores que son Tendencia este Año",
    description: "Desde tonos tierra hasta colores vibrantes, exploramos las paletas que definirán los interiores en 2024. ¡Atrévete a darle un nuevo aire a tu hogar!",
    imageUrl: "https://picsum.photos/id/1015/600/400",
    author: "Carlos Rodríguez",
    date: new Date('2024-07-15T14:30:00Z').toISOString(),
    categoryId: 'cat2',
    tagIds: ['tag3'],
  },
  {
    id: crypto.randomUUID(),
    title: "Cómo elegir el sofá perfecto para tu espacio",
    description: "El sofá es el corazón de la sala. Te damos una guía completa sobre tamaños, materiales, estilos y cómo encontrar el balance ideal entre confort y diseño.",
    imageUrl: "https://picsum.photos/id/1025/600/400",
    author: "María González",
    date: new Date('2024-07-10T09:00:00Z').toISOString(),
    categoryId: 'cat3',
    tagIds: ['tag4'],
  },
];

const INITIAL_CATALOGUES: Catalogue[] = [
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

// --- New CMS Content ---

const INITIAL_FOOTER_CONTENT: FooterContent = {
  description: "Transformamos espacios con diseños únicos y funcionales, creando ambientes que reflejan tu estilo de vida.",
  socialLinks: [
    { id: 'fb', platform: 'Facebook', url: '#' },
    { id: 'ig', platform: 'Instagram', url: '#' },
    { id: 'yt', platform: 'Youtube', url: '#' },
    { id: 'wa', platform: 'WhatsApp', url: '#' }
  ],
  linkColumns: [
    {
      id: 'col1', title: "Servicios", links: [
        { id: 'l1', text: "Cocinas Personalizadas", url: "Cocinas Personalizadas", linkType: 'project-category' },
        { id: 'l2', text: "Closets y Walk-in", url: "#", linkType: 'url' }, // Example, assuming no direct project category for this
        { id: 'l3', text: "Baños Modernos", url: "Baños Modernos", linkType: 'project-category' },
        { id: 'l4', text: "Muebles a Medida", url: "Muebles a Medida", linkType: 'project-category' },
        { id: 'l5', text: "Mobiliario de Oficina", url: "Mobiliario de Oficina", linkType: 'project-category' },
        { id: 'l6', text: "Proyectos Comerciales", url: "Proyectos Comerciales", linkType: 'project-category' }
      ]
    },
    {
      id: 'col2', title: "Enlaces Rápidos", links: [
        { id: 'l7', text: "Inicio", url: "#", linkType: 'url' },
        { id: 'l8', text: "Quiénes Somos", url: "#", linkType: 'url' },
        { id: 'l9', text: "Galería", url: "#", linkType: 'url' },
        { id: 'l10', text: "Blog", url: "#", linkType: 'url' },
        { id: 'l11', text: "Contacto", url: "#", linkType: 'url' }
      ]
    }
  ],
  contactInfo: {
    address: "Av. Barceló, CANATOWN, Punta Cana 23000",
    phone: "(849) 456-1963",
    email: "decoragrouppc@gmail.com"
  },
  copyrightText: `© ${new Date().getFullYear()} Decora Group. Todos los derechos reservados.`,
  legalLinks: [
    { id: 'legal1', text: "Política de Privacidad", url: "#", linkType: 'url' },
    { id: 'legal2', text: "Términos y Condiciones", url: "#", linkType: 'url' },
    { id: 'legal3', text: "Aviso Legal", url: "#", linkType: 'url' },
    { id: 'legal4', text: "Política de Cookies", url: "#", linkType: 'url' }
  ]
};

const INITIAL_VACANCIES: JobVacancy[] = [
    { 
        id: 'job1', 
        title: "Diseñador de Interiores Senior",
        icon: 'DraftingCompass',
        summary: 'Liderar proyectos de diseño desde el concepto hasta la ejecución, creando espacios funcionales y estéticamente excepcionales para clientes residenciales y comerciales.',
        location: 'Punta Cana, Remoto Parcial',
        type: 'Jornada Completa',
        description: [
            'Buscamos un Diseñador de Interiores Senior apasionado y con experiencia para unirse a nuestro equipo dinámico. Serás responsable de gestionar todo el ciclo de vida del diseño, desde la conceptualización inicial y el contacto con el cliente hasta la ejecución final del proyecto.',
            'El candidato ideal tendrá un portafolio sólido que demuestre su creatividad y habilidad técnica, así como excelentes habilidades de comunicación para transformar las visiones de los clientes en realidades tangibles.'
        ],
        responsibilities: [
            'Reunirse con clientes para determinar sus necesidades, presupuesto y preferencias.',
            'Desarrollar conceptos de diseño, bocetos, planos y modelos 3D.',
            'Seleccionar materiales, mobiliario, acabados y paletas de colores.',
            'Coordinar con el equipo de producción y proveedores para asegurar la calidad y los plazos.',
            'Supervisar la instalación y el montaje final del proyecto.'
        ],
        requirements: [
            'Más de 5 años de experiencia demostrable en diseño de interiores.',
            'Portafolio sólido de proyectos completados.',
            'Dominio de software de diseño (AutoCAD, SketchUp, V-Ray, Adobe Creative Suite).',
            'Excelentes habilidades de comunicación y gestión de clientes.',
            'Conocimiento de materiales, construcción y normativas locales.'
        ]
    },
    { 
        id: 'job2', 
        title: "Ebanista / Carpintero Experto",
        icon: 'Wrench',
        summary: 'Fabricar muebles a medida de alta calidad, interpretando planos técnicos y utilizando tanto técnicas tradicionales como maquinaria moderna para lograr acabados impecables.',
        location: 'Taller en Punta Cana',
        type: 'Jornada Completa',
        description: [
            'Estamos en la búsqueda de un Ebanista / Carpintero con un alto nivel de habilidad y atención al detalle. Serás una pieza clave en nuestro taller, responsable de dar vida a los diseños de nuestros clientes y arquitectos.',
            'Este rol requiere una profunda comprensión de la madera y otros materiales, así como la capacidad de trabajar de forma autónoma y en equipo para producir piezas de mobiliario excepcionales.'
        ],
        responsibilities: [
            'Leer e interpretar planos de diseño y especificaciones técnicas.',
            'Operar maquinaria de carpintería (sierras, tupís, CNC, etc.) de forma segura y eficiente.',
            'Construir, ensamblar y acabar muebles a medida con altos estándares de calidad.',
            'Realizar trabajos de acabado como lijado, teñido, lacado y barnizado.',
            'Mantener un espacio de trabajo limpio, seguro y organizado.'
        ],
        requirements: [
            'Más de 7 años de experiencia como ebanista o carpintero de muebles finos.',
            'Habilidad experta en el uso de herramientas manuales y maquinaria de carpintería.',
            'Capacidad para leer e interpretar planos complejos.',
            'Atención meticulosa al detalle y al control de calidad.',
            'Pasión por la artesanía y el trabajo bien hecho.'
        ]
    },
];

const INITIAL_ABOUT_US_CONTENT: AboutUsPageContent = {
  sections: [
    {
      id: crypto.randomUUID(),
      type: 'history',
      content: {
        title: 'Nuestra Historia',
        text: 'Desde nuestros humildes comienzos hasta convertirnos en un referente del diseño y la fabricación de muebles en Punta Cana, nuestra pasión por la artesanía y la calidad ha sido el motor de nuestro crecimiento. Creemos en la creación de espacios que no solo son hermosos, sino también funcionales y duraderos.',
        images: [
          { id: 'img1', url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=600', alt: 'Artesano trabajando en un taller de carpintería' },
          { id: 'img2', url: 'https://images.unsplash.com/photo-1556761175-b413da4b248a?q=80&w=600', alt: 'Bocetos y planos de diseño de muebles sobre una mesa' },
          { id: 'img3', url: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=600', alt: 'Sala de estar elegante con un proyecto de muebles finalizado' },
          { id: 'img4', url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=600', alt: 'El equipo de Decora Group colaborando en un proyecto' },
        ],
      }
    },
    {
      id: crypto.randomUUID(),
      type: 'timeline',
      content: {
        title: 'Nuestra Trayectoria',
        events: [
          { id: 't1', year: 2018, description: "Nace Decora Group con la visión de transformar espacios en Punta Cana." },
          { id: 't2', year: 2019, description: "Inauguramos nuestro primer taller de fabricación, combinando tecnología y artesanía." },
          { id: 't3', year: 2021, description: "Expandimos nuestros servicios para incluir proyectos comerciales y de hotelería." },
          { id: 't4', year: 2023, description: "Lanzamos nuestra plataforma digital para ofrecer una experiencia de cotización innovadora." },
        ]
      }
    },
    {
      id: crypto.randomUUID(),
      type: 'missionVision',
      content: {
        mission: { title: 'Misión', text: 'Crear muebles y espacios que inspiren la vida cotidiana, combinando diseño innovador, funcionalidad excepcional y artesanía de la más alta calidad para superar las expectativas de nuestros clientes.' },
        vision: { title: 'Visión', text: 'Ser la empresa líder en diseño y fabricación de mobiliario a medida en el Caribe, reconocida por nuestra excelencia, sostenibilidad y por transformar las ideas de nuestros clientes en realidades tangibles y duraderas.' }
      }
    },
    {
      id: crypto.randomUUID(),
      type: 'values',
      content: {
        title: 'Nuestros Valores',
        subtitle: 'Los principios que guían cada uno de nuestros proyectos y decisiones.',
        values: [
          { id: 'v1', icon: "Check", title: "Calidad y Excelencia", description: "Nos comprometemos a utilizar los mejores materiales y la artesanía más fina para entregar productos que superan los más altos estándares." },
          { id: 'v2', icon: "Heart", title: "Pasión por el Diseño", description: "El diseño está en el corazón de todo lo que hacemos. Creamos piezas que son funcionales, hermosas y que inspiran la vida cotidiana." },
          { id: 'v3', icon: "Scale", title: "Integridad y Transparencia", description: "Operamos con honestidad y claridad en cada interacción, construyendo relaciones de confianza con nuestros clientes, socios y equipo." },
          { id: 'v4', icon: "Leaf", title: "Sostenibilidad", description: "Estamos dedicados a prácticas responsables, utilizando materiales sostenibles y procesos que minimizan nuestro impacto en el medio ambiente." },
        ]
      }
    },
    {
      id: crypto.randomUUID(),
      type: 'team',
      content: {
        title: 'Conoce a Nuestro Equipo',
        subtitle: 'El talento y la dedicación detrás de cada proyecto exitoso.',
        members: [
          { id: 'tm1', name: "Juan Pérez", role: "CEO y Fundador", imageUrl: "https://i.pravatar.cc/150?img=1" },
          { id: 'tm2', name: "María González", role: "Directora de Diseño", imageUrl: "https://i.pravatar.cc/150?img=2" },
          { id: 'tm3', name: "Carlos Rodríguez", role: "Jefe de Producción", imageUrl: "https://i.pravatar.cc/150?img=3" },
          { id: 'tm4', name: "Ana Martínez", role: "Gerente de Proyectos", imageUrl: "https://i.pravatar.cc/150?img=4" },
        ]
      }
    },
    {
      id: crypto.randomUUID(),
      type: 'hiring',
      content: {
        title: '¿Necesitas Empleo? ¡Estamos Contratando!',
        text: 'Únete a nuestro equipo de apasionados por el diseño y la artesanía. Buscamos talento para seguir creciendo juntos.',
        vacancies: INITIAL_VACANCIES,
        closingText: '¿No ves una posición para ti? Siempre estamos buscando personas con talento. \n Envíanos tu currículum a nuestro correo electrónico.'
      }
    }
  ]
};

const INITIAL_FAQ_CONTENT: { title: string; subtitle: string; faqs: FAQItem[] } = {
    title: 'Preguntas Frecuentes',
    subtitle: 'Encuentra respuestas a las dudas más comunes sobre nuestros productos, servicios y procesos.',
    faqs: [
        { id: 'faq1', question: '¿Cuál es el tiempo de entrega de los muebles?', answer: 'El tiempo de entrega varía según el producto y la personalización. Generalmente, oscila entre 15 y 45 días laborables. Puedes ver el tiempo estimado en la página de cada producto.' },
        { id: 'faq2', question: '¿Ofrecen servicio de diseño de interiores completo?', answer: 'Sí, ofrecemos un servicio integral de diseño de interiores, desde la conceptualización hasta la ejecución y el amueblamiento final. Nuestro equipo de diseñadores trabajará contigo para crear el espacio de tus sueños.' },
        { id: 'faq3', question: '¿Qué garantía tienen sus productos?', answer: 'Todos nuestros muebles tienen una garantía de 365 días que cubre defectos de fabricación. La calidad y durabilidad son nuestra prioridad.' },
        { id: 'faq4', question: '¿Puedo personalizar los muebles?', answer: '¡Por supuesto! La personalización es nuestra especialidad. Puedes elegir materiales, acabados, colores y dimensiones en la mayoría de nuestros productos. Contacta a nuestro equipo para discutir tus ideas.' }
    ]
};

const INITIAL_LEGAL_CONTENT: LegalContent = {
    pages: [
        { 
            id: 'legal1', 
            title: 'Política de Privacidad', 
            content: `
Fecha de última actualización: ${new Date().toLocaleDateString('es-DO')}

Decora Group ("nosotros", "nuestro") se compromete a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y salvaguardamos su información cuando visita nuestro sitio web.

**1. RECOPILACIÓN DE INFORMACIÓN**
Recopilamos información personal que usted nos proporciona voluntariamente, como nombre, dirección de correo electrónico, número de teléfono y dirección, cuando completa formularios de contacto o cotización.

**2. USO DE SU INFORMACIÓN**
Usamos la información recopilada para:
- Responder a sus solicitudes y consultas.
- Procesar sus cotizaciones y pedidos.
- Enviarle información sobre nuestros productos y servicios.
- Mejorar nuestro sitio web y servicios.

**3. DIVULGACIÓN DE SU INFORMACIÓN**
No vendemos, intercambiamos ni transferimos de ningún otro modo a terceros su información de identificación personal sin su consentimiento, excepto para cumplir con la ley o proteger nuestros derechos.

**4. SEGURIDAD DE LA INFORMACIÓN**
Implementamos una variedad de medidas de seguridad para mantener la seguridad de su información personal.

**5. DERECHOS DEL USUARIO**
Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales. Para ejercer estos derechos, contáctenos en info@decoragroup.pc.

**6. POLÍTICA DE COOKIES**
Nuestro sitio web puede utilizar "cookies" para mejorar la experiencia del usuario. Puede optar por configurar su navegador para que rechace las cookies.
            ` 
        },
        { 
            id: 'legal2', 
            title: 'Términos y Condiciones', 
            content: `
Bienvenido a Decora Group. Al acceder y utilizar este sitio web, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones de uso.

**1. USO DEL SITIO**
El contenido de las páginas de este sitio web es para su información y uso general. Está sujeto a cambios sin previo aviso.

**2. PROPIEDAD INTELECTUAL**
Este sitio web contiene material que es de nuestra propiedad o está licenciado para nosotros. Este material incluye, pero no se limita a, el diseño, la disposición, el aspecto, la apariencia y los gráficos. La reproducción está prohibida salvo de conformidad con el aviso de derechos de autor.

**3. EXENCIÓN DE RESPONSABILIDAD**
La información en este sitio web se proporciona "tal cual". No ofrecemos ninguna garantía en cuanto a la exactitud, puntualidad, rendimiento, integridad o idoneidad de la información y los materiales que se encuentran u ofrecen en este sitio web para un propósito particular. El uso de cualquier información o material en este sitio web es bajo su propio riesgo.

**4. ENLACES A TERCEROS**
Este sitio web puede incluir enlaces a otros sitios web. Estos enlaces se proporcionan para su conveniencia para proporcionar más información. No significan que respaldamos el (los) sitio(s) web. No tenemos ninguna responsabilidad por el contenido del (los) sitio(s) web enlazado(s).

**5. LEY APLICABLE**
Su uso de este sitio web y cualquier disputa que surja de dicho uso del sitio web está sujeto a las leyes de la República Dominicana.
            `
        },
        { 
            id: 'legal3', 
            title: 'Aviso Legal', 
            content: `
En cumplimiento con el deber de información, a continuación se reflejan los siguientes datos:

**1. DATOS IDENTIFICATIVOS DE LA EMPRESA**
- **Nombre comercial:** Decora Group
- **Razón Social:** [Razón Social de la Empresa S.R.L.]
- **RNC:** [Número de RNC]
- **Domicilio:** CANATOWN Plaza & Centro de Logística, Av. Barceló, local 101, Veron, Punta Cana 23000, República Dominicana.
- **Correo electrónico de contacto:** info@decoragroup.pc
- **Teléfono:** (849) 456-1963

**2. OBJETO DEL SITIO WEB**
El presente sitio web tiene como objeto la promoción y comercialización de muebles, servicios de diseño de interiores y proyectos de carpintería a medida.

**3. USUARIOS**
El acceso y/o uso de este portal atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, los Términos y Condiciones de Uso aquí reflejados.
            `
        }
    ]
};

const INITIAL_CONTACT_CONTENT: ContactContent = {
    formTitle: 'Envíanos un Mensaje',
    formSubtitle: 'Completa el formulario y nos pondremos en contacto contigo.',
    infoTitle: 'Información de Contacto',
    phone: '(849) 456-1963',
    email: 'decoragrouppc@gmail.com',
    address: 'Av. Barceló, CANATOWN, Punta Cana 23000',
    hours: 'Lunes - Viernes: 9:00 AM - 6:00 PM | Sábados: 9:00 AM - 4:00 PM | Domingos: Cerrado',
    mapTitle: 'Nuestra Ubicación'
};

const INITIAL_INSTAGRAM_SHOWCASE_DATA: InstagramShowcaseData = {
    username: 'decoragroup.pc',
    isVerified: true,
    profilePictureUrl: 'https://decoragrouppuntacana.com/icon.png',
    postsCount: 99,
    followersCount: '2,783',
    followingCount: 366,
    profileName: 'Decora Group',
    bio: 'Fabrica de modulares de cocina, puertas, closets, baños, para proyectos. Equipamos y decoramos tus espacios interiores. 📍Punta Cana, Rep. Dominicana.',
    galleryImages: [
        { id: crypto.randomUUID(), imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=400&h=400&auto=format&fit=crop' },
        { id: crypto.randomUUID(), imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400&h=400&auto=format&fit=crop' },
        { id: crypto.randomUUID(), imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=400&h=400&auto=format&fit=crop' },
        { id: crypto.randomUUID(), imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=400&h=400&auto=format&fit=crop' },
        { id: crypto.randomUUID(), imageUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=400&h=400&auto=format&fit=crop' },
        { id: crypto.randomUUID(), imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=400&h=400&auto=format&fit=crop' },
    ]
};

export const INITIAL_NAVIGATION_DATA: NavigationData = {
  menuItems: MENU_ITEMS_DATA.map(item => ({ ...item, id: crypto.randomUUID() })),
  heroSlides: HERO_SLIDES_DATA.map(slide => ({ ...slide, id: crypto.randomUUID() })),
  popularCategories: [
    { id: crypto.randomUUID(), name: 'Salas', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/desktop_menu/menu-living-room-side-image.jpg', link: 'Sala' },
    { id: crypto.randomUUID(), name: 'Dormitorios', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/desktop_menu/menu-bedroom-side-image.jpg', link: 'Dormitorio' },
    { id: crypto.randomUUID(), name: 'Terrazas y Jardines', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/desktop_menu/menu-outdoors-side-image.jpg', link: 'Sala' },
    { id: crypto.randomUUID(), name: 'Oficinas en Casa', imageUrl: 'https://img.furniture1.eu/v7/_f1_/images/desktop_menu/menu-office-side-image.jpg', link: 'Oficina' },
  ],
  services: [
    { id: crypto.randomUUID(), title: 'Closets', description: 'Somos expertos en sacar el mejor provecho del espacio con diseños de closets a medida.', imageUrl: 'https://hom.com.do/wp-content/uploads/2025/02/closet-u.jpg', buttonText: 'Cotizar tu nuevo closet', quoteType: 'Closets' },
    { id: crypto.randomUUID(), title: 'Cocinas', description: 'Diseño y construcción de cocinas optimizadas para mejor uso y eficiencia.', imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop', buttonText: 'Cotizar tu nueva cocina', quoteType: 'Cocinas' },
    { id: crypto.randomUUID(), title: 'Muebles Personalizados', description: 'Diseño o solicitud de mobiliario con funciones especiales.', imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format&fit=crop', buttonText: 'Cotizar', quoteType: 'Muebles Personalizados' },
    { id: crypto.randomUUID(), title: 'Mobiliario Comercial', description: 'Construcción de tiendas, anaqueles, tramería, estantes, counters, etc...', imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop', buttonText: 'Cotizar', quoteType: 'Mobiliario Comercial' },
    { id: crypto.randomUUID(), title: 'Construcciones Especializadas', description: 'Desde el revestimiento de una pared hasta la construcción de una tiny house.', imageUrl: 'https://images.unsplash.com/photo-1512211756210-85090ea05c0b?q=80&w=800&auto=format&fit=crop', buttonText: 'Cotizar', quoteType: 'Construcciones Especializadas' },
  ],
  quoteConfig: {
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
    }
  },
  workProcessSection: {
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
  },
  magazineSection: {
    title: 'Magazine "Estilo Tropical"',
    subtitle: 'Ideas, tendencias y guías para hacer de tu hogar un paraíso.',
  },
  blogPosts: INITIAL_BLOG_POSTS,
  blogCategories: INITIAL_BLOG_CATEGORIES,
  blogTags: INITIAL_BLOG_TAGS,
  catalogues: INITIAL_CATALOGUES,
  logoUrl: "https://firebasestorage.googleapis.com/v0/b/drossmediapro.appspot.com/o/decora%20group%2FLogo%20Decora%20Group-01.png?alt=media&token=790f60ef-0216-4181-ac70-bf781394543a",
  footerLogoUrl: "https://firebasestorage.googleapis.com/v0/b/drossmediapro.appspot.com/o/decora%20group%2FLogo%20Decora%20Group-02.png?alt=media&token=26271fa9-9ba9-42c7-8804-fc47a85b5159",
  topBarLinks: [
    { id: 'about', text: 'Nosotros' },
    { id: 'faq', text: 'FAQ' },
    { id: 'legal', text: 'Aviso Legal y Términos y Condiciones' },
    { id: 'contact', text: 'Contacto' },
  ],
  topBarBenefits: [
    { id: crypto.randomUUID(), icon: 'Truck', text: 'Entrega gratis en Punta Cana' },
    { id: crypto.randomUUID(), icon: 'CreditCard', text: 'Pago a la entrega' },
    { id: crypto.randomUUID(), icon: 'ShieldCheck', text: '365 días - garantía' },
  ],
  exchangeRate: 58.50,
  contactPhoneNumber: "(849) 456-1963",
  contactPhoneLink: "https://wa.me/18494561963",
  // New CMS Data
  footerContent: INITIAL_FOOTER_CONTENT,
  aboutUsPage: INITIAL_ABOUT_US_CONTENT,
  faqContent: INITIAL_FAQ_CONTENT,
  legalContent: INITIAL_LEGAL_CONTENT,
  instagramShowcase: INITIAL_INSTAGRAM_SHOWCASE_DATA,
  contactPage: INITIAL_CONTACT_CONTENT,
};

export const PREDEFINED_LINKS = [
    { key: 'products', label: 'Ver todos los productos' },
    { key: 'projects', label: 'Ver todos los proyectos' },
    { key: 'quote', label: 'Ir a Cotizar a Medida' },
    { key: 'about', label: 'Ir a Sobre Nosotros' },
    { key: 'contact', label: 'Ir a Contacto' },
    { key: 'blog', label: 'Ir al Blog' },
];

export const INITIAL_PROJECTS: Project[] = [
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

export const rawProducts = [
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
    oldPrice: 420,
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
  },
  {
    id: 1752700000401,
    category: "Herrajes y Accesorios",
    name: "Tirador de Gabinete Moderno",
    description: "Tirador de metal cepillado para gabinetes de cocina y baño.",
    price: 15,
    rating: 5,
    reviews: 50,
    images: ["https://picsum.photos/id/1077/400/300"],
    hint: "tirador metal",
    deliveryTime: "Aproximadamente en 5 días laborales",
    materials: ["Metal"],
    colors: ["Gris"],
  },
  {
    id: 1752700000501,
    category: "Electrodomésticos",
    name: "Estufa de Gas 6 Quemadores",
    description: "Estufa de acero inoxidable con 6 quemadores y horno de gran capacidad.",
    price: 950,
    rating: 4.8,
    reviews: 45,
    images: ["https://picsum.photos/id/201/400/300"],
    hint: "estufa acero inoxidable",
    deliveryTime: "Aproximadamente en 7 días laborales",
    materials: ["Acero"],
    colors: ["Gris"],
  },
];

const NON_PRODUCT_CATEGORIES = ['blog', 'proyectos', 'cotizar'];
export const CATEGORIES = MENU_ITEMS_DATA
  .filter(item => !NON_PRODUCT_CATEGORIES.includes(item.key))
  .map(item => item.title)
  .sort();

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

export const COUNTRIES = [
  "República Dominicana", "Afganistán", "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda", "Arabia Saudita", "Argelia", "Argentina", "Armenia", "Australia", "Austria", "Azerbaiyán",
  "Bahamas", "Bangladés", "Barbados", "Baréin", "Bélgica", "Belice", "Benín", "Bielorrusia", "Birmania", "Bolivia", "Bosnia y Herzegovina", "Botsuana", "Brasil", "Brunéi", "Bulgaria", "Burkina Faso", "Burundi",
  "Bután", "Cabo Verde", "Camboya", "Camerún", "Canadá", "Catar", "Chad", "Chile", "China", "Chipre", "Ciudad del Vaticano", "Colombia", "Comoras", "Corea del Norte", "Corea del Sur", "Costa de Marfil",
  "Costa Rica", "Croacia", "Cuba", "Dinamarca", "Dominica", "Ecuador", "Egipto", "El Salvador", "Emiratos Árabes Unidos", "Eritrea", "Eslovaquia", "Eslovenia", "España", "Estados Unidos", "Estonia",
  "Etiopía", "Filipinas", "Finlandia", "Fiyi", "Francia", "Gabón", "Gambia", "Georgia", "Ghana", "Granada", "Grecia", "Guatemala", "Guyana", "Guinea", "Guinea ecuatorial", "Guinea-Bisáu", "Haití",
  "Honduras", "Hungría", "India", "Indonesia", "Irak", "Irán", "Irlanda", "Islandia", "Islas Marshall", "Islas Salomón", "Israel", "Italia", "Jamaica", "Japón", "Jordania", "Kazajistán", "Kenia",
  "Kirguistán", "Kiribati", "Kuwait", "Laos", "Lesoto", "Letonia", "Líbano", "Liberia", "Libia", "Liechtenstein", "Lituania", "Luxemburgo", "Madagascar", "Malasia", "Malaui", "Maldivas", "Malí",
  "Malta", "Marruecos", "Mauricio", "Mauritania", "México", "Micronesia", "Moldavia", "Mónaco", "Mongolia", "Montenegro", "Mozambique", "Namibia", "Nauru", "Nepal", "Nicaragua", "Níger", "Nigeria",
  "Noruega", "Nueva Zelanda", "Omán", "Países Bajos", "Pakistán", "Palaos", "Panamá", "Papúa Nueva Guinea", "Paraguay", "Perú", "Polonia", "Portugal", "Reino Unido", "República Centroafricana",
  "República Checa", "República de Macedonia", "República del Congo", "República Democrática del Congo", "Ruanda", "Rumanía", "Rusia", "Samoa", "San Cristóbal y Nieves", "San Marino", "San Vicente y las Granadinas",
  "Santa Lucía", "Santo Tomé y Príncipe", "Senegal", "Serbia", "Seychelles", "Sierra Leona", "Singapur", "Siria", "Somalia", "Sri Lanka", "Suazilandia", "Sudáfrica", "Sudán", "Sudán del Sur", "Suecia",
  "Suiza", "Surinam", "Tailandia", "Tanzania", "Tayikistán", "Timor Oriental", "Togo", "Tonga", "Trinidad y Tobago", "Túnez", "Turkmenistán", "Turquía", "Tuvalu", "Ucrania", "Uganda", "Uruguay",
  "Uzbekistán", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Yibuti", "Zambia", "Zimbabue"
];

export const PROVINCES = Object.keys({
    "Santo Domingo": ["Santo Domingo Este", "Boca Chica", "Los Alcarrizos", "Pedro Brand", "San Antonio de Guerra", "Santo Domingo Norte", "Santo Domingo Oeste"],
    "Distrito Nacional": ["Distrito Nacional"],
    "La Altagracia": ["Salvaleón de Higüey", "San Rafael del Yuma", "Punta Cana"],
    "Azua": ["Azua de Compostela", "Estebanía", "Guayabal", "Las Charcas", "Las Yayas de Viajama", "Padre Las Casas", "Peralta", "Pueblo Viejo", "Sabana Yegua", "Tábara Arriba"],
    "Bahoruco": ["Neiba", "Galván", "Los Ríos", "Tamayo", "Villa Jaragua"],
    "Barahona": ["Santa Cruz de Barahona", "Cabral", "El Peñón", "Enriquillo", "Fundación", "Jaquimeyes", "La Ciénaga", "Las Salinas", "Paraíso", "Polo", "Vicente Noble"],
    "Dajabón": ["Dajabón", "El Pino", "Loma de Cabrera", "Partido", "Restauración"],
    "Duarte": ["San Francisco de Macorís", "Arenoso", "Castillo", "Eugenio María de Hostos", "Las Guáranas", "Pimentel", "Villa Riva"],
    "El Seibo": ["Santa Cruz de El Seibo", "Miches"],
    "Elías Piña": ["Comendador", "Bánica", "El Llano", "Hondo Valle", "Juan Santiago", "Pedro Santana"],
    "Espaillat": ["Moca", "Cayetano Germosén", "Gaspar Hernández", "Jamao al Norte"],
    "Hato Mayor": ["Hato Mayor del Rey", "El Valle", "Sabana de la Mar"],
    "Independencia": ["Jimaní", "Cristóbal", "Duvergé", "La Descubierta", "Mella", "Postrer Río"],
    "La Romana": ["La Romana", "Guaymate", "Villa Hermosa"],
    "La Vega": ["Concepción de La Vega", "Constanza", "Jarabacoa", "Jima Abajo"],
    "María Trinidad Sánchez": ["Nagua", "Cabrera", "El Factor", "Río San Juan"],
    "Monseñor Nouel": ["Bonao", "Maimón", "Piedra Blanca"],
    "Montecristi": ["San Fernando de Monte Cristi", "Castañuelas", "Guayubín", "Las Matas de Santa Cruz", "Pepillo Salcedo", "Villa Vásquez"],
    "Monte Plata": ["Monte Plata", "Bayaguana", "Peralvillo", "Sabana Grande de Boyá", "Yamasá"],
    "Pedernales": ["Pedernales", "Oviedo"],
    "Peravia": ["Baní", "Matanzas", "Nizao"],
    "Puerto Plata": ["San Felipe de Puerto Plata", "Altamira", "Guananico", "Imbert", "Los Hidalgos", "Luperón", "Sosúa", "Villa Isabela", "Villa Montellano"],
    "Hermanas Mirabal": ["Salcedo", "Tenares", "Villa Tapia"],
    "Samaná": ["Santa Bárbara de Samaná", "Las Terrenas", "Sánchez"],
    "San Cristóbal": ["San Cristóbal", "Bajos de Haina", "Cambita Garabitos", "Los Cacaos", "Sabana Grande de Palenque", "San Gregorio de Nigua", "Villa Altagracia", "Yaguate"],
    "San Juan": ["San Juan de la Maguana", "Bohechío", "El Cercado", "Juan de Herrera", "Las Matas de Farfán", "Vallejuelo"],
    "San Pedro de Macorís": ["San Pedro de Macorís", "Consuelo", "Guayacanes", "Quisqueya", "Ramón Santana", "San José de los Llanos"],
    "Sánchez Ramírez": ["Cotuí", "Cevicos", "Fantino", "La Mata"],
    "Santiago": ["Santiago de los Caballeros", "Bisonó", "Jánico", "Licey al Medio", "Puñal", "Sabana Iglesia", "San José de las Matas", "Tamboril", "Villa González"],
    "Santiago Rodríguez": ["San Ignacio de Sabaneta", "Los Almácigos", "Monción"],
    "Valverde": ["Mao", "Esperanza", "Laguna Salada"]
});

export const ALL_FINISHES = ['Brillo', 'Mate', 'Corrugado', 'Texturizado', 'Supermate'];


export const STORES = [
    "Muebles Omar", "La Curacao", "Tiendas Corripio", "Plaza Lama"
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