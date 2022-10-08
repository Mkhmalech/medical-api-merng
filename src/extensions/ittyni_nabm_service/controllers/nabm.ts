import { NABM } from "../module/nabm";
import { clearEmpties } from "./clearEmpties";
export default {
  createProcedure: async ({ name, code, mnemonic }: any, req: any) => {

    const nabm = await NABM.findOne({ name: name })
      .then(res => res)
      .catch(err => new Error("SOMTHING_GOES_WRONG"));

    if (nabm) return new Error("PROCEDURE_ALREADY_EXIST");

    const procedure = new NABM({
      name: name,
      code: code,
      mnemonic: mnemonic
    })

    let isSaved = procedure.save();

    if (!isSaved) return "NOT_SAVED"

    return "SUCCES"

  },

  proceduresList: () => NABM.find({}).populate("departements", "_id name description mnemonic")
    .populate("updates.updatedBy", "firstName lastName _id picture"),

  addMultipleProcedures: async () => {
    // for (let i = 0; i < Biochimie.length; i++) {
    //   const c = Biochimie[i];

    //   let newProcedure: any = new NABM({
    //     name: c.name,
    //     code: c.code
    //   })

    //   newProcedure.departements.push('6159ef1b56c5c8396057eb4b');

    //   newProcedure.specimen = {
    //     nature: c.type.includes('-') ? c.type.split('-') : c.type
    //   };

    //   const res = await newProcedure.save();

    //   if (res) console.log(`${i} from ${Biochimie.length}`)

    // }

    return "FINISHED"
  },

  procedureDetailsById: async ({ _id }: any) =>
    {
      let r = await NABM.findOne({ _id: _id }).populate("departements", "_id name description mnemonic")
        .populate("updates.updatedBy updates.departements");
      return r;
    },
  /**
   * mutation methods
   */
  updateProcedureDetails: (args: any, { user, permissions, message }: any) => {
    if (message) return Error(message)
    const filteredData = clearEmpties(args);
    // if (permissions && permissions.canUpdate) {
    //   return NABM.findOne({ _id: args._id }, async (err: any, data: any) => {
    //     if (err) return Error("NOT_SAVED");
    //     if (!data) return Error("NO_FOUNDED");

    //     if (filteredData.mnemonic) { data.mnemonic = filteredData.mnemonic }
    //     if (filteredData.specimen) {
    //       data.specimen = { ...data.specimen, ...filteredData.specimen };
    //     }

    //     if (filteredData.finance) {
    //       let i = data.finance && data.finance.findIndex(
    //         (f: any) =>
    //           f.country.toLowerCase() === filteredData.finance.country.toLowerCase()
    //       );
    //       i === -1 ?
    //         data.finance.push(filteredData.finance)
    //         :
    //         data.finance[i] = { ...data.finance[i], ...filteredData.finance };
    //     }

    //     if (filteredData.description) {
    //       data.description = { ...data.description, ...filteredData.description };
    //     }

    //     if (filteredData.departements) {
    //       data.departements = filteredData.departements;
    //     }
    //     if (filteredData.type) {
    //       data.type = filteredData.type;
    //       if (filteredData.type === 'parameter' && filteredData.unit) {
    //         data.unit = filteredData.unit;
    //       }

    //       if ((filteredData.type === 'group' || filteredData.type === 'panel') && filteredData.components) {
    //         data.components = filteredData.components;
    //       }
    //     }
    //     // to do add calcul

    //     let isSaved = await data.save();
    //     return isSaved ? "SAVED" : Error("NOT_SAVED");
    //   }).then(msg => msg)
    // }

    // else {
      return NABM.findOne({ _id: args._id }, async (err: any, data: any) => {
        if (err) return Error("NOT_SAVED");
        if (!data) return Error("NO_FOUNDED");
        filteredData.finance = [{ ...filteredData.finance }]
        filteredData.updatedBy = user._id;
        delete filteredData._id;
        data.updates.push(filteredData);

        let isSaved = await data.save();
        return isSaved ? "SAVED" : Error("NOT_SAVED");
      }).then(msg => msg)
    // }
  },
  procedureUpdates: async (args: any, req: any, context: any) => {
    // console.log(context.fieldNodes[0].directives)
    let nabm = await NABM.findOne({_id: args._id}).populate('updates.departements updates.updatedBy updates.components');
    return nabm? nabm.updates: Error('NO_TEST_FOUNDED')
  },
  nabmUpdateDetailsById: async ({_id}:any, {user, permissions, message}: any)=>{
    if(message) return Error(message);
    if(permissions&&permissions.canRead){
      let nabm = await NABM.findOne({'updates._id': _id}).select('updates')
      return nabm?nabm.updates.find((u:any)=>u._id===_id): Error('NO_TEST_FOUNDED')
    }
    else return Error('NO_PERMISSION')
  },
  userNabmList: ({ limit, skip }: any, { permissions, message, user }: any) => {
    if (message) return Error(message)
    if (permissions && permissions.canRead) {
      return NABM.find({}).limit(limit).skip(skip).populate('departements updates.updatedBy');
    }
    else return Error("NO_PERMISSION")
  },
  // NABM.find({}).populate('updates.updatedBy').select('updates').then(r=>r),

}