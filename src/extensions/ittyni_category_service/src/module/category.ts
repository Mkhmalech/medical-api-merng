import { Schema, model, Document } from "mongoose";

type categoryModel = ICategory & Document;

interface ICategory {
    name?: string,
    description?: string,
    parentsCategory?: any[],
    subcategories?: any[],
    image?: string,
    icon?: any,
    displayOrder: number,
    status: string
}

const category = new Schema({
    name: String,
    description: String,
    parentsCategory: [{type: Schema.Types.ObjectId, ref: 'category'}],
    subcategories : [{type: Schema.Types.ObjectId, ref: 'category'}],
    icon: {
        filename: String,
        originName: String,
        extension: String
    },
    status: {type: String, enum: ["active", "deleted"], default: "active"}
})

export const CATEGORY = model<categoryModel>('CATEGORY', category)