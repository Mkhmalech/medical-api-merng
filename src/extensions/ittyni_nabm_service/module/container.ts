import { Schema, model, Document } from "mongoose";
interface CONTAINER extends Document {
    capacity : { 
        unit : string,
        value : number
    },
    identifier: string,
    description: string,
    color :string,
    additive : string,
    additiveReference : string
}
const ContainerSchema: Schema = new Schema({
    capacity : { 
        unit : {type: String },
        value : {type : Number}
    },
    identifier: { type: String, uppercase: true, trim: true },
    description: { type: String, lowercase: true, trim: true },
    color : {type: String, trim: true },
    additive : {type: String, trim: true },
    additiveReference : {type: String, trim: true }
});
export const CONTAINERS = model<CONTAINER>("CONTAINERS", ContainerSchema);