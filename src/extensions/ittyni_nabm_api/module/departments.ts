import { Schema, model, Document } from "mongoose";
interface LABDEPARTMENT extends Document {
    name: {
        fr: string
        en: string
    }
    mnemonic: string
    description: {
        fr: string
        en: string
    }
}
const update: Schema = new Schema({
    name: {
        fr: { type: String, lowercase: true, trim: true }
    },
    mnemonic: { type: String, uppercase: true, trim: true },
    description: {
        fr: String,
        en: String
    },
    updatedBy: String,
    updateAt: String,
})
const LabDepatmentSchema: Schema = new Schema({
    name: {
        fr: { type: String, lowercase: true, trim: true },
        en: { type: String, lowercase: true, trim: true },
    },
    mnemonic: { type: String, uppercase: true, trim: true },
    description: {
        fr: String,
        en: String
    },
    updates: [update]
});
export const DEPARTMENTS = model<LABDEPARTMENT>("DEPARTEMENTS", LabDepatmentSchema);