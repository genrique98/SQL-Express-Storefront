import Client from '../database'

export type Order = {
    id?: number;
    user_id: number;
    status?: string;
}
export class OrderStore {
    async show(id: string): Promise<Order[]> { // current order by user (id)
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders, users WHERE users.id=($1) AND orders.user_id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0]
        } catch (err) {
            throw new Error(`Cannot find user ${id}. Error: ${err}`);
        }
    }
    
    async create(order: Order): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO orders (user_id) VALUES ($1) RETURNING *';
            const args = [order.user_id];
            const result = await conn.query(sql, args);
            const newOrder = result.rows[0];
            conn.release();

            return newOrder
        } catch (err) {
            throw new Error(`Could not create order for user ${order.user_id}. Error: ${err}`);
        }
    }

    // add product to cart
    async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> { 
        try {
          const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
          const conn = await Client.connect()
          const args = [quantity, orderId, productId]
          const result = await conn.query(sql, args)
          const order = result.rows[0]
          conn.release()

          return order
        } catch (err) {
          throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
      }

}