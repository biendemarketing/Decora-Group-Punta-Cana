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
