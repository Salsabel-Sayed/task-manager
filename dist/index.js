"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnection_1 = require("./dbConnection/dbConnection");
const express_1 = __importDefault(require("express"));
const GlobalErrors_1 = require("./middleware/Errors/GlobalErrors");
const AppErrors_1 = require("./middleware/Errors/AppErrors");
const bootstrap_1 = require("./bootstrap");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
(0, dbConnection_1.dbConnection)();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
(0, bootstrap_1.bootstrap)(app);
app.use('*', (req, res, next) => {
    next(new AppErrors_1.AppErrors(`route not found ${req.originalUrl}`, 404));
});
app.use((0, cors_1.default)());
app.use(GlobalErrors_1.GlobalErrors);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
