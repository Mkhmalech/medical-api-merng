import { TESTS } from "../../../lab-medical-api/src/labTests/module/labtests";
import { CABINET } from "../module/cabinets"

/**
 * create new cabinet 
 * we need for the first only 
 * name
 * @param name
 * 
 * @return Object 
 */
export const createNewCabinet = async ({name} : any, {user} : any)=>{
    const cabinet = new CABINET({
        account : {
            name : name
        }
    })

    const res = await cabinet.save();

    if(!res) return new Error("cabinet_not_saved");
    
    else return new Error("cabinet_saved_successfully")
}

/**
 * list all existing cabinets
 * 
 */
export const listAllCabinets = async () => {
    const cabinets = await CABINET.find({}).select("account");
    if(!cabinets) return new Error("no_cabinets_founded");
    else return( [...cabinets])
}
/**
 * cabinet user search test
 * in known catalog
 */
export const cabinetSearchTest = async ({test}: any, {user} : any) => {
    let q = test;
    q = new RegExp(q, 'ig');
    const res = await TESTS.find({$or : [{"name.fr" : q}, {"reference.Mnemonic" : q}]})
        .select('id name.fr finance reference');
    if(res){
        // search test price in catalog
        // first get labo contributor
        // then get catalog specified for the cabinet
        // then get price finally send it to cabinet
    } else {
        return new Error("no_test_founded")
    }
}