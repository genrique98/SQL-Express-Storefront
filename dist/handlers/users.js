var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserStore } from '../models/users.js';
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../middleware/auth.js';
const store = new UserStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.index();
        res.json(users);
    }
    catch (err) {
        console.log(err);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.show(req.body.id);
        res.json(users);
    }
    catch (err) {
        console.log(err);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
    };
    const { TOKEN_SECRET } = process.env;
    try {
        const newUser = yield store.create(user);
        var token = jwt.sign({ user: newUser }, TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        console.log(err);
    }
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
    };
    const { TOKEN_SECRET } = process.env;
    try {
        const oldUser = yield store.authenticate(user.username, user.password);
        var token = jwt.sign({ user: oldUser }, TOKEN_SECRET);
        res.json(token);
    }
    catch (error) {
        res.status(401);
        res.json({ error });
    }
});
const users_routes = (app) => {
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
    app.post('/users', create);
};
export default users_routes;
