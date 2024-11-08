"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskVal = void 0;
const joi_1 = __importDefault(require("joi"));
const taskVal = joi_1.default.object({
    title: joi_1.default.string().min(3).max(20),
    description: joi_1.default.string().min(3).max(100),
    completed: joi_1.default.boolean()
});
exports.taskVal = taskVal;
