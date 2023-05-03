import { Schema, model, Document } from "mongoose";

type parapharmacyModel = IParapharmacy & Document;

const permission = new Schema({
    
})
interface IParapharmacy {
    account: {
        name: string,
        code?: number,
        type?: string,
        start?: string,
    }
    contact?: {
        tele?: any[],
        address?: any,
        website?: string
    }
}

const parapharmacy = new Schema({
    account: {
        name: { type: String },
        code: { type: Number },
        type: { type: String },
        start: { type: String },
        ice: { type: String},
        rc: { type: String}
    },

    contact: {
        tele: {
            fix: [String],

            fax: [String],

        },
        website: { type: String },
        address: {
            area: {
                type: String,
            },

            area_unit: {
                type: String,
            },

            street: {
                type: String,
            },

        },
    }
})

export const PARAPHARMACY = model<parapharmacyModel>('PARAPHARMACY', parapharmacy)