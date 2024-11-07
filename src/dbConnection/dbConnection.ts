import { connect } from "mongoose";


export function dbConnection() {
    connect('mongodb+srv://taskmanager:zAfF9ewKr9qiJTY0@atlascluster.ukscwpx.mongodb.net/task-manager1')
    .then(async () => {
        console.log('DB connected');
    }).catch(()=>{
        console.log("database error");
        
    })
} 