<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  <a href="https://nextjs.org/" target="blank"><img src="https://assets.vercel.com/image/upload/v1662131169/nextjs/Icon_dark_background.png" width="100" alt="Next.js Logo" /></a>
</p>

<h1 align="center">E-Commerce Order Management System</h1>

<p align="center">
  Full-Stack Coding Challenge • <strong>NestJS + Next.js 14 + PostgreSQL + TailwindCSS</strong>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white" />
</p>  

<p align="center">
  <a href="https://ecommerce-backend-eta-sandy.vercel.app/api/docs#"><img src="https://img.shields.io/badge/Swagger%20API-Docs-blueviolet?style=for-the-badge&logo=swagger" alt="Swagger Docs"></a>
</p>

---

## Features Implemented

## Features Implemented

| Requirement                                   | Status | Implementation |
|-----------------------------------------------|--------|----------------|
| `ORDERS` table (`id`, `orderDescription`, `createdAt`) | ✅ Done | SERIAL PK, TIMESTAMP |
| `PRODUCTS` table with 4 items pre-seeded      | ✅ Done | Auto-seeded on startup |
| `OrderProductMap` join table                  | ✅ Done | Correct foreign key mapping |
| Full CRUD API at `/api/orders`                | ✅ Done | POST, GET, GET/:id, PUT, DELETE |
| GET `/api/orders` returns `productCount`      | ✅ Done | Matches wireframe |
| Safe DELETE (prevents foreign key violation)  | ✅ Done | Manual cleanup of mapping table before delete |
| Clean, reusable, testable code                | ✅ Done | Modular architecture, DTOs, services, error handling |
| Swagger/OpenAPI documentation                 | ✅ Done | Fully interactive docs |
| Deployment on Vercel                          | ✅ Done | Serverless deployment |
| Real hosted PostgreSQL                        | ✅ Done | Aiven Cloud (production-grade) |
| JWT Authentication                       | ✅ Done | Secure login and access control using JWT |

---

## Authentication

This backend API uses **JWT (JSON Web Token)** for authentication. The login endpoint allows users to authenticate and receive a JWT token that must be included in the headers for subsequent API requests.

### Authentication Endpoints

```http
POST   /api/auth/login     → Login with username and password and receive JWT token
POST   /api/auth/register  → Register a new user (admin endpoint)
```

## Example Request: Login

To log in, send a POST request to `/api/auth/login` with the following JSON body:

```json
{
  "username": "your_username",
  "password": "your_password"
}
```
Response:

```json
{
  "access_token": "your-jwt-token-here"
}
```

---

## API Endpoints

```http
GET    /api/orders           → List all orders + productCount
GET    /api/orders/:id       → Get single order with products
POST   /api/orders           → Create order (with productIds[])
PUT    /api/orders/:id       → Update order description + products
DELETE /api/orders/:id       → Delete order + cascade cleanup
GET    /api/products         → List all products
POST   /api/products         → Create new product
PUT    /api/products/:id     → Update product
DELETE /api/products/:id     → Delete product
POST   /api/auth/login       → Authenticate and receive JWT token
POST   /api/auth/register    → Register a new user
```

## Project Structure

```file
ecommerce-backend/
├── src/
│   ├── order/
│   │   ├── dto/
│   │   │   └── create-order.dto.ts       # orderDescription + productIds[]
│   │   ├── entities/
│   │   │   ├── order.entity.ts           # id, orderDescription, createdAt + OneToMany
│   │   │   └── order-product-map.entity.ts
│   │   ├── order.controller.ts          # REST API endpoints for /api/orders
│   │   ├── order.service.ts             # Business logic + safe delete
│   │   └── order.module.ts
│   │
│   ├── product/
│   │   ├── dto/
│   │   │   ├── create-product.dto.ts
│   │   │   └── update-product.dto.ts
│   │   ├── product.controller.ts       # REST API endpoints for /api/products
│   │   ├── product.entity.ts           # id, productName, productDescription
│   │   ├── product.service.ts
│   │   └── product.module.ts
│   │
│   ├── auth/
│   │   ├── dto/
│   │   │   ├── login.dto.ts             # Login DTO for authentication
│   │   │   └── register.dto.ts          # Register DTO for creating new users
│   │   ├── entities/
│   │   │   └── user.entity.ts           # User entity with username and password
│   │   ├── auth.controller.ts           # REST API endpoints for authentication
│   │   ├── auth.service.ts              # JWT authentication logic
│   │   ├── jwt.strategy.ts              # JWT validation and strategy
│   │   └── auth.module.ts               # Module for authentication
│   │
│   ├── app.module.ts                   # Root module importing OrderModule, ProductModule, AuthModule
│
├── .env.example                        # Database credentials template
├── README.md                           # Project documentation

```
---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ecommerce-order-system.git
cd ecommerce-order-system/backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
# Fill in your database credentials in the .env file
```

### 4. Run the application
```bash
npm run start:dev
```

### 5. Access Swagger API docs
```http
http://localhost:3000/api/docse
```

---

## Deployment

- Hosted on Vercel: Serverless backend.
- Database: PostgreSQL hosted on Aiven Cloud.

---

## Notes

- OrderProductMap ensures a many-to-many relation between orders and products.

- Safe delete prevents foreign key violations by cleaning up join table entries first.

- All API endpoints are fully documented in Swagger.

- Pre-seeded products make testing easy.

---