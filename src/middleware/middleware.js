import { userModel } from "../../Models/user.model.js"
import { catchError } from "./catchError.js"
import jwt from "jsonwebtoken"

export const checkEmailExist = async(req,res,next)=>{
    let user = await userModel.findOne({email:req.body.email})
    if(user) return res.json({message: "email already exists!"})
    next()
}

export const GetSingleUser = catchError(async(req,res,next) => {
    let users = await userModel.findById(req.params.id)
    if(!users) return res.json({message: "user doesn't exist!"})
    next()
}) 

export const CheckToken = catchError(async(req,res,next) => {
    let decoded = jwt.verify(req.headers.token, 'key');
    req.user = await userModel.findById(decoded.uid)
    next()
}) 


export const allowed = (...roles)=>{
    return catchError(async(req,res,next) => {
        if (roles.includes(req.user.role)) {
            next()
        }else{
            return res.status(403).json({ message: "you are not authorized for this" })
        }
    }) 
}

