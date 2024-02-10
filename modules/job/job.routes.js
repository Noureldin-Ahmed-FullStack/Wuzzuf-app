import express from 'express'
import {CheckToken, allowed, checkEmailExist } from '../../src/middleware/middleware.js'
import { addJob, application, deleteJob, getAllApplications, getAllJobs, getAllJobsOfCompany, getCompanyJobs, updateJob } from './job.controller.js'
import { validateShema } from './job.validations.js'

const jobRouter = express.Router()

jobRouter.get('/job',CheckToken,allowed('User','Company_HR'), getAllJobs)
jobRouter.get('/job/:id', getAllJobsOfCompany)
jobRouter.get('/application', getAllApplications)
jobRouter.get('/getSinglejob',CheckToken,allowed('User','Company_HR'), getCompanyJobs)
jobRouter.post('/job',validateShema,CheckToken,allowed('Company_HR'), addJob)
jobRouter.post('/application/:id',CheckToken,allowed('User'), application)
jobRouter.delete('/job/:id',CheckToken,allowed('Company_HR'), deleteJob)
jobRouter.put('/job/:id',CheckToken,allowed('Company_HR'), updateJob)



export default jobRouter