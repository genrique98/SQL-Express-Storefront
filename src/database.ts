import pg from 'pg';
const { Pool } = pg;

const { 
    POSTGRES_HOST, 
    POSTGRES_DB, 
    POSTGRES_TEST_DB, 
    POSTGRES_USER, 
    POSTGRES_PASSWORD, 
    ENV 
} = process.env;

let config = {};

if (ENV === 'test') {
    config = {
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    }
}
if (ENV === 'dev') {
    config = {
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    }
}

let Client = new Pool(config);

export default Client