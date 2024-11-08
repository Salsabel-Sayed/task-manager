import { Router } from "express";
import { protectedRoute } from "../../middleware/token/verifyToken";
import { createTask, deleteAllTasks, deleteSpecificTask, filterCompletedTasks, getAllTasks, getSpecificTask, updateCompletedTask, updateTask } from "./tasks.controller";
import { validate } from "../../middleware/validations/validate";
import { taskVal } from "./tasks.validate";




const taskRouter = Router()

taskRouter.post('/createTask/',validate(taskVal),protectedRoute,createTask)
taskRouter.get('/getAllTasks/',protectedRoute,getAllTasks)
taskRouter.get('/getSpecificTask/:id',protectedRoute,getSpecificTask)
taskRouter.put('/updateTask/:id',validate(taskVal),protectedRoute,updateTask)
taskRouter.patch('/updateCompletedTask/:id',protectedRoute,updateCompletedTask)
taskRouter.delete('/deleteSpecificTask/:id',protectedRoute,deleteSpecificTask)
taskRouter.delete('/deleteAllTasks/',protectedRoute,deleteAllTasks)
taskRouter.get('/filterCompletedTasks/',protectedRoute,filterCompletedTasks)

export default taskRouter