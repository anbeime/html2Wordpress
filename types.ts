export interface ProductData {
  id: string;
  title: string;
  tagline: string;
  description: string;
  price: number;
  features: string[];
  imageUrl: string;
  amazonSearchTerm: string;
  category: string;
}

export enum AppState {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  DISPLAY_PRODUCT = 'DISPLAY_PRODUCT',
  ERROR = 'ERROR'
}

export interface GeneratedContentRaw {
  title: string;
  tagline: string;
  description: string;
  price: number;
  features: string[];
  imagePrompt: string;
  amazonSearchTerm: string;
  category: string;
}