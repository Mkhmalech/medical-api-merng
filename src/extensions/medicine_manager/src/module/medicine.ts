import { Schema, model, Document } from "mongoose";

type medicineModel = IMedicine & Document;
 
const name = new Schema({
    country : String,
    title : String,
    presentation : String,
    ppv : String,
    statut : String,
    distributor : String
})
interface IMedicine {
    names : any[]
    composition : string,
    category : string,
    atc : string
}

const Medicine = new Schema({
    names : [name] ,
    composition : String,
    category : String, 
    atc : String
})

export const MEDICINE = model<medicineModel>('MEDICINE', Medicine)