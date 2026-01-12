# Online Store – FLORIA

**FLORIA** is a full-stack e-commerce single-page application built with **React, TypeScript, Node.js and PostgreSQL**.

The project focuses on a calm, nature-inspired user interface with soft shapes and earthy colors, combined with a **clear, accessible and trustworthy shopping experience** — following modern European UX and e-commerce standards.

FLORIA demonstrates a **production-oriented frontend architecture**, structured state management, secure authentication flows and seamless backend integration within a realistic business domain.

🌐 **[Live Demo](your-deployment-url-here)** 

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
- **Mobile**: 412px – 767px  
- **Tablet**: 768px – 1023px  
- **Laptop**: 1024px – 1279px  
- **Desktop**: 1280px – 1439px  
- **Wide Screens**: 1440px+

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

**Deployment**  
Docker, Docker Compose, Nginx

---

<details>
<summary><b>Getting Started & Deployment Guide</b></summary>

## Getting Started

### Prerequisites
- Docker and Docker Compose installed
- (Alternative) Node.js 18+, Yarn, PostgreSQL 15+

### Quick Start with Docker

1. Clone the repository:
```bash
git clone <repository-url>
cd Online-store
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Edit `.env` file and set your configuration (especially `JWT_SECRET` for production)

4. Build and run with Docker Compose:
```bash
docker-compose up --build
```

5. Access the application:
- Frontend: http://localhost
- Backend API: http://localhost:5000
- Database: localhost:5432

6. Stop the application:
```bash
docker-compose down
```

To remove all data including database volumes:
```bash
docker-compose down -v
```

### Manual Setup (Without Docker)

#### Backend Setup
```bash
cd backend
yarn install
cp ../.env.example .env
# Configure database credentials in .env
yarn dev
```

#### Frontend Setup
```bash
cd frontend
yarn install
yarn start
```

#### Database Setup
Create a PostgreSQL database and run the SQL script:
```bash
psql -U postgres -d online_store -f backend/config/database.sql
```

---

## Docker Architecture

The application uses a **multi-container Docker setup**:

### Services
- **Frontend**: React app served by Nginx (port 80)
- **Backend**: Node.js API server (port 5000)
- **PostgreSQL**: Database server (port 5432)

### Features
- **Multi-stage builds** for optimized image sizes
- **Health checks** for service reliability
- **Volume persistence** for database data
- **Network isolation** with custom Docker network
- **Production-ready Nginx** configuration with gzip, caching, and security headers

### Production Deployment Notes
- Change `JWT_SECRET` in `.env` to a secure random string
- Update `DB_PASSWORD` to a strong password
- Consider using Docker secrets for sensitive data
- Set up SSL/TLS certificates for HTTPS
- Configure proper firewall rules
- Use environment-specific `.env` files

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
