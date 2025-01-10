import messageModel from "../../../DB/models/message.model.js";
import userModel from "../../../DB/models/User.model.js";
import { asyncHandler } from "../../../utilies/error/error.js";
import { successResponse } from "../../../utilies/response/response.success.js";

export const sendMessage=asyncHandler(async(req,res,next)=>{
const{message,receiverId}=req.body
if(!await userModel.findOne({_id:receiverId,isDeleted:false})){
return next(new Error(" user not found",{cause:404}))
}
const createMessage= await messageModel.create({message,receiverId})
return successResponse({res,message:"Done",status:201,data:{createMessage}})
})


export const deleteMessage=asyncHandler(async(req,res,next)=>{
const{messageId}=req.params
if(!await messageModel.findByIdAndDelete(messageId)){
    return next(new Error("message is not found"))
}
return successResponse({res,message:"message deleted successfully"})


})