import { Schema, model, Document } from "mongoose";

type areaModel = IAreaUnit & Document;


interface IAreaUnit{
    name : string
    type : string
    zipcode: string
    population?: any
    area : any
}

const areaUnit = new Schema({
    name : String,
    type : String,
    zipcode : String,
    area : {type : Schema.Types.ObjectId, ref: "AREA"}
})

export const AREAUNIT = model<areaModel>('AREAUNIT', areaUnit)