import { Request, Response, NextFunction } from 'express';
import { AppErrors } from './AppErrors';

export const GlobalErrors = (err: AppErrors, req: Request, res: Response, next: NextFunction) => {
    const code = err.statusCode || 500;
    res.status(code).json({
        error: "middleware error",
        message: err.message,
        code: code,
        stack: err.stack 
    });
};
