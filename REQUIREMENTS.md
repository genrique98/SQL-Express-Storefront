# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)


# Database Schema

- users (id: SERIAL PRIMARY KEY, firstName: VARCHAR(150),lastName: VARCHAR(150), username: VARCHAR(150), password: VARCHAR(100))
- products (id: SERIAL PRIMARY KEY, name: VARCHAR(150), price: integer, category: VARCHAR(100))
- orders (id: SERIAL PRIMARY KEY, user_id: INTEGER [foreign key to users table], status: VARCHAR(15))
- order_products (product_id: INTEGER REFERENCES products(id), quantity: INTEGER, order_id: INTEGER REFERENCES orders(id))

# Endpoints

## Users
### Flow 
First, create a user in the database, authenticate to receive token, and then, use token to navigate to other endpoints succesfully, otherwise access will be denied.

- '/users' [post]
    - creates a user
    - { "firstName": "Gabriel", "lastName": "Ramirez", "username": "gabrielr", "password": "12345678" }
- '/auth' [post]
    - authenticates a user
    - { "username": "gabrielr", "password": "12345678" }
- '/users' [get] : [token required]
    - shows all users in database
- '/users/:id' [get] : [token required]
    - shows user with specific id 

## Products
### Flow 
First, create multiple products in the database, then, try requesting all products, or one product at a time.

- '/products' [post] : create product [token required]
    - { "name": "book", "price": "10", "category": "fiction" }
- '/products' [get] : [token required]
    - shows all users in database
- '/products/:id' [get] : [token required]
    - show product with specific id

## Orders
### Flow 
First, create an order in database, and create a cart by adding products to an order. Then, try requesting all the orders in the database or one at a time. Finall, try requesting the user's current cart by providing the user's id.

- '/orders' [post] : [token required]
    - creates an order
    - { "user_id": "1", "status": "active" }
- '/orders' [get] : [token required]
    - shows all orders in database
- '/orders/:id' [get] : [token required]
    - shows specific order
- '/orders/:id/products'[post] : [token required]
    - adds product to cart(order id). It inserts both the id (given in the endpoint) and product id into the table
    - { "productId": "1", "quantity": "2" }
- '/orders/users/:id' [get] : [token required]
    - shows user's current cart based on the user's id, including products and quantity in cart

### Responses
- When sending either a [post] or [get] request, the response will be complete models of the related table.
- users table : { "id": "1", "firstName": "Gabriel", "lastName": "Ramirez", "username": "gabrielr", "password": "(hash)" }
- products table : { "id": "1", "name": "book", "price": "10", "category": "fiction" }
- orders table : { "id": "1", "user_id": "1", "status": "active" }
- order_products table : { "productId": "1", "quantity": "2", "orderId": "1" }
- Exceptions:
    - Creating / authenticating a user will return a token
- Errors:
    - When sending [post] requests for creating orders or adding products to an order, the id in the request must already exist in their referenced tables (user_id in users table, for example), otherwise the request would violate the foreign key constraint in SQL.
    - Sending [post] requests with incomplete objects violates the not null constraint in SQL.
