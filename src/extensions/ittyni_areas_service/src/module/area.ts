import { Schema, model, Document } from "mongoose";

type areaModel = IArea & Document;


interface IArea{
    name : string
    type : string
    population: number
    subdevision : any
    devision : any
    unit : any
    country : any
}

const area = new Schema({
    name : String,
    type : String,
    population: Number,
    subdevision : {
        type : String,
        name : String,
    },
    devision : {
        type : String,
        name : String,
    },
    unit : {
        type : String,
        name : String,
    },
    country : String
})

export const AREA = model<areaModel>('AREA', area)