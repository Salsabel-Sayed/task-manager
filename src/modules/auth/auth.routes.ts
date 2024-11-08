import { Router } from "express";
import { deleteUser, getUser, login, signup, updateUser } from "./auth.controller";
import { checkEmail } from "../../middleware/checkEmail/EmailExist";
import { protectedRoute } from "../../middleware/token/verifyToken";
import { validate } from "../../middleware/validations/validate";
import { userVal } from "./auth.validation";




const userRouter = Router()

userRouter.post('/signup/',validate(userVal),checkEmail,signup)
userRouter.post('/login/',login)
userRouter.put('/updateUser/:id',validate(userVal),protectedRoute,updateUser)
userRouter.delete('/deleteUser/:id',protectedRoute,deleteUser)
userRouter.get('/getUser/:id',protectedRoute,getUser)

export default userRouter