import mongoose, { Schema, Types,model } from "mongoose";
const messageSchema= new Schema({
message:{
    type:String,
    minLength:5,
    maxLength:50000,
    trim:true,
    required:true,

},
receiverId:{
    type:Types.ObjectId,
    ref:"User",
    required:true
},





},{timestamps:true})

  const messageModel= mongoose.models.Message ||model("Message",messageSchema)
  export default messageModel
