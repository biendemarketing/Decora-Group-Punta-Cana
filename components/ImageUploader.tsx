import React, { useState, useEffect } from 'react';
import { Upload, Link } from 'lucide-react';

interface ImageUploaderProps {
  imageUrl: string;
  onImageChange: (url: string) => void;
  isCompact?: boolean;
  bgClass?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ imageUrl, onImageChange, isCompact = false, bgClass = 'bg-gray-200' }) => {
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'url'>('upload');
  const safeImageUrl = imageUrl || ''; // Guard against undefined
  const [urlInput, setUrlInput] = useState(safeImageUrl.startsWith('data:') ? '' : safeImageUrl);

  // Effect to sync local state if prop changes from parent
  useEffect(() => {
    const newSafeUrl = imageUrl || '';
    if (newSafeUrl !== urlInput && !newSafeUrl.startsWith('data:')) {
      setUrlInput(newSafeUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  const handleFileChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onImageChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlBlur = () => {
    if (urlInput !== imageUrl) {
      onImageChange(urlInput);
    }
  };

  const TabButton: React.FC<{ method: 'upload' | 'url', children: React.ReactNode }> = ({ method, children }) => (
    <button
      type="button"
      onClick={() => setUploadMethod(method)}
      className={`px-3 py-1 text-xs rounded-t-md ${uploadMethod === method ? 'bg-white border-b-0 font-semibold' : 'bg-gray-100 text-gray-500'}`}
    >
      {children}
    </button>
  );

  return (
    <div className="border rounded-md">
      <div className={`flex items-center gap-4 p-2 ${bgClass}`}>
        <img src={safeImageUrl} alt="Preview" className={`rounded border object-contain ${isCompact ? 'h-10 w-10' : 'h-16 w-auto'}`} />
        <div className="flex-grow">
          <div className="flex border-b -mb-px">
            <TabButton method="upload"><Upload className="h-3 w-3 inline mr-1" /> Subir</TabButton>
            <TabButton method="url"><Link className="h-3 w-3 inline mr-1" /> URL</TabButton>
          </div>
          <div className="bg-white p-2 rounded-b-md border-x border-b">
            {uploadMethod === 'upload' ? (
              <label className="cursor-pointer flex items-center justify-center gap-2 w-full rounded-md text-sm text-gray-600 hover:bg-gray-50">
                <span className="text-xs">Seleccionar archivo...</span>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files && handleFileChange(e.target.files[0])} />
              </label>
            ) : (
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onBlur={handleUrlBlur}
                placeholder="https://ejemplo.com/imagen.jpg"
                className="w-full border-gray-300 rounded-md shadow-sm text-xs p-1 bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
