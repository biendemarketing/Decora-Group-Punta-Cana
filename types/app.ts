import type { BlogPost, BlogCategory, BlogTag, MagazineSection } from './blog';
import type { Catalogue } from './catalogue';
import type { MenuItem, HeroSlide, PopularCategory, ServiceItem, WorkProcessSection, TopBarLink, TopBarBenefit } from './navigation';
import type { QuoteConfig } from './quote';
import type { FooterContent, FAQItem, LegalContent, HelpContent, InstagramShowcaseData, ContactContent, Page } from './pages';

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
  faqContent: {
    title: string;
    subtitle: string;
    faqs: FAQItem[];
  };
  legalContent: LegalContent;
  helpContent: HelpContent;
  instagramShowcase: InstagramShowcaseData;
  contactPage: ContactContent;
  customPages: Page[];
}
