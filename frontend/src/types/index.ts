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
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface ProductsState {
  items: Product[];
  currentProduct: Product | null;
  loading: boolean;
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
  loading: boolean;
  error: string | null;
}

export interface FavoritesState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

export interface CategoriesState {
  items: Category[];
  loading: boolean;
  error: string | null;
}

export interface BannersState {
  items: Banner[];
  loading: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  products: ProductsState;
  cart: CartState;
  favorites: FavoritesState;
  categories: CategoriesState;
  banners: BannersState;
}
