import mongoose, { Schema,model } from "mongoose";
import { userRoles } from "../../middleware/auth.middelware.js";
const userSchema= new Schema({
userName:{
    type:String,
    required:true,
    minlength:2,
    maxlength:20,
    trim:true
},
email:{
    type:String,
    required:true,
    unique:true
},

newEmail:{
    type:String,
  
},
password:{
    type:String,
    required:true
},
phone:{
   type: String,
   required:true
},
 

age:{
    type:Number,
    min:18,
    max:60
},
gender:{
    type:String,
    enum:['male','female'],
    default:'male'

},
DOB:Date,

address:String,
image:String,
confirmEmail:{
    type:Boolean,
    default:false
},
role:{
    type:String,
    enum:(Object.values(userRoles)), // we made userRoles as object in file auth.middelware and Object.values(userRoles)>> thats make the object as array
    default:userRoles.user
},
changeCredintialTime:Date,

isDeleted:{type:Boolean ,
    default:false

},
activationCode:String,

forgetPasswordCode:String,
    

reactivateCode:String,
    

updateEmailCode: String
   

},{timestamps:true})

 const userModel= mongoose.models.User||model("User",userSchema)
 export default userModel