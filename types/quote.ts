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

// New types for the customizable quote template
export interface QuoteTemplateCompanyInfo {
  name: string;
  addressLine1: string;
  addressLine2: string;
  rnc: string;
  email: string;
  phone: string;
}

export interface QuoteTemplateLabels {
  mainTitle: string;
  quoteNumberLabel: string;
  dateLabel: string;
  fromLabel: string;
  toLabel: string;
  itemDescriptionHeader: string;
  itemQuantityHeader: string;
  itemUnitPriceHeader: string;
  itemTotalHeader: string;
  subtotalLabel: string;
  taxLabel: string;
  totalLabel: string;
  footerTextLine1: string;
  footerTextLine2: string;
}

export interface QuoteTemplateVisibility {
  showLogo: boolean;
  showQuoteNumber: boolean;
  showDate: boolean;
  showRnc: boolean;
  showTax: boolean;
}

export interface QuoteTemplateStyle {
  accentColor: string;
}

export interface QuoteTemplateConfig {
  companyInfo: QuoteTemplateCompanyInfo;
  labels: QuoteTemplateLabels;
  visibility: QuoteTemplateVisibility;
  style: QuoteTemplateStyle;
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
  template: QuoteTemplateConfig; // Added template config
}