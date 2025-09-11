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
  finish?: string[];
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
  // Admin-controllable fields
  isVisible?: boolean;
  isAvailable?: boolean;
  hidePrice?: boolean;
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
  category: string[];
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

export interface HeroButton {
    id: string;
    text: string;
    link: string; // key from PREDEFINED_LINKS
    style: 'primary' | 'secondary';
    icon: string; // key from iconMap
}

export interface HeroSlide {
    id: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    buttons: HeroButton[];
}

export interface PopularCategory {
  id: string;
  name: string;
  imageUrl: string;
  link: string; // The category TITLE to navigate to
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  quoteType: string;
}

// --- Quote Config Interfaces ---
export interface QuoteOption {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export interface QuoteStyleOption extends QuoteOption {
  multiplier?: number;
}

export interface QuoteType {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  quoteType: string;
}

export interface InstallationOption {
  id: string;
  label: string;
  price: number;
  multiplier: number;
}

export interface ClosetTypeOption {
  id: string;
  name: string;
  value: number; // capacity
  imageUrl: string;
}

export interface QuoteConfig {
  projectTypes: QuoteType[];
  tvWall: {
    styles: QuoteOption[];
  };
  closet: {
    types: ClosetTypeOption[];
    modules: QuoteOption[];
    accessories: QuoteOption[];
  };
  kitchen: {
    sizes: QuoteOption[];
    styles: QuoteStyleOption[];
    countertops: QuoteStyleOption[];
    sinks: QuoteOption[];
    faucets: QuoteOption[];
    accessories: QuoteOption[];
  };
  general: {
    installationOptions: InstallationOption[];
    paymentOptions: string[];
  };
}

export interface WorkProcessStep {
  id: string;
  title: string;
  description: string;
  icon: string; // key from iconMap
}

export interface WorkProcessSection {
  title: string;
  backgroundImageUrl: string;
  steps: WorkProcessStep[];
}

export interface MagazineSection {
  title: string;
  subtitle: string;
}

export interface BlogCategory {
  id: string;
  name: string;
}

export interface BlogTag {
  id: string;
  name: string;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  date: string; // ISO 8601 format
  categoryId: string;
  tagIds: string[];
}

export type CataloguePageLayoutId = 'grid' | 'list' | 'collage';

export interface CatalogueCoverConfig {
    type: 'template' | 'custom';
    templateId?: string;
    customImageUrls: string[]; // Support for multiple images
    title: string;
    subtitle: string;
    showTitle: boolean;
    showSubtitle: boolean;
    showLogo: boolean;
    logoPosition: 'top-left' | 'top-center' | 'middle-center' | 'bottom-left' | 'bottom-center';
    logoSize: 'small' | 'medium' | 'large';
}

export interface CatalogueBackCoverConfig {
    showLogo: boolean;
    showCompanyName: boolean;
    showAddress: boolean;
    showPhone: boolean;
    showEmail: boolean;
    showSocials: boolean;
    customTitle: string;
    customText: string;
}


export interface CatalogueConfig {
    cover: CatalogueCoverConfig;
    backCover: CatalogueBackCoverConfig;
    pageTemplateId: CataloguePageLayoutId;
    includedCategoryIds: string[];
    includedSubCategoryIds: string[];
    layout: CataloguePageLayoutId; // Kept for compatibility, but pageTemplateId is now the source of truth
    hidePrices: boolean;
    showPageNumbers: boolean;
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

// --- Content Management Interfaces ---

export interface SocialLink {
  id: string;
  platform: 'Facebook' | 'Instagram' | 'Youtube' | 'WhatsApp';
  url: string;
}

export interface FooterLink {
  id: string;
  text: string;
  url: string;
  linkType?: 'url' | 'project-category';
}

export interface FooterLinkColumn {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface FooterContent {
  description: string;
  socialLinks: SocialLink[];
  linkColumns: FooterLinkColumn[];
  contactInfo: {
    address: string;
    phone: string;
    email: string;
  };
  copyrightText: string;
  legalLinks: FooterLink[];
}

export interface TimelineEvent {
  id: string;
  year: number;
  description: string;
}

export interface CompanyValue {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
}

export interface JobVacancy {
  id: string;
  title: string;
  icon: string;
  summary: string;
  location: string;
  type: 'Jornada Completa' | 'Media Jornada' | 'Pasantía';
  description: string[];
  responsibilities: string[];
  requirements: string[];
}


// --- New About Us Section Builder Types ---
export type AboutUsSectionType = 'history' | 'timeline' | 'missionVision' | 'values' | 'team' | 'hiring' | 'clients' | 'whyChooseUs';

export interface PageSection {
    id: string;
    type: AboutUsSectionType;
    content: any;
}

export interface AboutUsPageContent {
  sections: PageSection[];
}


export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface LegalPage {
  id: string;
  title: string;
  content: string;
}

export interface LegalContent {
  pages: LegalPage[];
}

export interface InstagramShowcaseImage {
    id: string;
    imageUrl: string;
}

export interface InstagramShowcaseData {
    username: string;
    isVerified: boolean;
    profilePictureUrl: string;
    postsCount: number;
    followersCount: string;
    followingCount: number;
    profileName: string;
    bio: string;
    galleryImages: InstagramShowcaseImage[];
}

export interface ContactContent {
    formTitle: string;
    formSubtitle: string;
    infoTitle: string;
    phone: string;
    email: string;
    address: string;
    hours: string;
    mapTitle: string;
}

export interface NavigationData {
  menuItems: MenuItem[];
  heroSlides: HeroSlide[];
  popularCategories: PopularCategory[];
  services: ServiceItem[];
  quoteConfig: QuoteConfig;
  workProcessSection: WorkProcessSection;
  magazineSection: MagazineSection;
  blogPosts: BlogPost[];
  blogCategories: BlogCategory[];
  blogTags: BlogTag[];
  catalogues: Catalogue[];
  logoUrl: string;
  footerLogoUrl: string;
  topBarLinks: TopBarLink[];
  topBarBenefits: TopBarBenefit[];
  exchangeRate: number;
  contactPhoneNumber: string;
  contactPhoneLink: string;
  // New CMS fields
  footerContent: FooterContent;
  aboutUsPage: AboutUsPageContent;
  faqContent: {
    title: string;
    subtitle: string;
    faqs: FAQItem[];
  };
  legalContent: LegalContent;
  instagramShowcase: InstagramShowcaseData;
  contactPage: ContactContent;
}