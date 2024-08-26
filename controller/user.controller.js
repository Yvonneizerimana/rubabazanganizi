import userModel from '../model/user.model.js';
import {validationResult} from 'express-validator';
import { BadRequestError } from '../errors/BadRequestError.js';
import { NotFoundError} from '../errors/NotFoundError.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import sgMail from '@sendgrid/mail'
import configurations  from '../configs/index.js';


const userController={
    createUser: async(req,res,next)=>{
      const errors=validationResult(req)
      if(!errors.isEmpty()){
        return next(new BadRequestError(errors.array()[0].msg))
      }
 const {names, phone, email,role,password, confirmPassword}=req.body
     
 try{
     const existingUser= await userModel.findOne({email})

     if(existingUser){
        res.status(400).json({message:'User already exists'})
     }

     const newUser= await userModel.create({
      names,
      phone,
      email,
      role,
      password,
      confirmPassword,
     })

     const sendGridKey=configurations.sendGridKey;

     sgMail.setApiKey(sendGridKey);

     const mailOptions = {
         from: 'yvannyizerimana@gmail.com', 
         to: req.body.email, 
         subject: 'Account created !! ', 
         html: `<B>Hello ${newUser.names},</B><br><br> Thank you for being the member of iwacu cyera system, your account has been created successfully!!` // email body
     };

     await sgMail.send(mailOptions);
     console.log('Email sent successfully');
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

  const sendGridKey=configurations.sendGridKey;

  sgMail.setApiKey(sendGridKey);

  const mailOptions = {
      from: 'yvannyizerimana@gmail.com', 
      to: req.body.email, 
      subject: 'OTP generated!! ', 
      html: `<B>Hello ${findUser.names},</B><br><br> Your OTP is ${findUser.otp}` // email body
  };

  await sgMail.send(mailOptions);
     console.log('Email sent successfully');

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
         res.status(401).json({message:"Invalid OTP"})
      }

      if(findUserByOtp.otpExpires < new Date().getTime()){
           res.status(401).json({message:"The otp has been expired"})
      }

      if(findUserByOtp.otpExpires > new Date().getTime()){
         const token=jwt.sign({
            email:findUserByOtp.email,
            id:findUserByOtp._id
      },configurations.tokenSecretKey,{expiresIn:"5m"})

      
      const options = {
         expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
         httpOnly: true
       };
  res.cookie("Token",token,options).status(200).json({
   success:true,
   user:findUserByOtp
  })
    }},

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

const sendGridKey=configurations.sendGridKey;

sgMail.setApiKey(sendGridKey);

const mailOptions = {
    from: 'yvannyizerimana@gmail.com', 
    to: req.body.email, 
    subject: 'New otp Generated!! ', 
    html: `<B>Hello ${generateNewOtp.names},</B><br><br> Your New OTP is ${generateNewOtp.otp}` // email body
};

await sgMail.send(mailOptions);
   console.log('Email sent successfully');

res.status(200).json({message:`new otp generated successfuly ${generateNewOtp.otp}`})
    }
    
   catch(error){
      console.log(error.message)
      res.status(500).json({message:"Internal server error"})
   }
   },

   forgotPassword:async(req,res,next)=>{

      const user=await userModel.findOne({email:req.body.email})

         if(!user){
    res.status(404).json({message:"user not found"})
         }

         function generateRandomToken(){
       return crypto.randomBytes(20).toString('hex');
         }

         const resetToken=generateRandomToken();

         user.resetToken=resetToken;
         user.resetTokenExpires=Date.now() + 1 * 60 * 1000

         await user.save()

         const sendGridKey=configurations.sendGridKey;

         sgMail.setApiKey(sendGridKey);
       
         const mailOptions = {
             from: 'yvannyizerimana@gmail.com', 
             to: req.body.email, 
             subject: 'Reset password !! ', 
             html: `<B>Hello ${user.names},</B><br><br> Your ResetToken is ${user.resetToken}` // email body
         };
       
         await sgMail.send(mailOptions);
            console.log('Email sent successfully');
         res.status(200).json({resetToken:`${user.resetToken}`})
   },

   changePassword:async(req,res,next)=>{
      const verifyToken=await userModel.findOne({resetToken:req.params.resetToken})

   if(!verifyToken){
      res.status(400).json({message:"Invalid Token"})
   }
   if(verifyToken.resetToken < new Date().getTime()){
      res.status(401).json({message:"your token has been expired"})
   }
   
   verifyToken.password=req.body.newPassword
   verifyToken.confirmPassword=req.body.confirmPassword
   verifyToken.resetToken=undefined
   verifyToken.resetTokenExpires=undefined
   
   await verifyToken.save()

   const sendGridKey=configurations.sendGridKey;

   sgMail.setApiKey(sendGridKey);
 
   const mailOptions = {
       from: 'yvannyizerimana@gmail.com', 
       to: req.body.email, 
       subject: 'Password changed !! ', 
       html: `<B>Hello ${verifyToken.names},</B><br><br> Your Password has been changed successfuly ` // email body
   };
 
   await sgMail.send(mailOptions);
      console.log('Email sent successfully');
   res.status(200).json({message:"Password changed successfully"})
   }
      
   }


export default userController;
