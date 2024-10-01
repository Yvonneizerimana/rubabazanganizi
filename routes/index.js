import express from 'express'
import userRouter from "./user.route.js";
import bookRouter from "./book.route.js";
const router=express.Router()

router.get('/user',userRouter)
router.get('/book',bookRouter)

export default router;
