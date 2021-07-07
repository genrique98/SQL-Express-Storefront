import express from 'express';
import bodyParser from 'body-parser';
// import { defaultMaxListeners } from 'events'
import users_routes from './handlers/users.js';
const app = express();
const port = 10533; //3000;
app.use(bodyParser.json());
app.get('/', function (_req, res) {
    res.send('Hello World!');
});
users_routes(app);
app.listen(port, function () {
    console.log(`server started at http://localhost:${port}`);
});
export default app;
// https://www.npmjs.com/package/cors
