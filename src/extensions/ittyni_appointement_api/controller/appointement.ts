import { LABO } from "../../ittyni_labm_api/module/labo";

export const createAppointement = ({appoint} : any, req: any) =>{
    try {

        LABO.findOne({'account.name' : 'FES'},(e:any, res:any)=>{
            if(e) throw new Error(e)
            if(res){
                if(appoint.details == '') delete appoint.details;

                res.appointements.push(appoint);

                res.save();
            }
        })

        return "succes"
    } catch(e) {
        console.log(e);
        return "appointment_not_saved"
    }

    
}

export const fetchAppointements = async (args : any, {user} : any) => {
    const res = await LABO.findById(user.accountId)
                    .select('appointements').then((appoint:any)=>appoint.appointements)
    return res;
}