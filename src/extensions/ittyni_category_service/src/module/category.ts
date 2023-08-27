import { Schema, model, Document } from "mongoose";

type categoryModel = ICategory & Document;

const subCategory = new Schema({
    
})
interface ICategory {
    name?: string,
    description?: string,
    parentsCategory?: any[],
    subcategories?: any[],
    image?: string,
    icon?: string,
    displayOrder: number,
    isActive: boolean
}

const category = new Schema({
    name: String,
    description: String,
    parentsCategory: [{type: Schema.Types.ObjectId, ref: 'category'}],
    subcategories : [{type: Schema.Types.ObjectId, ref: 'category'}],
    image: String,
    icon: String,
    displayOrder: Number,
    isActive: Boolean
})

export const CATEGORY = model<categoryModel>('CATEGORY', category)