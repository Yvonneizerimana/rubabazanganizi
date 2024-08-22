import userModel from '../model/user.model.js';
import {validationResult} from 'express-validator';
import { BadRequestError } from '../errors/BadRequestError.js';
import { NotFoundError} from '../errors/NotFoundError.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


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
if(findUser && isMatch){
   const otpGenerator=()=>{
      let otp=0;
      otp=Math.ceil(Math.random()*1000000)
      return otp
  }
  const otp=otpGenerator()
  findUser.otpExpires=Date.now() + 10 * 60 * 1000;
  findUser.otp=otp

  const loggedUser=await findUser.save()

        res.status(200).json({message:`Hey ${findUser.names}, Your OneTimePassword is ${findUser.otp}`})
        console.log(loggedUser)
      }
   }
      catch(err){
         console.log(err.message)
       res.status(500).json({message:"Internal server error"})
      }
    },

    verifyOtp:async(req,res,next)=>{

      const errors=validationResult(req)
      if(!errors.isEmpty()){
        return next(new BadRequestError(errors.array()[0].msg))
       
      }

      const findUserByOtp= await userModel.findOne({otp:req.body.otp})

      if(!findUserByOtp){
         next(new BadRequestError(errors.array()[0].msg))
      }

      if(findUserByOtp.otpExpires < new Date().getTime()){
           res.status(401).json({message:"The otp has been expired"})
      }
      res.status(200).json({message:"welcome to our page,.........."})
    },

    generateNewOtp:async(req,res,next)=>{
try{
      
      const generateNewOtp= await userModel.findOne({email:req.body.email})

      if(!generateNewOtp){
         res.status(404).json({message:`User with email ${email} not found`})
      }
     
      const otpGenerator=()=>{
         let otp=0;
         otp=Math.ceil(Math.random()*1000000)
         return otp
     }

     const otp=otpGenerator()
     generateNewOtp.otpExpires= Date.now() + 10 * 60 * 1000;
     generateNewOtp.otp=otp

await generateNewOtp.save()

res.status(200).json({message:`new otp generated successfuly ${generateNewOtp.otp}`})
    }
    
   catch(error){
      console.log(error.message)
      res.status(500).json({message:"Internal server error"})
   }
   }
}

export default userController;
