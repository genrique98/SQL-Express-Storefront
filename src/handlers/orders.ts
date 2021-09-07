import express, { Request, Response } from 'express'
import { Order, OrderStore } from '../models/orders'
import { Order_product, Order_ProductsStore } from '../models/order_products'
import jwt, { Secret } from 'jsonwebtoken'
import verifyAuthToken from '../middleware/auth'

const store = new OrderStore()
const orderProductStore = new Order_ProductsStore()

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
        res.json(newOrder)
    } catch (err) {
        console.log(err)
    }
}

const showCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const order = await orderProductStore.showCart(req.params.id)
        res.json(order)
    } catch (err) {
        console.log(err)
    }
}

const addProduct = async (req: Request, res: Response): Promise<void> => {
    let request = req.body;
    const order_product: Order_product = {
        productId: request.product_id,
        quantity: request.quantity,
        orderId: parseInt( (req.params.id as unknown) as string),
    }
    try {
      const addedProduct = await orderProductStore.addProduct(order_product)
      res.json(addedProduct)
    } catch(err) {
      res.status(400)
      res.json(err)
    }
  } 

const order_routes = (app: express.Router): void => {
    app.post('/orders', verifyAuthToken, create) // create new order
    app.get('/orders', verifyAuthToken, index) // show all orders (admin auth)
    app.get('/orders/:id', verifyAuthToken, show) // show order of id
    app.post('/orders/:id/products', verifyAuthToken, addProduct) // add product to cart(specific order id) 
    app.get('/orders/users/:id', verifyAuthToken, showCart) // show current cart of user -> complete data shape
    
}

export default order_routes
