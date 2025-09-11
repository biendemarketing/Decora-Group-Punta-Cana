import React from 'react';
import { Catalogue, Product, NavigationData } from '../types';
import { useCurrency } from '../App';

interface CataloguePreviewProps {
  catalogue: Catalogue;
  products: Product[];
  navigationData: NavigationData;
}

const CataloguePreview: React.FC<CataloguePreviewProps> = ({ catalogue, products, navigationData }) => {
  const { formatPrice } = useCurrency();
  const config = catalogue.config!;

  const filteredProducts = products.filter(p => 
    config.includedCategoryIds.some(catId => {
      const menuItem = navigationData.menuItems.find(m => m.id === catId);
      return menuItem && menuItem.title === p.category;
    }) ||
    config.includedSubCategoryIds.some(subId => {
       const menuItem = navigationData.menuItems.find(m => m.subCategories.some(sub => sub.id === subId));
       const subCategory = menuItem?.subCategories.find(sub => sub.id === subId);
       return subCategory && subCategory.name === p.subcategory;
    })
  );
  
  const CoverPage = () => (
    <div className="preview-page flex flex-col justify-center items-center text-center p-8 bg-gray-100" style={{ backgroundImage: `url(${config.cover.customImageUrl || ''})`, backgroundSize: 'cover' }}>
      <div className="bg-white/80 p-10 rounded shadow-lg backdrop-blur-sm">
        {config.cover.showLogo && <img src={navigationData.logoUrl} alt="Logo" className="h-24 mx-auto mb-4" />}
        <h1 className="text-5xl font-bold text-gray-900">{config.cover.title}</h1>
        <p className="text-xl mt-2 text-gray-700">{config.cover.subtitle}</p>
      </div>
    </div>
  );
  
  const IndexPage = () => {
    const productsByCategory: { [key: string]: Product[] } = {};
    filteredProducts.forEach(p => {
        if (!productsByCategory[p.category]) productsByCategory[p.category] = [];
        productsByCategory[p.category].push(p);
    });

    return (
        <div className="preview-page p-8">
            <h2 className="text-3xl font-bold mb-8 border-b pb-2 text-gray-900">Índice</h2>
            <div className="space-y-4">
                {Object.entries(productsByCategory).map(([category, productsInCategory]) => (
                    <div key={category}>
                        <h3 className="text-xl font-semibold text-gray-800">{category}</h3>
                        <ul className="list-disc list-inside pl-4 mt-2 text-sm text-gray-600">
                            {productsInCategory.map(p => <li key={p.id}>{p.name}</li>)}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
  };
  
  const ProductGridPage = ({ productsToShow }: { productsToShow: Product[] }) => (
    <div className="preview-page p-8 grid grid-cols-2 gap-8">
      {productsToShow.map(product => (
        <div key={product.id} className="border p-2 rounded flex flex-col">
            <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-contain mb-2"/>
            <h4 className="font-bold text-sm text-gray-900">{product.name}</h4>
            <p className="text-xs text-gray-600 line-clamp-2 flex-grow">{product.description}</p>
            {!config.hidePrices && <p className="text-sm font-semibold mt-1 text-gray-900">{formatPrice(product.price)}</p>}
        </div>
      ))}
    </div>
  );
  
  const ProductListPage = ({ productsToShow }: { productsToShow: Product[] }) => (
     <div className="preview-page p-8 space-y-4">
      {productsToShow.map(product => (
        <div key={product.id} className="flex gap-4 border-b pb-2">
          <img src={product.imageUrl} alt={product.name} className="w-24 h-24 object-contain rounded"/>
          <div>
            <h4 className="font-bold text-gray-900">{product.name}</h4>
            <p className="text-xs text-gray-600 line-clamp-3">{product.description}</p>
            {!config.hidePrices && <p className="font-semibold mt-1 text-gray-900">{formatPrice(product.price)}</p>}
          </div>
        </div>
      ))}
    </div>
  );

  const BackCoverPage = () => (
    <div className="preview-page flex flex-col justify-center items-center text-center p-8 bg-gray-100">
      {config.backCover.showLogo && <img src={navigationData.footerLogoUrl} alt="Logo" className="h-20 mx-auto mb-4" />}
      <h2 className="text-3xl font-bold text-gray-900">{config.backCover.title}</h2>
      <p className="text-lg mt-2 text-gray-700">{config.backCover.subtitle}</p>
      {config.backCover.showSocials && <p className="text-sm mt-8 text-gray-600">@decoragroup.pc</p>}
    </div>
  );
  
  const productsPerPage = config.layout === 'grid' ? 6 : 4;
  const productPages = [];
  for (let i = 0; i < filteredProducts.length; i += productsPerPage) {
      productPages.push(filteredProducts.slice(i, i + productsPerPage));
  }
  
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
            }
        `}</style>
        <CoverPage />
        <IndexPage />
        {productPages.map((pageProducts, index) => (
             <div key={index} className="relative">
                {config.layout === 'grid' ? <ProductGridPage productsToShow={pageProducts} /> : <ProductListPage productsToShow={pageProducts} />}
            </div>
        ))}
        <BackCoverPage />
    </div>
  );
};

export default CataloguePreview;
