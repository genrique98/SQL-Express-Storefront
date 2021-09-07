# Storefront Backend Project
Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database. 

# Local Set Up 
Add a .env file with the following variables:

POSTGRES_HOST=postgres
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=storefront_dev
POSTGRES_TEST_DB=storefront_test
ENV=dev
BCRYPT_PASSWORD=(your_password)
SALT_ROUNDS=10
TOKEN_SECRET=(your_token)
PORT=3000

In database.json, set "host": "localhost" and "user":"postgres"
run: `npm install` and `npm run watch`, then navigate to `http://localhost:3000`

# Docker set up
In the .env file, change:

POSTGRES_HOST=localhost
POSTGRES_USER=postgres

In database.json, set "host": "postgres" and "user":"user"
run: `docker build -t sql-express-storefront .` and `docker compose up`, then navigate to `http://localhost:3000`

<!-- To check database connection, run:
`docker exec -it sql-express-storefront_postgres_1 bash`, and `psql -U user storefront_dev` and `\conninfo` -->

# Database set up
- To create the database, use psql to run: `CREATE DATABASE storefront_dev;`
- To create the tables, run: `npm run migrate`

# Testing
To test the data models, run `npm run test`

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
    - 
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


<!-- # Features -->

