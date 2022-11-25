import { LABO } from "../module/labo"

export const readLabmDetailsById = async ({_id}: any, {user, message, permissions}: any)=>{
    
    const result = await LABO.findOne({_id}).select('account contact views location');
    
    return result;
}