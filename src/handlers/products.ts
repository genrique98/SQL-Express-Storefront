import express, { Request, Response} from 'express'
import { Product, ProductStore } from '../models/products'
import jwt, { Secret } from 'jsonwebtoken'
import verifyAuthToken from '../middleware/auth'
import cors from 'cors'
import bodyParser, { json } from 'body-parser';

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
        const products = await store.show(req.body.id)
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
    }
    const { TOKEN_SECRET } = process.env;
    try {
        const newProduct = await store.create(product)
        var token = jwt.sign({ user: newProduct }, TOKEN_SECRET as Secret);
        res.json(token)
    } catch (err) {
        console.log(err)
    }
    
}


var jsonParser = bodyParser.json()

const products_routes = (app: express.Router): void =>  {
    app.get('/products', index);
    app.get('/products/:id', show); 
    app.post('/products', jsonParser, create); // verifyAuthToken
}

export default products_routes;