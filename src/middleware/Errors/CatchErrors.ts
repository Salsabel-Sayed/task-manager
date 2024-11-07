import { Request, Response, NextFunction } from 'express';
import { AppErrors } from './AppErrors';

export function CatchErrors(callBack: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            return callBack(req, res, next);
        } catch (err:any) {
            return next(new AppErrors(err.message || 'An error occurred', 500));
        }
    };
}