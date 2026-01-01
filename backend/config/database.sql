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
  category_id INTEGER REFERENCES categories(id),
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INT,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Favourites table
CREATE TABLE favourites (
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
('Foliage', 'foliage'),
('Succulents', 'succulents'),
('Pothos', 'pothos'),
('Flowering Plants', 'flowering-plants'),
('Cacti', 'cacti'),
('Herbs', 'herbs'),
('Air Plants', 'air-plants'),
('Outdoor Plants', 'outdoor-plants'),
('Gardening Tools', 'gardening-tools'),
('Planters & Pots', 'planters-pots')

-- Insert sample products
-- Foliage
INSERT INTO products (name, category_id, description, price, stock, image_url, created_at)
VALUES
('Calathea with Patterned Leaves', 1, 'The Calathea features beautifully patterned leaves with intricate markings in shades of green, purple, and silver. Its striking foliage adds visual interest and a touch of elegance to any space. This plant prefers moderate to low light and consistent moisture, making it suitable for shaded corners or cozy nooks. Its unique leaf patterns make it a standout piece in any plant collection.', 60.00, 100, 'calathea.jpg', NOW()),
('Philodendron Monstera', 1, 'The Philodendron Monstera is renowned for its large, split leaves that add a tropical vibe to any room. Its vibrant green foliage features natural holes and splits, creating a striking visual effect. This low-maintenance plant is perfect for adding a lush, exotic touch to your home or office. It prefers bright, indirect light and moderate watering to stay healthy and vibrant.', 75.00, 100, 'monstera.jpg', NOW()),
('Rubber Plant in Decorative Pot', 1, 'The Rubber Plant features large, shiny, oval-shaped leaves that create a bold, lush appearance. Its sturdy stem supports a dense canopy of vibrant green foliage, making it an excellent choice for adding a touch of greenery to any space. The plant comes in a stylish decorative pot, perfect for modern interiors. It thrives in bright, indirect light and requires minimal maintenance.', 70.00, 100, 'rubber-plant.jpg', NOW()),
('Fiddle Leaf Fig Tree', 1, 'The Fiddle Leaf Fig Tree features large, glossy, violin-shaped leaves that add a dramatic touch to any interior. Its tall, slender trunk supports a canopy of vibrant green leaves with prominent veins. This plant is perfect for creating a statement piece in living rooms or offices. Easy to care for with moderate light and watering needs, it brings a touch of nature''s elegance indoors.', 85.00, 100, 'fiddle-leaf.jpg', NOW());

-- Succulents
INSERT INTO products (name, category_id, description, price, stock, image_url, created_at)
VALUES
('Haworthia in Modern Pot', 2, 'This striking Haworthia features rosette-shaped, spiky green leaves with white banding, planted in a sleek, modern pot. Its compact size and distinctive pattern make it an eye-catching addition to any desk or shelf. The plant prefers bright, indirect light and infrequent watering, making it ideal for busy urban dwellers. Its architectural form adds a contemporary touch to interior decor.', 19.99, 100, 'haworthia.jpg', NOW()),
('Sedum in Succulent Tray', 2, 'This arrangement features a variety of Sedum succulents displayed in a shallow tray, creating a lush, textured green mat. The plants have small, rounded leaves with a slightly glossy finish, perfect for tabletop or windowsill display. Easy to care for, Sedum thrives in well-drained soil and bright light. Its diverse forms and colors add visual interest to any modern space.', 18.75, 100, 'sedum.jpg', NOW()),
('Aloe Vera in Decorative Container', 2, 'This classic Aloe Vera features thick, spiky green leaves with serrated edges, housed in a stylish decorative container. Known for its medicinal properties, the Aloe Vera is a low-maintenance succulent that prefers bright, direct sunlight. Its upright growth and vibrant appearance make it an excellent addition to kitchens or living rooms. The container adds a modern touch, complementing contemporary interior styles.', 22.50, 100, 'aloe-vera.jpg', NOW()),
('Echeveria in Ceramic Pot', 2, 'The Echeveria is a charming succulent with rosette-shaped leaves that come in various colors, from soft greens to vibrant purples. Planted in a delicate ceramic pot, it adds a touch of elegance to any space. This low-maintenance plant thrives in bright light and requires minimal watering, making it perfect for busy lifestyles. Its compact size and attractive form make it a popular choice for indoor gardens and decorative displays.', 15.99, 100, 'echeveria.jpg', NOW());

-- Pothos
INSERT INTO products (name, category_id, description, price, stock, image_url, created_at)
VALUES
('Hanging Pothos with Variegated Leaves', 3, 'The Hanging Pothos features trailing vines with variegated leaves in shades of green and cream. Its cascading growth habit makes it ideal for hanging baskets or high shelves, adding a lush, vibrant touch to any room. This easy-to-care-for plant thrives in bright, indirect light and requires moderate watering, making it perfect for both beginners and experienced plant enthusiasts.', 27.99, 100, 'hanging-pothos.jpg', NOW()),
('Jade Pothos', 3, 'Jade Pothos features deep green, glossy, heart-shaped leaves that add a rich, vibrant touch to any room. Its trailing growth habit makes it ideal for hanging baskets or cascading over shelves. This hardy plant requires minimal care and thrives in moderate to bright indirect light. Perfect for urban dwellers seeking a lush, low-maintenance greenery accent.', 24.99, 100, 'jade-pothos.jpg', NOW()),
('Marble Queen Pothos', 3, 'The Marble Queen Pothos boasts striking variegated leaves with a mix of white, green, and cream patterns. Its trailing vines cascade beautifully from a decorative pot, making it a perfect accent for shelves or hanging baskets. This plant is easy to care for and adapts well to various indoor lighting conditions. It brings a sophisticated touch of nature to contemporary interiors.', 34.99, 100, 'marble-queen.jpg', NOW()),
('Golden Pothos in Decorative Pot', 3, 'This Golden Pothos features vibrant, heart-shaped leaves with variegated yellow and green patterns. It is displayed in a stylish decorative pot, perfect for modern interiors. Known for its low-maintenance nature, this plant adds a splash of color and lush greenery to any space. Ideal for hanging or placed on shelves, it thrives in moderate to bright indirect light.', 29.99, 100, 'golden-pothos.jpg', NOW());

-- Flowering Plants
INSERT INTO products (name, category_id, description, price, stock, image_url, created_at)
VALUES
('Peace Lily in Ceramic Pot', 4, 'The Peace Lily features elegant white blooms rising above lush green foliage. Known for its air-purifying qualities, it brings both beauty and wellness into your home. It thrives in low to medium light and prefers consistently moist soil, making it a graceful and easy-care flowering plant.', 39.99, 100, 'peace-lily.jpg', NOW()),
('Orchid Phalaenopsis', 4, 'This Phalaenopsis Orchid showcases delicate, long-lasting blooms in soft pastel tones. Its elegant arching stems and glossy green leaves make it a luxurious centerpiece for any room. Prefers bright, indirect light and occasional watering.', 49.99, 100, 'phalaenopsis-orchid.jpg', NOW()),
('Anthurium with Red Blooms', 4, 'Anthurium features glossy heart-shaped leaves and vibrant red flowers that last for weeks. This striking plant adds a bold, tropical accent to modern interiors and thrives in bright, indirect light.', 44.50, 100, 'anthurium.jpg', NOW()),
('African Violet', 4, 'The African Violet is a compact flowering plant with soft, velvety leaves and vibrant purple blooms. Perfect for windowsills and desks, it prefers bright, indirect light and gentle watering.', 22.99, 100, 'african-violet.jpg', NOW());

-- Cacti
INSERT INTO products (name, category_id, description, price, stock, image_url, created_at)
VALUES
('Golden Barrel Cactus', 5, 'The Golden Barrel Cactus features a round shape with golden spines, making it a bold architectural statement. Extremely low maintenance, it thrives in bright light and dry conditions.', 29.99, 100, 'golden-barrel.jpg', NOW()),
('Bunny Ear Cactus', 5, 'This playful cactus has flat, oval pads covered with soft-looking spines. Its unique form makes it a charming decorative plant for sunny spaces.', 24.50, 100, 'bunny-ear.jpg', NOW()),
('Columnar Cactus Trio', 5, 'A set of three slender columnar cacti planted together for a modern, minimalist look. Perfect for desks or shelves, requiring minimal watering.', 34.99, 100, 'columnar-cactus.jpg', NOW());

-- Herbs
INSERT INTO products (name, category_id, description, price, stock, image_url, created_at)
VALUES
('Fresh Basil in Clay Pot', 6, 'This aromatic basil plant is perfect for kitchens, offering fresh leaves for cooking while adding greenery to your space. Thrives in bright light and regular watering.', 14.99, 100, 'basil.jpg', NOW()),
('Rosemary Plant', 6, 'Rosemary features needle-like leaves with a strong fragrance and culinary versatility. Ideal for sunny windowsills and requires minimal watering.', 16.99, 100, 'rosemary.jpg', NOW()),
('Mint Herb Plant', 6, 'A fast-growing mint plant with bright green leaves and refreshing aroma. Perfect for teas, desserts, and cocktails. Prefers bright light and moist soil.', 13.50, 100, 'mint.jpg', NOW()),
('Thyme in Decorative Pot', 6, 'Compact and aromatic thyme plant housed in a stylish pot. Easy to grow and perfect for adding fresh flavor to home-cooked meals.', 15.75, 100, 'thyme.jpg', NOW());

-- Air Plants
INSERT INTO products (name, category_id, description, price, stock, image_url, created_at)
VALUES
('Tillandsia Ionantha', 7, 'This compact air plant features spiky green leaves that blush red when in bloom. It requires no soil and thrives with weekly misting.', 12.99, 100, 'tillandsia-ionantha.jpg', NOW()),
('Air Plant Glass Terrarium', 7, 'A minimalist glass terrarium housing a delicate air plant. Perfect for modern interiors and requires minimal maintenance.', 27.99, 100, 'air-plant-terrarium.jpg', NOW()),
('Hanging Air Plant Holder', 7, 'A stylish hanging holder showcasing an air plant in a floating design. Adds a light, airy feel to any room.', 24.99, 100, 'air-plant-hanging.jpg', NOW());

-- Outdoor Plants
INSERT INTO products (name, category_id, description, price, stock, image_url, created_at)
VALUES
('Lavender Bush', 8, 'Lavender features fragrant purple blooms and silvery foliage, perfect for gardens or balconies. Known for its calming scent and pollinator-friendly nature.', 29.99, 100, 'lavender.jpg', NOW()),
('Boxwood Shrub', 8, 'A classic evergreen shrub ideal for outdoor planters or garden borders. Low maintenance and perfect for structured landscapes.', 39.99, 100, 'boxwood.jpg', NOW()),
('Hydrangea Plant', 8, 'Hydrangeas produce large, lush flower clusters in soft pastel hues. Ideal for patios and garden spaces with partial shade.', 49.99, 100, 'hydrangea.jpg', NOW()),
('Olive Tree (Outdoor)', 8, 'A compact olive tree with silvery leaves, perfect for terraces and outdoor living spaces. Thrives in sunny conditions.', 89.99, 100, 'olive-tree.jpg', NOW());

-- Gardening Tools
INSERT INTO products (name, category_id, description, price, stock, image_url, created_at)
VALUES
('Stainless Steel Pruning Shears', 9, 'Sharp and durable pruning shears designed for precise cuts and comfortable handling. Essential for plant care.', 19.99, 100, 'pruning-shears.jpg', NOW()),
('Watering Can – Matte Black', 9, 'A sleek, modern watering can with a long spout for controlled watering. Combines function with minimalist design.', 34.99, 100, 'watering-can.jpg', NOW()),
('Indoor Plant Care Tool Set', 9, 'A complete set of essential tools for indoor plant maintenance, including shovel, rake, and spray bottle.', 29.99, 100, 'tool-set.jpg', NOW());

-- Planters & Pots
INSERT INTO products (name, category_id, description, price, stock, image_url, created_at)
VALUES
('Minimalist Ceramic Planter', 10, 'A clean, modern ceramic planter with a smooth matte finish. Perfect for contemporary interiors.', 24.99, 100, 'ceramic-planter.jpg', NOW()),
('Textured Stone Pot', 10, 'This stone-finish planter adds a natural, earthy feel to your space. Ideal for medium-sized plants.', 32.50, 100, 'stone-pot.jpg', NOW()),
('Hanging Macrame Planter', 10, 'Handcrafted macrame planter designed for hanging plants. Adds warmth and texture to any room.', 27.99, 100, 'macrame-planter.jpg', NOW()),
('Large Concrete Floor Planter', 10, 'A bold concrete planter ideal for statement plants. Its neutral tone complements modern and industrial interiors.', 59.99, 100, 'concrete-planter.jpg', NOW());
