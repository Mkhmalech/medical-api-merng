import { USER } from "../module/users"

export const updateProfilInformation = async ({_id, iPersonal}: any, {user, permission, message} : any) =>{
    const result = await USER.findOneAndUpdate({_id}, {...iPersonal })

    return result ? "USER_PROFILE_PERSONAL_UPDATED" : null 
}

export const updateProfileContact = async ({_id, iContact, iLocation}: any, {user, permission, message}: any) =>{
    console.log(iContact)

    const result = await USER.findOneAndUpdate({_id}, {contact: iContact, location: iLocation})
    return result ? "USER_PROFILE_CONTACT_UPDATED" : null
}

export const updateProfileContactTele = async ({_id, iTele}: any, {user, permission, message}: any ) =>{
    const result = await USER.findOneAndUpdate({_id}, {contact: {tele : iTele}});

    return result ?  "USER_PROFILE_CONTATCT_UPDATED" : null
}