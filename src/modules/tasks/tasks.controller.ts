import { CatchErrors } from "../../middleware/Errors/CatchErrors";
import { NextFunction, Request, Response } from "express";
import { Task } from "./tasks.models";
import { AppErrors } from "../../middleware/Errors/AppErrors";
import { User } from "../auth/auth.models";
// import {CustomRequest} from "../auth/auth.models"


// * create task
export const createTask = CatchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, completed } = req.body;
    const userId = req.user?.id
    const task = await Task.create({ title, description, completed, userId });
    await User.findByIdAndUpdate(userId, { $push: { tasks: task._id } }, { new: true }); 
    res.status(201).json({message:"done! task created succesfully *-*", task});
})

// ? //////////////////////////////////////////////////////////////////////////////////////////////////////
// * get all user tasks 
export const getAllTasks = CatchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id
    const tasks = await Task.find({userId})
    res.json({message:"all user tasks here",tasks});
})

// ? //////////////////////////////////////////////////////////////////////////////////////////////////////
// * get specific task
export const getSpecificTask = CatchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id
      const taskId = req.params.id
   const task = await Task.findOne({ _id: taskId, userId: userId });  
    if(!task) return next(new AppErrors("Task not found or you do not have permission to view this task", 404))
    res.json({message:"task found",task});
})

// ? //////////////////////////////////////////////////////////////////////////////////////////////////////
// * update task
export const updateTask = CatchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id
    const taskId = req.params.id
    const task = await Task.findOne({ _id: taskId, userId: userId }); 
    if(!task) return next(new AppErrors("Task not found or you do not have permission to view this task", 404))
        const { title, description, completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(taskId, { title, description, completed }, { new:true})

    // Object.assign(task, req.body); // Update task properties with the values from the request body  
    // await task.save(); 
    res.json({message:"task updated",updatedTask});
    
})
// ? //////////////////////////////////////////////////////////////////////////////////////////////////////
// * update completed tasks
export const updateCompletedTask = CatchErrors(async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user?.id
    const taskId = req.params.id
    const task = await Task.findOne({ _id: taskId, userId: userId }); 
    if(!task) return next(new AppErrors("Task not found or you do not have permission to update this task", 404))
        const { completed } = req.body;
    
    const updatedTask = await Task.findByIdAndUpdate(taskId, { completed: completed === "yes" }, { new:true})
    res.json({message:"task updated",updatedTask});
})

// ? //////////////////////////////////////////////////////////////////////////////////////////////////////
// * delete specific task
export const deleteSpecificTask = CatchErrors(async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user?.id
    const taskId = req.params.id
    const task = await Task.findOne({ _id: taskId, userId: userId }); 
    if(!task) return next(new AppErrors("Task not found or you do not have permission to delete this task", 404))
        await User.findByIdAndUpdate(userId, { $pull: { tasks: taskId } }); 
        const deletedTask = await Task.findByIdAndDelete(taskId)
    res.json({message:"task deleted",deletedTask});
})

// ? //////////////////////////////////////////////////////////////////////////////////////////////////////
// * delete all user tasks
export const deleteAllTasks = CatchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id
    const findAllTasks = await Task.find({userId})
    if(!findAllTasks) return next(new AppErrors("cant find user tasks! ,sorry!",404))
        const deletedTasks = await Task.deleteMany({userId})
        await User.findByIdAndUpdate(userId, { $set: { tasks: [] } });
    res.json({message:"tasks deleted",deletedTasks});
})
// ? //////////////////////////////////////////////////////////////////////////////////////////////////////
// * filter completed tasks
export const filterCompletedTasks = CatchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id; 
    const { status } = req.query;  
    let filter:any = { userId: userId };  
    if (status === 'completed') {  
        filter.completed = true;  
    } else if (status === 'not-completed') {  
        filter.completed = false;  
    }  
    const tasks = await Task.find(filter);  
    res.json({ message:"filtered tasks",tasks }); 
})
