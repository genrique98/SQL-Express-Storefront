/* Replace with your SQL commands */

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(150) NOT NULL,
    lastName VARCHAR(150) NOT NULL,
    username VARCHAR(150) NOT NULL,
    password VARCHAR(100) NOT NULL
);