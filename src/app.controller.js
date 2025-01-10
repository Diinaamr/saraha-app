import DbConnection from "./DB/connection.js"
import authController from './modules/auth/auth.controller.js'
import userController from './modules/user/user.controller.js'
import messageController from './modules/message/message.controller.js'
import { globalErrorHandling } from "./utilies/error/error.js"

const bootstrap=(app,express)=>{
//convert buffer data
app.use(express.json())

// application routing 

app.use('/auth',authController)
app.use("/users",userController)
app.use("/message",messageController)



app.use("*",(req,res,next)=>{
    return res.status(404).json("in valid routing")
})

//error handling
app.use(globalErrorHandling)

//DB
DbConnection()
}

export default bootstrap