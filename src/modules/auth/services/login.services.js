
import userModel from "../../../DB/models/User.model.js"
import { userRoles } from "../../../middleware/auth.middelware.js"
import { asyncHandler } from "../../../utilies/error/error.js";
import { successResponse } from "../../../utilies/response/response.success.js";
import { compareHash, generateHash } from "../../../utilies/security/hash.js";
import { generateToken} from "../../../utilies/security/token.js"
import { forgetPasswordEvent, reactiveAccountEvent } from "../../../utilies/events/email.event.js";
import { generatRandomCodes } from "../../../utilies/randomCodes.js";



export const logIn=asyncHandler(async(req,res,next)=>{
const{email,password}=req.body
const user= await userModel.findOne({email})
if(!user){
return next(new Error("in valid login data",{cause:404}))
}
if(!user.confirmEmail){
return next(new Error("please confirm email first",{cause:401}))
}
if(user.isDeleted)
{
const reactivateCode=generatRandomCodes()
const hashCode= generateHash({plainText:reactivateCode})
user.reactivateCode=hashCode
await user.save()
reactiveAccountEvent.emit("ReactiveAccountCode",{email,reactivateCode})
return next(new Error(" please check your email to reactivate your account"))
}
if(!compareHash({plainText:password,hashValue:user.password})){ 
return next(new Error("in valid login data",{cause:404}))
}
const token= generateToken({payload:{_id:user._id},signture:user.role==userRoles.admin?process.env.TOKEN_SIGNTURE_ADMIN:process.env.TOKEN_SIGNTURE,options:{expiresIn:'1h'}})
return successResponse({res,message:"login successfully",data:{token}})
})




export const forgetPassword=asyncHandler(async(req,res,next)=>{
const{email}=req.body
const user= await userModel.findOne({email})
if(!user){
    return next(new Error("in valid email",{cause:404}))
}
const forgetPasswordCode= generatRandomCodes()
const hashCode= generateHash({plainText:forgetPasswordCode})
user.forgetPasswordCode=hashCode
await user.save()
forgetPasswordEvent.emit("ForgetPasswordCode",{email,forgetPasswordCode})
return successResponse({res,message:"please check your email"})
})



export const resetPassword=asyncHandler(async(req,res,next)=>{
const{userId}=req.params
const{code,password}=req.body
const user= await userModel.findById(userId)
if(!user){
return next(new Error("user not found",{cause:404}))
}
if(!compareHash({plainText:code,hashValue:user.forgetPasswordCode})){
    return next(new Error("in valid code",{cause:409}))
}
const hashPassword=generateHash({plainText:password})
await userModel.updateOne({_id:userId},{password:hashPassword,$unset:{forgetPasswordCode:1},changeCredintialTime:Date.now()})
return successResponse({res,message:"password changed successfully try to login.."})
})



export const reactivateAccount=asyncHandler(async(req,res,next)=>{
const {userId}=req.params
const{password,code}=req.body
const user= await userModel.findById(userId)
if(!user){
return next(new Error("user not found ",{cause:404}))
}
if(!compareHash({plainText:code,hashValue:user.reactivateCode})){
return next(new Error("in valid code",{cause:409}))
}
if(!compareHash({plainText:password,hashValue:user.password})){
    return next(new Error("in valid password",{cause:409}))
    }
await userModel.updateOne({_id:userId},{isDeleted:false,$unset:{reactivateCode:1}})
return successResponse({res,message:"reactivated successfully try to login.."})
})

