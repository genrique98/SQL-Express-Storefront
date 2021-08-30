import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes'

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(cors())
app.use('/', routes);

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})
export default app;