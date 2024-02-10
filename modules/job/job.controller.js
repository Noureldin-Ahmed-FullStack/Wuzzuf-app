import bcrypt from "bcrypt"
import asyncHandler from "express-async-handler"
import { sendEmail } from "../../mail/sendMail.js"
import jwt from "jsonwebtoken"
import { catchError } from "../../src/middleware/catchError.js"
import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
import slugify from "slugify"
import { jobModel } from "../../Models/job.model.js"
import { applicationModel } from "../../Models/application.model.js"

const addJob = catchError(async (req, res) => {
    req.body.slug = slugify(req.body.jobTitle)
    req.body.addedBy = req.user._id
    const Job = await jobModel.create(req.body)
    res.json({ message: "success" })
})
const application = catchError(async (req, res) => {
    const userApps = await applicationModel.findOne({
        userID:req.user._id,
        jobID:req.params.id
    })
    if (userApps) {
        return res.status(403).json({ message: "you cant make more than one application per job" })
    }
    if (req.user.resume) {
        req.body.userResume = req.user.resume        
    }else{
        return res.status(404).json({ message: "Make a resume first" })
    }
    req.body.jobID = req.params.id
    req.body.userID = req.user._id
    const app = await applicationModel.create(req.body)
    res.json({ message: "success" })
})
const getAllJobs = catchError(async (req, res) => {
    
    const Jobs = await jobModel.find(req.query).populate('addedBy')
    res.json(Jobs)
})
const getAllJobsOfCompany = catchError(async (req, res) => {
    const Jobs = await jobModel.find().populate({
        path: 'addedBy',
    })
    var arr = []
    for (let i = 0; i < Jobs.length; i++) {
        if (Jobs[i].addedBy.companyHRVirtual[0]._id == req.params.id) {
            arr.push(Jobs[i])
        } 
    }
    res.json(arr)
})
const getAllApplications = catchError(async (req, res) => {
    const Applications = await applicationModel.find().populate(['userID','jobID'])
    res.json(Applications)
})


const getCompanyJobs = catchError(async (req, res) => {    
    const Jobs = await jobModel.find({addedBy:req.user._id})
    res.json(Jobs)
})
export const GetSingleJob = catchError(async (req, res, next) => {
    const Jobs = await jobModel.findById(req.params.id)
    if (!Jobs) {
        return res.json({ message: "Job doesnt exist" })
    }
    res.json({ message: Jobs })
})
const updateJob = catchError(async (req, res) => {    
    const Job = await jobModel.findById(req.params.id)    
    if (req.user._id.toString() == Job.addedBy.toString()) {
        req.body.slug = slugify(req.body.JobName)
        await jobModel.findOneAndUpdate(Job, req.body)
        return res.json({ message: "updated!" })
    }
    return res.json({ message: "not authorized!" })
})
const deleteJob = catchError(async (req, res) => {
    const Job = await jobModel.findById(req.params.id)    
    if (req.user._id.toString() == Job.addedBy.toString()) {
        await jobModel.findOneAndDelete(Job, req.body)
        return res.json({ message: "deleted!" })
    }
    return res.json({ message: "not authorized!" })
})





export {
    addJob,
    application,
    getCompanyJobs,
    getAllApplications,
    getAllJobsOfCompany,
    getAllJobs,
    updateJob,
    deleteJob,
}