import React from 'react';
import { CheckCircle, Instagram } from 'lucide-react';

interface InstagramEmbedProps {
  images: string[];
  username: string;
  profilePictureUrl: string;
}

const InstagramEmbed: React.FC<InstagramEmbedProps> = ({ images, username, profilePictureUrl }) => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Profile Info */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200 p-1">
               <img 
                  src={profilePictureUrl} 
                  alt={`${username} Instagram Profile`}
                  className="w-full h-full object-cover rounded-full"
                />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-semibold text-gray-800">{username}</h2>
                <CheckCircle className="h-5 w-5 text-blue-500" />
              </div>
              <a 
                href={`https://www.instagram.com/${username}`}
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
             <div className="flex items-center justify-center md:justify-end space-x-4">
                 {images.slice(0, 5).map((src, index) => (
                    <a key={index} href={`https://www.instagram.com/${username}`} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 h-24 sm:h-32 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
                      <img src={src} alt={`Publicación de Instagram ${index + 1} de ${username}`} className="h-full w-auto object-cover" />
                    </a>
                  ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InstagramEmbed;