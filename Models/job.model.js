import mongoose from "mongoose";

const schema = new mongoose.Schema({
    jobTitle:{
        type: String,
        trim:true,
        required:true,
        minLength:[2,'job title is too short']
    },
    slug:{
        type:String,
        lowercase:true,
        required:true
    },
    jobLocation:{
        type: String,
        enum: ['onsite', 'remotley','hybrid'],
        default: 'onsite'
    },
    workingTime:{
        type: String,
        enum: ['part-time', 'full-time'],
        default: 'full-time'
    },    
    seniorityLevel:{
        type: String,
        enum: ['junior','mid-level','senior','team-lead','cto'],
        default: 'junior'
    },
    addedBy:{
        type:mongoose.Types.ObjectId,
        ref: 'user'
    },
    
})
export const jobModel =mongoose.model("job", schema)