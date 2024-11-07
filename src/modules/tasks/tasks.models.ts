import { model, Schema, Types } from "mongoose";




const taskSchema = new Schema({
    title: String,
    description: String,
    completed: { type: Boolean, default: false },
    userId: {
        type:Types.ObjectId,
        ref: 'User',
        required: true
    },
    
})

export const Task = model('Task', taskSchema) 