import { Schema, model, Document } from "mongoose";

type ngapModel = INgap & Document;

const coefficient = new Schema({
    country : String, 
    coefficient : String
})
interface INgap {
    code : string,
    label : string,
    coefficient : any[]
}

const Ngap = new Schema({
    code : String,
    label : String,
    coefficients : [coefficient]
})

export const NGAP = model<ngapModel>('NGAP', Ngap)