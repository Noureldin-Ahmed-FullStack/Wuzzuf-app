import { companyModel } from "../../Models/company.model.js"
import bcrypt from "bcrypt"
import asyncHandler from "express-async-handler"
import { sendEmail } from "../../mail/sendMail.js"
import jwt from "jsonwebtoken"
import { catchError } from "../../src/middleware/catchError.js"
import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
import slugify from "slugify"
const addCompany = catchError(async (req, res) => {
    req.body.slug = slugify(req.body.companyName)
    req.body.companyHR = req.user._id
    req.body.numberOfEmployees = req.body.from + "-" + req.body.to
    const company = await companyModel.create(req.body)
    res.json({ message: "success" })
})
const getAllcompanys = catchError(async (req, res) => {
    const companys = await companyModel.find()
    res.json(companys)
})
export const GetSinglecompany = catchError(async (req, res, next) => {
    const companys = await companyModel.findById(req.params.id)
    if (!companys) {
        return res.json({ message: "company doesnt exist" })
    }
    res.json({ message: companys })
})
const updatecompany = catchError(async (req, res) => {    
    const company = await companyModel.findById(req.params.id)    
    if (req.user._id.toString() == company.companyHR.toString()) {
        req.body.slug = slugify(req.body.companyName)
        await companyModel.findOneAndUpdate(company, req.body)
        return res.json({ message: "updated!" })
    }
    return res.json({ message: "not authorized!" })
})
const deleteCompany = catchError(async (req, res) => {
    const company = await companyModel.findById(req.params.id)    
    if (req.user._id.toString() == company.companyHR.toString()) {
        await companyModel.findOneAndDelete(company, req.body)
        return res.json({ message: "deleted!" })
    }
    return res.json({ message: "not authorized!" })
})





export {
    addCompany,
    getAllcompanys,
    updatecompany,
    deleteCompany
}