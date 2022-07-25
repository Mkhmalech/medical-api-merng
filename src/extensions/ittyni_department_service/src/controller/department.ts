import { DEPARTMENTS } from "../module/departments";

export default {
    departmentsList : ()=>DEPARTMENTS.find({}),
    departmentDetailsByID : ({_id}:any)=>DEPARTMENTS.findOne({_id:_id}),
    addDepartment : async({nameFr, mnemonic,descriptionFr}:any)=>{
        const result = await DEPARTMENTS.findOne({$or:[{"name.fr":nameFr}, {"mnemonic":mnemonic}]});

        if(result) return Error("ALREADY_EXISTS");

        let newDepartment = new DEPARTMENTS({
            name :{fr:nameFr},mnemonic,description:{fr:descriptionFr}
        })

        let isSaved = await newDepartment.save();

        if(!isSaved) return Error("NOT_SAVED")

        return "SUCCESS"
    },
}