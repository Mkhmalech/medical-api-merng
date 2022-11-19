export const updateProfilInformation = (args: any, {user, permission, message} : any) =>{

    console.log(args)

    return "USER_PROFILE_PERSONAL_UPDATED"
}

export const updateProfileContact = (args: any, {user, permission, message}: any) =>{
    console.log(args)
    return "USER_PROFILE_CONTACT_UPDATED"
}