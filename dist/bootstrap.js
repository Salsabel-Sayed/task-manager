"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const tasks_routes_1 = __importDefault(require("./modules/tasks/tasks.routes"));
const bootstrap = (app) => {
    app.use('/api/users/', auth_routes_1.default);
    app.use('/api/tasks/', tasks_routes_1.default);
};
exports.bootstrap = bootstrap;
