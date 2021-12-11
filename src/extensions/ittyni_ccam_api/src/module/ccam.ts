import { Schema, model, Document } from "mongoose";

type ccamModel = Iccam & Document;

const coefficient = new Schema({
    country : String, 
    price : String,
    currency : String
})
interface Iccam {
    code : string,
    label : string,
    coefficient : any[]
}

const ccam = new Schema({
    acteLabel : String,
    acteCode : String,
    groupLabel : String,
    groupCode : String,
    phaseCode : String,
    phaseLabel : String,
    activityLabel : String,
    coefficients : [coefficient]
})

export const CCAM = model<ccamModel>('CCAM', ccam)