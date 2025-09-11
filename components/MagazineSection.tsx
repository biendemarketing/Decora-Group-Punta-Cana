import React from 'react';
import { MagazineSection as MagazineSectionType, BlogPost, BlogCategory } from '../types';

interface MagazineSectionProps {
  magazineSection: MagazineSectionType;
  blogPosts: BlogPost[];
  blogCategories: BlogCategory[];
}

const MagazineSection: React.FC<MagazineSectionProps> = ({ magazineSection, blogPosts, blogCategories }) => {
  const { title, subtitle } = magazineSection;
  
  const getCategoryName = (categoryId: string) => {
    return blogCategories.find(c => c.id === categoryId)?.name || 'Sin Categoría';
  };

  // Sort posts by date descending and take the first 3
  const latestPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900">{title}</h2>
        <p className="mt-4 max-w-2xl mx-auto text-center text-lg text-gray-600">
          {subtitle}
        </p>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <div key={post.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden group">
              <div className="flex-shrink-0">
                <img className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300" src={post.imageUrl} alt={post.title} />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#5a1e38]">{getCategoryName(post.categoryId)}</p>
                  <a href="#" className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900 group-hover:text-[#4d182e] transition-colors">{post.title}</p>
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