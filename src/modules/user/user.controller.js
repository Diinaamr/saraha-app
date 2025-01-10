import { Router } from "express";
import * as userServices from './services/user.services.js'
import { authentication ,authorization } from "../../middleware/auth.middelware.js";
import { endPoint } from "./user.endpoint.js";
import { validation } from "../../middleware/validation.middelware.js";
import * as validators from '../user/user.validation.js'
const router=Router()
router.get('/profile',authentication(),authorization(endPoint.profile),userServices.getUserProfile)

router.patch('/updateProfile',validation(validators.updateProfile),authentication(),authorization(endPoint.profile),userServices.updateProfile)

router.patch('/updatePassword',validation(validators.updatePassword),authentication(),authorization(endPoint.profile),userServices.updatePassword)

router.delete('/freezeAccount',authentication(),authorization(endPoint.profile),userServices.freezeAccount)

router.get('/shareProfile/:userId',validation(validators.shareProfile),userServices.shareProfile)

router.patch('/updateEmail', validation(validators.updateEmail),authentication(),authorization(endPoint.profile),userServices.updateEmail)
router.patch('/newEmail',validation(validators.newEmail),authentication(),authorization(endPoint.profile),userServices.newEmail)
export default router