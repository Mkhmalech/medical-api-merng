import { PATIENT } from "../../../../extensions/patient_record/src/module/patient";
import { TESTS } from "../../../../health-provider/lab-medical-api/src/labTests/module/labtests";
import { CABINET } from "../module/cabinets"
import {cabinets} from './cabinets'

/**
 * create new cabinet 
 * we need for the first only 
 * name
 * @param name
 * 
 * @return Object 
 */
export const createNewCabinet = async ({ name }: any, { user }: any) => {
    const cabinet = new CABINET({
        account: {
            name: name
        }
    })

    const res = await cabinet.save();

    if (!res) return new Error("cabinet_not_saved");

    else return new Error("cabinet_saved_successfully")
}
// add multiple cabinets
export const addMultipleCabinets = async () => {
    // for (let i = 0; i < cabinets.length; i++) {
    //     const cb = cabinets[i];
    //     let newCabinet : any= new CABINET({
    //         account :{
    //             name : cb.name,
    //             type : cb.type
    //         },
    //         contact : {
    //             address : {
    //                 city : cb.city,
    //                 street : cb.street
    //             }
    //         }
    //     })

    //     if(cb.tele.length>0)  newCabinet.contact.tele.fix.push(cb.tele);

    //     const res = await newCabinet.save();

    //     if(res) console.log(`${i} from ${cabinets.length}`)
    // }

    return "finished"
}
/**
 * list all existing cabinets
 * 
 */
export const listAllCabinets = async () => {
    const cabinets = await CABINET.find({}).select("account");
    if (!cabinets) return new Error("no_cabinets_founded");
    else return ([...cabinets])
}
/**
 * cabinet user search test
 * in known catalog
 */
export const cabinetSearchTest = async ({ test }: any, { user }: any) => {
    let q = test;
    q = new RegExp(q, 'ig');
    const res = await TESTS.find({ $or: [{ "name.fr": q }, { "reference.Mnemonic": q }] })
        .select('id name.fr finance reference');
    if (res) {
        // search test price in catalog
        // first get labo contributor
        // then get catalog specified for the cabinet
        // then get price finally send it to cabinet
    } else {
        return new Error("no_test_founded")
    }
}
/**
 * add patient to cabinet
 */
export const addNewPatientToCabinet = async (args: any, { user }: any) => {
    // sanitize args
    let newArgs: any = {}
    for (const key in args) {
        if (Object.prototype.hasOwnProperty.call(args, key)) {
            const element = args[key];
            if (element !== 'undefined') {
                newArgs[key] = element;
            }
        }
    }
    // if user enter ID of patient 
    // save to patient collection
    if (newArgs.IDNum) {
        const pat = await PATIENT.findOne({ "ID.IDNum": args.IDNum });
        if (pat) return new Error("patient_already_exist");
        else {
            let newPatient = new PATIENT({
                civility: newArgs.civility,
                firstname: newArgs.firstname,
                lastname: newArgs.lastname,
                gender: newArgs.gender,
                DOB: newArgs.DOB,
                ID: { IDType: newArgs.IDType, IDNum: newArgs.IDNum },
                contact: {
                    tele: [{ mobile: newArgs.mobile }],
                    email: newArgs.email,
                    address: { region: newArgs.region, street: newArgs.street, city: newArgs.city }
                }
            });

            newPatient.permissions.push({ cabinetId: user.accountId })
            const res = await newPatient.save();
            if (res) {
                const cabinet = await CABINET.findOne({ "_id": user.accountId });
                if (cabinet) {
                    cabinet.patients.push({ patientId: res._id });
                    cabinet.save();
                } else {
                    return new Error("account_not_founded")
                }
            } else return new Error("document_not_saved");
        }

        return "patient_saved_successfully"
    }

    // or add patient to account 
    // collection
    else {
        const res = await CABINET.findOne({ "_id": user.accountId })
            .then((cabinet) => {
                let newPatient = {
                    civility: newArgs.civility,
                    firstname: newArgs.firstname,
                    lastname: newArgs.lastname,
                    DOB: newArgs.DOB,
                    gender: newArgs.gender,
                    contact: {
                        tele: [{ mobile: newArgs.mobile }],
                        email: newArgs.email,
                        address: { region: newArgs.region, street: newArgs.street, city: newArgs.city }
                    }
                };
                if (cabinet) {
                    cabinet.patients.push(newPatient);
                    cabinet.save();
                    return "pateint_saved_successfully"
                } else return new Error("no_account_founded");
            })
        return res;
    }
}
/**
 * list patient of cabinet
 */
export const listCabinetPatients = async (args: any, { user }: any) => {
    const res = await CABINET.findById(user.accountId).select('patients')
        .populate('patients.patientId').then((cab) => {
            let patients : any[] = [];
            if(cab){
                patients = cab.patients.map((patient)=>{
                    if(patient.patientId){
                        return patient.patientId;
                    } else return patient
                })

                return patients;
            } 
            else return new Error("no_cabinet_founded")
        })
    return(res);
}
/**
 * fetch patient's details of cabinet
 */
export const cabinetPatientDetails = async ({id}: any, { user }: any) => {
    const res = await CABINET.findById(user.accountId).select('patients')
        .populate('patients.patientId').then((cab) => {
            let patient : any = {};
            if(cab){
                patient = cab.patients.find((patient)=>((patient.patientId && patient.patientId._id == id) || patient._id == id))

                if(patient.patientId) return(patient.patientId) ;
                else return patient
            } 
            else return new Error("no_cabinet_founded")
        })
    return(res);
}
/**
 * fetch patient's details of cabinet
 */
export const cabinetFindPatient = async ({query}: any, { user }: any) => {
    const res = await CABINET.findById(user.accountId).select('patients')
        .populate('patients.patientId').then((cab) => {
            let q = query;
            q = new RegExp(q, 'ig');
            let patient : any = [];
            if(cab){
                patient = cab.patients.filter((patient)=>
                    (
                        (patient.patientId 
                        &&
                        (   (patient.patientId.lastname && patient.patientId.lastname.match(q))
                            ||
                            (patient.patientId.firstname && patient.patientId.firstname.match(q))
                        ))
                        || 
                        (
                            (patient.lastname && patient.lastname.match(q))
                            ||
                            (patient.firstname && patient.firstname.match(q))
                        )
                    ))

                return patient
            } 
            else return new Error("no_cabinet_founded")
        })
    return(res.map((p:any)=>((p.patientId && p.patientId) || p)));
}
/**
 * fetch patient's details of cabinet
 */
export const cabinetAddLabOrder = async (args: any, { user }: any) => {
    
    
    console.log(args)
}