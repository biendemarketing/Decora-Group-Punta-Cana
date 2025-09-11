import React, { useMemo, useState } from 'react';
import { NavigationData, Product, Project } from '../types';
import { Search, Copy } from 'lucide-react';

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

    const allImages = useMemo(() => {
        const images = new Map<string, MediaItem>();

        const addImage = (url: string, source: string, name: string) => {
            if (url && !images.has(url)) {
                images.set(url, { url, source, name });
            }
        };

        // Logos
        addImage(navigationData.logoUrl, 'Configuración del Sitio', 'Logo Principal');
        addImage(navigationData.footerLogoUrl, 'Configuración del Sitio', 'Logo del Pie de Página');
        
        // Hero Slides
        navigationData.heroSlides.forEach(slide => addImage(slide.imageUrl, 'Slider Principal', slide.title));
        
        // Popular Categories
        navigationData.popularCategories.forEach(cat => addImage(cat.imageUrl, 'Categorías Populares', cat.name));
        
        // Menu Items
        navigationData.menuItems.forEach(item => {
            if(item.featuredImageUrl) addImage(item.featuredImageUrl, 'Menú', `Destacada: ${item.title}`);
            item.subCategories.forEach(sub => addImage(sub.imageUrl, 'Menú', `Subcategoría: ${sub.name}`));
        });
        
        // Products
        productsData.forEach(product => {
            product.images.forEach((img, i) => addImage(img, 'Productos', `${product.name} - Imagen ${i+1}`));
        });
        
        // Projects
        projectsData.forEach(project => {
            addImage(project.imageUrl, 'Proyectos', `${project.title} - Principal`);
            project.galleryImages.forEach((img, i) => addImage(img, 'Proyectos', `${project.title} - Galería ${i+1}`));
        });

        return Array.from(images.values());
    }, [navigationData, productsData, projectsData]);

    const filteredImages = useMemo(() => {
        if (!searchTerm) return allImages;
        const lowerCaseSearch = searchTerm.toLowerCase();
        return allImages.filter(item => 
            item.name.toLowerCase().includes(lowerCaseSearch) ||
            item.source.toLowerCase().includes(lowerCaseSearch)
        );
    }, [allImages, searchTerm]);
    
    const handleCopy = (url: string) => {
        navigator.clipboard.writeText(url).then(() => {
            setCopiedUrl(url);
            setTimeout(() => setCopiedUrl(null), 2000);
        });
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Archivos y Multimedia</h2>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    placeholder={`Buscar en ${allImages.length} imágenes...`}
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
