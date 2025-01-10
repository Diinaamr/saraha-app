import CryptoJS from "crypto-js";


export const generatEncryption=({plainText="",signture=process.env.ENCRYPTION_SIGNTURE}={})=>{
    const encrypt= CryptoJS.AES.encrypt(plainText,signture).toString()
   return encrypt

}


export const generateDecryption=({cipherText="",signture=process.env.ENCRYPTION_SIGNTURE}={})=>{
    const decoded= CryptoJS.AES.decrypt(cipherText,signture).toString(CryptoJS.enc.Utf8)
   return decoded

}


