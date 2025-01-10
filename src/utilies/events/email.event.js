import { EventEmitter } from "node:events";
import { sendEmail } from "../email/sendEmail.js";
import { confirmEmailTemp, sendCodeTemp } from "../email/templete/confirmEmail.js";
import { generateToken } from "../security/token.js";

export const emailEvent=new EventEmitter
emailEvent.on("sendConfirmEmail", async({email}={})=>{
const emailToken=generateToken({payload:{email},signture:process.env.EMAIL_TOKEN_SIGNTURE})
const emailLink=`${process.env.FE_URL}/confirm-email/${emailToken}`
await sendEmail({to:email ,subject:"confirm Email",html:confirmEmailTemp({link:emailLink})})
})


export const emailEventOtp= new EventEmitter
emailEventOtp.on("sendActivationCode",async({email,activationCode}={})=>{
await sendEmail({to:email,subject:"confirm Email",html:sendCodeTemp({code:activationCode})})
})



export const forgetPasswordEvent= new EventEmitter
forgetPasswordEvent.on("ForgetPasswordCode",async({email,forgetPasswordCode}={})=>{
await sendEmail({to:email,subject:"forget password",html:sendCodeTemp({code:forgetPasswordCode})})
 })


export const reactiveAccountEvent= new EventEmitter
reactiveAccountEvent.on("ReactiveAccountCode",async({email,reactivateCode}={})=>{
await sendEmail({to:email,subject:"reactivate account",html:sendCodeTemp({code:reactivateCode})})
 })



export const updateEmailEvent= new EventEmitter
updateEmailEvent.on("updateEmail",async({newEmail,updateEmailCode}={})=>{
await sendEmail({to:newEmail,subject:"update email",html:sendCodeTemp({code:updateEmailCode})})
 })