import React from 'react';
import { BadgeCheck, Instagram } from 'lucide-react';
import { InstagramShowcaseData } from '../types';

interface InstagramShowcaseProps {
  showcaseData: InstagramShowcaseData;
}

const InstagramShowcase: React.FC<InstagramShowcaseProps> = ({ showcaseData }) => {
  const { 
    username, 
    isVerified, 
    profilePictureUrl, 
    postsCount, 
    followersCount, 
    followingCount, 
    profileName, 
    bio, 
    galleryImages 
  } = showcaseData;

  const instagramProfileUrl = `https://www.instagram.com/${username}`;

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 lg:p-12 rounded-lg shadow-xl border overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Profile Info */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-6 w-full">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex-shrink-0 border-4 border-gray-100 flex items-center justify-center bg-white p-1">
                  <img
                    alt={`${profileName} Logo`}
                    src={profilePictureUrl}
                    className="object-contain p-2 rounded-full"
                  />
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">{username}</h3>
                    {isVerified && <BadgeCheck className="w-6 h-6 text-white fill-blue-500" />}
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-6 text-sm text-gray-500 mb-4">
                    <div><span className="font-bold text-gray-800">{postsCount}</span> publicaciones</div>
                    <div><span className="font-bold text-gray-800">{followersCount}</span> seguidores</div>
                    <div><span className="font-bold text-gray-800">{followingCount}</span> seguidos</div>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <a href={instagramProfileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 h-9 rounded-md px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm">
                      Seguir
                    </a>
                    <a href={instagramProfileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 h-9 rounded-md px-4 font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm">
                      Enviar Mensaje
                    </a>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold text-lg">{profileName}</h4>
              <p className="text-gray-500 mt-1 max-w-md whitespace-pre-line">{bio}</p>
            </div>

            {/* Right Column: Image Grid */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-3 gap-4">
                {galleryImages.slice(0, 6).map((image) => (
                  <a key={image.id} href={instagramProfileUrl} target="_blank" rel="noopener noreferrer" className="block group">
                    <div className="aspect-square relative overflow-hidden rounded-xl">
                      <img
                        alt="Instagram post"
                        src={image.imageUrl}
                        className="object-cover transition-transform duration-300 group-hover:scale-110 w-full h-full"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Instagram className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramShowcase;