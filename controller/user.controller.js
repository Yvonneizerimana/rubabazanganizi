import userModel from '../model/user.model.js';
import {validationResult} from 'express-validator';
import { BadRequestError } from '../errors/BadRequestError.js';
import { NotFoundError} from '../errors/NotFoundError.js'


const userController={
    createUser: async(req,res,next)=>{
      const errors=validationResult(req)
      if(!errors.isEmpty()){
        return next(new BadRequestError(errors.array()[0].msg))
      }
 const {names, phone, email,password, confirmPassword}=req.body
     
 try{
     const existingUser= await userModel.findOne({email})

     if(existingUser){
        res.status(400).json({message:'User already exists'})
     }

     const newUser= await userModel.create({
      names,
      phone,
      email,
      password,
      confirmPassword,
     })
     res.status(200).json({message:'User created successfully'})
 }
 catch(err){
    console.log(err.message)
    res.status(500).json({message:"Internal server error"})
 }

    }
}

export default userController;
