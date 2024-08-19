import express from 'express'
import userRouter from "./user.route.js";
const routerUser=express.Router()

routerUser.use('/user',userRouter)

export default routerUser;
