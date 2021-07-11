"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var app = express_1.default();
var router = express_1.default.Router();
var port = process.env.PORT || 3000;
// app.use(bodyParser.json())
app.use('/', routes_1.default);
// router.get('/', cors, (_req: express.Request, res: express.Response) => {
//     res.status(200).send('Hello World!')
// });
// users_routes(app);
app.listen(port, function () {
    console.log("server started at http://localhost:" + port);
});
exports.default = app;
