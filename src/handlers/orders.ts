import express, { Request, Response } from 'express'
import { Order, OrderStore } from '../models/orders'
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

const addProduct = async (_req: Request, res: Response): Promise<void> => {
    const orderId: string = _req.params.id
    const productId: string = _req.body.productId
    const quantity: number = parseInt(_req.body.quantity)
  
    try {
      const addedProduct = await store.addProduct(quantity, orderId, productId)
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


const order_routes = (app: express.Application): void => {
    // app.get('/orders', verifyAuthToken, index)
    app.get('/orders/:id', verifyAuthToken, show) 
    app.post('/orders', verifyAuthToken, create)
    
    // add product
    app.post('/orders/:id/products', verifyAuthToken, addProduct)

}

export default order_routes