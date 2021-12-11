import { Schema, model, Document } from "mongoose";
interface LABDEPARTMENT extends Document {
    name : {
        fr : string
    }
    mnemonic : string
    description : string
}
const update : Schema = new Schema({
    name : {
        fr : { type: String, lowercase: true, trim: true }
    },
    mnemonic: { type: String, uppercase: true, trim: true },
    description: String,
    updatedBy : String,
    updateAt : String,
})
const LabDepatmentSchema: Schema = new Schema({
    name : {
        fr : { type: String, lowercase: true, trim: true },
        en : { type: String, lowercase: true, trim: true },
    },
    mnemonic: { type: String, uppercase: true, trim: true },
    description: {
        fr : String,
        en : String
    }
});
export const DEPARTMENTS = model<LABDEPARTMENT>("DEPARTMENTS", LabDepatmentSchema);