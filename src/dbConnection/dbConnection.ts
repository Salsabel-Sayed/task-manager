import { connect } from "mongoose";


export function dbConnection() {
    connect('mongodb://localhost:27017/task-manager')
    .then(async () => {
        console.log('DB connected');
    }).catch(()=>{
        console.log("database error");
        
    })
} 