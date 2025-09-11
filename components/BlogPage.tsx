
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BlogPost, BlogCategory } from '../types';

interface BlogPageProps {
  blogPosts: BlogPost[];
  blogCategories: BlogCategory[];
  onViewPost: (post: BlogPost) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ blogPosts, blogCategories, onViewPost }) => {
  const getCategoryName = (categoryId: string) => {
    return blogCategories.find(c => c.id === categoryId)?.name || 'Sin Categoría';
  };
  
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Nuestro Blog</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Inspiración, tendencias y consejos de expertos para tus proyectos de diseño y mobiliario.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {sortedPosts.map((post) => (
            <article key={post.id} className="group flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="flex-shrink-0">
                <img className="h-56 w-full object-cover" src={post.imageUrl} alt={post.title} />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#5a1e38]">
                    {getCategoryName(post.categoryId)}
                  </p>
                  <button onClick={() => onViewPost(post)} className="mt-2 block text-left focus:outline-none">
                    <p className="text-xl font-semibold text-gray-900 group-hover:text-[#4d182e]">{post.title}</p>
                    <p className="mt-3 text-base text-gray-500 line-clamp-3">{post.description}</p>
                  </button>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm text-gray-500">
                      <p className="font-medium text-gray-900">{post.author}</p>
                      <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
                    </div>
                  </div>
                  <button onClick={() => onViewPost(post)} className="text-sm font-semibold text-[#5a1e38] hover:text-[#4d182e] flex items-center focus:outline-none">
                    Leer más <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
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
