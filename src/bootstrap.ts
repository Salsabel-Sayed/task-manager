import userRouter from "./modules/auth/auth.routes"
import taskRouter from "./modules/tasks/tasks.routes"



export const bootstrap = (app:any)=>{
    app.use('/api/users/', userRouter)
    app.use('/api/tasks/', taskRouter)
}