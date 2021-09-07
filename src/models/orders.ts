import Client from '../database'

export type Order = {
    id?: number;
    user_id: number;
    status: string;
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const conn = await Client.connect(); 
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
 
            return result.rows
        } catch (err) {
            throw new Error(`Error: ${err}`);
        }
    }

    // show order of id
    async show(id: string): Promise<Order[]> { 
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
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

}