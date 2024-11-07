"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedRoute = void 0;
const auth_models_1 = require("../../modules/auth/auth.models");
const AppErrors_1 = require("../Errors/AppErrors");
const CatchErrors_1 = require("../Errors/CatchErrors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.protectedRoute = (0, CatchErrors_1.CatchErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { authorization } = req.headers;
    let userPayload = null;
    if (!authorization)
        return next(new AppErrors_1.AppErrors('token is provided', 404));
    jsonwebtoken_1.default.verify(authorization, 'taskManager', (err, payload) => {
        if (err)
            return next(new AppErrors_1.AppErrors(err, 401));
        userPayload = payload;
        // console.log("payload",payload);
    });
    let user = yield auth_models_1.User.findById(userPayload.id);
    if (!user)
        return next(new AppErrors_1.AppErrors('user not found', 404));
    if (user.passwordChangedAt) {
        let time = Math.floor(user.passwordChangedAt.getTime() / 1000);
        if (time > userPayload.iat)
            return next(new AppErrors_1.AppErrors('invalid token .. log in again', 401));
    }
    req.user = user;
    next();
}));
