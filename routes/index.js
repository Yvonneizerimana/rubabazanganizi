import express from 'express'
import userRouter from "./user.route.js";
import bookRouter from "./book.route.js";
const router=express.Router()

router.use('/user',userRouter)
router.use('/book',bookRouter)

export default router;
