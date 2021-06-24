import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.get('/', function (_req, res) {
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log(`server started at http://localhost:${port}`);
});
export default app;
