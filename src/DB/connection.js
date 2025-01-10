import mongoose from "mongoose";
const DbConnection=async ()=>{
await mongoose.connect(process.env.DB_URI).then(res=>{
console.log('DB is connected successfully')
}).catch(error=>{
console.log('fail to connect DB',error)
})

}

export default DbConnection