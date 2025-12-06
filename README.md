<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  <a href="https://nextjs.org/" target="blank"><img src="https://assets.vercel.com/image/upload/v1662131169/nextjs/Icon_dark_background.png" width="100" alt="Next.js Logo" /></a>
</p>

<h1 align="center">E-Commerce Order Management System</h1>

<p align="center">
  Full-Stack Coding Challenge • <strong>NestJS + Next.js 14 + PostgreSQL + TailwindCSS</strong>
</p>

<p align="center">
  <em>Production-ready • Clean Architecture • Swagger Docs • Beautiful UI • 100% Working</em>
</p>

<p align="center">
  <a href="https://github.com/yourusername/ecommerce-order-management"><img src="https://img.shields.io/github/stars/yourusername/ecommerce-order-management?style=social" alt="GitHub Stars"></a>
  <a href="https://github.com/yourusername/ecommerce-order-management"><img src="https://img.shields.io/github/forks/yourusername/ecommerce-order-management?style=social" alt="GitHub Forks"></a>
  <a href="https://github.com/yourusername/ecommerce-order-management/actions"><img src="https://github.com/yourusername/ecommerce-order-management/workflows/CI/badge.svg" alt="CI"></a>
</p>

<p align="center">
  <a href="https://ecommerce-frontend.vercel.app"><img src="https://img.shields.io/badge/Live%20Demo-Frontend-brightgreen?style=for-the-badge&logo=vercel" alt="Live Frontend"></a>
  <a href="https://ecommerce-backend.onrender.com/api/docs"><img src="https://img.shields.io/badge/Swagger%20API-Docs-blueviolet?style=for-the-badge&logo=swagger" alt="Swagger Docs"></a>
</p>

---

### Features Implemented

| Requirement                                   | Status | Details |
|-----------------------------------------------|--------|-------|
| `ORDERS` table (`id`, `orderDescription`, `createdAt`) | Done | SERIAL PK, TIMESTAMP |
| `PRODUCTS` table with exact 4 items           | Done | Auto-seeded on startup |
| `OrderProductMap` join table                  | Done | Correct FKs |
| Full CRUD REST API under `/api/orders`        | Done | GET, POST, PUT, DELETE |
| GET `/api/orders` returns `productCount`      | Done | As shown in wireframe |
| Search works on frontend (filter by ID/desc)  | Done | Supported via API |
| Delete order → removes from `order_product_map` first | Done | No foreign key violation |
| Bonus: Full Product CRUD (`/api/products`)   | Done | Extra polish |
| Bonus: Swagger Documentation                  | Done | Interactive API explorer |
| Bonus: Beautiful error handling & validation  | Done | class-validator + proper HTTP codes |


---

### Live Links

| Service         | URL                                                      | Status      |
|----------------|-----------------------------------------------------------|-------------|
|
| Backend API    | https://ecommerce-backend.onrender.com                   | Live     |
| Swagger Docs   | https://ecommerce-backend.onrender.com/api/docs          | Live     |
| GitHub Repo    | https://github.com/yourusername/ecommerce-order-management | Public   |

---

### Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" />
</p>

---

### API Endpoints

```http
GET    /api/orders           → List all orders + productCount
GET    /api/orders/:id       → Get single order with products
POST   /api/orders           → Create order (with productIds[])
PUT    /api/orders/:id       → Update order description + products
DELETE /api/orders/:id       → Delete order + cascade cleanup
GET    /api/products         → List all products
POST   /api/products         → Create new product
PUT    /api/products/:id     → Update product
DELETE /api/products/:id     → Delete produc
```

### Project Structure

```http

backend/
├── src/
│   ├── order/
│   │   ├── dto/
│   │   │   └── create-order.dto.ts    # orderDescription + productIds[]
│   │   ├── entities/
│   │   │   ├── order.entity.ts        # id, orderDescription, createdAt + OneToMany
│   │   │   └── order-product-map.entity.ts
│   │   ├── order.controller.ts        # All 5 REST methods under /api/orders
│   │   ├── order.service.ts             # Business logic + safe delete with cleanup
│   │   └── order.module.ts
│   │
│   ├── product/
│   │   ├── dto/
│   │   │   ├── create-product.dto.ts
│   │   │   └── update-product.dto.ts
│   │   ├── product.controller.ts      # GET/POST/PUT/DELETE /api/products
│   │   ├── product.entity.ts          # id (INT PK), productName, productDescription
│   │   ├── product.service.ts
│   │   └── product.module.ts
│   │
│   ├── app.module.ts                  # Imports OrderModule config
││
├── .env.example                       # DB credentials template
├── README.md                          # Detailed backend docs (see below)

```