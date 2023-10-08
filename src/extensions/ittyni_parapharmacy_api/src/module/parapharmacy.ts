import { Schema, model, Document } from "mongoose";
import { parapharmacyUpdateSchema } from "./parapharmaUpdates";

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
    },
    updates?: any[]
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
    },
    status: { type: String, enum :['created', 'validated', 'suspended', 'deleted'], default: 'created'},
    createdAt: { type: String , default: new Date().toUTCString() },
    createdBy: { type: Schema.Types.ObjectId, ref: 'USER' },
    updates: [parapharmacyUpdateSchema]
})

export const PARAPHARMACY = model<parapharmacyModel>('PARAPHARMACY', parapharmacy)