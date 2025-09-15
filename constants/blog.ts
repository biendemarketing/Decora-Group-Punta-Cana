import type { BlogCategory, BlogTag, BlogPost, MagazineSection } from '../types';

export const INITIAL_BLOG_CATEGORIES: BlogCategory[] = [
  { id: 'cat1', name: 'Inspiración' },
  { id: 'cat2', name: 'Tendencias' },
  { id: 'cat3', name: 'Guías' },
];

export const INITIAL_BLOG_TAGS: BlogTag[] = [
  { id: 'tag1', name: 'Terrazas' },
  { id: 'tag2', name: 'Caribe' },
  { id: 'tag3', name: 'Colores' },
  { id: 'tag4', name: 'Sofás' },
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
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

export const INITIAL_MAGAZINE_SECTION: MagazineSection = {
    title: 'Magazine "Estilo Tropical"',
    subtitle: 'Ideas, tendencias y guías para hacer de tu hogar un paraíso.',
};
