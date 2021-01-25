import { CCAM } from "../module/ccam"
import { ccam } from "./ccamFr"

export const fetchActe = () => { }
export const modifyActe = ({ code }: any) => { }
export const addMultiActes = async () => {
    
    for (let i = 0; i < ccam.length; i++) {
        const c = ccam[i];
        
        let newCCAM: any = new CCAM({
            acteLabel: c.activity_label,
            acteCode: c.activity_code,
            groupLabel: c.group_label,
            groupCode: c.group_code,
            phaseCode: c.phase_code,
            phaseLabel: c.phase_label,
            activityLabel: c.libelle_activite,
        })

        newCCAM.coefficients.push({ country: "france", price: c.tarif, currency: "eur" });

        const res = await newCCAM.save();

        if (res) console.log(`${i} from ${ccam.length}`)
    }        

    return "finished"
}