import { Schema, model, Document } from "mongoose";

type pharmaModel = IPharma & Document;

const permission = new Schema({
    
})
interface IPharma {
    account: {
        name: string,
        code?: number,
        type? : string,
        start? : string,
    }
    contact: {
        tele: {
            fix : any[],
            fax : any[]
        },
        address: any,
        website : string
    }
}

const pharma = new Schema({
    account: {
        name: { type: String },
        code: { type: Number },
        type: { type: String },
        start: { type: String },
    },

    contact: {
        tele: {
            fix: [String],

            fax: [String],
            
        },
        website: {type : String},
        address: {
            region: {
                type: String,
            },

            province: {
                type: String,
            },

            commune: {
                type: String,
            },

            street: {
                type: String,
            },

            city: {
                type: String,
            },
        },
    },  
})

export const PHARMA = model<pharmaModel>('PHARMA', pharma)