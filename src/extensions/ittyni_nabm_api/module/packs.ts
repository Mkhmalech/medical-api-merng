import { Schema, model, Document } from "mongoose";
interface PACK extends Document {
    name : {
        fr : string
    }
    mnemonic : string
    description : string
}
const PackSchema: Schema = new Schema({
    name : {
        fr : { type: String, lowercase: true, trim: true },
        en : { type: String, lowercase: true, trim: true }
    },
    mnemonic: { type: String, uppercase: true, trim: true },
    description: String
});
export const PACKS = model<PACK>("PACKS", PackSchema);