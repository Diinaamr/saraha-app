import bcrypt from "bcrypt";

export const generateHash=({plainText="",SALT=process.env.SALT_ROUND}={})=>{
    const hash= bcrypt.hashSync(plainText,parseInt(SALT))
    return hash

}



export const compareHash=({plainText="",hashValue=""}={})=>{
    const compareHash= bcrypt.compareSync(plainText,hashValue)
    return compareHash

}