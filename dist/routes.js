"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_1 = __importDefault(require("./handlers/users"));
var products_1 = __importDefault(require("./handlers/products"));
var orders_1 = __importDefault(require("./handlers/orders"));
var routes = express_1.default.Router();
users_1.default(routes);
products_1.default(routes);
orders_1.default(routes);
routes.get('/', function (_req, res, _next) {
    res.status(200).send('Hello World!');
});
exports.default = routes;
