var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Client from '../database';
export class OrderStore {
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield Client.connect();
                const sql = 'SELECT * FROM orders, users WHERE users.id=($1) AND orders.user_id=($1)';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot find user ${id}. Error: ${err}`);
            }
        });
    }
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield Client.connect();
                const sql = 'INSERT INTO orders (user_id) VALUES ($1) RETURNING *';
                const args = [order.user_id];
                const result = yield conn.query(sql, args);
                const newOrder = result.rows[0];
                conn.release();
                return newOrder;
            }
            catch (err) {
                throw new Error(`Could not create order for user ${order.user_id}. Error: ${err}`);
            }
        });
    }
    // add product to cart
    addProduct(quantity, orderId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
                const conn = yield Client.connect();
                const args = [quantity, orderId, productId];
                const result = yield conn.query(sql, args);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`);
            }
        });
    }
}
