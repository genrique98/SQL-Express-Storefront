import express, { Request, Response } from 'express'
import { Order, OrderStore, Order_product } from '../models/orders'
import jwt, { Secret } from 'jsonwebtoken'
import verifyAuthToken from '../middleware/auth'

const store = new OrderStore()

const index = async (_req: Request, res: Response) => {
    try {
        const orders = await store.index()
        res.json(orders)
    } catch (err) {
        console.log(err)
    }
}

const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const order = await store.show(req.params.id)
        res.json(order)
    } catch (err) {
        console.log(err)
    }
}

const create = async (req: Request, res: Response): Promise<void> => {
    const order: Order = {
        user_id: req.body.user_id,
        status: req.body.status,
    }
    const { TOKEN_SECRET } = process.env;
    try {   
        const newOrder = await store.create(order)
        let token = jwt.sign({ order: newOrder }, TOKEN_SECRET as Secret);
        res.json(token)
    } catch (err) {
        console.log(err)
    }
}

const addProduct = async (req: Request, res: Response): Promise<void> => {
    let request = req.body;
    const order_product: Order_product = {
        quantity: request.quantity,
        orderId: parseInt( (req.params.id as unknown) as string), // req.body.orderId,
    }
    try {
      const addedProduct = await store.addProduct(order_product)
      res.json(addedProduct)
    } catch(err) {
      res.status(400)
      res.json(err)
    }
  } 

const order_routes = (app: express.Router): void => {
    app.get('/orders', verifyAuthToken, index) // show all orders (admin auth)
    app.get('/orders/users/:id', verifyAuthToken, show) // show current cart of user -> complete data shape
    app.post('/orders', verifyAuthToken, create) // create new order
    app.post('/orders/:id/products', verifyAuthToken, addProduct) // add product to cart(specific order)
}

export default order_routes
