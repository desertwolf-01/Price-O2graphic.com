export interface ServiceOption {
  id: string;
  name: string;
  description?: string;
  price: number;
  items?: string[];
  hasQuantity?: boolean;
}

export interface ServiceCategory {
  id:string;
  name: string;
  description?: string;
  options: ServiceOption[];
  isPhased?: boolean;
  isRadio?: boolean;
}