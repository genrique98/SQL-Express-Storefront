import Client from '../database.js'
import bcrypt from 'bcrypt'
import { resourceUsage } from 'process';

export type User = {
    id?: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}
export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();

            return result.rows
        } catch (err) {
            throw new Error(`Cannot get users: ${err}`);
        }
    }

    async show(id: string): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0]
        } catch (err) {
            throw new Error(`Cannot find user ${id}. Error: ${err}`);
        }
    }
    
    async create(user: User): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO users (firstName, lastName, username, password) VALUES ($1, $2, $3, $4) RETURNING *';
            const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
            // const pepper = BCRYPT_PASSWORD; const sal
            const hash = bcrypt.hashSync(
                user.password + BCRYPT_PASSWORD,
                parseInt((SALT_ROUNDS as unknown) as string) 
            )
            const args = [user.firstName, user.lastName, user.username, hash];
            console.log('works')
            const result = await conn.query(sql, args);
            console.log('works')
            const newUser = result.rows[0];
            conn.release();

            return newUser
        } catch (err) {
            throw new Error(`Could not add user ${user.firstName}. Error: ${err}`);
        }
    }

    async authenticate(username: string, password: string): Promise<User | null> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT password FROM users WHERE username=($1)';
            const result = await conn.query(sql, [username]);

            const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

            conn.release(); // maybe do later

            console.log(password+BCRYPT_PASSWORD)

            if (result.rows.length) {
                const user = result.rows[0]
                // console.log(user)
                if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
                    return user
                } else {
                    return null
                }
            }
            return null
        } catch (err) {
            throw new Error(`Could not authenticate user ${username}. Error: ${err}`);
        }
    }
}