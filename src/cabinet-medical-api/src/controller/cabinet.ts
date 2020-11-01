import { CABINET } from "../module/cabinets"

export const createNewCabinet = async ({name} : any, {user} : any)=>{
    const cabinet = new CABINET({
        account : {
            name : name
        }
    })

    const res = await cabinet.save();

    if(!res) return new Error("cabinet_not_saved");
    
    else return "cabinet_saved_successfully"
}