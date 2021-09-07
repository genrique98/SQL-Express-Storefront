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

run: `npm install` and `npm run watch`, then navigate to `http://localhost:3000`

# Docker set up
In the .env file, change:

POSTGRES_HOST=postgres
POSTGRES_USER=user

run: `docker build -t sql-express-storefront .` and `docker compose up`, then navigate to `http://localhost:3000`

<!-- To check database connection, run:
`docker exec -it sql-express-storefront_postgres_1 bash`, and `psql -U user storefront_dev` and `\conninfo` -->

# Database set up
- To create the database, use psql to run: `CREATE DATABASE storefront_dev;`
- To create the tables, run: `npm run migrate`

# Testing
To test the data models, run `npm run test`

<!-- # Features -->