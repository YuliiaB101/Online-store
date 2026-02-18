# Online Store – FLORIA

![TypeScript](https://img.shields.io/badge/TypeScript-blue)
![React](https://img.shields.io/badge/React-18-61DAFB)
![Redux%20Toolkit](https://img.shields.io/badge/Redux%20Toolkit-State%20Management-764ABC)
![React%20Router](https://img.shields.io/badge/React%20Router-Routing-CA4245)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933)
![Express](https://img.shields.io/badge/Express-API-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![REST%20API](https://img.shields.io/badge/API-REST-lightgrey)
![Render](https://img.shields.io/badge/Deploy-Render-46E3B7)

FLORIA is a full-stack e-commerce single-page application built with React, TypeScript, Node.js and PostgreSQL, simulating a realistic online retail environment.

The project focuses on production-oriented frontend architecture, structured state management, secure authentication flows and realistic business logic implementation.

🎥 **Video Walkthrough:** _(add link here)_

---

## Preview

<p align="center" verticalAlign="top">
  <img src="./docs/screenshots/home-full.png" width="32%" style="vertical-align: top" />
  <img src="./docs/screenshots/products-full.png" width="32%" style="vertical-align: top" />
  <img src="./docs/screenshots/cart-full.png" width="32%" style="vertical-align: top" />
</p>

## User Journey

This section illustrates a typical user flow through the application — from browsing products to completing an order.

### 1️⃣ Landing & Product Discovery

Users land on the homepage, explore curated products and navigate to the catalog.

<details>
<summary>View screenshots</summary>

The homepage is divided into distinct visual sections to guide user attention and preserve hierarchy.

**Home – Hero Section**
![Home – Hero Section](./docs/screenshots/home-top.png)

**Home – Products & Categories**
![Home – Products & Categories](./docs/screenshots/home-main.png)

**Home – Information Blocks & Footer**
![Home – Information Blocks & Footer](./docs/screenshots/home-footer.png)

</details>

### 2️⃣ Browsing & Filtering Products

Users can filter products by category, sort by different criteria and search in real time.

<details>
<summary>View screenshots</summary>

**Products – Default View**
![Products – Default View](./docs/screenshots/products-default.png)

**Products – Filtered by "Outdoor Plants"**
![Products – Filtered by "Outdoor Plants"](./docs/screenshots/products-filtered.png)

</details>

### 3️⃣ Authentication (required for cart & favourites)

Users can register or log in to manage their cart, favourites and orders.

<details>
<summary>View screenshot</summary>

**Login**
![Login](./docs/screenshots/login.png)

</details>

### 4️⃣ Shopping Cart Management

Users can adjust quantities, remove items and see live total calculations.

<details>
<summary>View screenshot</summary>

**Cart**
![Cart](./docs/screenshots/cart.png)

</details>

### 5️⃣ Checkout Flow (Multi-step Form)

A structured 5-step checkout process with form validation ensures clear user progression and controlled data entry.

<details>
<summary>View screenshots</summary>

**Checkout Flow**

<p align="center">
  <img src="./docs/screenshots/checkout-step-1.png" width="48%" style="vertical-align: top;" />
  <img src="./docs/screenshots/checkout-review.png" width="48%" style="vertical-align: top;" />
</p>

</details>

### 6️⃣ Personalised Experience – Favourites

Authenticated users can manage saved items separately from the shopping cart.  
This demonstrates user-specific state handling and protected routes.

<details>
<summary>View screenshot</summary>

![Favourites](./docs/screenshots/favourites.png)

</details>

This journey demonstrates how the application handles product discovery, state management, user authentication and transactional flows within a cohesive and consistent UI system.

---

## Responsive Design

<details>
<summary>View screenshots</summary>

<div style="display: flex; gap: 24px; align-items: flex-start;">
  <div style="flex: 1;">
    <img src="./docs/screenshots/mobile-home-full.png" width="100%" />
  </div>

  <div style="flex: 1; display: flex; flex-direction: column; gap: 40px;">
    <img src="./docs/screenshots/mobile-products-filtered.png" width="100%" />
    <img src="./docs/screenshots/mobile-product.png" width="100%" />
    <img src="./docs/screenshots/mobile-checkout-step-2.png" width="100%" />
  </div>
</div>

</details>

## Project Overview

FLORIA simulates a realistic online store environment and demonstrates:

✔ Scalable React architecture  
✔ Predictable state management using Redux Toolkit  
✔ REST API integration  
✔ JWT-based authentication  
✔ Secure password handling with bcrypt  
✔ Multi-step checkout logic  
✔ Responsive layout across multiple breakpoints

---

## Architecture Highlights

- Clear separation between frontend and backend
- Redux slices structured by domain responsibility
- Form validation using Formik + Yup
- Protected routes with token-based session handling
- Modular SCSS architecture
- RESTful backend with PostgreSQL relational schema

---

## Key Functional Areas

### Product & Catalog

- Product listing with filtering and sorting
- Category-based navigation
- Real-time search with user feedback

### Shopping Experience

- Cart management with quantity updates
- Favourites system
- Multi-step checkout (data → address → payment → review)

### Authentication

- Registration and login with validation
- JWT session handling
- Protected routes

### Informational Pages

- About
- Contacts
- Plant Care
- Customer information (shipping, returns, payments)

---

## Setup

<details>
<summary>Click to expand deployment steps</summary>

### Deployment on Render

<details>
<summary><b>Manual Setup</b></summary>

1. PostgreSQL Database:
   - Create new PostgreSQL database on Render
   - Go to database **Shell** tab
   - Run entire `backend/config/database.sql` script

2. Backend Web Service:
   - Runtime: Node
   - Build: `cd backend && yarn install && yarn build`
   - Start: `cd backend && yarn dev`
   - Environment variables:
     - `DATABASE_URL` (copy from database connection string)
     - `JWT_SECRET` (generate random string)
     - `PORT=5000`
     - `NODE_ENV=production`

3. Frontend Static Site:
   - Build: `cd frontend && yarn install && yarn build`
   - Publish: `frontend/build`
   - Environment variables:
     - `REACT_APP_API_URL` (backend URL + /api, e.g. `https://floria-backend.onrender.com/api`)

</details>

<details>
<summary><b>Local Development Setup</b></summary>

#### Prerequisites

- Node.js 18+
- Yarn
- PostgreSQL 15+

#### Setup Instructions

1. Clone the repository:

```bash
git clone <repository-url>
cd Online-store
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Edit `.env` file and configure your database credentials and JWT secret

4. Setup and run the backend:

```bash
cd backend
yarn install
yarn dev
```

5. Setup and run the frontend (in a new terminal):

```bash
cd frontend
yarn install
yarn start
```

6. Initialize the database:

```bash
psql -U postgres -d online_store -f backend/config/database.sql
```

7. Access the application:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

</details>
</details>

## What This Project Demonstrates

### Frontend

- Building scalable React applications with TypeScript
- Designing reusable UI components
- Managing global state with Redux Toolkit
- Implementing multi-step forms with validation
- Handling async data flows and loading states
- Responsive layout design with SCSS Modules

### Backend

- Designing relational database schemas in PostgreSQL
- Implementing REST APIs with Express
- Managing authentication with JWT
- Ensuring secure password handling with bcrypt
- Maintaining data consistency between client and server

### Engineering Practices

- Clear separation of concerns
- Incremental feature development
- Refactoring for maintainability
- Debugging asynchronous UI issues
- Applying documentation-driven development

---

## Responsive Design

The application is fully responsive and optimized for modern devices.

### Breakpoints

- **Mobile**: ≥ 412px
- **Tablet**: ≥ 768px
- **Desktop**: ≥ 1024px
- **Wide screens**: ≥ 1440px

### Adaptive Features

- Flexible grid layouts (1–5 columns)
- Touch-friendly controls
- Adaptive typography and spacing
- Collapsible filters on small screens
- Responsive navigation optimized for mobile devices

Minimum supported screen width: **412px**

---

## Tech Stack

### Frontend

- React 18
- TypeScript
- Redux Toolkit
- React Router
- Formik
- Yup
- SCSS Modules

### Backend

- Node.js
- Express
- TypeScript
- PostgreSQL

### Authentication & Security

- JWT
- bcrypt

### API & Communication

- REST API
- Axios

### Deployment

- Render

---

## Future Improvements

- Automated test coverage (frontend & backend)
- Performance optimization
- Improved error handling and logging
- Docker-based containerization
- CI/CD integration

## Disclaimer

This project was created for **educational and portfolio purposes only**.  
No real payments are processed.  
All images and third-party assets are used for demonstration purposes.  
All rights belong to their respective owners.
