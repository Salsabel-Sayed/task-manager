"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatchErrors = CatchErrors;
const AppErrors_1 = require("./AppErrors");
function CatchErrors(callBack) {
    return (req, res, next) => {
        try {
            return callBack(req, res, next);
        }
        catch (err) {
            return next(new AppErrors_1.AppErrors(err.message || 'An error occurred', 500));
        }
    };
}
