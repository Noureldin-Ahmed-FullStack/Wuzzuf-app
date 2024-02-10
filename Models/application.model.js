import mongoose from "mongoose";

const schema = new mongoose.Schema({
    jobID:{
        type:mongoose.Types.ObjectId,
        ref: 'job'
    },
    userID:{
        type:mongoose.Types.ObjectId,
        ref: 'user'
    },
    userTechSkills:[
        {type:String}
    ],
    userSoftSkills:[
        {type:String}
    ],
    userResume:String
    
})
export const applicationModel =mongoose.model("application", schema)