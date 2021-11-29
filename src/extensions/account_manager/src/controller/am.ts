/*  health provider account */

import { CABINET } from "../../../../extensions/cabinet-manager/src/module/cabinets"

// change account name
export const updateAccountName = async ({name}:any, {user} : any) => {
    const res = await CABINET.findById(user.accountId).select('account').then((cabinet=>{
        if(cabinet){
            cabinet.account.name = name;
            if(cabinet.save()) return "saved_successfully";
            else return new Error("update_not_saved")
         }
        else return new Error("no_account_founded")
    }))

    return res;
}
// account type
export const updateAccountType = async ({type}:any, {user} : any) => {
    const res = await CABINET.findById(user.accountId).select('account').then((cabinet=>{
        if(cabinet){
            cabinet.account.type = type;
            if(cabinet.save()) return "saved_successfully";
            else return new Error("update_not_saved")
         }
        else return new Error("no_account_founded")
    }))

    return res;
}
// account opening year
export const updateAccountStartDate = async ({start}:any, {user} : any) => {
    const res = await CABINET.findById(user.accountId).select('account').then((cabinet=>{
        if(cabinet){
            cabinet.account.start = start;
            if(cabinet.save()) return "saved_successfully";
            else return new Error("update_not_saved")
         }
        else return new Error("no_account_founded")
    }))

    return res;
}
// account opening year
export const updateContact = async (args:any, {user}: any) => {
    for (const key in args) {
        if(args[key] == 'undefined' || args[key]=='') delete args[key]        
    }
    const res = await CABINET.findById(user.accountId).select('contact').then((cabinet=>{
        if(cabinet){
            if(args.address) cabinet.contact.address.street = args.address
            if(args.region) cabinet.contact.address.region = args.region
            if(args.city) cabinet.contact.address.city = args.city
            if(args.tele) cabinet.contact.address.tele.fix.push(args.tele)
            if(args.fax) cabinet.contact.address.tele.fax.push(args.fax)
            if(args.fax) cabinet.contact.website = args.website
            if(cabinet.save()) return "saved_successfully";
            else return new Error("update_not_saved")
         }
        else return new Error("no_account_founded")
    }))
    return res;
}

// fetch data
export const fetchAccountData = async(args:any, {user}: any)=>{
    const res = await CABINET.findById(user.accountId).select('account contact').then((cabinet=>{
        if(cabinet) return cabinet;
        else return new Error("no_account_founded")
    }))
    return res;
}