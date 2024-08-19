import express from 'express'
import userController from "../controller/user.controller.js";
const userRouter = express.Router()

userRouter.post('/create',userController.createUser)

export default userRouter