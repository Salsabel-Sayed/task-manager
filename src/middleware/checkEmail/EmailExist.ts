import { User } from "../../modules/auth/auth.models"
import { AppErrors } from "../Errors/AppErrors"
import { CatchErrors } from "../Errors/CatchErrors"

export const checkEmail = CatchErrors(async(req,res,next)=>{
    let isExist = await User.findOne({ email: req.body.email })
    if(isExist){
        return next(new AppErrors('Email already exist',409))
    }
    next()
})