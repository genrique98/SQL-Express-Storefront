# Storefront Backend Project

### 6. QA and `README.md`

Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database. 

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!



# Local Set Up 
run: `npm install` and `npm run watch`, then navigate to `http://localhost:3000`

# Docker set up
run: `docker build -t sql-express-storefront .` and `docker compose up`, then navigate to `http://localhost:3000`

To check database, run:
`docker exec -it sql-express-storefront_postgres_1 bash`, and `psql -U user storefront_dev` and `\conninfo`

<!-- # Features -->
