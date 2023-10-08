import { Schema, model, Document } from "mongoose";

type paramedicalModel = IParamedical & Document;

const permission = new Schema({
    
})
interface IParamedical {
    
}

const paramedical = new Schema({
    
})

export const PARAMEDICAL = model<paramedicalModel>('PARAMEDICAL', paramedical)