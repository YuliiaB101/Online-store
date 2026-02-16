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

🌐 **Live Demo:** https://online-store-ohub.onrender.com  
🎥 **Video Walkthrough:** *(add link here)*  

---

## Screenshots

### Home Page
![Home](./docs/home.png)

### Product Catalog
![Products](./docs/products.png)

### Checkout Flow
![Checkout](./docs/checkout.png)

---

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
