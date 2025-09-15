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
  linkType?: 'url' | 'project-category' | 'page' | 'legal';
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


// --- New Global Section Builder Types ---
export type SectionType = 
  | 'history' 
  | 'timeline' 
  | 'missionVision' 
  | 'values' 
  | 'team' 
  | 'hiring' 
  | 'clients' 
  | 'whyChooseUs' 
  | 'textBlock' 
  | 'gallery'
  | 'hero'
  | 'cta'
  | 'featureGrid'
  | 'testimonials';

export interface PageSection {
    id: string;
    type: SectionType;
    content: any;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  isVisibleInHeader: boolean;
  isVisibleInFooter: boolean;
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

export interface HelpTopic {
    id: string;
    title: string;
    content: string;
    section?: 'Principal' | 'Contenido del Sitio' | 'Configuración' | 'Soporte';
    icon?: string;
}

export interface HelpContent {
    title: string;
    subtitle: string;
    userTopics: HelpTopic[];
    adminTopics: HelpTopic[];
}

export type FileType = 'image' | 'video' | 'audio' | 'document' | 'other';

export interface MediaItem {
    id: string;
    url: string;
    nombre: string;
    origen: string;
    tipo: FileType;
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
