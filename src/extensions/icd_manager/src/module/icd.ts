import { Schema, model, Document } from "mongoose";

type icdModel = IICD & Document;

const permission = new Schema({
    
})
interface IICD {
    acteCode : string
    actLabel : string
    groupCode : string
    groupLabel : string
    chapter : string
}

const icd = new Schema({
    acteCode : String,
    actLabel : String,
    groupCode : String,
    groupLabel : String,
    chapter : String,
})

export const ICD = model<icdModel>('ICD', icd)