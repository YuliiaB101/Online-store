# Online Store – FLORIA

**FLORIA** is a full-stack e-commerce single-page application built with **React, TypeScript, Node.js and PostgreSQL**.

The project focuses on a calm, nature-inspired user interface with soft shapes and earthy colors, combined with a **clear, accessible and trustworthy shopping experience** — following modern European UX and e-commerce standards.

FLORIA demonstrates a **production-oriented frontend architecture**, structured state management, secure authentication flows and seamless backend integration within a realistic business domain.

🌐 **[Live Demo](https://online-store-ohub.onrender.com)**

---

## Key Features

✔ React + TypeScript single-page application  
✔ Product catalog with search, filtering and sorting  
✔ User authentication (Login / Registration) with validation  
✔ Favourites and shopping cart functionality  
✔ Multi-step checkout flow with form validation  
✔ Search functionality with clear user feedback  
✔ Informational pages commonly used in modern e-commerce  
✔ REST API built with Node.js and Express  
✔ PostgreSQL database integration  
✔ Fully responsive UI with SCSS Modules

---

## Pages & Features

### Main Pages

- **Home** – Hero section, featured products, curated collections
- **Products** – Product catalog with filters and sorting
- **Product Detail** – Individual product view with add to cart and favourites
- **Cart** – Shopping cart with quantity control and order summary
- **Checkout** – Multi-step checkout (personal data → address → payment → review)
- **Favourites** – User-saved products
- **Search** – Global search with real-time filtering

### Authentication

- **Login** – Email/password authentication with validation
- **Register** – User registration with Formik + Yup
- Protected routes for authenticated users
- JWT-based session handling

### Information Pages

- **About Us** – Brand values and mission
- **Contacts** – Contact information, business hours, location
- **Plant Care** – Care instructions, tips and FAQ
- **For Customers** – Shipping, returns, payment and customer support information

---

## UX & Accessibility Considerations

Special attention was paid to usability and clarity:

- Clear navigation and predictable user flows
- Transparent checkout steps
- Visible form validation and error feedback
- Informational pages supporting user trust
- Calm, non-intrusive UI design
- Accessible typography and spacing

---

## Responsive Design

The application features a **fully responsive layout**, optimized for modern devices.

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

**Minimum supported screen width**: 412px

---

## Tech Stack

**Frontend**  
React 18, TypeScript, Redux Toolkit, React Router, Formik, Yup, SCSS Modules

**Backend**  
Node.js, Express, TypeScript, PostgreSQL

**Authentication**  
JWT, bcrypt

**HTTP / API**  
REST, Axios

**State Management**  
Redux Toolkit with persistence

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

---

## Why This Project

FLORIA was created as a **portfolio and learning project** to simulate a realistic e-commerce application.

The main goals were:

- clean and maintainable frontend architecture
- predictable state management
- reusable and scalable UI components
- robust form validation
- secure authentication flows
- clear separation between frontend and backend
- responsive design
- user trust through transparency and structure

---

## What I Learned

This project represents a significant learning milestone for me.  
FLORIA is my **second full-stack project** and my **first application built with a real relational database**.

During development, I gained hands-on experience across the entire application lifecycle — from UI design decisions to backend integration and state management.

### Frontend Development

- Building a scalable React application using **TypeScript**
- Designing reusable, composable UI components
- Managing global state with **Redux Toolkit**
- Implementing client-side routing with **React Router**
- Creating multi-step forms with **Formik and Yup**
- Handling form validation and error states in a user-friendly way
- Improving perceived performance using skeleton loaders and lazy loading
- Creating responsive layouts with **SCSS Modules** and custom breakpoints

### UX & UI Design

- Translating design ideas into consistent, maintainable components
- Working with spacing, typography and visual hierarchy
- Designing calm, accessible interfaces suitable for e-commerce
- Understanding how layout and feedback affect user trust

### Backend & Data Handling

- Designing a relational database schema using **PostgreSQL**
- Working with real product, category and user data
- Implementing REST APIs with **Node.js and Express**
- Connecting frontend and backend via Axios
- Handling asynchronous data fetching and loading states
- Managing authentication and protected routes using **JWT**
- Understanding data consistency between client and server

### Architecture & Best Practices

- Separating concerns between components, slices and services
- Structuring Redux slices for scalability
- Writing maintainable and readable code
- Debugging real-world issues (re-renders, flickering, async state)
- Learning how to refactor code when complexity increases
- Understanding trade-offs between simplicity and flexibility

### Development Process

- Planning features step by step instead of all at once
- Incrementally improving UI and UX based on testing and feedback
- Learning how to search, read and apply documentation effectively
- Becoming more confident in debugging and problem-solving
- Gaining experience with realistic project structure and workflows

---

## Next Steps

- Adding automated tests
- Performance optimizations
- Further UX refinements

---

## Disclaimer

This project was created for **educational and portfolio purposes only**.  
No real payments are processed.  
All images and third-party assets are used for demonstration purposes.  
All rights belong to their respective owners.
