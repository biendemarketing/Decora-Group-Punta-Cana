
import React from 'react';
import { BlogPost } from '../types';
import { ChevronRight, ArrowLeft } from 'lucide-react';

interface BlogPostDetailPageProps {
  post: BlogPost;
  onBackToBlog: () => void;
  onGoHome: () => void;
}

const BlogPostDetailPage: React.FC<BlogPostDetailPageProps> = ({ post, onBackToBlog, onGoHome }) => {
  return (
    <main className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <nav className="flex items-center text-sm text-gray-500 mb-8">
          <button onClick={onGoHome} className="hover:text-gray-700">Inicio</button>
          <ChevronRight className="h-4 w-4 mx-1 flex-shrink-0" />
          <button onClick={onBackToBlog} className="hover:text-gray-700">Blog</button>
          <ChevronRight className="h-4 w-4 mx-1 flex-shrink-0" />
          <span className="font-medium text-gray-600 truncate">{post.title}</span>
        </nav>

        <article>
          <header className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{post.title}</h1>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <span>Por {post.author}</span>
              <span className="mx-2">&middot;</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </div>
          </header>

          <figure className="mb-8">
            <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover rounded-lg shadow-lg" />
          </figure>

          <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line">
            {post.description}
          </div>
        </article>
        
        <div className="mt-12 text-center">
             <button onClick={onBackToBlog} className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Volver al Blog
            </button>
        </div>
      </div>
    </main>
  );
};

export default BlogPostDetailPage;
