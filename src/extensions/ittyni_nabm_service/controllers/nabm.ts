import { NABM } from "../module/nabm";
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

  proceduresList: () => NABM.find({}).populate("departements", "name description mnemonic"),

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
    NABM.findOne({ _id: _id }).populate("departements", "name description mnemonic"),

  updateProcedureDetails: ({ _id, code, mnemonic, type }: any, { user, permissions }: any) => {
    if(permissions&&permissions.canRead){
      return NABM.findOne({ _id: _id }, async (err: any, data: any) => {
        if (err) return Error("NOT_SAVED"); 
        if (!data) return Error("NO_FOUNDED");
        data.updates.push({
          mnemonic, [type]: true, updatedBy: user && user._id,
          finance: [{
            country: "morocco",
            currency: "mad",
            code: code,
            symbol: "B"
          }]
        });
      
        let isSaved = await data.save();
        return isSaved ? "SAVED" : Error("NOT_SAVED");
      }).then(msg=>msg)
    }
    else return Error("NO_PERMISSION")
  },
  procedureUpdates: (args:any, req:any, context:any) =>{
    // console.log(context.fieldNodes[0].directives)
    console.log(req.body)
  }
    // NABM.find({}).populate('updates.updatedBy').select('updates').then(r=>r),

}