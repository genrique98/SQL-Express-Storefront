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

docker exec <container_name> npm run <migration_script>
docker exec -it sql-express-storefront_web_1 npm run delete
docker run -p 3000:3000 sql-express-storefront

To check database connection, run:
`docker exec -it sql-express-storefront_postgres_1 bash`, and `psql -U user storefront_dev` and `\conninfo`

# Database set up
To create the tables, use psql to run:

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(150),
    lastName VARCHAR(150),
    username VARCHAR(150),
    password VARCHAR(100)
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150),
    price integer,
    category VARCHAR(100)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    status VARCHAR(15),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    order_id INTEGER REFERENCES orders(id)
);

# Endpoints
First, create a user in database
Then, authenticate to receive token
Use token to navigate to other endpoints succesfully

## Users
- '/users' [post] : create user
- '/auth' [post] : authenticate user
- '/users' [get] : show all users [token required]
- '/users/:id' [get] : show user with id [token required]

## Products
- '/products' [get] : show all users [token required]
- '/products/:id' [get] : show product with id [token required]
- '/products' [post] : create product [token required]

## Orders
- '/orders' [get] : show all orders [token required]
- '/orders/users/:id' [get] : show current cart of user, including products and quantity in cart [token required]
- '/orders' [post] : create order [token required]
- '/orders/:id/products'[post] : add product to cart(order) of id [token required]

# Testing
To test the data models, run `npm run test`


<!-- # Features -->

