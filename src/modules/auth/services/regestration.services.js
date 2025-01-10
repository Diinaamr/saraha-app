import userModel from "../../../DB/models/User.model.js"
import { emailEvent, emailEventOtp } from "../../../utilies/events/email.event.js";
import { asyncHandler } from "../../../utilies/error/error.js";
import { successResponse } from "../../../utilies/response/response.success.js";
import {  compareHash, generateHash } from "../../../utilies/security/hash.js";
import { generatEncryption } from "../../../utilies/security/encryption.js";
import {  verifyToken } from "../../../utilies/security/token.js";
import { generatRandomCodes } from "../../../utilies/randomCodes.js";

//signup and confirm email by email token/////////////////////////

export const signUp=asyncHandler(async(req,res,next)=>{
const{userName,email,password,phone}=req.body
if(await userModel.findOne({email})){ 
return next(new Error("email is already exist ",{cause:409}))
}
const hashPassword= generateHash({plainText:password})
const cryptPhone= generatEncryption({plainText:phone})
const user= await userModel.create({userName,email,password:hashPassword,phone:cryptPhone})
emailEvent.emit("sendConfirmEmail",{email})
return successResponse({res,status:201,message:"please check your email"})
})


export const confirmEmail=asyncHandler(async(req,res,next)=>{
const{authorization}=req.headers
if(!authorization){
return next(new Error("email token is required",{cause:400}))
}
const decoded=verifyToken({token:authorization,signture:process.env.EMAIL_TOKEN_SIGNTURE})
const user= await userModel.findOneAndUpdate({email:decoded.email},{confirmEmail:true},{new:true})
if(!user){
return next(new Error("user not found",{cause:404}))
}
return successResponse({res,message:"email confirmed successfully go to login"}) 
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////
//sign up and confirm email by otp 

export const signUpOtp=asyncHandler(async(req,res,next)=>{
const{userName,email,password,phone}=req.body
if(await userModel.findOne({email})){ 
return next(new Error("email is already exist ",{cause:409}))
}
const hashPassword= generateHash({plainText:password,salt:process.env.SALT_ROUND})
const cryptPhone= generatEncryption({plainText:phone,signture:process.env.PHONE_ENC})
const activationCode= generatRandomCodes()
const hashCode=generateHash({plainText:activationCode})
const user= await userModel.create({userName,email,password:hashPassword,phone:cryptPhone,activationCode:hashCode})
emailEventOtp.emit("sendActivationCode",{email,activationCode})
return successResponse({res,status:201,message:"plesae check your email"})  
    })



export const confirmEmailOtp=asyncHandler(async(req,res,next)=>{
const{userId}=req.params
const{Code}=req.body
const user= await userModel.findById(userId)
if(!user){
    return next (new Error("user not found",{cause:404}))
}
if(!compareHash({plainText:Code,hashValue:user.activationCode})){
 return next(new Error(" in valid code",{cause:409}))
}
await userModel.updateOne({_id:userId},{confirmEmail:true, $unset:{activationCode:1}})
return successResponse({res,message:"email confirmed successfully go to login"})
})