--
-- PostgreSQL database dump
--

\restrict 6gBIxgHrVk7amDgAPom0XwASw525FavR3EPa2XU4Pwi7oucMZq6g3QtwZFGeggH

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cart; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cart (
    id integer NOT NULL,
    user_id integer,
    product_id integer,
    quantity integer DEFAULT 1,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: cart_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cart_id_seq OWNED BY public.cart.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL
);


--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: favourites; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.favourites (
    id integer CONSTRAINT favorites_id_not_null NOT NULL,
    user_id integer,
    product_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: favorites_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.favorites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: favorites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.favorites_id_seq OWNED BY public.favourites.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    category_id integer,
    description text,
    price numeric(10,2) NOT NULL,
    stock integer,
    image_url character varying(255),
    created_at timestamp without time zone DEFAULT now(),
    rating_avg numeric(2,1) DEFAULT 0,
    rating_count integer DEFAULT 0
);


--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: cart id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart ALTER COLUMN id SET DEFAULT nextval('public.cart_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: favourites id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.favourites ALTER COLUMN id SET DEFAULT nextval('public.favorites_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.cart (id, user_id, product_id, quantity, created_at) VALUES (61, 2, 41, 2, '2026-01-02 23:51:10.777936');
INSERT INTO public.cart (id, user_id, product_id, quantity, created_at) VALUES (62, 2, 38, 1, '2026-01-07 13:14:50.673949');
INSERT INTO public.cart (id, user_id, product_id, quantity, created_at) VALUES (69, 3, 39, 23, '2026-01-07 16:59:10.663696');
INSERT INTO public.cart (id, user_id, product_id, quantity, created_at) VALUES (80, 3, 28, 1, '2026-01-07 17:47:19.40059');
INSERT INTO public.cart (id, user_id, product_id, quantity, created_at) VALUES (79, 3, 40, 4, '2026-01-07 17:47:10.024565');
INSERT INTO public.cart (id, user_id, product_id, quantity, created_at) VALUES (81, 3, 58, 6, '2026-01-09 21:03:12.991827');


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.categories (id, name, slug) VALUES (1, 'Foliage', 'foliage');
INSERT INTO public.categories (id, name, slug) VALUES (2, 'Succulents', 'succulents');
INSERT INTO public.categories (id, name, slug) VALUES (3, 'Pothos', 'pothos');
INSERT INTO public.categories (id, name, slug) VALUES (4, 'Flowering Plants', 'flowering-plants');
INSERT INTO public.categories (id, name, slug) VALUES (6, 'Herbs', 'herbs');
INSERT INTO public.categories (id, name, slug) VALUES (7, 'Air Plants', 'air-plants');
INSERT INTO public.categories (id, name, slug) VALUES (8, 'Outdoor Plants', 'outdoor-plants');
INSERT INTO public.categories (id, name, slug) VALUES (9, 'Gardening Tools', 'gardening-tools');
INSERT INTO public.categories (id, name, slug) VALUES (10, 'Planters & Pots', 'planters-pots');
INSERT INTO public.categories (id, name, slug) VALUES (11, 'Orchids', 'orchids');


--
-- Data for Name: favourites; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.favourites (id, user_id, product_id, created_at) VALUES (53, 2, 34, '2026-01-02 23:47:44.372703');
INSERT INTO public.favourites (id, user_id, product_id, created_at) VALUES (54, 2, 41, '2026-01-02 23:47:49.584278');
INSERT INTO public.favourites (id, user_id, product_id, created_at) VALUES (77, 3, 38, '2026-01-07 17:47:56.975361');
INSERT INTO public.favourites (id, user_id, product_id, created_at) VALUES (78, 3, 41, '2026-01-07 17:47:57.756305');
INSERT INTO public.favourites (id, user_id, product_id, created_at) VALUES (79, 3, 2, '2026-01-07 17:48:02.05085');
INSERT INTO public.favourites (id, user_id, product_id, created_at) VALUES (80, 3, 3, '2026-01-07 17:48:02.907796');
INSERT INTO public.favourites (id, user_id, product_id, created_at) VALUES (81, 3, 4, '2026-01-07 17:48:03.661022');
INSERT INTO public.favourites (id, user_id, product_id, created_at) VALUES (82, 3, 58, '2026-01-09 21:01:11.605253');
INSERT INTO public.favourites (id, user_id, product_id, created_at) VALUES (83, 3, 28, '2026-01-09 21:04:43.590708');


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (8, 'Echeveria in Ceramic Pot', 2, 'The Echeveria is a charming succulent with rosette-shaped leaves that come in various colors, from soft greens to vibrant purples. Planted in a delicate ceramic pot, it adds a touch of elegance to any space. This low-maintenance plant thrives in bright light and requires minimal watering, making it perfect for busy lifestyles. Its compact size and attractive form make it a popular choice for indoor gardens and decorative displays.', 15.99, 100, '/images/products/echeveria.jpg', '2025-12-15 13:02:46.785778', 4.2, 211);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (9, 'Hanging Pothos with Variegated Leaves', 3, 'The Hanging Pothos features trailing vines with variegated leaves in shades of green and cream. Its cascading growth habit makes it ideal for hanging baskets or high shelves, adding a lush, vibrant touch to any room. This easy-to-care-for plant thrives in bright, indirect light and requires moderate watering, making it perfect for both beginners and experienced plant enthusiasts.', 27.99, 100, '/images/products/hanging-pothos.jpg', '2025-12-15 13:02:54.433766', 3.9, 204);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (10, 'Jade Pothos', 3, 'Jade Pothos features deep green, glossy, heart-shaped leaves that add a rich, vibrant touch to any room. Its trailing growth habit makes it ideal for hanging baskets or cascading over shelves. This hardy plant requires minimal care and thrives in moderate to bright indirect light. Perfect for urban dwellers seeking a lush, low-maintenance greenery accent.', 24.99, 100, '/images/products/jade-pothos.jpg', '2025-12-15 13:02:54.433766', 4.5, 39);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (11, 'Marble Queen Pothos', 3, 'The Marble Queen Pothos boasts striking variegated leaves with a mix of white, green, and cream patterns. Its trailing vines cascade beautifully from a decorative pot, making it a perfect accent for shelves or hanging baskets. This plant is easy to care for and adapts well to various indoor lighting conditions. It brings a sophisticated touch of nature to contemporary interiors.', 34.99, 100, '/images/products/marble-queen.jpg', '2025-12-15 13:02:54.433766', 3.5, 18);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (12, 'Golden Pothos in Decorative Pot', 3, 'This Golden Pothos features vibrant, heart-shaped leaves with variegated yellow and green patterns. It is displayed in a stylish decorative pot, perfect for modern interiors. Known for its low-maintenance nature, this plant adds a splash of color and lush greenery to any space. Ideal for hanging or placed on shelves, it thrives in moderate to bright indirect light.', 29.99, 100, '/images/products/golden-pothos.jpg', '2025-12-15 13:02:54.433766', 4.8, 225);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (13, 'Peace Lily in Ceramic Pot', 4, 'The Peace Lily features elegant white blooms rising above lush green foliage. Known for its air-purifying qualities, it brings both beauty and wellness into your home. It thrives in low to medium light and prefers consistently moist soil, making it a graceful and easy-care flowering plant.', 39.99, 100, '/images/products/peace-lily.jpg', '2025-12-15 13:03:00.800522', 4.3, 123);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (16, 'African Violet', 4, 'The African Violet is a compact flowering plant with soft, velvety leaves and vibrant purple blooms. Perfect for windowsills and desks, it prefers bright, indirect light and gentle watering.', 22.99, 100, '/images/products/african-violet.jpg', '2025-12-15 13:03:00.800522', 4.4, 219);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (17, 'Fresh Basil in Clay Pot', 6, 'This aromatic basil plant is perfect for kitchens, offering fresh leaves for cooking while adding greenery to your space. Thrives in bright light and regular watering.', 14.99, 100, '/images/products/basil.jpg', '2025-12-15 13:03:16.515292', 4.8, 80);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (18, 'Rosemary Plant', 6, 'Rosemary features needle-like leaves with a strong fragrance and culinary versatility. Ideal for sunny windowsills and requires minimal watering.', 16.99, 100, '/images/products/rosemary.jpg', '2025-12-15 13:03:16.515292', 4.4, 153);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (19, 'Mint Herb Plant', 6, 'A fast-growing mint plant with bright green leaves and refreshing aroma. Perfect for teas, desserts, and cocktails. Prefers bright light and moist soil.', 13.50, 100, '/images/products/mint.jpg', '2025-12-15 13:03:16.515292', 4.0, 81);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (22, 'Air Plant Glass Terrarium', 7, 'A minimalist glass terrarium housing a delicate air plant. Perfect for modern interiors and requires minimal maintenance.', 27.99, 100, '/images/products/air-plant-terrarium.jpg', '2025-12-15 13:03:22.94477', 4.6, 151);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (23, 'Hanging Air Plant Holder', 7, 'A stylish hanging holder showcasing an air plant in a floating design. Adds a light, airy feel to any room.', 24.99, 100, '/images/products/air-plant-hanging.jpg', '2025-12-15 13:03:22.94477', 3.1, 42);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (24, 'Lavender Bush', 8, 'Lavender features fragrant purple blooms and silvery foliage, perfect for gardens or balconies. Known for its calming scent and pollinator-friendly nature.', 29.99, 100, '/images/products/lavender.jpg', '2025-12-15 13:03:29.560426', 4.0, 156);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (25, 'Boxwood Shrub', 8, 'A classic evergreen shrub ideal for outdoor planters or garden borders. Low maintenance and perfect for structured landscapes.', 39.99, 100, '/images/products/boxwood.jpg', '2025-12-15 13:03:29.560426', 4.7, 36);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (26, 'Hydrangea Plant', 8, 'Hydrangeas produce large, lush flower clusters in soft pastel hues. Ideal for patios and garden spaces with partial shade.', 49.99, 100, '/images/products/hydrangea.jpg', '2025-12-15 13:03:29.560426', 4.5, 238);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (27, 'Olive Tree (Outdoor)', 8, 'A compact olive tree with silvery leaves, perfect for terraces and outdoor living spaces. Thrives in sunny conditions.', 89.99, 100, '/images/products/olive-tree.jpg', '2025-12-15 13:03:29.560426', 4.5, 264);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (28, 'Stainless Steel Pruning Shears', 9, 'Sharp and durable pruning shears designed for precise cuts and comfortable handling. Essential for plant care.', 19.99, 100, '/images/products/pruning-shears.jpg', '2025-12-15 13:03:29.560426', 4.8, 64);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (29, 'Watering Can – Matte Black', 9, 'A sleek, modern watering can with a long spout for controlled watering. Combines function with minimalist design.', 34.99, 100, '/images/products/watering-can.jpg', '2025-12-15 13:03:29.560426', 3.1, 278);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (30, 'Indoor Plant Care Tool Set', 9, 'A complete set of essential tools for indoor plant maintenance, including shovel, rake, and spray bottle.', 29.99, 100, '/images/products/tool-set.jpg', '2025-12-15 13:03:29.560426', 4.6, 116);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (38, 'Gardenia Jasminoides', 4, 'A fragrant flowering plant with glossy dark green leaves and large white blooms. Gardenia is prized for its rich aroma and elegant appearance, making it a perfect choice for bright indoor spaces.', 42.99, 60, '/images/products/gardenia-jasminoides.jpg', '2025-12-16 18:02:16.753204', 4.6, 124);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (39, 'Kalanchoe Blossfeldiana', 4, 'A compact flowering plant with thick green leaves and vibrant clusters of red, pink, or orange flowers. Very easy to care for and ideal for windowsills and small spaces.', 19.99, 120, '/images/products/kalanchoe-blossfeldiana.jpg', '2025-12-16 18:02:16.753204', 4.4, 98);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (40, 'Begonia Elatior', 4, 'A decorative begonia known for its abundant and long-lasting blooms in shades of red, pink, and yellow. Thrives in bright rooms with indirect light.', 27.50, 80, '/images/products/begonia-elatior.jpg', '2025-12-16 18:02:16.753204', 4.5, 86);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (41, 'Cyclamen Persicum', 4, 'An elegant flowering plant with delicate upward-facing petals and patterned leaves. Blooms during cooler seasons and prefers moderate watering and cool indoor temperatures.', 29.99, 70, '/images/products/cyclamen-persicum.jpg', '2025-12-16 18:02:16.753204', 4.3, 73);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (1, 'Calathea with Patterned Leaves', 1, 'The Calathea features beautifully patterned leaves with intricate markings in shades of green, purple, and silver. Its striking foliage adds visual interest and a touch of elegance to any space. This plant prefers moderate to low light and consistent moisture, making it suitable for shaded corners or cozy nooks. Its unique leaf patterns make it a standout piece in any plant collection.', 60.00, 100, '/images/products/calathea.jpg', '2025-12-15 13:02:35.546986', 3.3, 284);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (2, 'Philodendron Monstera', 1, 'The Philodendron Monstera is renowned for its large, split leaves that add a tropical vibe to any room. Its vibrant green foliage features natural holes and splits, creating a striking visual effect. This low-maintenance plant is perfect for adding a lush, exotic touch to your home or office. It prefers bright, indirect light and moderate watering to stay healthy and vibrant.', 75.00, 100, '/images/products/monstera.jpg', '2025-12-15 13:02:35.546986', 4.8, 90);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (3, 'Rubber Plant in Decorative Pot', 1, 'The Rubber Plant features large, shiny, oval-shaped leaves that create a bold, lush appearance. Its sturdy stem supports a dense canopy of vibrant green foliage, making it an excellent choice for adding a touch of greenery to any space. The plant comes in a stylish decorative pot, perfect for modern interiors. It thrives in bright, indirect light and requires minimal maintenance.', 70.00, 100, '/images/products/rubber-plant.jpg', '2025-12-15 13:02:35.546986', 3.4, 198);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (4, 'Fiddle Leaf Fig Tree', 1, 'The Fiddle Leaf Fig Tree features large, glossy, violin-shaped leaves that add a dramatic touch to any interior. Its tall, slender trunk supports a canopy of vibrant green leaves with prominent veins. This plant is perfect for creating a statement piece in living rooms or offices. Easy to care for with moderate light and watering needs, it brings a touch of nature''s elegance indoors.', 85.00, 100, '/images/products/fiddle-leaf.jpg', '2025-12-15 13:02:35.546986', 5.0, 185);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (5, 'Haworthia in Modern Pot', 2, 'This striking Haworthia features rosette-shaped, spiky green leaves with white banding, planted in a sleek, modern pot. Its compact size and distinctive pattern make it an eye-catching addition to any desk or shelf. The plant prefers bright, indirect light and infrequent watering, making it ideal for busy urban dwellers. Its architectural form adds a contemporary touch to interior decor.', 19.99, 100, '/images/products/haworthia.jpg', '2025-12-15 13:02:46.785778', 4.2, 21);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (6, 'Sedum in Succulent Tray', 2, 'This arrangement features a variety of Sedum succulents displayed in a shallow tray, creating a lush, textured green mat. The plants have small, rounded leaves with a slightly glossy finish, perfect for tabletop or windowsill display. Easy to care for, Sedum thrives in well-drained soil and bright light. Its diverse forms and colors add visual interest to any modern space.', 18.75, 100, '/images/products/sedum.jpg', '2025-12-15 13:02:46.785778', 5.0, 257);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (7, 'Aloe Vera in Decorative Container', 2, 'This classic Aloe Vera features thick, spiky green leaves with serrated edges, housed in a stylish decorative container. Known for its medicinal properties, the Aloe Vera is a low-maintenance succulent that prefers bright, direct sunlight. Its upright growth and vibrant appearance make it an excellent addition to kitchens or living rooms. The container adds a modern touch, complementing contemporary interior styles.', 22.50, 100, '/images/products/aloe-vera.jpg', '2025-12-15 13:02:46.785778', 4.6, 208);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (20, 'Thyme in Decorative Pot', 6, 'Compact and aromatic thyme plant housed in a stylish pot. Easy to grow and perfect for adding fresh flavor to home-cooked meals.', 15.75, 100, '/images/products/thyme.jpg', '2025-12-15 13:03:16.515292', 4.1, 186);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (15, 'Anthurium with Red Blooms', 4, 'Anthurium features glossy heart-shaped leaves and vibrant red flowers that last for weeks. This striking plant adds a bold, tropical accent to modern interiors and thrives in bright, indirect light.', 44.50, 100, '/images/products/anthurium.jpg', '2025-12-15 13:03:00.800522', 3.3, 254);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (14, 'Phalaenopsis Orchid', 11, 'This Phalaenopsis Orchid showcases delicate, long-lasting blooms in soft pastel tones. Its elegant arching stems and glossy green leaves make it a luxurious centerpiece for any room. Prefers bright, indirect light and occasional watering.', 49.99, 100, '/images/products/phalaenopsis-orchid.jpg', '2025-12-15 13:03:00.800522', 3.5, 254);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (58, 'Oncidium Dancing Lady Orchid', 11, 'The Oncidium “Dancing Lady” Orchid is known for its delicate, bright yellow flowers that resemble dancing figures. Light, elegant, and full of movement, this orchid adds a cheerful accent to any interior. It thrives in bright, indirect light and moderate watering.', 57.00, 70, '/images/products/oncidium_dancing_lady.jpg', '2026-01-09 13:46:44.393706', 4.9, 128);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (59, 'Phalaenopsis Pink Orchid', 11, 'This Phalaenopsis Pink Orchid features soft pink petals that add warmth and charm to your living space. Its delicate appearance is balanced by its resilience, making it a perfect choice for both beginners and experienced plant lovers.', 58.00, 75, '/images/products/phalaenopsis_pink.jpg', '2026-01-09 13:46:44.393706', 4.7, 96);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (60, 'Dendrobium Orchid', 11, 'The Dendrobium Orchid is admired for its slender stems and clusters of vibrant flowers. It brings an exotic and fresh feel to modern interiors and prefers bright light with gentle watering. A beautiful accent plant for shelves or tables.', 62.00, 60, '/images/products/dendrobium_orchid.jpg', '2026-01-09 13:46:44.393706', 4.5, 73);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (61, 'Cattleya Orchid', 11, 'Known as the queen of orchids, the Cattleya Orchid boasts large, fragrant blooms with rich colors and dramatic shapes. This orchid is perfect for creating a statement and thrives in well-lit spaces with good air circulation.', 70.00, 50, '/images/products/cattleya_orchid.jpg', '2026-01-09 13:46:44.393706', 4.8, 112);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (31, 'Minimalist Ceramic Planter', 10, 'A clean, modern ceramic planter with a smooth matte finish. Perfect for contemporary interiors.', 24.99, 100, '/images/products/ceramic-planter.jpg', '2025-12-15 13:03:29.560426', 4.6, 30);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (32, 'Textured Stone Pot', 10, 'This stone-finish planter adds a natural, earthy feel to your space. Ideal for medium-sized plants.', 32.50, 100, '/images/products/stone-pot.jpg', '2025-12-15 13:03:29.560426', 4.6, 170);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (33, 'Hanging Macrame Planter', 10, 'Handcrafted macrame planter designed for hanging plants. Adds warmth and texture to any room.', 27.99, 100, '/images/products/macrame-planter.jpg', '2025-12-15 13:03:29.560426', 4.0, 29);
INSERT INTO public.products (id, name, category_id, description, price, stock, image_url, created_at, rating_avg, rating_count) VALUES (34, 'Large Concrete Floor Planter', 10, 'A bold concrete planter ideal for statement plants. Its neutral tone complements modern and industrial interiors.', 59.99, 100, '/images/products/concrete-planter.jpg', '2025-12-15 13:03:29.560426', 4.4, 109);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users (id, email, password, name, created_at) VALUES (1, 'yulia@mail.ru', '$2a$10$FVD5CF4PKo0RttNgSi8HS.YZnfywy.BPB6ROpmMcW30hBinEXInXm', 'Yulia', '2025-11-19 12:48:57.524916');
INSERT INTO public.users (id, email, password, name, created_at) VALUES (2, 'bakhanovayu@gmail.com', '$2b$10$c.OXMfTw9hoFYgnXU9VW6uFSWI8Jwo6rZklK1eFMcR7.TII30giuy', 'Yulia', '2025-11-28 20:59:14.049253');
INSERT INTO public.users (id, email, password, name, created_at) VALUES (3, 'asd@asd.com', '$2b$10$.l9pUuEP2TNbPoZycZ0bV.eUVss4pyLgH5nasi3gSL2U70GJu0TP.', 'asd', '2026-01-07 13:40:09.503117');


--
-- Name: cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cart_id_seq', 81, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_id_seq', 11, true);


--
-- Name: favorites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.favorites_id_seq', 83, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_id_seq', 61, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (id);


--
-- Name: cart cart_user_id_product_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_user_id_product_id_key UNIQUE (user_id, product_id);


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: categories categories_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_slug_key UNIQUE (slug);


--
-- Name: favourites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (id);


--
-- Name: favourites favorites_user_id_product_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT favorites_user_id_product_id_key UNIQUE (user_id, product_id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: cart cart_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: favourites favorites_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT favorites_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- PostgreSQL database dump complete
--

\unrestrict 6gBIxgHrVk7amDgAPom0XwASw525FavR3EPa2XU4Pwi7oucMZq6g3QtwZFGeggH

