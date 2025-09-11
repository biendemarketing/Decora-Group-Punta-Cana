import React, { useMemo, useState, useCallback } from 'react';
import { NavigationData, Product, Project } from '../types';
import { Search, Copy, UploadCloud } from 'lucide-react';

interface MediaLibraryProps {
  navigationData: NavigationData;
  projectsData: Project[];
  productsData: Product[];
}

interface MediaItem {
    url: string;
    source: string;
    name: string;
}

const MediaLibrary: React.FC<MediaLibraryProps> = ({ navigationData, projectsData, productsData }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
    const [uploadedImages, setUploadedImages] = useState<MediaItem[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const siteImages = useMemo(() => {
        const images = new Map<string, MediaItem>();
        const addImage = (url: string, source: string, name: string) => {
            if (url && !images.has(url)) images.set(url, { url, source, name });
        };
        addImage(navigationData.logoUrl, 'Configuración del Sitio', 'Logo Principal');
        addImage(navigationData.footerLogoUrl, 'Configuración del Sitio', 'Logo del Pie de Página');
        navigationData.heroSlides.forEach(slide => addImage(slide.imageUrl, 'Slider Principal', slide.title));
        navigationData.popularCategories.forEach(cat => addImage(cat.imageUrl, 'Categorías Populares', cat.name));
        navigationData.menuItems.forEach(item => {
            if(item.featuredImageUrl) addImage(item.featuredImageUrl, 'Menú', `Destacada: ${item.title}`);
            item.subCategories.forEach(sub => addImage(sub.imageUrl, 'Menú', `Subcategoría: ${sub.name}`));
        });
        productsData.forEach(product => product.images.forEach((img, i) => addImage(img, 'Productos', `${product.name} - Imagen ${i+1}`)));
        projectsData.forEach(project => {
            addImage(project.imageUrl, 'Proyectos', `${project.title} - Principal`);
            project.galleryImages.forEach((img, i) => addImage(img, 'Proyectos', `${project.title} - Galería ${i+1}`));
        });
        return Array.from(images.values());
    }, [navigationData, productsData, projectsData]);

    const allMediaItems = useMemo(() => [...uploadedImages, ...siteImages], [uploadedImages, siteImages]);

    const filteredImages = useMemo(() => {
        if (!searchTerm) return allMediaItems;
        const lowerCaseSearch = searchTerm.toLowerCase();
        return allMediaItems.filter(item => 
            item.name.toLowerCase().includes(lowerCaseSearch) ||
            item.source.toLowerCase().includes(lowerCaseSearch)
        );
    }, [allMediaItems, searchTerm]);
    
    const handleCopy = (url: string) => {
        navigator.clipboard.writeText(url).then(() => {
            setCopiedUrl(url);
            setTimeout(() => setCopiedUrl(null), 2000);
        });
    };

    const handleFiles = useCallback((files: FileList | null) => {
        if (!files) return;
        Array.from(files).forEach(file => {
            if (!file.type.startsWith('image/')) return;
            const reader = new FileReader();
            reader.onloadend = () => {
                const newImage: MediaItem = { url: reader.result as string, source: 'Subido Localmente', name: file.name };
                setUploadedImages(prev => [newImage, ...prev]);
            };
            reader.readAsDataURL(file);
        });
    }, []);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); e.stopPropagation(); setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };
    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => { handleFiles(e.target.files); };


    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Archivos y Multimedia</h2>
            
            <div 
                onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
                className={`p-6 border-2 border-dashed rounded-lg text-center transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}
            >
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400"/>
                <p className="mt-2 text-sm text-gray-600">
                    Arrastra y suelta tus archivos aquí, o{' '}
                    <label htmlFor="file-upload" className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                        búscalos en tu dispositivo
                    </label>
                </p>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileInput} accept="image/*" />
                <p className="text-xs text-gray-500 mt-1">Solo se aceptan imágenes</p>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    placeholder={`Buscar en ${allMediaItems.length} imágenes...`}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full p-2 pl-10 border rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5a1e38]"
                />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredImages.map(item => (
                    <div key={item.url} className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden border">
                        <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 text-white">
                            <p className="text-xs font-bold line-clamp-2">{item.name}</p>
                            <p className="text-xs text-gray-300">{item.source}</p>
                            <button onClick={() => handleCopy(item.url)} className="absolute top-2 right-2 p-1.5 bg-white/20 rounded-full hover:bg-white/40">
                                <Copy className="h-4 w-4" />
                            </button>
                            {copiedUrl === item.url && <span className="absolute bottom-2 right-2 text-xs bg-green-500 px-1.5 py-0.5 rounded">¡Copiado!</span>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MediaLibrary;
