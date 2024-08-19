import userModel from '../model/user.model.js';
import {validationResult} from 'express-validator';
import { BadRequestError } from '../errors/BadRequestError.js';
import { NotFoundError} from '../errors/NotFoundError.js'
import bcrypt from 'bcrypt'


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
    },

    loginUser:async(req,res,next) => {
      const {email,password}=req.body

      try{
         const findUser= await userModel.findOne({email})
         if(!findUser){
            return next(new Error('User not found'));
         }
         const isMatch=await bcrypt.compare(password,findUser.password);
         if(!isMatch){
            return next(new Error('Invalid credentials'));
         }
         res.status(200).json({message:`Hey ${findUser.names}, Welcome to our page`})
      }
      catch(err){
         console.log(err.message)
         return next(new Error('Internal server error'));
      }
    }
}

export default userController;
