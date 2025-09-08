import React from 'react';

const articles = [
  {
    title: "5 Ideas para tu Terraza en el Caribe",
    imageUrl: "https://picsum.photos/id/1011/600/400",
    category: "Inspiración",
  },
  {
    title: "Colores que son Tendencia este Año",
    imageUrl: "https://picsum.photos/id/1015/600/400",
    category: "Tendencias",
  },
  {
    title: "Cómo elegir el sofá perfecto para tu espacio",
    imageUrl: "https://picsum.photos/id/1025/600/400",
    category: "Guías",
  },
];

const MagazineSection: React.FC = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900">Magazine "Estilo Tropical"</h2>
        <p className="mt-4 max-w-2xl mx-auto text-center text-lg text-gray-600">
          Ideas, tendencias y guías para hacer de tu hogar un paraíso.
        </p>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {articles.map((article) => (
            <div key={article.title} className="flex flex-col rounded-lg shadow-lg overflow-hidden group">
              <div className="flex-shrink-0">
                <img className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300" src={article.imageUrl} alt={article.title} />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#5a1e38]">{article.category}</p>
                  <a href="#" className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900 group-hover:text-[#4d182e] transition-colors">{article.title}</p>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MagazineSection;