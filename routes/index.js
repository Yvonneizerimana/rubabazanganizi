import express from 'express'
import userRouter from "./user.route.js";
import bookRouter from "./book.route.js";
import contactRouter from './contact.route.js';

const router=express.Router()

router.use('/user',userRouter)
router.use('/book',bookRouter)
router.use('/contact',contactRouter)

export default router;

