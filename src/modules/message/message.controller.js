import { Router } from "express";
import * as messageServices from './services/message.services.js'
import { validation } from "../../middleware/validation.middelware.js";
import * as validators from './message.validation.js'
const router=Router()

router.post('/',validation(validators.sendMessage),messageServices.sendMessage)
router.delete('/delete/:messageId',validation(validators.deleteMessage),messageServices.deleteMessage)
















export default router