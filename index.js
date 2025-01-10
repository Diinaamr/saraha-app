import path from 'node:path'
import * as dotenv from 'dotenv'
dotenv.config({path: path.join('./src/config/.env.dev')})
import bootstrap from './src/app.controller.js'
import express from 'express'
const app=express()
const PORT=process.env.PORT
bootstrap(app,express)
app.listen(PORT,()=>{
console.log(`app is running on port : ${PORT}`)

})
