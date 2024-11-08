import { CustomRequest, User } from "../../modules/auth/auth.models";

import { AppErrors } from "../Errors/AppErrors"
import { CatchErrors } from "../Errors/CatchErrors"
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';



export const protectedRoute = CatchErrors(async (req: CustomRequest, res: Response, next: NextFunction) => {
    let { authorization } = req.headers
    let userPayload:any = null
    if (!authorization) return next(new AppErrors('token is not provided', 404))

    jwt.verify(authorization, 'taskManager', (err:any, payload:any) => {
        if (err) return next(new AppErrors(err, 401))
        userPayload = payload
        // console.log("payload",payload);

    })
    let user = await User.findById(userPayload.id) 
    if (!user) return next(new AppErrors('user not found', 404))
    if (user.passwordChangedAt) {
        let time = Math.floor(user.passwordChangedAt.getTime() / 1000)
        if (time > userPayload.iat) return next(new AppErrors('invalid token .. log in again', 401))
    }
    req.user = user
    next()


})