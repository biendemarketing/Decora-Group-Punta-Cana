import type { NavigationData } from './types';
import { INITIAL_BLOG_CATEGORIES, INITIAL_BLOG_POSTS, INITIAL_BLOG_TAGS, INITIAL_MAGAZINE_SECTION } from './constants/blog';
import { INITIAL_CATALOGUES } from './constants/catalogues';
import { 
    MENU_ITEMS_DATA, 
    HERO_SLIDES_DATA, 
    INITIAL_POPULAR_CATEGORIES, 
    INITIAL_SERVICES, 
    INITIAL_WORK_PROCESS_SECTION,
    INITIAL_TOP_BAR_LINKS,
    INITIAL_TOP_BAR_BENEFITS,
} from './constants/navigation';
import { 
    INITIAL_FOOTER_CONTENT, 
    INITIAL_FAQ_CONTENT, 
    INITIAL_LEGAL_CONTENT, 
    INITIAL_HELP_CONTENT,
    INITIAL_INSTAGRAM_SHOWCASE_DATA,
    INITIAL_CONTACT_CONTENT,
    INITIAL_CUSTOM_PAGES
} from './constants/pages';
import { INITIAL_QUOTE_CONFIG } from './constants/quote';
import { INITIAL_LOGOS_AND_CONTACT } from './constants/site';

// Re-export constants needed directly by components
export * from './constants/blog';
export * from './constants/catalogues';
export * from './constants/forms';
export * from './constants/navigation';
export * from './constants/pages';
export * from './constants/products';
export * from './constants/projects';
export * from './constants/quote';
export * from './constants/site';


export const INITIAL_NAVIGATION_DATA: NavigationData = {
  menuItems: MENU_ITEMS_DATA.map(item => ({ ...item, id: crypto.randomUUID() })),
  heroSlides: HERO_SLIDES_DATA.map(slide => ({ ...slide, id: crypto.randomUUID() })),
  popularCategories: INITIAL_POPULAR_CATEGORIES,
  services: INITIAL_SERVICES,
  quoteConfig: INITIAL_QUOTE_CONFIG,
  workProcessSection: INITIAL_WORK_PROCESS_SECTION,
  magazineSection: INITIAL_MAGAZINE_SECTION,
  blogPosts: INITIAL_BLOG_POSTS,
  blogCategories: INITIAL_BLOG_CATEGORIES,
  blogTags: INITIAL_BLOG_TAGS,
  catalogues: INITIAL_CATALOGUES,
  logoUrl: INITIAL_LOGOS_AND_CONTACT.logoUrl,
  footerLogoUrl: INITIAL_LOGOS_AND_CONTACT.footerLogoUrl,
  topBarLinks: INITIAL_TOP_BAR_LINKS,
  topBarBenefits: INITIAL_TOP_BAR_BENEFITS,
  exchangeRate: INITIAL_LOGOS_AND_CONTACT.exchangeRate,
  contactPhoneNumber: INITIAL_LOGOS_AND_CONTACT.contactPhoneNumber,
  contactPhoneLink: INITIAL_LOGOS_AND_CONTACT.contactPhoneLink,
  footerContent: INITIAL_FOOTER_CONTENT,
  faqContent: INITIAL_FAQ_CONTENT,
  legalContent: INITIAL_LEGAL_CONTENT,
  helpContent: INITIAL_HELP_CONTENT,
  instagramShowcase: INITIAL_INSTAGRAM_SHOWCASE_DATA,
  contactPage: INITIAL_CONTACT_CONTENT,
  customPages: INITIAL_CUSTOM_PAGES,
};
