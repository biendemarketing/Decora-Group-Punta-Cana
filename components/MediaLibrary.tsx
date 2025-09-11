import React, { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { NavigationData, Product, Project, MediaItem, FileType } from '../types';
import { Search, Copy, UploadCloud, Link2 as LinkIcon, Trash2, Replace, FileText, FileVideo, Music, FileQuestion, Image as ImageIcon } from 'lucide-react';

interface MediaLibraryProps {
  navigationData: NavigationData;
  projectsData: Project[];
  productsData: Product[];
}

const getFileType = (url: string, name?: string): FileType => {
    if (!url) return 'other';

    // 1. Check for data URLs first
    if (url.startsWith('data:image')) return 'image';
    if (url.startsWith('data:video')) return 'video';
    if (url.startsWith('data:audio')) return 'audio';

    // 2. Heuristics for known image services that hide extensions.
    if (url.includes('images.unsplash.com') || url.includes('picsum.photos') || url.includes('i.pravatar.cc')) {
        return 'image';
    }
    
    // 3. More robust extension checking on the decoded URL path
    const path = decodeURIComponent(url.split('?')[0].toLowerCase());
    
    // Check if the path part ends with a known image extension.
    if (/\.(jpg|jpeg|png|gif|webp|svg|bmp)$/.test(path)) return 'image';
    if (/\.(mp4|webm|mov|avi|mkv)$/.test(path)) return 'video';
    if (/\.(mp3|wav|ogg|aac)$/.test(path)) return 'audio';
    if (/\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt)$/.test(path)) return 'document';

    // 4. A less strict check for image extensions anywhere in the path.
    // This helps with URLs where the extension isn't at the very end of the path segment.
    if (/\.(jpg|jpeg|png|gif|webp|svg|bmp)/.test(path)) {
        return 'image';
    }
    
    // 5. Fallback using the provided name
    if (name) {
        const nameLower = name.toLowerCase();
        if (/\.(jpg|jpeg|png|gif|webp|svg|bmp)$/.test(nameLower)) return 'image';
    }
    
    // 6. Default to other if no match
    return 'other';
};


const fileTypeIcons: Record<FileType, React.ElementType> = {
    image: ImageIcon,
    video: FileVideo,
    audio: Music,
    document: FileText,
    other: FileQuestion,
};

const MediaLibrary: React.FC<MediaLibraryProps> = ({ navigationData, projectsData, productsData }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
    const [uploadedItems, setUploadedItems] = useState<MediaItem[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [urlInput, setUrlInput] = useState('');
    const [activeFilter, setActiveFilter] = useState<FileType | 'all'>('all');
    const replaceFileRef = useRef<HTMLInputElement>(null);
    const itemToReplaceRef = useRef<string | null>(null);

    useEffect(() => {
        const storedUploads = localStorage.getItem('uploadedMedia');
        if(storedUploads) {
            setUploadedItems(JSON.parse(storedUploads));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('uploadedMedia', JSON.stringify(uploadedItems));
    }, [uploadedItems]);

    const siteMedia = useMemo(() => {
        const items = new Map<string, MediaItem>();
        const add = (url: string, origen: string, nombre: string) => {
            if (url && !items.has(url)) {
                items.set(url, { id: crypto.randomUUID(), url, origen, nombre, tipo: getFileType(url, nombre) });
            }
        };
        add(navigationData.logoUrl, 'Configuración', 'Logo Principal');
        add(navigationData.footerLogoUrl, 'Configuración', 'Logo Pie de Página');
        navigationData.heroSlides.forEach(s => add(s.imageUrl, 'Slider Principal', s.title));
        navigationData.popularCategories.forEach(c => add(c.imageUrl, 'Categorías Populares', c.name));
        navigationData.menuItems.forEach(i => {
            if(i.featuredImageUrl) add(i.featuredImageUrl, 'Menú', `Destacada: ${i.title}`);
            i.subCategories.forEach(s => add(s.imageUrl, 'Menú', `Subcategoría: ${s.name}`));
        });
        productsData.forEach(p => p.images.forEach((img, i) => add(img, 'Productos', `${p.name} #${i+1}`)));
        projectsData.forEach(p => {
            add(p.imageUrl, 'Proyectos', `${p.title} (Principal)`);
            p.galleryImages.forEach((img, i) => add(img, 'Proyectos', `${p.title} (Galería #${i+1})`));
        });
        return Array.from(items.values());
    }, [navigationData, productsData, projectsData]);

    const allMediaItems = useMemo(() => [...uploadedItems, ...siteMedia], [uploadedItems, siteMedia]);

    const filteredMedia = useMemo(() => {
        return allMediaItems.filter(item => {
            const matchesFilter = activeFilter === 'all' || item.tipo === activeFilter;
            const matchesSearch = searchTerm === '' || item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || item.origen.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [allMediaItems, searchTerm, activeFilter]);
    
    const handleFiles = useCallback((files: FileList | File[]) => {
        const newItems: MediaItem[] = [];
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                newItems.push({
                    id: crypto.randomUUID(),
                    url: reader.result as string,
                    nombre: file.name,
                    origen: 'Subido Localmente',
                    tipo: getFileType(reader.result as string, file.name),
                });
                if (newItems.length === files.length) {
                    setUploadedItems(prev => [...newItems, ...prev]);
                }
            };
            reader.readAsDataURL(file);
        });
    }, []);

    const handlePaste = useCallback((event: ClipboardEvent) => {
        handleFiles(Array.from(event.clipboardData?.files || []));
    }, [handleFiles]);

    useEffect(() => {
        window.addEventListener('paste', handlePaste);
        return () => window.removeEventListener('paste', handlePaste);
    }, [handlePaste]);

    const handleUrlUpload = () => {
        if (!urlInput || !urlInput.startsWith('http')) return alert("Por favor, introduce una URL válida.");
        const newItem: MediaItem = {
            id: crypto.randomUUID(),
            url: urlInput,
            nombre: urlInput.split('/').pop() || 'Archivo de URL',
            origen: 'Subido Localmente',
            tipo: getFileType(urlInput),
        };
        setUploadedItems(prev => [newItem, ...prev]);
        setUrlInput('');
    };

    const handleDelete = (id: string) => {
        if (window.confirm("¿Seguro que quieres eliminar este archivo?")) {
            setUploadedItems(prev => prev.filter(item => item.id !== id));
        }
    };
    
    const handleReplaceClick = (id: string) => {
        itemToReplaceRef.current = id;
        replaceFileRef.current?.click();
    };

    const handleReplaceFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && itemToReplaceRef.current) {
            const idToUpdate = itemToReplaceRef.current;
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedItems(prev => prev.map(item => item.id === idToUpdate ? { ...item, url: reader.result as string, nombre: file.name, tipo: getFileType(reader.result as string, file.name) } : item));
                itemToReplaceRef.current = null;
            };
            reader.readAsDataURL(file);
        }
        if(replaceFileRef.current) replaceFileRef.current.value = ""; // Reset input
    };

    return (
        <div className="space-y-6" onDragOver={e => {e.preventDefault(); e.stopPropagation(); setIsDragging(true);}} onDragLeave={() => setIsDragging(false)} onDrop={e => {e.preventDefault(); e.stopPropagation(); setIsDragging(false); handleFiles(e.dataTransfer.files)}}>
            <h2 className="text-2xl font-bold text-gray-800">Archivos y Multimedia</h2>
            
            <div className={`p-4 border-2 border-dashed rounded-lg text-center transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}>
                <UploadCloud className="mx-auto h-10 w-10 text-gray-400"/>
                <p className="mt-2 text-sm text-gray-600">
                    Arrastra y suelta archivos, pega una imagen, o{' '}
                    <label htmlFor="file-upload" className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">búsca en tu dispositivo</label>
                </p>
                <input id="file-upload" type="file" className="sr-only" multiple onChange={e => handleFiles(e.target.files!)} />
                <div className="flex items-center gap-2 mt-4 max-w-sm mx-auto">
                    <LinkIcon className="h-4 w-4 text-gray-500"/>
                    <input type="text" value={urlInput} onChange={e => setUrlInput(e.target.value)} placeholder="... o pega una URL aquí" className="flex-grow p-1.5 border rounded-md text-sm" />
                    <button onClick={handleUrlUpload} className="px-3 py-1.5 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700">Añadir</button>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
                 <div className="flex flex-wrap gap-2">
                    {(['all', 'image', 'video', 'document', 'audio', 'other'] as const).map(type => (
                        <button key={type} onClick={() => setActiveFilter(type)} className={`px-3 py-1 text-sm font-semibold rounded-full ${activeFilter === type ? 'bg-[#5a1e38] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                            { {all: 'Todos', image: 'Imágenes', video: 'Videos', document: 'Documentos', audio: 'Audio', other: 'Otros'}[type] }
                        </button>
                    ))}
                 </div>
                 <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input type="text" placeholder={`Buscar en ${allMediaItems.length} archivos...`} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full p-2 pl-10 border rounded-md"/>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredMedia.map(item => {
                    const Icon = fileTypeIcons[item.tipo];
                    return (
                        <div key={item.id} className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden border">
                           {item.tipo === 'image' ? (
                                <img src={item.url} alt={item.nombre} className="w-full h-full object-cover" />
                            ) : item.tipo === 'video' ? (
                                <video src={item.url} className="w-full h-full object-cover" muted loop controls={false} />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 p-2 text-center">
                                    <Icon className="h-1/2 w-1/2 text-gray-400 shrink-0" />
                                    <p className="mt-2 text-xs text-gray-600 font-semibold break-all line-clamp-2">{item.nombre}</p>
                                </div>
                            )}

                            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 text-white">
                                <p className="text-xs font-bold line-clamp-2">{item.nombre}</p>
                                <p className="text-xs text-gray-300">{item.origen}</p>
                                <div className="absolute top-2 right-2 flex flex-col gap-1.5">
                                    <button onClick={() => {navigator.clipboard.writeText(item.url); setCopiedUrl(item.id); setTimeout(() => setCopiedUrl(null), 1500)}} className="p-1.5 bg-white/20 rounded-full hover:bg-white/40"><Copy className="h-4 w-4" /></button>
                                    {item.origen === 'Subido Localmente' && (
                                        <>
                                            <button onClick={() => handleReplaceClick(item.id)} className="p-1.5 bg-white/20 rounded-full hover:bg-white/40"><Replace className="h-4 w-4" /></button>
                                            <button onClick={() => handleDelete(item.id)} className="p-1.5 bg-white/20 rounded-full hover:bg-red-500/80"><Trash2 className="h-4 w-4" /></button>
                                        </>
                                    )}
                                </div>
                                {copiedUrl === item.id && <span className="absolute bottom-1 right-1 text-xs bg-green-500 px-1.5 py-0.5 rounded">Copiado</span>}
                            </div>
                        </div>
                    );
                })}
            </div>
            <input type="file" ref={replaceFileRef} className="sr-only" onChange={handleReplaceFile} />
        </div>
    );
};

export default MediaLibrary;