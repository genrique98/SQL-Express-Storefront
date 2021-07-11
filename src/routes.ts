import express, { Router } from 'express';
import users_routes from './handlers/users';
import cors from 'cors';

const routes: Router = express.Router();

users_routes(routes);

//cant use cors????
routes.get('/', (_req: express.Request, res: express.Response, next: express.NextFunction): void => {
    res.status(200).send('Hello World!');
});



export default routes;