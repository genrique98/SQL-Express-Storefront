"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = __importDefault(require("pg"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var Pool = pg_1.default.Pool;
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_TEST_DB = _a.POSTGRES_TEST_DB, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, ENV = _a.ENV;
// let config = {};
var config = {
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
};
var Client = new Pool(config);
// if (ENV === 'test') {
//     config = {
//         host: POSTGRES_HOST,
//         database: POSTGRES_TEST_DB,
//         user: POSTGRES_USER,
//         password: POSTGRES_PASSWORD
//     }
//     Client = new Pool(config);
// }
// if (ENV === 'dev') {
//     config = {
//         host: POSTGRES_HOST,
//         database: POSTGRES_DB,
//         user: POSTGRES_USER,
//         password: POSTGRES_PASSWORD
//     }
//     Client = new Pool(config);
// }
// let Client = new Pool(config);
exports.default = Client;
