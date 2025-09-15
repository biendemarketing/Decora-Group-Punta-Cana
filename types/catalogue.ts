export type CataloguePageLayoutId = 'grid' | 'list' | 'collage' | 'list-2-col';

export interface CatalogueCoverConfig {
    type: 'template' | 'custom';
    templateId?: string;
    customImageUrls: string[]; 
    title: string;
    subtitle: string;
    showTitle: boolean;
    showSubtitle: boolean;
    showLogo: boolean;
    logoPosition: 'top-left' | 'top-center' | 'middle-center' | 'bottom-left' | 'bottom-center';
    logoSize: 'small' | 'medium' | 'large';
    showFooter: boolean;
}

export interface CatalogueBackCoverConfig {
    templateId: string;
    showLogo: boolean;
    showCompanyName: boolean;
    showAddress: boolean;
    showPhone: boolean;
    showEmail: boolean;
    showSocials: boolean;
    customTitle: string;
    customText: string;
}

export interface ProductDisplayConfig {
    showDescription: boolean;
    showSku: boolean;
    showColors: boolean;
    showDimensions: boolean;
    showMaterials: boolean;
    showFinish: boolean;
    showLed: boolean;
}

export interface CatalogueConfig {
    cover: CatalogueCoverConfig;
    backCover: CatalogueBackCoverConfig;
    pageTemplateId: CataloguePageLayoutId;
    includedCategoryIds: string[];
    includedSubCategoryIds: string[];
    layout: CataloguePageLayoutId; 
    hidePrices: boolean;
    showPageNumbers: boolean;
    fontFamily: string;
    accentColor: string;
    productsPerPage: number;
    productDisplay: ProductDisplayConfig;
}


export type CatalogueType = 'pdf' | 'drive' | 'gallery' | 'productCollection' | 'generated';

export interface Catalogue {
  id: string;
  title: string;
  description: string;
  featuredImage: string;
  isVisible: boolean;
  type: CatalogueType;
  pdfUrl?: string;
  driveUrl?: string;
  galleryImages?: string[];
  productIds?: number[];
  config?: CatalogueConfig;
}
