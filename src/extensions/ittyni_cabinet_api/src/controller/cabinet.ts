import { PATIENT } from "../../../ittyni_patient_api/src/module/patient";
import { TESTS } from "../../../ittyni_nabm_api/module/labtests";
import { CABINET } from "../module/cabinets"
import { cabCity } from './cabinetCity'
import { Types } from "mongoose";
const fs = require('fs');

/**
 * create new cabinet 
 * we need for the first only 
 * name
 * @param name
 * 
 * @return Object 
 */
export const createNewCabinet = async ({ name }: any, { user }: any) => {
    // const cabinet = new CABINET({
    //     account: {
    //         name: name
    //     }
    // })

    // const res = await cabinet.save();

    // if (!res) return new Error("cabinet_not_saved");

    // else return new Error("cabinet_saved_successfully")
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
export const listCabinetsCities = async () => cabCity;
/**
 * list all existing cabinets
 * 
 */
export const listCabinetsTwntyByCity = async ({ city }: any) => {
    const res = await CABINET.find({ "contact.address.city": city.toUpperCase() }).select("account contact views");
    if (!res) return "no_result_founded";
    else return res.slice(0, 20).map(() =>
        res.splice(Math.floor(Math.random() * res.length), 1)[0]
    );
};
/**
 * list all existing cabinets
 * 
 */
export const listCabinetsAllByCity = async ({ city }: any) => {
    const res = await CABINET.find({ "contact.address.city": city.toUpperCase() }).select("account contact views");
    if (!res) return "no_result_founded";
    return res
};
/**
 * list all existing cabinets
 * 
 */
export const listCabinetDetailsById = async ({ id }: any) => {
    const res = await CABINET.findByIdAndUpdate(id,{$inc : {'views' : 1}}).select("account contact views");
    if (!res) return "no_result_founded";
    return res
};
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
    // remove emty or null data
    const patient = cleanData(args);

    if (!patient.civility) return Error("no_civility_founded")
    if (!patient.firstname) return Error("no_firstname_founded")
    if (!patient.lastname) return Error("no_lastname_founded")
    if (!patient.dob) return Error("no_date_of_birth_founded")
    if (!patient.city) return Error("no_city_founded")
    // search if existing Patient
    if (patient.IDNum) {
        const existingPatient = await PATIENT.findOne({ "ID.IDNum": args.IDNum });
        if (existingPatient) return Error("Patient_Already_exist")
    }
    const newPatient = new PATIENT({
        civility: patient.civility,
        firstname: patient.firstname,
        lastname: patient.lastname,
        dob: patient.dob,
        gender: args.gender,
        ID: { IDType: patient.IDType, IDNum: patient.IDNum },
        contact: {
            tele: { mobile: patient.tele },
            email: patient.email,
            address: { region: patient.region, street: patient.street, city: patient.city }
        }
    });

    newPatient.permissions.push({ cabinetId: user.accountId });
    newPatient.update.push({ updatedAt: new Date().toLocaleDateString(), updatedBy: user._id })

    const savedPatient = await newPatient.save();

    if (!savedPatient) return Error("Patient_Not_Saved");
    else {
        const res = await CABINET.findById(user.accountId)
            .then((cabinet: any) => {
                if (cabinet) {
                    cabinet.patients.push({ patientId: savedPatient._id });
                    return cabinet.save();
                } else return new Error("no_account_founded");
            })

        if (res) return "patient_saved_successfully"

        else return new Error("patient_not_saved")
    }
}

const cleanData = (obj: any) => {
    for (var propName in obj) {
        if (obj[propName] === 'null' || obj[propName] === 'undefined' || obj[propName].length < 2) {
            delete obj[propName];
        }
    }
    return obj
}
/**
 * list patient of cabinet
 */
export const listCabinetPatients = async (args: any, { user }: any) => {
    const res = await CABINET.findById(args._id).select('patients')
        .populate('patients.patientId').then((cab) => {
            let patients: any[] = [];
            if (cab) {
                patients = cab.patients.map((patient) => patient.patientId)
                return patients;
            }
            else return new Error("no_cabinet_founded")
        })
    return (res);
}
/**
 * fetch patient's details of cabinet
 */
export const cabinetPatientDetails = async ({ id }: any, { user }: any) => {
    const res = await CABINET.findById(user.accountId).select('patients')
        .populate('patients.patientId').then((cab) => {
            let patient: any = {};
            if (cab) {
                patient = cab.patients.find((patient) => ((patient.patientId && patient.patientId._id == id) || patient._id == id))

                if (patient.patientId) return (patient.patientId);
                else return patient
            }
            else return new Error("no_cabinet_founded")
        })
    return (res);
}
/**
 * fetch patient's details of cabinet
 */
export const cabinetFindPatient = async ({ query }: any, { user }: any) => {
    const res = await CABINET.findById(user.accountId).select('patients')
        .populate('patients.patientId').then((cab) => {
            let q = query;
            q = new RegExp(q, 'ig');
            let patient: any = [];
            if (cab) {
                patient = cab.patients.filter((patient) =>
                (
                    (patient.patientId
                        &&
                        ((patient.patientId.lastname && patient.patientId.lastname.match(q))
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
    return (res.map((p: any) => ((p.patientId && p.patientId) || p)));
}
/**
 * fetch patient's details of cabinet
 */
export const cabinetAddLabOrder = async (args: any, { user }: any) => {


    console.log(args)
}

/**
 * Extensions
 */
export const activateExtensionOnCabinet = async (args: any, { user, message }: any) => {
    const r = await CABINET.findById(args._id, (e: Error, r: any) => {
      if (e) return Error(e.message);
      if (!r) return Error('NOT_CONNECTED');
      let i = r.extensions.findIndex((c: any) => c.componentId&&(c.componentId.toString() === args.componentId.toString()));
      if (i === -1) {
        r.extensions.push({
          componentId: args.componentId,
          canRead: true,
          canCreate: true,
          canUpdate: true,
          canDelete: true,
          canPublish: true,
          addedBy: user._id,
        })

        r.save();
      }
      else return Error('ALREADY_ACTIVATED');
    });
    if (r) {
      const cp = await CABINET.findOne({ _id: args._id })
      .populate('extensions.componentId')
      .select('extensions.componentId')

      if (cp && cp.extensions.length > 0) {
        return cp.extensions.map(
          (p: any) => {
            if(p.componentId){
                return(
                    {
                      name: p.componentId.name,
                      _id: p.componentId._id
                    }
                )
            }
          })
      }
    } else return Error("NOT_SAVED")

  }

export const readCabinetExtensions = async (args: any, {user, message, permissions}: any)=>{
    return CABINET.findById(args._id).populate("extensions.componentId").select("extensions");
}
/**
 * Waiting Room
*/

// get waiting room 
export const listWaitingPatients = async ({ id }: any, { user }: any) => {
    const res = await CABINET.findById(user.accountId).populate("waitingRoom.patient waitingRoom.icd").select("waitingRoom")
        .then((cab: any) => {
            if (cab) {
                const todayWaiting = cab.waitingRoom.filter((r: any) => new Date(r.arrivedAt).toDateString() == new Date().toDateString())

                return (todayWaiting)
            } else return Error("no_cabinet_founded")
        })

    return res
}
// add patient to waiting room
export const addPatientToWaitingRoom = async ({ id, motif, visitType }: any, { user }: any) => {
    const res = await CABINET.findById(user.accountId).then(async (cab: any) => {
        if (cab) {
            let newArrived: any = {
                patient: id,
                arrivedAt: new Date().toISOString(),
                status: [{ updatedAt: new Date().toISOString(), updatedBy: user._id, now: "waiting" }]
            };

            const todayWaiting = cab.waitingRoom.filter((r: any) => new Date(r.arrivedAt).toDateString() == new Date().toDateString());

            if (todayWaiting.length > 0) {
                // get last patient
                let lastOne = cab.waitingRoom.reduce((a: any, b: any) => {
                    return new Date(a.arrivedAt) > new Date(b.arrivedAt) ? a : b;
                })

                newArrived.number = lastOne.number + 1;
            }
            else newArrived.number = 1;

            // set motif if exist in icd
            if (motif.length > 2 && motif!="undefined") {
                if(Types.ObjectId.isValid(motif)) newArrived.icd = motif;
                else newArrived.motif = motif;
            }

            if(visitType.length > 0 && visitType!="undefined") newArrived.visitType = visitType;

            cab.waitingRoom.push(newArrived);

            const dataSaved = await cab.save();

            if (dataSaved) return "new_patient_added_to_waiting_room";

            else return "patient_not_added_to_waiting_room";
        }
        else
            return Error("no_cabinet_founded");
    })

    return res;
}

// update status of waiting patient
export const updatePatientToViewed = async ({ id }: any, { user }: any) => {
    const res = await CABINET.findById(user.accountId).populate("waitingRoom.patient waitingRoom.icd").select("waitingRoom")
        .then(async (cab: any) => {
            if (cab) {
                const i = cab.waitingRoom.findIndex((r: any) => r.patient._id == id);
                cab.waitingRoom[i].viewedAt = new Date().toISOString();
                cab.waitingRoom[i].status.push({updatedAt: new Date().toISOString(), updatedBy: user._id, now: "consult" });

                const newCab = await cab.save();

                if(newCab) return (newCab.waitingRoom)

                else return Error("status_not_saved");

            } else return Error("no_cabinet_founded")
        })
        
    return res
}
// update status of waiting patient
export const updatePatientToFinished = async ({ id }: any, { user }: any) => {
    const res = await CABINET.findById(user.accountId).populate("waitingRoom.patient waitingRoom.icd").select("waitingRoom")
        .then(async (cab: any) => {
            if (cab) {
                const i = cab.waitingRoom.findIndex((r: any) => r.patient._id == id);
                cab.waitingRoom[i].finishedAt = new Date().toISOString();
                cab.waitingRoom[i].status.push({updatedAt: new Date().toISOString(), updatedBy: user._id, now: "finished" });

                const newCab = await cab.save();

                if(newCab) return (newCab.waitingRoom)

                else return Error("status_not_saved");

            } else return Error("no_cabinet_founded")
        })
        
    return res
}
// set patient to consulting status
export const setPatientToViewed = async ({ num }: any, { user }: any) => {
    const res = await CABINET.findById(user.accountId).populate("waitingRoom.patient waitingRoom.icd").select("waitingRoom")
        .then(async (cab: any) => {
            if (cab) {
                const i = cab.waitingRoom.findIndex((r: any) => r.number == num&&new Date(r.arrivedAt).toDateString() == new Date().toDateString());
                cab.waitingRoom[i].viewedAt = new Date().toISOString();
                cab.waitingRoom[i].status.push({updatedAt: new Date().toISOString(), updatedBy: user._id, now: "consult", before: "waiting" });

                const newCab = await cab.save();

                if(newCab) return cab.waitingRoom[i]

                else return Error("status_not_saved");

            } else return Error("no_cabinet_founded")
        })
        
    return res
}
// update status of waiting patient
export const setPatientToFinished = async ({ num }: any, { user }: any) => {
    const res = await CABINET.findById(user.accountId).populate("waitingRoom.patient waitingRoom.icd").select("waitingRoom")
        .then(async (cab: any) => {
            if (cab) {
                const i = cab.waitingRoom.findIndex((r: any) => r.number == num&&new Date(r.arrivedAt).toDateString() == new Date().toDateString());
                cab.waitingRoom[i].finishedAt = new Date().toISOString();
                cab.waitingRoom[i].status.push({updatedAt: new Date().toISOString(), updatedBy: user._id, now: "finished", before:"consult" });

                const newCab = await cab.save();

                if(newCab) return cab.waitingRoom[i]

                else return Error("status_not_saved");

            } else return Error("no_cabinet_founded")
        })
        
    return res
}
// update status of waiting patient
export const setPatientToWaiting = async ({ num }: any, { user }: any) => {
    const res = await CABINET.findById(user.accountId).populate("waitingRoom.patient waitingRoom.icd").select("waitingRoom")
        .then(async (cab: any) => {
            if (cab) {
                const i = cab.waitingRoom.findIndex((r: any) => r.number == num&&new Date(r.arrivedAt).toDateString() == new Date().toDateString());
                cab.waitingRoom[i].finishedAt = new Date().toISOString();
                cab.waitingRoom[i].status.push({updatedAt: new Date().toISOString(), updatedBy: user._id, now: "waiting", before:"consult" });

                const newCab = await cab.save();

                if(newCab) return ("status_updated_successfully")

                else return Error("status_not_saved");

            } else return Error("no_cabinet_founded")
        })
        
    return res
}

// list labo on scroll
export const CabinetListOnScroll = async ({limit, skip}: any, {permissions, message, user}: any)=>{
    const cabinets = await CABINET.aggregate([
      {$match: {}},
      {$sort: {'account.name': 1}},
      {$facet: {
        "data": [{$limit : limit+skip}, {$skip: skip}],
        "metadata": [
          {$count: 'total'},
          {$addFields: { showed: limit+skip }}
        ]
      }},
      {$project: {
        cabinets: '$data',
        showed: {$first : '$metadata.showed'},
        total: {$first : '$metadata.total'},
        rest : {
          $subtract : [
            {$first : '$metadata.total'},
            {$first : '$metadata.showed'}
          ]
        }
      }}
    ])

    return cabinets[0]
  }

export const createCabinetsSiteMap = async () => {
    // let sitmap: string = '';

    // const res = await CABINET.find().then((n: any) => {
    //     if (n) {
    //         n.map((m: any) => {
    //             sitmap += `<url><loc>https://ittyni.com/annuaire/cabinet/maroc/${m.contact.address.city}/${m._id}</loc><lastmod>${new Date().toISOString()}</lastmod><priority>0.80</priority></url>`;
    //         })
    //     }
    // })

    // // console.log(sitmap)

    // fs.writeFileSync(`./cabinetSitemap.xml`, sitmap, (err:any, doc:any) => {
    //     if (err) throw err
    //     console.log(doc)
    // });
}