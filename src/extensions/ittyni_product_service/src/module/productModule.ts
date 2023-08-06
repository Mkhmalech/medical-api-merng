import { Schema, model, Document } from "mongoose";

type exampleModel = IExample & Document;

const permission = new Schema({
    
})
interface IExample {
    
}

const example = new Schema({
    
})

export const EXAMPLE = model<exampleModel>('EXAMPLE', example)