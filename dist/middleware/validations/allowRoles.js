"use strict";
// import { Request, Response, NextFunction } from 'express';
// import { CatchErrors } from '../Errors/CatchErrors';
// import { AppErrors } from '../Errors/AppErrors';
// type Role = string;
// type AllowedTo = (...roles: Role[]) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
// export const allowedTo: AllowedTo = (...roles) => {
//     return CatchErrors(async (req: Request, res: Response, next: NextFunction) => {
//         if (roles.includes(req.user.role)) {
//             return next();
//         }
//         return next(new AppErrors(`${req.user.role} doesn't have permission to perform this endpoint`, 401));
//     });
// };
