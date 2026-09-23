export type Screen = 'storefront' | 'product-catalog' | 'fast-checkout' | 'live-order-tracking';

export interface Product {
  id: string;
  name: string;
  weight: string;
  price: number;
  mrp?: number;
  discountBadge?: string;
  rating?: number;
  ratingCount?: string;
  image: string;
  altText: string;
  deliveryMins?: number;
  category: string;
  subCategory?: string;
  isVeg?: boolean;
  saveAmount?: number;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  isDefault: boolean;
  addressLine: string;
  cityStatePincode: string;
  deliveryNote?: string;
}

export interface OrderJourneyStep {
  title: string;
  time: string;
  subtitle: string;
  status: 'completed' | 'active' | 'pending';
}
