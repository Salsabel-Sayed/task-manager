"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (userSchema) => {
    return (req, res, next) => {
        const { error } = userSchema.validate(req.body, { abortEarly: false });
        if (!error) {
            return next();
        }
        const errMsg = error.details.map(err => err.message);
        res.status(400).json({ errors: errMsg });
    };
};
exports.validate = validate;
