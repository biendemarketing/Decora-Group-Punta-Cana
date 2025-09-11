import React from 'react';
import { Catalogue, Product, NavigationData } from '../types';
import { useCurrency } from '../App';
import { CATALOGUE_COVER_TEMPLATES, CATALOGUE_PAGE_TEMPLATES } from '../constants';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';

interface CataloguePreviewProps {
  catalogue: Catalogue;
  products: Product[];
  navigationData: NavigationData;
}

const CataloguePreview: React.FC<CataloguePreviewProps> = ({ catalogue, products, navigationData }) => {
  const { formatPrice } = useCurrency();
  const config = catalogue.config!;

  const selectedTemplate = CATALOGUE_PAGE_TEMPLATES.find(t => t.id === config.pageTemplateId) || CATALOGUE_PAGE_TEMPLATES[0];
  const productsPerPage = selectedTemplate.productsPerPage;

  const productsByCategory: { [key: string]: Product[] } = {};
  navigationData.menuItems.forEach(menuItem => {
    if (config.includedCategoryIds.includes(menuItem.id)) {
        const categoryProducts = products.filter(p => p.category === menuItem.title);
        if (categoryProducts.length > 0) {
            productsByCategory[menuItem.title] = categoryProducts;
        }
    }
    menuItem.subCategories.forEach(sub => {
        if (config.includedSubCategoryIds.includes(sub.id)) {
            const subCategoryProducts = products.filter(p => p.subcategory === sub.name);
            if (subCategoryProducts.length > 0) {
                 if (!productsByCategory[menuItem.title]) {
                    productsByCategory[menuItem.title] = [];
                 }
                 productsByCategory[menuItem.title].push(...subCategoryProducts);
                 productsByCategory[menuItem.title] = [...new Set(productsByCategory[menuItem.title])];
            }
        }
    });
  });

  const pages: { title: string, products: Product[] }[] = [];
  let currentPage: { title: string, products: Product[] } | null = null;
  
  Object.entries(productsByCategory).forEach(([category, categoryProducts]) => {
      let productsToPlace = [...categoryProducts];
      if (currentPage && currentPage.products.length < productsPerPage) {
          const spaceLeft = productsPerPage - currentPage.products.length;
          const productsToFill = productsToPlace.splice(0, spaceLeft);
          currentPage.products.push(...productsToFill);
          if (currentPage.products.length === productsPerPage) {
              pages.push(currentPage);
              currentPage = null;
          }
      }
      while (productsToPlace.length > 0) {
          if (!currentPage) {
              currentPage = { title: category, products: [] };
          }
          const productsForNewPage = productsToPlace.splice(0, productsPerPage);
          currentPage.products.push(...productsForNewPage);
          if (currentPage.products.length >= productsPerPage) {
              pages.push(currentPage);
              currentPage = null;
          }
      }
  });
  if (currentPage && currentPage.products.length > 0) {
      pages.push(currentPage);
  }

  const categoryIndex: { [key: string]: number } = {};
  pages.forEach((page, index) => {
      if (!categoryIndex[page.title]) {
          categoryIndex[page.title] = index + 3;
      }
  });

  const CoverPage = () => {
    const { cover } = config;
    const template = CATALOGUE_COVER_TEMPLATES.find(t => t.id === cover.templateId);
    if (!template) return <div className="preview-page">Plantilla no encontrada</div>;

    const logoSizeClass = { small: 'h-16', medium: 'h-24', large: 'h-32' }[cover.logoSize];
    const logoContainerClass = {
        'top-left': 'top-8 left-8 items-start text-left',
        'top-center': 'top-8 left-1/2 -translate-x-1/2 items-center text-center',
        'middle-center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center text-center',
        'bottom-left': 'bottom-8 left-8 items-start text-left',
        'bottom-center': 'bottom-8 left-1/2 -translate-x-1/2 items-center text-center'
    }[cover.logoPosition];

    const textColor = template.id.includes('dark') ? 'text-white' : 'text-gray-900';
    const subTextColor = template.id.includes('dark') ? 'text-gray-200' : 'text-gray-700';
    const textShadow = template.id.includes('dark') ? 'text-shadow: 2px 2px 4px rgba(0,0,0,0.5)' : '';

    return (
        <div className="preview-page relative">
            {template.id === 'minimalist_light' && <div className="absolute inset-0 bg-white flex items-center justify-center"><img src={cover.customImageUrls[0]} className="w-2/3 h-auto object-contain" /></div>}
            {template.id === 'elegant_dark' && <div className="absolute inset-0 bg-gray-800"><img src={cover.customImageUrls[0]} className="w-full h-full object-cover opacity-90" /></div>}
            {template.id === 'modern_grid' && <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">{[0,1,2,3].map(i => <div key={i} className="bg-gray-300"><img src={cover.customImageUrls[i]} className="w-full h-full object-cover"/></div>)}</div>}
            {template.id === 'corporate_dark' && <div className="absolute inset-0 bg-gray-900"><div className="absolute right-0 top-0 bottom-0 w-2/3 bg-gray-200"><img src={cover.customImageUrls[0]} className="w-full h-full object-cover"/></div></div>}
            {template.id === 'asymmetric_clean' && <div className="absolute inset-0 bg-white p-4 flex gap-4"><div className="w-2/3 h-full bg-gray-200"><img src={cover.customImageUrls[0]} className="w-full h-full object-cover"/></div><div className="w-1/3 h-full flex flex-col gap-4"><div className="h-1/2 bg-gray-200"><img src={cover.customImageUrls[1]} className="w-full h-full object-cover"/></div><div className="h-1/2 bg-gray-200"><img src={cover.customImageUrls[2]} className="w-full h-full object-cover"/></div></div></div>}
            <div className={`absolute p-8 flex flex-col ${logoContainerClass}`}>
                {cover.showLogo && <img src={navigationData.logoUrl} alt="Logo" className={`${logoSizeClass} object-contain mb-4`} />}
                {cover.showTitle && <h1 className={`text-6xl font-bold ${textColor}`} style={{ textShadow }}>{cover.title}</h1>}
                {cover.showSubtitle && <p className={`text-2xl mt-2 ${subTextColor}`}>{cover.subtitle}</p>}
            </div>
        </div>
    );
  };
  
  const IndexPage = () => (
    <div className="preview-page p-12">
        <h2 className="text-3xl font-bold mb-8 border-b-2 border-[#5a1e38] pb-2 text-[#5a1e38]">Índice de Contenidos</h2>
        <div className="space-y-4 columns-2">
            {Object.entries(categoryIndex).map(([category, pageNum]) => (
                <div key={category} className="flex justify-between items-baseline break-inside-avoid">
                    <h3 className="text-lg font-semibold text-gray-800">{category}</h3>
                    <span className="flex-grow border-b border-dotted border-gray-400 mx-2"></span>
                    <span className="font-bold text-gray-700">{pageNum}</span>
                </div>
            ))}
        </div>
    </div>
  );
  
  const ProductPage = ({ pageData, pageNumber }: { pageData: {title: string, products: Product[]}, pageNumber: number }) => {
    const { title, products: productsToShow } = pageData;
    const ProductCard = ({ product }: { product: Product }) => (
       <div className="border p-2 rounded-lg flex flex-col bg-white shadow-sm break-inside-avoid h-full">
            <div className="w-full h-40 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
              <img src={product.imageUrl} alt={product.name} className="max-w-full max-h-full object-contain"/>
            </div>
            <div className="p-2 flex flex-col flex-grow">
              <h4 className="font-bold text-base text-[#5a1e38]">{product.name}</h4>
              <p className="text-xs text-gray-600 line-clamp-3 flex-grow mt-1">{product.description}</p>
              {!config.hidePrices && <p className="text-base font-semibold mt-2 text-gray-800">{formatPrice(product.price)}</p>}
            </div>
        </div>
    );
    
    let pageContent;
    switch(selectedTemplate.id) {
        case 'list':
            pageContent = <div className="space-y-4">{productsToShow.map(p => <div key={p.id} className="flex gap-4 border-b pb-4 break-inside-avoid"><div className="w-32 h-32 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center flex-shrink-0"><img src={p.imageUrl} alt={p.name} className="max-w-full max-h-full object-contain rounded"/></div><div><h4 className="font-bold text-lg text-[#5a1e38]">{p.name}</h4><p className="text-sm text-gray-600 mt-1">{p.description}</p>{!config.hidePrices && <p className="font-semibold mt-2 text-lg text-gray-800">{formatPrice(p.price)}</p>}</div></div>)}</div>;
            break;
        case 'collage':
            pageContent = <div className="grid grid-cols-3 grid-rows-2 gap-4 h-full">{productsToShow[0] && <div className="col-span-2 row-span-2 h-full"><ProductCard product={productsToShow[0]}/></div>}{productsToShow[1] && <div className="col-span-1 row-span-1 h-full"><ProductCard product={productsToShow[1]}/></div>}{productsToShow[2] && <div className="col-span-1 row-span-1 h-full"><ProductCard product={productsToShow[2]}/></div>}</div>;
            break;
        case 'grid':
        default:
            pageContent = <div className="grid grid-cols-2 gap-6 h-full">{productsToShow.map(p => <ProductCard key={p.id} product={p} />)}</div>;
            break;
    }

    return <div className="preview-page p-12 relative flex flex-col"><h3 className="text-xl font-bold text-gray-700 mb-6 flex-shrink-0">{title}</h3><div className="flex-grow">{pageContent}</div>{config.showPageNumbers && <div className="page-footer">{pageNumber}</div>}</div>;
  };

  const BackCoverPage = () => (
    <div className="preview-page flex p-0" style={{backgroundColor: '#5a1e38'}}>
        <div className="w-2/3 bg-white p-12 flex flex-col justify-between">
             <div>
                {config.backCover.showLogo && <img src={navigationData.footerLogoUrl} alt="Logo" className="h-20 mb-6" />}
              </div>
              <div className="text-left text-gray-800">
                 <h2 className="text-3xl font-bold mb-4 text-[#5a1e38]">{config.backCover.customTitle}</h2>
                 <p className="text-base text-gray-600">{config.backCover.customText}</p>
              </div>
              <div>
                {config.backCover.showSocials && <div className="flex items-center gap-4 text-[#5a1e38]"><Instagram size={20} /><Facebook size={20} /><span className="font-semibold">@decoragroup.pc</span></div>}
              </div>
        </div>
        <div className="w-1/3 bg-[#5a1e38] p-8 text-white flex flex-col justify-center space-y-4">
             {config.backCover.showCompanyName && <h3 className="text-xl font-bold">Decora Group</h3>}
             {config.backCover.showAddress && <p className="flex items-start gap-2 text-sm"><MapPin size={16} className="mt-1 flex-shrink-0"/> {navigationData.footerContent.contactInfo.address}</p>}
            {config.backCover.showPhone && <p className="flex items-center gap-2 text-sm"><Phone size={16}/> {navigationData.footerContent.contactInfo.phone}</p>}
            {config.backCover.showEmail && <p className="flex items-center gap-2 text-sm"><Mail size={16}/> {navigationData.footerContent.contactInfo.email}</p>}
        </div>
    </div>
  );
  
  return (
    <div className="w-full h-full">
        <style>{`
            .preview-page {
                width: 8.5in;
                min-height: 11in;
                margin: 1rem auto;
                box-shadow: 0 0 10px rgba(0,0,0,0.2);
                background-color: white;
                position: relative;
                overflow: hidden;
                color: #1f2937;
            }
             .page-footer {
                position: absolute;
                bottom: 0.5in;
                left: 0.5in;
                right: 0.5in;
                text-align: center;
                font-size: 10px;
                color: #666;
            }
        `}</style>
        <CoverPage />
        <IndexPage />
        {pages.map((pageData, index) => (
             <ProductPage key={index} pageData={pageData} pageNumber={index + 3} />
        ))}
        <BackCoverPage />
    </div>
  );
};

export default CataloguePreview;