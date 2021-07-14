import express, { Request, Response } from 'express'
import { Order, OrderStore, Order_product } from '../models/orders'
import jwt, { Secret } from 'jsonwebtoken'
import verifyAuthToken from '../middleware/auth'

const store = new OrderStore()

// const index = async (_req: Request, res: Response) => {
//     try {
//         const orders = await store.index()
//         res.json(orders)
//     } catch (err) {
//         console.log(err)
//     }
    
// }

const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await store.show(req.body.id)
        res.json(users)
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
        var token = jwt.sign({ user: newOrder }, TOKEN_SECRET as Secret);
        res.json(token)
    } catch (err) {
        console.log(err)
    }
    
}

const addProduct = async (req: Request, res: Response): Promise<void> => {
    let request = req.body;

    const order_product: Order_product = {
        quantity: request.quantity,
        orderId: request.orderId,
        productId: request.productId,
    }
  
    try {
      const addedProduct = await store.addProduct(order_product)
      res.json(addedProduct)
    } catch(err) {
      res.status(400)
      res.json(err)
    }
  } 

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


const order_routes = (app: express.Router): void => {
    // app.get('/orders', verifyAuthToken, index)
    app.get('/orders/:id', verifyAuthToken, show) 
    app.post('/orders', verifyAuthToken, create) // is this like add product?
    
    // add product to cart
    app.post('/orders/:id/products', verifyAuthToken, addProduct)

}

export default order_routes