import Joi from "joi";
import { generalFields } from "../../middleware/validation.middelware.js";

export const signUp=Joi.object().keys({
userName:generalFields.userName.required(),
email:generalFields.email.required(),
password:generalFields.password.required(),
confirmPassword:generalFields.confirmPassword.valid(Joi.ref("password")).required(),
phone:generalFields.phone.required(),
"accept-language":Joi.string().valid("en","ar")
}).required()


export const logIn=Joi.object().keys({
email:generalFields.email.required(),
password:generalFields.password.required(),
}).required()



export const confirmEmailOtp=Joi.object().keys({
Code:Joi.string().required(),
userId:generalFields.id.required()
}).required()




export const forgetPassword=Joi.object().keys({
email:generalFields.email.required()
}).required()






export const resetPassword=Joi.object().keys({
userId:generalFields.id.required(),
code: Joi.string().required(),
password:generalFields.password.required(),
confirmationPassword:generalFields.confirmPassword.valid(Joi.ref("password")).required()
}).required()




export const reactivateAccount=Joi.object().keys({
userId:generalFields.id.required(),
code: Joi.string().required(),
password:generalFields.password.required(),
}).required()