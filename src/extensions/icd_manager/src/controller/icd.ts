import { ICD } from "../module/icd";
import {icd} from './icd10'

export const addMultipleICD = async () => {
    for (let i = 0; i < icd.length; i++) {
        const c = icd[i];

        let newICD : any= new ICD({
            acteCode: c.code,
            actLabel: c.label,
            groupCode: c.group_code,
            groupLabel: c.group,
            chapter: c.chapter
         })

        //  newICD.coefficients.push({country : "france", price : c.tarif, currency : "eur"});
        
        const res = await newICD.save();

        if(res) console.log(`${i} from ${icd.length}`)
        
    }

    return "finished"
}