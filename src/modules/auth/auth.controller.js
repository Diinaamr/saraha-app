import { Router } from "express";
import * as regestrationServices from './services/regestration.services.js'
import * as loginServices from './services/login.services.js'
import { validation } from "../../middleware/validation.middelware.js";
import * as validators from "./auth.validation.js";
const router=Router()
//regestraion
router.post('/signUp', validation(validators.signUp),regestrationServices.signUp)
router.patch('/confirmEmail',regestrationServices.confirmEmail)
router.post('/signUpOtp', validation(validators.signUp),regestrationServices.signUpOtp)
router.patch('/confirmEmailOtp/:userId',validation(validators.confirmEmailOtp),regestrationServices.confirmEmailOtp)

//login
router.post('/logIn',validation(validators.logIn),loginServices.logIn)
router.patch('/forgetPassword', validation(validators.forgetPassword),loginServices.forgetPassword)
router.post('/resetPassword/:userId',validation(validators.resetPassword),loginServices.resetPassword)
router.post('/reactivateAccount/:userId',validation(validators.reactivateAccount),loginServices.reactivateAccount)


export default router