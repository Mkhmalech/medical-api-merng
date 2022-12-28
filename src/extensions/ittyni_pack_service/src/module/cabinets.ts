import { Schema, model, Document } from "mongoose";

type PackModel = IPack & Document;

const permission = new Schema({
    
})
interface IPack {
    
}

const pack = new Schema({
    
})

export const PACK = model<PackModel>('PACK', pack)