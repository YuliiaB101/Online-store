# Online Store

Современный онлайн-магазин с минималистичным дизайном, построенный на React, Redux, Express и PostgreSQL.

## Особенности

- 🎨 Современный минималистичный дизайн (бело-серо-чёрно-голубая цветовая схема)
- 🔍 Поиск товаров по названию
- 📂 Фильтрация по категориям
- 🔄 Сортировка по цене, дате добавления и количеству лайков
- 🎠 Автоматически переключающиеся баннеры на главной странице
- 💝 Система избранного
- 🛒 Корзина покупок
- 👤 Авторизация и регистрация пользователей
- 📱 Адаптивный дизайн

## Технологии

### Backend
- Node.js + Express
- PostgreSQL
- JWT для аутентификации
- bcryptjs для хеширования паролей

### Frontend
- React 18
- Redux Toolkit
- React Router v6
- SCSS Modules
- Axios

## Установка и запуск

### Предварительные требования
- Node.js (v14+)
- PostgreSQL (v12+)
- Yarn

### 1. Клонирование репозитория

```bash
cd Online-store
```

### 2. Настройка базы данных

Создайте базу данных PostgreSQL и выполните SQL скрипт:

```bash
psql -U postgres < backend/config/database.sql
```

### 3. Настройка Backend

```bash
cd backend
yarn install
```

Создайте файл `.env` на основе `.env.example`:

```env
PORT=5000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=online_store
DB_PASSWORD=your_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key_here
```

Запуск сервера:

```bash
# Режим разработки
yarn dev

# Продакшн
yarn start
```

Сервер будет доступен на `http://localhost:5000`

### 4. Настройка Frontend

```bash
cd frontend
yarn install
```

Создайте файл `.env` на основе `.env.example`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Запуск приложения:

```bash
yarn start
```

Приложение будет доступно на `http://localhost:3000`

## API Endpoints

### Аутентификация
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход

### Товары
- `GET /api/products` - Получить все товары (с фильтрами и сортировкой)
- `GET /api/products/:id` - Получить товар по ID
- `POST /api/products/:id/like` - Лайкнуть товар

### Категории
- `GET /api/categories` - Получить все категории

### Баннеры
- `GET /api/banners` - Получить активные баннеры

### Избранное (требуется авторизация)
- `GET /api/favorites` - Получить избранные товары
- `POST /api/favorites/:productId` - Добавить в избранное
- `DELETE /api/favorites/:productId` - Удалить из избранного

### Корзина (требуется авторизация)
- `GET /api/cart` - Получить корзину
- `POST /api/cart` - Добавить товар в корзину
- `PUT /api/cart/:id` - Обновить количество
- `DELETE /api/cart/:id` - Удалить товар из корзины
- `DELETE /api/cart` - Очистить корзину

## Структура проекта

```
Online-store/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── database.sql
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── categories.js
│   │   ├── banners.js
│   │   ├── cart.js
│   │   └── favorites.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header/
│   │   │   ├── Carousel/
│   │   │   ├── Filters/
│   │   │   ├── ProductCard/
│   │   │   └── ProductGrid/
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── ProductDetail/
│   │   │   ├── Auth/
│   │   │   ├── Cart/
│   │   │   └── Favorites/
│   │   ├── store/
│   │   │   ├── slices/
│   │   │   └── index.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── index.css
│   ├── .env.example
│   └── package.json
└── README.md
```

## Цветовая схема

- **Primary**: #4A90E2 (голубой)
- **Secondary**: #2C3E50 (тёмно-серый)
- **Background**: #FFFFFF (белый)
- **Background Secondary**: #F5F7FA (светло-серый)
- **Border**: #E1E8ED (серый)
- **Text**: #333333 (чёрный)

## Возможности для развития

- [ ] Админ-панель для управления товарами
- [ ] Оформление заказов
- [ ] История заказов
- [ ] Отзывы о товарах
- [ ] Загрузка изображений
- [ ] Пагинация товаров
- [ ] Уведомления
- [ ] Восстановление пароля

## Лицензия

MIT
