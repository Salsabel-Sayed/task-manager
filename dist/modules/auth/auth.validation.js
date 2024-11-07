"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userVal = void 0;
const joi_1 = __importDefault(require("joi"));
const userVal = joi_1.default.object({
    userName: joi_1.default.string().min(3).max(10),
    email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,10}$')),
});
exports.userVal = userVal;
