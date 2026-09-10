# Inventory Management System

A simple full-stack inventory management app built with React, Node.js/Express, and MongoDB.

## Structure

- `backend/` — Express + MongoDB REST API
- `frontend/` — React (Vite) UI

## Running locally

### Backend

```
cd backend
copy .env.example .env   # set MONGO_URI if needed
npm install
npm run dev
```

Runs on http://localhost:5000

### Frontend

```
cd frontend
copy .env.example .env
npm install
npm run dev
```

Runs on http://localhost:5173

## API

- `POST /products` — create a product
- `GET /products` — list all products
- `PUT /products/:id` — update a product
- `DELETE /products/:id` — delete a product
- `GET /products/low-stock` — list products where quantity <= minStock
