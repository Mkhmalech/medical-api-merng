/*  health provider account */

import { CABINET } from "../../../ittyni_cabinet_api/src/module/cabinets"
import { USER } from "../../../ittyni_user_api";
import { SPACE } from "../module/space";

// change account name
export const updateAccountName = async ({ name }: any, { user }: any) => {
    const res = await CABINET.findById(user.accountId).select('account').then((cabinet => {
        if (cabinet) {
            cabinet.account.name = name;
            if (cabinet.save()) return "saved_successfully";
            else return new Error("update_not_saved")
        }
        else return new Error("no_account_founded")
    }))

    return res;
}
// account type
export const updateAccountType = async ({ type }: any, { user }: any) => {
    const res = await CABINET.findById(user.accountId).select('account').then((cabinet => {
        if (cabinet) {
            cabinet.account.type = type;
            if (cabinet.save()) return "saved_successfully";
            else return new Error("update_not_saved")
        }
        else return new Error("no_account_founded")
    }))

    return res;
}
// account opening year
export const updateAccountStartDate = async ({ start }: any, { user }: any) => {
    const res = await CABINET.findById(user.accountId).select('account').then((cabinet => {
        if (cabinet) {
            cabinet.account.start = start;
            if (cabinet.save()) return "saved_successfully";
            else return new Error("update_not_saved")
        }
        else return new Error("no_account_founded")
    }))

    return res;
}
// account opening year
export const updateContact = async (args: any, { user }: any) => {
    for (const key in args) {
        if (args[key] == 'undefined' || args[key] == '') delete args[key]
    }
    const res = await CABINET.findById(user.accountId).select('contact').then((cabinet => {
        if (cabinet) {
            if (args.address) cabinet.contact.address.street = args.address
            if (args.region) cabinet.contact.address.region = args.region
            if (args.city) cabinet.contact.address.city = args.city
            if (args.tele) cabinet.contact.address.tele.fix.push(args.tele)
            if (args.fax) cabinet.contact.address.tele.fax.push(args.fax)
            if (args.fax) cabinet.contact.website = args.website
            if (cabinet.save()) return "saved_successfully";
            else return new Error("update_not_saved")
        }
        else return new Error("no_account_founded")
    }))
    return res;
}

// fetch data
export const fetchAccountData = async (args: any, { user }: any) => {
    const res = await CABINET.findById(user.accountId).select('account contact').then((cabinet => {
        if (cabinet) return cabinet;
        else return new Error("no_account_founded")
    }))
    return res;
}

// read data functions
export const read_user_spaces = async (args: any, { user, message, permissions }: any) => {
    console.log(args);
}
// read space data
export const read_space_details = async ({ _id }: any, { user, message, permissions }: any) => {
    return SPACE.findById(_id);
}
// write data functions
export const write_linkSpaceToUser = async ({ space }: any, { user, message, permissions }: any) => {
    const res = await SPACE.findOne({ 'account.name': space?.account?.name })
    if (res) return Error("Space_Already_exists");
    else {

        const newSpace = new SPACE({
            account: { name: space?.account?.name },
            rating: space?.account.rating,
            user_ratings_total: space?.account.user_rating,
            geometry: space?.geometry
        })

        newSpace.contact.tele.push(space?.tele)
        newSpace.photos.push(space?.photos)

        const newSpaceId = await newSpace.save();

        const updateUser = await USER.findById(user._id);

        if (updateUser) {
            updateUser.accounts.push({ space: newSpaceId._id })

            let isUpdated = await updateUser.save();

            if (isUpdated) return "Success";

            else return Error("Couldn't update")
        }
    }

}

/**
   * user activate extension
   * with id 
   */
export const write_activateExtensionOnSpace = async (args: any, { user, message }: any) => {
    const r = await Promise.resolve(SPACE.findById(args._id))
    if (!r) return Error("Couldn't find space")
    else if(r.extensions) {
        let i = r.extensions.findIndex((c: any) => c.component.toString() === args.componentId.toString());
        if (i === -1) {
            r.extensions.push({
                component: args.componentId,
                canRead: true,
                canCreate: false,
                canUpdate: false,
                canDelete: false,
                canPublish: false,
                addedBy: user._id,
            })
        }
    } else {
        r.extensions = [{
            component: args.componentId,
            canRead: true,
            canCreate: false,
            canUpdate: false,
            canDelete: false,
            canPublish: false,
            addedBy: user._id,
        }]
    }

    const saveNewData = await r.save();

    return saveNewData? saveNewData.extensions : Error("not saved");
}

/**
 * Read space extensions
 */
export const read_spaceExtensions = async (args: any, {user, message, permissions}: any)=>{

    const space = await Promise.resolve(SPACE.findById(args._id).populate('extensions.component'));
    if(space&&space.extensions)
        return(space.extensions.map((cp:any)=>cp.component))
    else Error("not found");
}