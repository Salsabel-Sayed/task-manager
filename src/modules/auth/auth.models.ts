import { model, Schema, Types } from "mongoose";
import { Document } from 'mongoose';  
import { NextFunction, Request } from 'express';
import  bcrypt  from 'bcrypt';
import { Task } from "../tasks/tasks.models";


declare global {  
    namespace Express {  
        interface Request {  
            user?: User;  
        }  
    }  
} 
export interface User extends Document {  
    userName: string;  
    email: string;  
    password: string;  
    passwordChangedAt?: Date; 
    tasks: [{ type: Types.ObjectId, ref: "Task" }]
    
} 


export interface CustomRequest extends Request {  
    user?: User;  
}
const userSchema = new Schema<User>({
    userName:{
        type:String,
        required:true,
    },
    email:{
    type:String,
    required:true,
    unique: true
    },
    password:{
        type:String,
        required:true,
    },
    passwordChangedAt:Date,
    tasks: [{ type: Types.ObjectId, ref: "Task" }]
})

userSchema.pre('save',function(){
    this.password =bcrypt.hashSync(this.password, 3)
})



// userSchema.pre('findOneAndUpdate',function(){
//     if(this._update.password )this._update.password =bcrypt.hashSync(this._update.password, 3)
// })
export const User = model<User>('User', userSchema) 