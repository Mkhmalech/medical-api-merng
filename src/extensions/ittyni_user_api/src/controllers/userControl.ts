import { USER } from "../module/users"
import { default as utils } from '../../../../common/utils'

export const updateProfilInformation = async ({ _id, iPersonal }: any, { user, permission, message }: any) => {
    let personalData = utils.removeUndefinedFromObject(iPersonal);

    const result = await USER.findOneAndUpdate({ _id }, { ...personalData })

    return result ? "USER_PROFILE_PERSONAL_UPDATED" : null
}

export const updateProfileContact = async ({ _id, iContact }: any, { user, permission, message }: any) => {
    let contact = utils.removeUndefinedFromObject(iContact);
    let newContact = {};
    Object.keys(contact).forEach((key: string) => {
        newContact = { ...newContact, [`contact.${key}`]: contact[key] }
    })
    const result = await USER.findOneAndUpdate({ _id }, { ...newContact })
    return result ? "USER_PROFILE_CONTACT_UPDATED" : null
}

export const updateProfileLocation = async ({ _id, iLocation }: any, { user, permission, message }: any) => {
    let location = utils.removeUndefinedFromObject(iLocation);
    const result = await USER.findOneAndUpdate({ _id }, { location });

    return result ? "USER_PROFILE_LOCATION_UPDATED" : null;
}

export const updateProfileContactTele = async ({ _id, iTele }: any, { user, permission, message }: any) => {
    let tele = utils.removeUndefinedFromObject(iTele)
    if (!tele.value||!tele.type) {
        return null;
    }
    else {
        const result = await USER.findOneAndUpdate({ _id, "contact.tele.type" : tele.type }, { "$set": { "contact.tele.$": tele } }, {upsert: true});
        return result ? "USER_PROFILE_CONTATCT_UPDATED" : null
    }    
}

