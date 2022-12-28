import { LABO } from "../module/labo"

export const readLabmDetailsById = async ({_id}: any, {user, message, permissions}: any)=>{
    
    const result = await LABO.findOne({_id}).populate('updates.updatedBy').select('account contact views location updates');
    
    return result;
}
export const updateLabmIdentification = async ({_id, account}: any, {user, message, permissions}: any)=>{

    const result = await LABO.findOneAndUpdate({_id},{"$push":{updates: account}});

    return result? "LABM_IDENTIFICATION_UPDATED": null;
}
export const updateLabmContact = async ({_id, contact}: any, {user, message, permissions}: any)=>{

    const teleCount = await LABO.countDocuments({_id, "contact.tele.type": contact.tele.type});
    const emailCount = await LABO.countDocuments({_id, "contact.email.type": contact.email.type})
    
    let result = true;

    if(teleCount<=0){ 
        let updateTele = await LABO.findOneAndUpdate({_id}, {"$push": {"contact.tele" : contact.tele}});
        if(!updateTele) result = false;
    }
    else { 
        let updateTele = await LABO.findOneAndUpdate({ _id, "tele.type" : contact.tele.type }, {"$set": {"contact.tele.$": contact.tele}});
        if(!updateTele) result = false;
    }
    if(emailCount<=0){
        let updateEmail = await LABO.findOneAndUpdate({_id}, {"$push": {"contact.email" : contact.email}});
        if(!updateEmail) result = false;
    } else {
        let updateEmail = await LABO.findOneAndUpdate({_id, "contact.email.type": contact.email.type},{"$set":{"contact.email.$": contact.email}});
        if(!updateEmail) result = false;
    }

    return result? "LABM_ADDRESS_UPDATED": null;
}
export const updateLabmClassification = async ({_id, account}: any, {user, message, permissions}: any)=>{

    const result = await LABO.findOneAndUpdate({_id}, {account : account});

    return result? "LABM_CLASSIFICATION_UPDATED": null;

}
export const updateLabmLocation = async ({_id, account}: any, {user, message, permissions}: any)=>{

    const result = await LABO.findOneAndUpdate({_id}, {account : account});

    return result? "LABM_LOCATION_UPDATED": null;
}
export const updateLabmDetailsById= async ({_id, ...rest}: any, {user, message, permissions}: any)=>{
    
    const result = await LABO.findOneAndUpdate({_id}, {"$push": { updates : {
        ...rest, updatedBy: user._id, updatedAt: new Date().toLocaleDateString()
    }}})

    return result ? "UPDATES_ADDED_SUCCESSFULLY" : null
}
