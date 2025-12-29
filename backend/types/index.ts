export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  created_at: Date;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: number;
  likes: number;
  created_at: Date;
  category_name?: string;
  category_slug?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Banner {
  id: number;
  image_url: string;
  title: string;
  link: string;
  order_index: number;
  active: boolean;
}

export interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  created_at: Date;
}

export interface favourite {
  id: number;
  user_id: number;
  product_id: number;
  created_at: Date;
}

export interface AuthRequest {
  userId?: number;
}
