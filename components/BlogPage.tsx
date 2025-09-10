
import React from 'react';
import { ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    category: 'Diseño de Interiores',
    title: '5 Tendencias de Diseño que Transformarán tu Hogar en 2024',
    description: 'Descubre las paletas de colores, materiales y estilos que dominarán el mundo del interiorismo este año. Desde el bio-minimalismo hasta el maximalismo nostálgico, te inspiramos para renovar tu espacio.',
    imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=800&auto=format&fit=crop',
    author: 'Ana Martínez',
    date: '15 Jul, 2024',
  },
  {
    category: 'Guía de Muebles',
    title: 'Cómo Elegir la Madera Perfecta para tus Muebles a Medida',
    description: 'Roble, nogal, pino... cada madera tiene su carácter y propiedades. Te guiamos a través de las opciones más populares para que tomes una decisión informada y duradera para tu próximo proyecto.',
    imageUrl: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?q=80&w=800&auto=format&fit=crop',
    author: 'Carlos Rodríguez',
    date: '02 Jul, 2024',
  },
  {
    category: 'Espacios Comerciales',
    title: 'La Psicología del Color en el Diseño de Oficinas Productivas',
    description: 'El color de un espacio de trabajo puede impactar directamente en la moral y productividad del equipo. Analizamos cómo diferentes tonalidades pueden fomentar la creatividad, la concentración y la colaboración.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
    author: 'María González',
    date: '28 Jun, 2024',
  },
   {
    category: 'Sostenibilidad',
    title: 'Muebles Ecológicos: Un Compromiso con el Planeta y tu Hogar',
    description: 'El diseño sostenible no es solo una tendencia, es una necesidad. Exploramos materiales reciclados, maderas certificadas y procesos de fabricación que minimizan el impacto ambiental sin sacrificar estilo.',
    imageUrl: 'https://images.unsplash.com/photo-1542349332-941e73998982?q=80&w=800&auto=format&fit=crop',
    author: 'Juan Pérez',
    date: '10 Jun, 2024',
  },
  {
    category: 'Optimización de Espacios',
    title: 'Soluciones Inteligentes para Cocinas Pequeñas en Apartamentos',
    description: '¿Poco espacio? ¡No hay problema! Te mostramos cómo maximizar cada centímetro de tu cocina con soluciones de almacenamiento vertical, muebles multifuncionales y una distribución inteligente.',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=800&auto=format&fit=crop',
    author: 'Ana Martínez',
    date: '25 Mayo, 2024',
  },
  {
    category: 'Proyectos Destacados',
    title: 'Antes y Después: La Transformación de una Villa en Punta Cana',
    description: 'Un recorrido visual por uno de nuestros proyectos más ambiciosos. Te mostramos el proceso desde la conceptualización hasta la entrega final de un diseño de interiores que fusiona el lujo tropical con la modernidad.',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop',
    author: 'Decora Group',
    date: '12 Mayo, 2024',
  },
];

const BlogPage: React.FC = () => {
  return (
    <main className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Nuestro Blog</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Inspiración, tendencias y consejos de expertos para tus proyectos de diseño y mobiliario.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogPosts.map((post) => (
            <article key={post.title} className="group flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="flex-shrink-0">
                <img className="h-56 w-full object-cover" src={post.imageUrl} alt={post.title} />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#5a1e38]">
                    {post.category}
                  </p>
                  <a href="#" className="mt-2 block">
                    <p className="text-xl font-semibold text-gray-900 group-hover:text-[#4d182e]">{post.title}</p>
                    <p className="mt-3 text-base text-gray-500 line-clamp-3">{post.description}</p>
                  </a>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm text-gray-500">
                      <p className="font-medium text-gray-900">{post.author}</p>
                      <time dateTime={post.date}>{post.date}</time>
                    </div>
                  </div>
                  <a href="#" className="text-sm font-semibold text-[#5a1e38] hover:text-[#4d182e] flex items-center">
                    Leer más <ArrowRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
