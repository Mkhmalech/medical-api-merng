import { USER } from "../module/users"

export const updateProfilInformation = async ({_id, iPersonal}: any, {user, permission, message} : any) =>{
    const result = await USER.findOneAndUpdate({_id}, {...iPersonal })

    return result ? "USER_PROFILE_PERSONAL_UPDATED" : null 
}

export const updateProfileContact = (args: any, {user, permission, message}: any) =>{
    console.log(args)
    return "USER_PROFILE_CONTACT_UPDATED"
}