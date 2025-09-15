export interface SubCategory {
  id: string;
  name: string;
  imageUrl: string;
  title?: string;
  description?: string;
  quoteType?: string;
}

export interface TopBarLink {
  id: 'about' | 'faq' | 'legal' | 'contact' | 'help' | string; // Allow string for dynamic keys
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
