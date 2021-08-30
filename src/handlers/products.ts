import express, { Request, Response} from 'express'
import { Product, ProductStore } from '../models/products'
import jwt, { Secret } from 'jsonwebtoken'
import verifyAuthToken from '../middleware/auth'

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
    try {
        const products = await store.index()
        res.json(products)
    } catch (err) {
        console.log(err)
    }
}

const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await store.show(req.params.id)
        res.json(products)
    } catch (err) {
        console.log(err)
    }
}

const create = async (req: Request, res: Response): Promise<void> => {
    let request = req.body;
    const product: Product = {
        name: request.name,
        price: request.price,
        category: request.category,
    }
    const { TOKEN_SECRET } = process.env;
    try {
        const newProduct = await store.create(product)
        let token = jwt.sign({ product: newProduct }, TOKEN_SECRET as Secret);
        res.json(token)
    } catch (err) {
        console.log(err)
    }
    
}

const products_routes = (app: express.Router): void =>  {
    app.get('/products', verifyAuthToken, index);
    app.get('/products/:id', verifyAuthToken, show); 
    app.post('/products', verifyAuthToken, create); 
}

export default products_routes;