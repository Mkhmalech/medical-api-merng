import { LABO } from "../module/labo"

export const readLabmDetailsById = async ({_id}: any, {user, message, permissions}: any)=>{
    
    const result = await LABO.findOne({_id}).select('account contact views location');
    
    return result;
}

export const updateLabmIdentification = async ({_id, account}: any, {user, message, permissions}: any)=>{

    const result = await LABO.findOneAndUpdate({_id}, {account : account});

    return result? "LABM_IDENTIFICATION_UPDATED": null;
}
export const updateLabmContact = async ({_id, contact}: any, {user, message, permissions}: any)=>{

    console.log(contact)
    
    return null;
    // const result = await LABO.findOneAndUpdate({_id});

    // return result? "LABM_ADDRESS_UPDATED": null;
}
export const updateLabmClassification = async ({_id, account}: any, {user, message, permissions}: any)=>{

    const result = await LABO.findOneAndUpdate({_id}, {account : account});

    return result? "LABM_CLASSIFICATION_UPDATED": null;
}

