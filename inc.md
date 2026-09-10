Build a simple full-stack Inventory Management System for an internship assessment.

The project must use:

Frontend: React

Backend: Node.js + Express.js

Database: MongoDB

API style: REST API

Keep the implementation simple, clean, readable, and beginner/interview-friendly. Do not over-engineer the application. Do not add unnecessary libraries, features, authentication, dashboards, charts, Redux, TypeScript, Docker, or other functionality that is not required below.

1. Project Objective

Build a small application to manage products and inventory.

The application should allow the user to:

Add products

View all products

Update products

Delete products

Search products by name

Filter products by category

Identify low-stock products

The main priority is clean logic, proper structure, functionality, error handling, and code that is easy to explain during an interview.

2. Backend Requirements

Create a Node.js + Express.js backend connected to MongoDB.

Product Data Model

Each product must contain exactly these main fields:

id

name

category

price

quantity

minStock

createdAt

Use MongoDB for storing the products.

Use a simple Mongoose schema.

The id can be generated automatically for each product.

createdAt should be automatically generated when a product is created.

3. REST APIs

Implement exactly these APIs:

Add Product

POST /products

Used to create a new product.

Request body:

{
  "name": "Laptop",
  "category": "Electronics",
  "price": 50000,
  "quantity": 10,
  "minStock": 3
}

Return the created product.

Get All Products

GET /products

Return all products from MongoDB.

Update Product

PUT /products/:id

Update an existing product using its ID.

The frontend should be able to edit:

name

category

price

quantity

minStock

Return the updated product.

Delete Product

DELETE /products/:id

Delete a product using its ID.

Return a simple success response.

Get Low Stock Products

GET /products/low-stock

Return products where:

quantity <= minStock

This API should return only low-stock products.

4. Error Handling

Handle basic errors properly.

Examples:

Invalid product ID

Product not found

Missing required fields

Invalid price

Invalid quantity

Invalid minStock

MongoDB/database errors

Server errors

Return appropriate HTTP status codes and simple JSON error messages.

Example:

{
  "message": "Product not found"
}

Do not create a complicated error-handling system. Keep it simple and easy to understand.

5. Backend Structure

Use a clean and simple structure similar to:

backend/
│
├── models/
│   └── Product.js
│
├── routes/
│   └── productRoutes.js
│
├── controllers/
│   └── productController.js
│
├── server.js
├── package.json
└── .env

Keep responsibilities clear:

Product.js → MongoDB/Mongoose schema

productController.js → application logic

productRoutes.js → API routes

server.js → Express server and MongoDB connection

Do not create unnecessary folders or abstractions.

6. Frontend Requirements

Create the frontend using React.

The UI should allow the user to:

Add Product

Provide a simple form with:

Name

Category

Price

Quantity

Minimum Stock

Include an Add Product button.

Validate the basic fields before submitting.

View Products

Display all products in a clean table.

The table should show:

Name

Category

Price

Quantity

Minimum Stock

Created At

Actions

Actions should contain:

Edit

Delete

Update Product

When the user clicks Edit:

Show the existing product information in the form.

Allow the user to modify it.

Save the changes using the PUT API.

Keep the edit functionality simple.

Delete Product

When Delete is clicked:

Ask for simple confirmation.

Delete the product using the DELETE API.

Refresh the product list.

7. Search by Name

Add a search input.

The user should be able to search products by name.

Example:

Search: laptop

Only products whose name matches the search should be displayed.

The search can be implemented on the frontend using the products already retrieved from the backend.

Keep the implementation simple.

8. Filter by Category

Add a category filter.

The category dropdown should allow the user to filter products by category.

Example:

All Categories
Electronics
Clothing
Food

The categories should be based on the available product data rather than being unnecessarily hardcoded.

9. Low Stock Highlighting

A product is considered low stock when:

quantity <= minStock

Low-stock products must be clearly highlighted in the product table.

For example, the entire row can have a different background or the quantity can be highlighted.

Do not add complicated UI components.

The frontend should also use:

GET /products/low-stock

when appropriate for the low-stock functionality.

10. Frontend Structure

Use a simple React structure such as:

frontend/
│
├── src/
│   ├── components/
│   │   ├── ProductForm.jsx
│   │   └── ProductList.jsx
│   │
│   ├── services/
│   │   └── productService.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── .env

Keep React state management simple using React's built-in:

useState
useEffect

Do not use Redux or another state-management library.

Use a simple service file for API calls.

11. UI Requirements

Create a clean and simple interface.

The UI should contain:

Application title: Inventory Management System

Add/Edit product form

Search input

Category filter

Product table

Edit button

Delete button

Low-stock highlighting

The design should be professional but simple.

Do not spend excessive effort on animations or complicated UI.

The application should be easy to demonstrate during an interview.

12. API Integration

The React frontend must communicate with the Node.js backend through REST APIs.

Use:

POST /products
GET /products
PUT /products/:id
DELETE /products/:id
GET /products/low-stock

Handle loading and error states appropriately.

After adding, updating, or deleting a product, make sure the displayed product list is updated.

13. Environment Variables

Use environment variables for the MongoDB connection string.

Example:

MONGO_URI=mongodb://localhost:27017/inventory\
PORT=5000

Do not hardcode sensitive configuration values in the source code.

Provide .env.example files where appropriate.