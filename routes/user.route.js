import express from 'express'
import userController from "../controller/user.controller.js";
const userRouter = express.Router()

userRouter.post('/create',userController.createUser)
userRouter.post('/login',userController.loginUser)  
userRouter.post('/otp',userController.verifyOtp)       
userRouter.post('/newOtp',userController.generateNewOtp)
userRouter.post('/forgotPassword',userController.forgotPassword)
userRouter.post('/changePassword/:resetToken',userController.changePassword)

export default userRouter

