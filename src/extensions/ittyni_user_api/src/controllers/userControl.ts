import { USER } from "../module/users"
import { default as utils } from '../../../../common/utils'

export const updateProfilInformation: any = async ({ _id, iPersonal }: any, { user, permission, message }: any) => {
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
    if (!tele.value || !tele.type) {
        return null;
    }
    else {
        const isExists = await USER.countDocuments({ _id, "tele.type": tele.type });
        if (isExists <= 0) {
            const result = await USER.findOneAndUpdate({ _id }, { "$push": { "tele": tele } });
            return result ? "USER_PROFILE_CONTATCT_UPDATED" : null
        }
        else {
            const result = await USER.findOneAndUpdate({ _id, "tele.type": tele.type }, { "$set": { "tele.$.value": tele.value } });
            return result ? "USER_PROFILE_CONTATCT_UPDATED" : null
        }

    }
}

export const userAddSpace = async (args: any, { user, permission, message }: any) => {
    let result = await USER.findById(user._id, async (err:Error, data: any) => {
        if(err) return "ACCOUNT_NOT_SAVED"
        if(data){
            let i = data.accounts.findIndex((acc: any)=>acc.labo.toString() === args._id.toString());
            if(i>=0) return "ACCOUNT_ALREADY_EXISTS"
            else {
                let account = {
                    labo: args._id,
                    role: {
                        name: args.role
                    },
                    enabledBy: user._id
                }
                data&&data.tele.push({
                        value: args.tele
                })
                data&&data.accounts.push({...account})
    
                let isSaved = await data.save();

                return isSaved? "ACCOUNT_ACTIVATED_SUCCESSFULLY": "NOT_SAVED" 
            }
        }
    })


    if(result) return "ACCOUNT_ACTIVATED_SUCCESSFULLY"
    else return "ACCOUNT_NOT_ACTIVATED"
}



