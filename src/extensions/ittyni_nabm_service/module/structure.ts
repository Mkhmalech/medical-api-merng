import { Schema, model, Document } from "mongoose";
interface STRUCTURE extends Document {
    name : {
        fr : string
    }
    mnemonic : string
    description : string
}
const StructureSchema: Schema = new Schema({
    name : {
        fr : { type: String, lowercase: true, trim: true },
        en : { type: String, lowercase: true, trim: true }
    },
    mnemonic: { type: String, uppercase: true, trim: true },
    description: String,
    atoms : String,
    molecules : String,
    organisms : String
});
export const STRUCTURES = model<STRUCTURE>("STRUCTURES", StructureSchema);