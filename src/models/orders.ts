import Client from '../database'

export type Order = {
    id?: number;
    user_id: number;
    status?: string;
}

export type Order_product = {
    id?: number;
    quantity: number;
    orderId: number;
}

export class OrderStore {
    async index(): Promise<Order[]> { // current order by user (id)
        try {
            const conn = await Client.connect();
            //const sql = 'SELECT * FROM orders, users, order_products WHERE users.id=($1) AND orders.user_id=($1) ';//AND order_products.order_id = orders.id
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
 
            return result.rows
        } catch (err) {
            throw new Error(`Error: ${err}`);
        }
    }

    async show(id: string): Promise<Order[]> { // current order by user (id)
        try {
            const conn = await Client.connect();
            const sql = 'SELECT orders.id, order_products.id as product_id, order_products.quantity, orders.user_id, orders.status FROM orders, order_products WHERE orders.user_id=($1) AND order_products.order_id = orders.id';
            // const sql = 'SELECT * FROM orders WHERE orders.user_id=($1) ';
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
            const sql = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
            const args = [order.user_id, order.status];
            const result = await conn.query(sql, args);
            const newOrder = result.rows[0];
            conn.release();

            return newOrder
        } catch (err) {
            throw new Error(`Could not create order for user ${order.user_id}. Error: ${err}`);
        }
    }

    // add product to cart
    async addProduct(order_product: Order_product): Promise<Order> { 
        try {
          const sql = 'INSERT INTO order_products (quantity, order_id) VALUES($1, $2) RETURNING *'
          const conn = await Client.connect()
          const args = [order_product.quantity, order_product.orderId]
          const result = await conn.query(sql, args)
          const order = result.rows[0]
          conn.release()

          return order
        } catch (err) {
          throw new Error(`Could not add product to order ${order_product.orderId}: ${err}`)
        }
      }

}