import { dbConnection } from "./dbConnection/dbConnection";
import  express  from "express";
import { GlobalErrors } from "./middleware/Errors/GlobalErrors";
import { AppErrors } from "./middleware/Errors/AppErrors";
import { bootstrap } from "./bootstrap";
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

dbConnection()
const app = express();
const port = process.env.PORT || 3000
app.use(express.json())

bootstrap(app)
app.use('*',(req,res,next)=>{
    next(new AppErrors(`route not found ${req.originalUrl}`, 404))
})
app.use(cors())
app.use(GlobalErrors)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))   





