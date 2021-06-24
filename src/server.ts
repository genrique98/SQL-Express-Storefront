import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { defaultMaxListeners } from 'events'

const app: express.Application = express()
const port = 3000;

app.use(bodyParser.json())

app.get('/', function (_req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(port, function () {
    console.log(`server started at http://localhost:${port}`)
})

export default app;
