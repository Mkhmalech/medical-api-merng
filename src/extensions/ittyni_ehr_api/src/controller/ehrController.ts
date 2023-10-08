import { CABINET } from "../../../ittyni_cabinet_api/src/module/cabinets"
import { EHR } from "../.."

export const addNewPatientToAccount = async (args: any, { user }: any) => {
    // if user enter ID of patient 
    // save to patient collection
    if (args.IDNum) {
        const pat = await EHR.findOne({ "ID.IDNum": args.IDNum });
        if (pat) return new Error("patient_already_exist");
        else {
            let newPatient = new EHR({
                civility: args.civility,
                firstname: args.firstname,
                lastname: args.lastname,
                DOB: args.DOB,
                ID: { IDType: args.IDType, IDNum: args.IDNum },
                contact: {
                    tele: { mobile: args.tele },
                    email: args.email,
                    address: { region: args.region, street: args.street, city: args.city }
                }
            });

            newPatient.permissions.push({ cabinetId: user.accountId });
            newPatient.update.push({ updatedAt: new Date().toLocaleDateString(), updatedBy: user._id })
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
            .then((cabinet:any) => {
                let newPatient = {
                    civility: args.civility,
                    firstname: args.firstname,
                    lastname: args.lastname,
                    DOB: args.DOB,
                    contact: {
                        tele: { mobile: args.tele },
                        email: args.email,
                        address: { region: args.region, street: args.street, city: args.city }
                    }
                };
                if (cabinet) {
                    cabinet.patients.push(newPatient);
                    cabinet.save();
                } else return new Error("no_account_founded");
            })
        if (res) return "pateint_saved_successfully"
        else return new Error("patient_not_saved")
    }
}

export const addNewPatient = async (args: any, { user }: any) => {
    // remove emty or null data
    const patient = cleanData(args);

    const res = await CABINET.findOne({ "_id": user.accountId })
        .then((cabinet) => {
            let newPatient = {
                civility: args.civility,
                firstname: args.firstname,
                lastname: args.lastname,
                dob: args.dob,
                gender: args.gender,
                contact: {
                    tele: { mobile: args.tele },
                    email: args.email,
                    address: { region: args.region, street: args.street, city: args.city }
                }
            };
            if (cabinet) {
                cabinet.patients.push(newPatient);
                cabinet.save();
            } else return new Error("no_account_founded");
        })

    if (res) return "patient_saved_successfully"

    else return new Error("patient_not_saved")
}

const cleanData = (obj: any)=> {
    for (let propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined || obj[propName].length <= 2) {
        delete obj[propName];
      }
    }
    return obj
  }