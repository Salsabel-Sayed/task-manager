import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validate = (userSchema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = userSchema.validate(req.body,{ abortEarly: false });

        if (!error) {
            return next();
        }

        const errMsg = error.details.map(err => err.message);
        res.status(400).json({ errors: errMsg });
    };
};
