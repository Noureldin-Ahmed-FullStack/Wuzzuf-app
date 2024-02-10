import mongoose from "mongoose";
import 'dotenv/config'
export function dbConnection() {
    return mongoose.connect(`mongodb://0.0.0.0:27017/${process.env.db}`).then(()=>{
        console.log(`${process.env.db} DB connected`);
    }).catch((err)=>{
        console.log("database error "+err);
    })
}