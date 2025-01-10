
import messageModel from "../../../DB/models/message.model.js";
import userModel from "../../../DB/models/User.model.js";
import { asyncHandler } from "../../../utilies/error/error.js";
import { updateEmailEvent } from "../../../utilies/events/email.event.js";
import { generatRandomCodes } from "../../../utilies/randomCodes.js";
import { successResponse } from "../../../utilies/response/response.success.js";
import { generateDecryption } from "../../../utilies/security/encryption.js";
import { compareHash, generateHash } from "../../../utilies/security/hash.js"; 

export const getUserProfile=asyncHandler(async(req,res,next)=>{
req.user.phone=generateDecryption({cipherText:req.user.phone})
const message= await messageModel.find({receiverId:req.user._id}).populate([{path:'receiverId' ,select: 'userName -_id'}])
return successResponse({res,data:{user:req.user,message}})  
})



export const updateProfile=asyncHandler(async(req,res,next)=>{
const user= await userModel.findByIdAndUpdate(req.user._id,req.body,{new:true,runValidators:true})
return successResponse({res,message:"updated successfully",data:{user}})     
})



export const updatePassword=asyncHandler(async(req,res,next)=>{
const {oldPassword,password}=req.body
if(!compareHash({plainText:oldPassword ,hashValue:req.user.password})){
return next(new Error("in valid old password",{cause:409}))
}
const hashPassword=generateHash({plainText:password})
const user= await userModel.findByIdAndUpdate(req.user._id,{password:hashPassword , changeCredintialTime:Date.now()},{new:true,runValidators:true})
return successResponse({res,message:"password updated successfully",data:{user}})          
})



export const freezeAccount=asyncHandler(async(req,res,next)=>{
const user= await userModel.findByIdAndUpdate(req.user._id,{isDeleted:true, changeCredintialTime:Date.now()},{new:true,runValidators:true})
return successResponse({res,message:"accound deleted successfully",data:{user}})            
})



export const shareProfile=asyncHandler(async(req,res,next)=>{
 const{userId}=req.params
const user= await userModel.findOne({_id:userId,isDeleted:false}).select('userName image -_id')
return user? successResponse({res,data:{user}}) : next(new Error("user not found",{cause:404}))                
})



export const updateEmail=asyncHandler(async(req,res,next)=>{
const {newEmail}=req.body
if(await userModel.findOne({email:newEmail}) ){
    return next (new Error("email is already exist",{cause:409}))
}

const updateEmailCode=generatRandomCodes()
const hahsCode=generateHash({plainText:updateEmailCode})
await userModel.updateOne({_id:req.user._id},{updateEmailCode:hahsCode,newEmail})
updateEmailEvent.emit("updateEmail",{newEmail,updateEmailCode})
return successResponse({res,message:"please check this email"})            
})



export const newEmail=asyncHandler(async(req,res,next)=>{
const {code}=req.body
if(!compareHash({plainText:code ,hashValue:req.user.updateEmailCode})){
return next(new Error("in valid code",{cause:409}))
}
await userModel.updateOne({_id:req.user._id},{email:req.user.newEmail,$unset:{updateEmailCode:1 , newEmail:1},changeCredintialTime:Date.now()})
return successResponse({res,message:"email updated successfully"})
                    
})