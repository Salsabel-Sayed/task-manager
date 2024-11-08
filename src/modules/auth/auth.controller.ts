import { NextFunction, Request, Response } from "express";
import { AppErrors } from "../../middleware/Errors/AppErrors";
import { CatchErrors } from "../../middleware/Errors/CatchErrors";
import { CustomRequest, User } from "./auth.models";
import bcrypt  from 'bcrypt';
import  jwt  from 'jsonwebtoken';



// * signup
export const signup = CatchErrors(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { userName, email, password } = req.body;
    const user = new User({ userName, email, password });
    if(!user) return next(new AppErrors("your info not found!!!!",400))
    await user.save();


    res.status(201).json({message:"signup done! welcome *-*",user});
})

// ? //////////////////////////////////////////////////////////////////////////////////////////////////////
// * login
export const login = CatchErrors(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const userId = req.user?.id
        const user = await User.findById(userId)
    if(!user) return next(new AppErrors("user not found!!!!",400))
        const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return next(new AppErrors("password not match!!!!",400))
        const authorization = jwt.sign({
    id: user._id,
    userName: user.userName,
    password: user.password,
    email: user.email
},"taskManager")
        res.status(200).json({message:"login done! welcome *-*",user,authorization});
})

// ? //////////////////////////////////////////////////////////////////////////////////////////////////////
// *get user
export const getUser = CatchErrors(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.id
    const matchUserId = req.params.id
    const userFound = await User.findById(userId).populate('tasks')
    console.log("get userid",userFound);
    if(userFound?.id.toString() !== matchUserId) return next(new AppErrors("id doesnt match",400))
    if(!userFound) return next(new AppErrors("user not found!!!!",400))
        res.status(200).json({message:"user found!",userFound});
})// ? //////////////////////////////////////////////////////////////////////////////////////////////////////
// *update user
export const updateUser = CatchErrors(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.id
    console.log("userId",userId);
    
    const matchUserId = req.params.id
    console.log("matchUserId",matchUserId);

    const userFound = await User.findById(userId)
    console.log("userFound",userFound);
    if(userFound?.id.toString() !== matchUserId) return next(new AppErrors("id doesnt match",400))
        const updatedUser = await User.findByIdAndUpdate(matchUserId,req.body,{new:true} )
    res.json({ message: "updated", updatedUser })
})
// ? //////////////////////////////////////////////////////////////////////////////////////////////////////
// *delete user
export const deleteUser = CatchErrors(async (req: CustomRequest, res: Response, next: NextFunction) => {
     const userId = req.user?.id
    const matchUserId = req.params.id
    const userFound = await User.findById(userId)
    console.log("get userid",userFound);
    if(userFound?.id.toString() !== matchUserId) return next(new AppErrors("id doesnt match",400))
        const updatedUser = await User.findByIdAndDelete(matchUserId)
    res.json({ message: "deleted", updatedUser })
})

