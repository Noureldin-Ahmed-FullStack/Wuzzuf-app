import { userModel } from "../../Models/user.model.js"
import bcrypt from "bcrypt"
import asyncHandler from "express-async-handler"
import { sendEmail } from "../../mail/sendMail.js"
import jwt from "jsonwebtoken"
import { catchError } from "../../src/middleware/catchError.js"
import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';





const signUp = catchError(async (req, res) => {
    req.body.userName = req.body.firstName + " " + req.body.lastName
    const user = await userModel.create(req.body)
    // console.log(user._id);
    // sendEmail(user._id,user.email)
    res.json({ message: "success" })
})
const getAllUsers = catchError(async (req, res) => {
    const users = await userModel.find()
    res.json(users)
})
const getUserById = catchError(async (req, res) => {
    const users = await userModel.findById(req.params.id)
    res.json(users)
})
const getUserData = catchError(async (req, res) => {
    const users = await userModel.findById(req.user._id)
    res.json(users)
})
const getUserByRecovEmail = catchError(async (req, res) => {
    if (req.body.recoveryEmail) {
        const users = await userModel.find({ recoveryEmail: req.body.recoveryEmail })
        res.json(users)
    } else {
        return res.status(404).json({ message: "enter recovery email" })
    }
})
export const GetSingleUser = catchError(async (req, res, next) => {
    const users = await userModel.findById(req.params.id)
    if (!users) {
        return res.json({ message: "user doesnt exist" })
    }
    next()
})
export const GetSingleUserRes = catchError(async (req, res, next) => {
    const users = await userModel.findById(req.user._id)
    if (!users) {
        return res.json({ message: "user doesnt exist" })
    }
    res.json({ message: users })
})
const Validate = catchError(async (req, res) => {
    await userModel.findByIdAndUpdate(req.params.id, {
        Validated: true
    })
    res.json({ message: "Validated" })
})
const signIn = catchError(async (req, res) => {
    let user = await userModel.findOne({ email: req.body.email })
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign({ uid: user._id, email: user.email }, 'key')
        await userModel.findOneAndUpdate({ email: req.body.email }, { status: 'online' })
        return res.json({ message: "hello " + user.userName, token })
    }
    return res.json({ message: "Email or password is incorrect!" })

})
const updateUser = catchError(async (req, res) => {
    const user = await userModel.updateOne(req.user, req.body)
    return res.json({ message: "updated!" })

})
const updateUserPassword = catchError(async (req, res) => {
    const oldPassword = req.body.password
    if (bcrypt.compareSync(req.body.password, req.user.password)) {
        req.body.password = bcrypt.hashSync(req.body.newPassword, 8)
        const user = await userModel.updateOne(req.user, req.body)
        return res.json({ message: "updated!" })
    } else { return res.status(403).json({ message: "wrong password" }) }

})
const deleteAccount = catchError(async (req, res) => {
    if (req.user) {
        const user = await userModel.findByIdAndDelete(req.user._id)
    } else {
        return res.status(403).json({ message: "user not authenticated" })
    }
    const user = await userModel.findByIdAndDelete(req.user._id)
    if (user) {
        return res.json({ message: "user deleted!", user })
    } else {
        return res.status(404).json({ message: "user not found" })
    }

})
// const verify = catchError((req, res) => {
//     jwt.verify(req.params.token, 'key', async (err, decoded) => {
//         if (err) return res.json(err)
//     }
//     )
// })


const updateUserResume = catchError(async (req, res) => {
    cloudinary.config({
        cloud_name: 'dqijwldax',
        api_key: '764827226872981',
        api_secret: "Nht0PwGG8HmJt14MpdKDK4E79Uc"
    });
    await cloudinary.uploader.upload(req.file.path,
        { public_id: uuidv4() + "-" + req.file.originalname },
        async function (error, result) {
            console.log(result);
            await userModel.findByIdAndUpdate(req.user._id, { resume: result.secure_url })

        });
    res.json(req.file);
})


export {
    signUp,
    signIn,
    updateUserPassword,
    getUserData,
    getAllUsers,
    updateUserResume,
    updateUser,
    deleteAccount,
    getUserById,
    getUserByRecovEmail
}