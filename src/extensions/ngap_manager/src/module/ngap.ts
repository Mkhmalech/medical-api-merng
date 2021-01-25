import { Schema, model, Document } from "mongoose";

type ngapModel = INgap & Document;

const coefficient = new Schema({
    country: String,
    coefficient: String
})
interface INgap {
    acteLabel: string
    acteCode: string
    acteCoefficient: string
    chapterLetter: string
    chapterCode: string
    chapterLabel: string
    groupCode: string
    groupLabel: string
}

const Ngap = new Schema({
    acteLabel: String,
    acteCode: String,
    acteCoefficient: String,
    chapterLetter: String,
    chapterCode: String,
    chapterLabel: String,
    groupCode: String,
    groupLabel: String,
})

export const NGAP = model<ngapModel>('NGAP', Ngap)