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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmail = void 0;
const auth_models_1 = require("../../modules/auth/auth.models");
const AppErrors_1 = require("../Errors/AppErrors");
const CatchErrors_1 = require("../Errors/CatchErrors");
exports.checkEmail = (0, CatchErrors_1.CatchErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let isExist = yield auth_models_1.User.findOne({ email: req.body.email });
    if (isExist) {
        return next(new AppErrors_1.AppErrors('Email already exist', 409));
    }
    next();
}));
