import { Schema, model, Document } from "mongoose";

type catalogModel = ICatalog & Document;

const permission = new Schema({
    
})
interface ICatalog {
    title : string
    description? : string
    tests? : any[]
    createdBy? : string
    updatedAt? : string
    status? : any[]
}

const catalog = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    tests: [{
        default: {type: Schema.Types.ObjectId, ref: 'TESTS'},
        finance: {
            price: { type: Number },
            currency: { type: String }
        }
    }],
    space: {type: Schema.Types.ObjectId, ref: 'SPACE'},
    createdBy : {type: Schema.Types.ObjectId, ref: "USER"},
    updatedAt: {type: String, default: new Date().toUTCString()},
    status: [{
        updatedBy: {type: Schema.Types.ObjectId, ref: "USER"},
        updatedAt: {type: String, default: new Date().toUTCString()},
        value: {type: String, default: "created", enum: ["created", "closed", "deleted", "open"]}
    }]
})

export const CATALOG = model<catalogModel>('CATALOG', catalog)