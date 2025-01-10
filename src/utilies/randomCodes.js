import { nanoid } from "nanoid";

export const generatRandomCodes=()=>{
    const code= nanoid(5)
    return code.toLowerCase()

}