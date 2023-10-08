import { Schema, model, Document } from "mongoose";

type areaModel = IArea & Document;

const Population = new Schema({
    year: {type: Number},
    total : {type : Number},
    rural : {type : Number},
    urbain : {type : Number}
})
interface IArea{
    name : string
    type : string
    population: any[]
    region: string
    country : any
}

const area = new Schema({
    name : String,
    type : String,
    population: [Population],
    region: String,
    country : String
})


export const AREA = model<areaModel>('AREA', area)