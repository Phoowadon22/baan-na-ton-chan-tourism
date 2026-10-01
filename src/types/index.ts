export type TabType = 'home' | 'homestay' | 'products' | 'food' | 'profile';

export interface Homestay {
  id: string;
  name: string;
  villageLocation: string;
  image: string;
  detailImage?: string;
  badge?: string;
  badgeType?: 'primary' | 'tertiary' | 'secondary' | 'accent';
  hostName: string;
  rating: number;
  reviewCount: number;
  capacity: string;
  bedType: string;
  mealsIncluded: string;
  amenities: string[];
  price: number;
  homePrice?: number;
  homeCapacity?: string;
  homeAmenities?: string[];
  priceUnit: string;
  description: string;
  highlightFeatures: string[];
  coordinates?: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'textile' | 'food' | 'jewelry' | 'household' | 'decor' | 'skincare';
  categoryLabel: string;
  craftHeritage: string;
  image: string;
  price: number;
  rating: number;
  reviewCount?: number;
  badge?: string;
  description: string;
  artisanInfo: string;
  material: string;
}

export interface FoodItem {
  id: string;
  name: string;
  subtitle: string;
  category: 'signature' | 'noodle' | 'set' | 'dessert' | 'beverage';
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  description: string;
  highlights: string[];
  isRecommended?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BookingRecord {
  id: string;
  homestay: Homestay;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending';
  bookerName: string;
  bookerPhone: string;
  notes?: string;
}
