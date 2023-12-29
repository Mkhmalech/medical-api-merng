import { Schema, model, Document } from "mongoose";
import { parapharmacyUpdateSchema } from "./parapharmaUpdates";

type parapharmacyModel = IParapharmacy & Document;

const permission = new Schema({
    
})
interface IParapharmacy {
    name: string
    brand?: string
    forms?: any[]
    status?: any
    createdAt?:any
    createdBy?: any
    updates?: any[]
}

const parapharmacy = new Schema({
    name: {type: String, required: true},
    brand: {type: String},
    forms: [{
        form: {type: String},
        code: {
            type: {type: String},
            value: {type: String}
        },
        status: {
            value: String,
            createdBy: {type: Schema.Types.ObjectId, ref: "USER"},
            createdAt: {type: String , default: new Date().toUTCString() }
        }
    }],
    status: { type: String, enum :['created', 'validated', 'suspended', 'deleted'], default: 'created'},
    createdAt: { type: String , default: new Date().toUTCString() },
    createdBy: { type: Schema.Types.ObjectId, ref: 'USER' },
    updates: [parapharmacyUpdateSchema]
})

export const PARAPHARMACY = model<parapharmacyModel>('PARAPHARMACY', parapharmacy)