import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
// import { defaultMaxListeners } from 'events'
import users_routes from './handlers/users.js';

const app: express.Application = express()
const port = 10533 //3000;

app.use(bodyParser.json())

app.get('/', function (_req: Request, res: Response) {
    res.send('Hello World!')
})

users_routes(app)


app.listen(port, function () {
    console.log(`server started at http://localhost:${port}`)
})

export default app;


// https://www.npmjs.com/package/cors