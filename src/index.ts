import express from 'express';
import bodyParser from 'body-parser';
// import { defaultMaxListeners } from 'events'
import users_routes from './handlers/users';
import cors from 'cors';

import routes from './routes'
const app: express.Application = express();
const router: express.Router = express.Router();
const port = process.env.PORT || 3000;

// app.use(bodyParser.json())
app.use('/', routes);
// router.get('/', cors, (_req: express.Request, res: express.Response) => {
//     res.status(200).send('Hello World!')
// });

// users_routes(app);


app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})
export default app;