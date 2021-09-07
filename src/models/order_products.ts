import Client from '../database'

export type Order_product = {
    productId?: number;
    quantity: number;
    orderId?: number;
}

export class Order_ProductsStore {
    // current products in cart by user id
    async showCart(id: string): Promise<Order_product[]> { 
        try {
            const conn = await Client.connect();
            const sql = 'SELECT orders.id, order_products.product_id as product_id, order_products.quantity, orders.user_id, orders.status FROM orders, order_products WHERE orders.user_id=($1) AND order_products.order_id = orders.id';
            const result = await conn.query(sql, [id]);
            conn.release();
 
            return result.rows
        } catch (err) {
            throw new Error(`Cannot find user ${id}. Error: ${err}`);
        }
    }

    // add product to cart 
    async addProduct(order_product: Order_product): Promise<Order_product> { 
        try {
          const sql = 'INSERT INTO order_products (product_id, quantity, order_id) VALUES($1, $2, $3) RETURNING *'
          const conn = await Client.connect()
          const args = [order_product.productId, order_product.quantity, order_product.orderId]
          const result = await conn.query(sql, args)
          const order = result.rows[0]
          conn.release()

          return order
        } catch (err) {
          throw new Error(`Could not add product to order ${order_product.orderId}: ${err}`)
        }
    }

}