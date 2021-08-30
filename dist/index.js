"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var routes_1 = __importDefault(require("./routes"));
var app = express_1.default();
var port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use(cors_1.default());
app.use('/', routes_1.default);
app.listen(port, function () {
    console.log("server started at http://localhost:" + port);
});
exports.default = app;
