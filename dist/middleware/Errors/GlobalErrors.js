"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalErrors = void 0;
const GlobalErrors = (err, req, res, next) => {
    const code = err.statusCode || 500;
    res.status(code).json({
        error: "middleware error",
        message: err.message,
        code: code,
        stack: err.stack
    });
};
exports.GlobalErrors = GlobalErrors;
