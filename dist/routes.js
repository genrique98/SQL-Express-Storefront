"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_1 = __importDefault(require("./handlers/users"));
var routes = express_1.default.Router();
users_1.default(routes);
//cant use cors????
routes.get('/', function (_req, res, next) {
    res.status(200).send('Hello World!');
});
exports.default = routes;
