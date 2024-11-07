"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppErrors = void 0;
class AppErrors extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.AppErrors = AppErrors;
