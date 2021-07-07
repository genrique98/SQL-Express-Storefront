var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { OrderStore } from '../models/orders';
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../middleware/auth';
const store = new OrderStore();
// const index = async (_req: Request, res: Response) => {
//     try {
//         const orders = await store.index()
//         res.json(orders)
//     } catch (err) {
//         console.log(err)
//     }
// }
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
    const order = {
        user_id: req.body.user_id,
        status: req.body.status,
    };
    const { TOKEN_SECRET } = process.env;
    try {
        const newOrder = yield store.create(order);
        var token = jwt.sign({ user: newOrder }, TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        console.log(err);
    }
});
const addProduct = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = _req.params.id;
    const productId = _req.body.productId;
    const quantity = parseInt(_req.body.quantity);
    try {
        const addedProduct = yield store.addProduct(quantity, orderId, productId);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
// const authenticate = async (req: Request, res: Response) => {
//     const user: User = {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         username: req.body.username,
//         password: req.body.password,
//     }
//     const { TOKEN_SECRET } = process.env;
//     try {
//         const oldUser = await store.authenticate(user.username, user.password)
//         var token = jwt.sign({ user: oldUser }, TOKEN_SECRET as Secret);
//         res.json(token)
//     } catch(error) {
//         res.status(401)
//         res.json({ error })
//     }
//   }
const order_routes = (app) => {
    // app.get('/orders', verifyAuthToken, index)
    app.get('/orders/:id', verifyAuthToken, show);
    app.post('/orders', verifyAuthToken, create);
    // add product
    app.post('/orders/:id/products', verifyAuthToken, addProduct);
};
export default order_routes;
