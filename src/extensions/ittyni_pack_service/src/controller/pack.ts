import { PACK } from "../module/pack"

export const readAllPacks = async (args: any, {user, permissions, message}: any)=>{

    const packs = await PACK.find({}).populate("createdBy labm");
    return packs
}

export const createPackForLab = async ({_id, pack}: any, {user, permissions, message}: any)=>{

    const newPack = new PACK({
        ...pack, createdBy: "5dc3f2e86e6e3e21d027bed1",
        account : _id, currency: "mad"
    })

    newPack.save();

    return "PACK_CREATED_SUCCEFULLY"
}