export interface Product {
  id: number;
  category: string;
  subcategory?: string;
  subSubcategory?: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  images: string[];
  imageUrl: string; // for compatibility with ProductCard
  hint: string;
  deliveryTime: number; // Parsed from string
  setType?: 'Sólido' | 'Partes separadas';
  ledLighting?: boolean;
  materials: string[];
  colors: string[];
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  // From old type, for compatibility
  sku?: string;
  reviewsCount?: number;
  specs?: { [key: string]: string };
  additionalInfo?: {
    icon: string;
    text: string;
    details?: string;
  }[];
}

export interface CartItem extends Product {
  quantity: number;
}


export interface Project {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  galleryImages: string[];
}


export interface Filters {
  priceRange: { min: number; max: number };
  deliveryTime: string[]; // e.g., '5', '10', '15', '15+'
  setType: string[];
  ledLighting: string | null; // 'Si', 'No', or null
  materials: string[];
  colors: string[];
}

export interface SubCategory {
  id: string;
  name: string;
  imageUrl: string;
  title?: string;
  description?: string;
  quoteType?: string;
}

export interface TopBarLink {
  id: 'about' | 'faq' | 'legal' | 'contact' | string; // Allow string for dynamic keys
  text: string;
}

export interface TopBarBenefit {
  id: string;
  icon: string;
  text: string;
}

export interface MenuItem {
  id: string;
  key: string;
  title: string;
  isVisible: boolean;
  featuredImageUrl: string;
  subCategories: SubCategory[];
}

export interface NavigationData {
  menuItems: MenuItem[];
  logoUrl: string;
  footerLogoUrl: string;
  topBarLinks: TopBarLink[];
  topBarBenefits: TopBarBenefit[];
  exchangeRate: number;
  contactPhoneNumber: string;
  contactPhoneLink: string;
}
