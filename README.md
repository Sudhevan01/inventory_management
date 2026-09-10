# Inventory Management System

A simple full-stack **Inventory Management System** .

The application allows users to add, view, update, delete, search, and filter products. It also highlights products that have low stock.

## Technologies Used

- React
- Node.js
- Express.js
- MongoDB (MongoDB can be run locally for this project.)
- Mongoose
- REST API

## Features

- Add products
- View products
- Update products
- Delete products
- Search products by name
- Filter products by category
- Highlight low-stock products
- Basic form validation
- REST API integration
- MongoDB data storage
- Simple error handling

## Product Fields

Each product contains:

- `id`
- `name`
- `category`
- `price`
- `quantity`
- `minStock`
- `createdAt(Automatically fetched by current date)`

A product is considered low stock when:

```text
quantity <= minStock
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/products` | Create a new product |
| `GET` | `/products` | Get all products |
| `PUT` | `/products/:id` | Update an existing product |
| `DELETE` | `/products/:id` | Delete a product |
| `GET` | `/products/low-stock` | Get low-stock products |

### Add Product

```http
POST /products
```

Request body:

```json
{
  "name": "Laptop",
  "category": "Electronics",
  "price": 50000,
  "quantity": 10,
  "minStock": 3
}
```

### Get All Products

```http
GET /products
```

Returns all products stored in MongoDB.

### Update Product

```http
PUT /products/:id
```

Request body:

```json
{
  "name": "Updated Laptop",
  "category": "Electronics",
  "price": 55000,
  "quantity": 8,
  "minStock": 3
}
```

### Delete Product

```http
DELETE /products/:id
```

Deletes the product with the specified ID.

### Get Low-Stock Products

```http
GET /products/low-stock
```

Returns products where:

```text
quantity <= minStock
```

### Project Structure

inventory-management-system/
│
├── backend/
│   ├── controllers/
│   │   └── productController.js
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   │   └── productRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductForm.jsx
│   │   │   └── ProductList.jsx
│   │   ├── services/
│   │   │   └── productService.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md

### Backend Files

- `models/Product.js` — Defines the Mongoose product schema.
- `controllers/productController.js` — Contains the product CRUD and low-stock logic.
- `routes/productRoutes.js` — Defines the REST API routes.
- `server.js` — Starts the Express server and connects to MongoDB.

### Frontend Files

- `components/ProductForm.jsx` — Handles adding and editing products.
- `components/ProductList.jsx` — Displays products and provides edit/delete actions.
- `services/productService.js` — Contains frontend API request functions.
- `App.jsx` — Manages the main application state, search, filtering, and API integration.
- `main.jsx` — Entry point for the React application.

## Validation and Error Handling

The application handles basic errors, including:

- Missing required fields
- Invalid product IDs
- Product not found
- Invalid price
- Invalid quantity
- Invalid minimum stock
- MongoDB errors
- Server errors

Errors are returned as simple JSON responses.

Example:

```json
{
  "message": "Product not found"
}
```

## Assumptions

- `quantity <= minStock` means the product is low stock.
- Product IDs are generated automatically by MongoDB.
- `createdAt` is generated automatically when a product is created.
- Basic validation is performed before saving products.
- Product names are searched on the frontend using the loaded products.
- Categories are generated from the available product data.
- The frontend and backend run locally on separate ports during development.

## Possible Future Improvements

The following features could be added in the future:

- User authentication and authorization
- Pagination for large product lists
- Stock history tracking
- Better reporting
- Exporting inventory data in excel or other format

These improvements are not included in the current implementation to keep the project simple and focused on the assessment requirements.

## Demo Video

```text
Demo Video: The project demonstration video has been attached along with the internship assessment submission email.
```

Acknowledgement :

This README was written by me to provide a quick reference to the project, including its features, technologies, structure, setup instructions, and implementation details.
This project was developed as part of an internship assessment to demonstrate practical understanding of full-stack application development using React, Node.js, Express.js, and MongoDB.
The goal is to keep the implementation clean, maintainable, and easy to understand.
Thank you to Dev Creations for giving me this opportunity to work on the assessment. I’m glad to have the opportunity to learn and demonstrate my skills through this project. I look forward to hearing from you.
