import { dbConnection } from "./dbConnection/dbConnection";
import  express  from "express";
import { GlobalErrors } from "./middleware/Errors/GlobalErrors";
import { AppErrors } from "./middleware/Errors/AppErrors";
import { bootstrap } from "./bootstrap";
import cors from "cors"
import dotenv from "dotenv"
import path from "path";

dotenv.config()

dbConnection()
const app = express();
app.use(cors())
const port = process.env.PORT || 3000
app.use(express.json())

bootstrap(app)
app.use('*',(req,res,next)=>{
    next(new AppErrors(`route not found ${req.originalUrl}`, 404))
})

// const corsOptions = {
//   origin: 'http://localhost:3000',  // Allow requests only from this origin
//   methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], // Allowed HTTP methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
// };

app.set("views",path.resolve()+"/views")
app.set("views engine","ejs")
app.use(express.static(path.join(path.resolve(),"public")))

app.use(GlobalErrors)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))   





