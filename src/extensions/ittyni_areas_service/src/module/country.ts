import { Schema, model, Document } from "mongoose";

type areaModel = IAreaUnit & Document;


interface IAreaUnit{
    name : string
    type : string
    population: number
    subdevision : any
    devision : any
    unit : any
    country : any
}

const areaUnit = new Schema({
    name : String,
    type : String,
    country : String
})

export const AREAUNIT = model<areaModel>('AREA', areaUnit)