import Joi from "joi"
import { Types } from "mongoose"


export const validationObjectId=(value,helper)=>{
return Types.ObjectId.isValid(value)
? true: helper.message("in valid object id")
}


export const validation=(schema)=>{
return (req,res,next)=>{
const inputData={...req.body,...req.params,...req.query}
if(req.headers['accept-language']){
inputData['accept-language']=req.headers['accept-language']
}
const validationResult=schema.validate(inputData,{abortEarly:false})
if(validationResult.error){
return res.status(400).json({message:"validation error",validationResult:validationResult.error.details})
}
return next()
}
}



export const generalFields={
userName:Joi.string().min(2).max(20),
email:Joi.string().email({minDomainSegments:2 ,maxDomainSegments:3},{tlds:{allow:['com','net']}}),
password:Joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)),
confirmPassword:Joi.string().valid(Joi.ref("password")),
phone:Joi.string().pattern(new RegExp(/^(\+2|002)?01[0125][0-9]{8}$/)),
gender:Joi.string().valid("male","female"),
id:Joi.string().custom(validationObjectId)
}