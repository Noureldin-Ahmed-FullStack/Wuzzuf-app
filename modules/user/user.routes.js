import express from 'express'
import {CheckToken, allowed, checkEmailExist } from '../../src/middleware/middleware.js'
import { GetSingleUser, GetSingleUserRes, deleteAccount, getAllUsers, getUserById, getUserByRecovEmail, getUserData, signIn, signUp, updateUser, updateUserPassword, updateUserResume } from './user.controller.js'
import { hashPass, validateShema } from '../../src/middleware/hashPassword.js'
import { upload } from '../../src/middleware/FileUpload/uploads.js'

const userRouter = express.Router()

userRouter.post('/signUp',validateShema, checkEmailExist,hashPass,signUp)
userRouter.post('/signIn', signIn)
userRouter.delete('/users',CheckToken, deleteAccount)
userRouter.get('/users', getAllUsers)
userRouter.get('/usersById/:id', getUserById)
userRouter.get('/getUserData',CheckToken, getUserData)
userRouter.get('/usersByRecovEmail', getUserByRecovEmail)
userRouter.put('/users',CheckToken,allowed('User','Company_HR'), updateUser)
userRouter.put('/updatePassword',CheckToken, updateUserPassword)
userRouter.get('/getSingleUser',CheckToken, GetSingleUserRes)
 
userRouter.post('/upload',CheckToken,allowed('User'), upload.single('file'), updateUserResume)


export default userRouter