import { Schema, model, Document } from "mongoose";

type componentModel = IComponent & Document;

const permission = new Schema({
    
})
interface IComponent {
    ico : string
    name : String,
    description : String,
    status : 'active' | 'inactive' | 'deleted'
}

const Component = new Schema({
    ico : String,
    name : String,
    description : String,
    createdBy : { type: Schema.Types.ObjectId, ref: 'USER' },
    createdAt : String,
    version : {type : String, default : '1.0.0'},
    status : String,
    space: {type : String, enum : ["admin", "user", "account"]}
})

export const COMPONENTS = model<componentModel>('COMPONENTS', Component)
