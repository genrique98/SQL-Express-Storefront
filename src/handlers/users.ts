import express, { Request, Response} from 'express'
import { User, UserStore } from '../models/users'
import jwt, { Secret } from 'jsonwebtoken'
import verifyAuthToken from '../middleware/auth'

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
    try {
        const users = await store.index()
        res.json(users)
    } catch (err) {
        console.log(err)
    }   
}

const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await store.show(req.params.id) //(parseInt( (req.params.id as unknown) as string))
        res.json(users)
    } catch (err) {
        console.log(err)
    }
}

const create = async (req: Request, res: Response): Promise<void> => {
    let request = req.body;
    const user: User = {
        firstName: request.firstName,
        lastName: request.lastName,
        username: request.username,
        password: request.password,
    }
    const { TOKEN_SECRET } = process.env;
    try {
        //@ts-ignore
        const newUser = await store.create(user)
        var token = jwt.sign({ user: newUser }, TOKEN_SECRET as Secret);
        res.json(token)
    } catch (err) {
        console.log(err)
    }
}

const authenticate = async (req: Request, res: Response): Promise<void> => {
    const user: User = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
    }
    const { TOKEN_SECRET } = process.env;
    try {
        const authUser = await store.authenticate(user.username, user.password)
        let token = jwt.sign({ user: authUser }, TOKEN_SECRET as Secret);
        res.json(token)
    } catch(error) {
        res.status(401)
        res.json({ error })
    }
  }

const users_routes = (app: express.Router): void =>  {
    app.post('/auth', authenticate);
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show); 
    app.post('/users', create);
}

export default users_routes;