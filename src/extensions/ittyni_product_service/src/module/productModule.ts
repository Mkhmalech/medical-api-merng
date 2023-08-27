import { Schema, model, Document } from "mongoose";

type ProductleModel = IProduct & Document;

interface IProduct {
    name: string
    desctiption: string
    price: {
        value: number,
        currency: string
    }
}

const product = new Schema({
    name: String,
    desctiption: String,
    categories: [String],
    price: {
        value: Number,
        currency: String
    }
})

export const PRODUCT = model<ProductleModel>('PRODUCT', product)