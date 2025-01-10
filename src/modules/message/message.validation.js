import joi from "joi";
import { generalFields } from "../../middleware/validation.middelware.js";

export const sendMessage=joi.object().keys({
message:joi.string().min(5).max(50000).required(),
receiverId:generalFields.id.required()

}).required()


export const deleteMessage=joi.object().keys({
messageId:generalFields.id.required()
}).required()