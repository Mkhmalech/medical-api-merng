import { Schema, model, Document } from "mongoose";

const Image = new Schema({
    filename: String,
    originName: String,
    extension: String
})
type ProductleModel = IProduct & Document;

interface IProduct {
    name: string
    desctiption: string
    price: {
        value: number,
        currency: string
    }
    icon: any
}

const product = new Schema({
    name: String,
    desctiption: String,
    categories: [String],
    price: {
        value: Number,
        currency: String
    },
    stockQuantity: Number,
    images: [{type: Schema.Types.ObjectId, ref: "IMAGES"}]

})

export const PRODUCT = model<ProductleModel>('PRODUCT', product)