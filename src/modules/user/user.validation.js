import Joi from "joi";
import { generalFields } from "../../middleware/validation.middelware.js";

export const updateProfile=Joi.object().keys({
userName:generalFields.userName,
gender:generalFields.gender,
phone:generalFields.phone
}).required()


export const updatePassword=Joi.object().keys({
oldPassword:generalFields.password.required(),
password:generalFields.password.not(Joi.ref("oldPassword")).required(),
confirmationPassword:generalFields.confirmPassword.valid(Joi.ref("password")).required()
}).required()


export const shareProfile=Joi.object().keys({
userId:generalFields.id.required()        
}).required()


export const updateEmail=Joi.object().keys({
newEmail:generalFields.email.required()
}).required()


export const newEmail=Joi.object().keys({
code:Joi.string().required()
}).required()