import { Schema, model, Document } from "mongoose";

type ccamModel = Iccam & Document;

const coefficient = new Schema({
    country : String, 
    coefficient : String
})
interface Iccam {
    code : string,
    label : string,
    coefficient : any[]
}

const ccam = new Schema({
    code : String,
    label : String,
    coefficients : [coefficient]
})

export const CCAM = model<ccamModel>('CCAM', ccam)