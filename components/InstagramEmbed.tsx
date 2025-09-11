import React from 'react';
import { CheckCircle, Instagram } from 'lucide-react';

interface InstagramEmbedProps {
  images: string[];
}

const InstagramEmbed: React.FC<InstagramEmbedProps> = ({ images }) => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-start gap-8">
          
          {/* Profile Info Block (now includes follow button) */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200 p-1">
               <img 
                  src="https://decoragrouppuntacana.com/icon.png" 
                  alt="Decora Group Instagram Profile"
                  className="w-full h-full object-cover rounded-full"
                />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-semibold text-gray-800">decoragroup.pc</h2>
                <CheckCircle className="h-5 w-5 text-blue-500" />
              </div>
              <a 
                href="https://www.instagram.com/decoragroup.pc"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center px-4 py-1.5 bg-blue-500 text-white font-bold text-xs rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Instagram className="h-4 w-4 mr-1.5" />
                Seguir
              </a>
            </div>
          </div>

          {/* Image Row */}
          <div className="flex-grow w-full md:w-auto overflow-hidden">
             <div className="flex items-center space-x-2 -m-2 p-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                 {images.slice(0, 6).map((src, index) => (
                    <div key={index} className="snap-start flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32">
                      <img src={src} alt={`Publicación de Instagram ${index + 1} de Decora Group`} className="w-full h-full object-cover rounded-md" />
                    </div>
                  ))}
            </div>
          </div>

        </div>
      </div>
       <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    `}</style>
    </div>
  );
};

export default InstagramEmbed;