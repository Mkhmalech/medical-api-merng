import { Schema, model, Document } from "mongoose";

type componentModel = IComponent & Document;

const permission = new Schema({
    
})
interface IComponent {
    ico : string
    name : String,
    description : String
}

const Component = new Schema({
    ico : String,
    name : String,
    description : String,
    createdBy : { type: Schema.Types.ObjectId, ref: 'USER' },
    createdAt : String,
    version : {type : String, default : '1.0.0'}
})

export const COMPONENTS = model<componentModel>('COMPONENTS', Component)