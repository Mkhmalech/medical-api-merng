import { Schema, model, Document } from "mongoose";

type PackModel = IPack & Document;


interface IPack {
    title? : String
    description? : String
    overviews? : String
    procedures? : any
    price? : String
    currency? : String
    labm: any
    createdBy? : String
    createdAt? : String
    views? : Number
    updates : any[]
}

const pack = new Schema({

    title: { type: String },
    description: { type: String },
    overviews: { type: String },
    procedures: [{
        type: Schema.Types.ObjectId,
        ref: "NABM"
    }],
    price: { type: String },
    currency: { type: String },
    labm : {
        type : Schema.Types.ObjectId,
        ref : "LABO"
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "USER"
    },
    createdAt: {
        type: String,
        default: new Date().toLocaleString()
    },
    views: { type: Number },
    updates : []
})

export const PACK = model<PackModel>('PACK', pack)