var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Client from '../database.js';
import bcrypt from 'bcrypt';
export class UserStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield Client.connect();
                const sql = 'SELECT * FROM users';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot get users: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield Client.connect();
                const sql = 'SELECT * FROM users WHERE id=($1)';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot find user ${id}. Error: ${err}`);
            }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield Client.connect();
                const sql = 'INSERT INTO users (firstName, lastName, username, password) VALUES ($1, $2, $3, $4) RETURNING *';
                const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
                // const pepper = BCRYPT_PASSWORD; const sal
                const hash = bcrypt.hashSync(user.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));
                const args = [user.firstName, user.lastName, user.username, hash];
                console.log('works');
                const result = yield conn.query(sql, args);
                console.log('works');
                const newUser = result.rows[0];
                conn.release();
                return newUser;
            }
            catch (err) {
                throw new Error(`Could not add user ${user.firstName}. Error: ${err}`);
            }
        });
    }
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield Client.connect();
                const sql = 'SELECT password FROM users WHERE username=($1)';
                const result = yield conn.query(sql, [username]);
                const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
                conn.release(); // maybe do later
                console.log(password + BCRYPT_PASSWORD);
                if (result.rows.length) {
                    const user = result.rows[0];
                    // console.log(user)
                    if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
                        return user;
                    }
                    else {
                        return null;
                    }
                }
                return null;
            }
            catch (err) {
                throw new Error(`Could not authenticate user ${username}. Error: ${err}`);
            }
        });
    }
}
