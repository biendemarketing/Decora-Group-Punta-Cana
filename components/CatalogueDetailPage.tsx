import React, { useState } from 'react';
import { Catalogue } from '../types';
import { ChevronRight, ExternalLink, Download, FileText, Image as ImageIcon, Box } from 'lucide-react';
import Lightbox from './Lightbox';

interface CatalogueDetailPageProps {
  catalogue: Catalogue;
  onBack: () => void;
  onPrintCatalogue: (catalogue: Catalogue) => void;
}

const CatalogueDetailPage: React.FC<CatalogueDetailPageProps> = ({ catalogue, onBack, onPrintCatalogue }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };
  
  const renderContent = () => {
    switch (catalogue.type) {
      case 'generated':
        return (
          <div className="text-center p-8 border rounded-lg bg-gray-50">
             <FileText className="h-12 w-12 mx-auto text-blue-500 mb-4" />
             <h3 className="text-lg font-semibold text-gray-800">Catálogo Personalizado</h3>
             <p className="text-sm text-gray-600 mt-2 mb-6">Este catálogo ha sido generado con nuestra herramienta. Puedes descargarlo en formato PDF.</p>
             <button onClick={() => onPrintCatalogue(catalogue)} className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-md text-white bg-green-600 hover:bg-green-700">
                <Download className="h-4 w-4" /> Descargar PDF
             </button>
          </div>
        );
      case 'pdf':
        return (
          <div className="text-center p-8 border rounded-lg bg-gray-50">
            <FileText className="h-12 w-12 mx-auto text-red-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">Catálogo en PDF</h3>
            <p className="text-sm text-gray-600 mt-2 mb-6">Este catálogo está disponible como un archivo PDF.</p>
            <div className="flex justify-center gap-4">
              <a href={catalogue.pdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 text-sm rounded-md text-white bg-blue-600 hover:bg-blue-700">
                <ExternalLink className="h-4 w-4" /> Ver en línea
              </a>
              <a href={catalogue.pdfUrl} download className="flex items-center gap-2 px-4 py-2 text-sm rounded-md text-white bg-green-600 hover:bg-green-700">
                <Download className="h-4 w-4" /> Descargar
              </a>
            </div>
          </div>
        );
      case 'drive':
        return (
          <div className="text-center p-8 border rounded-lg bg-gray-50">
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png" alt="Google Drive" className="h-12 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">Contenido en Google Drive</h3>
            <p className="text-sm text-gray-600 mt-2 mb-6">Este contenido está alojado en Google Drive.</p>
            <a href={catalogue.driveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-md text-white bg-blue-600 hover:bg-blue-700">
              <ExternalLink className="h-4 w-4" /> Abrir en Drive
            </a>
          </div>
        );
      case 'gallery':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"><ImageIcon className="h-5 w-5" /> Galería de Imágenes</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {catalogue.galleryImages?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => openLightbox(index)}
                  className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5a1e38]"
                >
                  <img
                    src={img}
                    alt={`${catalogue.title} - Imagen ${index + 1}`}
                    className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                  />
                </button>
              ))}
            </div>
          </div>
        );
      case 'productCollection':
        return (
          <div className="text-center p-8 border-2 border-dashed rounded-lg bg-gray-50">
             <Box className="h-12 w-12 mx-auto text-gray-400 mb-4" />
             <h3 className="text-lg font-semibold text-gray-800">Colección de Productos</h3>
             <p className="text-sm text-gray-600 mt-2">Esta funcionalidad estará disponible próximamente.</p>
          </div>
        );
      default:
        return <p>Tipo de catálogo no reconocido.</p>;
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <button onClick={onBack} className="hover:text-gray-700">Catálogos</button>
          <ChevronRight className="h-4 w-4 mx-1 flex-shrink-0" />
          <span className="font-medium text-gray-600 truncate">{catalogue.title}</span>
        </nav>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                  <img src={catalogue.featuredImage} alt={catalogue.title} className="w-full aspect-[3/4] object-cover rounded-lg shadow-md" />
              </div>
              <div className="md:col-span-2">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{catalogue.title}</h1>
                  <p className="text-base text-gray-600 mb-8">{catalogue.description}</p>
                  {renderContent()}
              </div>
          </div>
        </div>
      </div>
      {lightboxOpen && catalogue.galleryImages && (
        <Lightbox
          images={catalogue.galleryImages}
          startIndex={selectedImageIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
};

export default CatalogueDetailPage;