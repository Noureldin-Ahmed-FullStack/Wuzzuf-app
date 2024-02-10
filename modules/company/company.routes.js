import express from 'express'
import {CheckToken, allowed, checkEmailExist } from '../../src/middleware/middleware.js'
import {GetSinglecompany, addCompany, deleteCompany, getAllcompanys, updatecompany} from './company.controller.js'
import { validateShema } from './company.validations.js'

const companyRouter = express.Router()

companyRouter.get('/company', getAllcompanys)
companyRouter.post('/Company',validateShema,CheckToken,allowed('Company_HR'), addCompany)
companyRouter.delete('/company/:id',CheckToken,allowed('Company_HR'), deleteCompany)
companyRouter.put('/company/:id',CheckToken,allowed('Company_HR'), updatecompany)
companyRouter.get('/getSinglecompany/:id', GetSinglecompany)
 
// companyRouter.post('/upload/:id',GetSinglecompany, upload.single('file'), updatecompanyResume)


export default companyRouter