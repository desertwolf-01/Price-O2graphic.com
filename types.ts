
export interface PriceTier {
  minQuantity: number;
  price: number;
}

export interface ServiceOption {
  id: string;
  name: string;
  description?: string;
  price: number;
  items?: string[];
  hasQuantity?: boolean;
  quantityLabel?: string;
  priceSuffix?: string;
  priceTiers?: PriceTier[];
  ribbon?: {
    text: string;
    color: string;
  };
}

export interface ServiceCategory {
  id:string;
  name: string;
  description?: string;
  options: ServiceOption[];
  isPhased?: boolean;
  isRadio?: boolean;
}

export interface ClientFeedback {
  id: string;
  clientName: string;
  companyOrRole?: string;
  rating: number; // 1 to 5
  clarityRating?: number;
  pricingRating?: number;
  speedRating?: number;
  comment: string;
  date: string;
  timestamp: number;
  projectScope?: string;
  isVerified?: boolean;
}
