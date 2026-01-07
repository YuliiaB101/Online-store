export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: number;
  category_name: string;
  category_slug: string;
  likes: number;
  created_at: string;
  rating_avg: number;
  rating_count: number;
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

export interface CartItem extends Product {
  quantity: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  error: string | null;
  isAuthenticated: boolean;
}

export interface ProductsState {
  items: Product[];
  currentProduct: Product | null;
  error: string | null;
  filters: {
    category: string;
    search: string;
    sortBy: string;
    order: string;
  };
}

export interface CartState {
  items: CartItem[];
  error: string | null;
}

export interface FavouritesState {
  items: Product[];
  error: string | null;
}

export interface CategoriesState {
  items: Category[];
  error: string | null;
}

export interface BannersState {
  items: Banner[];
  error: string | null;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

export interface ToastState {
  toasts: Toast[];
}

export interface RootState {
  auth: AuthState;
  products: ProductsState;
  cart: CartState;
  favourites: FavouritesState;
  categories: CategoriesState;
  banners: BannersState;
  toast: ToastState;
}
