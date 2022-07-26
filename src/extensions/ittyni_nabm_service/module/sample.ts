import { Schema, model, Document } from "mongoose";
interface SAMPLE extends Document {
    name : {
        fr : string
    }
    mnemonic : string
    description : string
}
const SampleSchema: Schema = new Schema({
    nature : {
        fr : { type: String, lowercase: true, trim: true },
        en : { type: String, lowercase: true, trim: true }
    },
    mnemonic: { type: String, uppercase: true, trim: true },
    location : { type: String, lowercase: true, trim: true },
    description: String,
    tubecolor: { type: [String] },
    anticoagulant: { type: [String] },
    numberoftube: { type: Number },
    volumemin: { type: Number },
    stability: [{
      time: { type: Number },
      temperature: { type: Number }
    }]
});
export const SAMPLES = model<SAMPLE>("SAMPLES", SampleSchema);