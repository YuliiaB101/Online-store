-- Create database
CREATE DATABASE online_store;

-- Connect to database
\c online_store;

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL
);

-- Products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  category_id INTEGER REFERENCES categories(id),
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Banners table
CREATE TABLE banners (
  id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  title VARCHAR(255),
  link TEXT,
  order_index INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true
);

-- Favorites table
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id)
);

-- Cart table
CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id)
);

-- Insert sample categories
INSERT INTO categories (name, slug) VALUES
('Electronics', 'electronics'),
('Clothing', 'clothing'),
('Books', 'books'),
('Home & Garden', 'home-garden'),
('Sports', 'sports');

-- Insert sample products
INSERT INTO products (name, description, price, image_url, category_id, likes) VALUES
('Wireless Headphones', 'Premium wireless headphones with noise cancellation', 149.99, 'https://via.placeholder.com/400x400/4A90E2/FFFFFF?text=Headphones', 1, 45),
('Smart Watch', 'Fitness tracker with heart rate monitor', 299.99, 'https://via.placeholder.com/400x400/4A90E2/FFFFFF?text=Smart+Watch', 1, 78),
('Laptop Pro', 'High-performance laptop for professionals', 1299.99, 'https://via.placeholder.com/400x400/4A90E2/FFFFFF?text=Laptop', 1, 123),
('Casual T-Shirt', 'Comfortable cotton t-shirt', 29.99, 'https://via.placeholder.com/400x400/4A90E2/FFFFFF?text=T-Shirt', 2, 34),
('Jeans', 'Classic blue jeans', 79.99, 'https://via.placeholder.com/400x400/4A90E2/FFFFFF?text=Jeans', 2, 56),
('Programming Book', 'Learn modern web development', 49.99, 'https://via.placeholder.com/400x400/4A90E2/FFFFFF?text=Book', 3, 89),
('Plant Pot', 'Decorative ceramic plant pot', 24.99, 'https://via.placeholder.com/400x400/4A90E2/FFFFFF?text=Plant+Pot', 4, 23),
('Yoga Mat', 'Non-slip exercise mat', 39.99, 'https://via.placeholder.com/400x400/4A90E2/FFFFFF?text=Yoga+Mat', 5, 67);

-- Insert sample banners
INSERT INTO banners (image_url, title, link, order_index) VALUES
('https://via.placeholder.com/1200x400/4A90E2/FFFFFF?text=Summer+Sale', 'Summer Sale - Up to 50% OFF', '/products', 1),
('https://via.placeholder.com/1200x400/2C3E50/FFFFFF?text=New+Collection', 'New Collection Available Now', '/products', 2),
('https://via.placeholder.com/1200x400/95A5A6/FFFFFF?text=Free+Shipping', 'Free Shipping on Orders Over $100', '/products', 3);
