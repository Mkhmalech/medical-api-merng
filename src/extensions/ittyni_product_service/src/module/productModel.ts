import { Schema, model, Document } from "mongoose";

const Image = new Schema({
  filename: String,
  originName: String,
  extension: String,
});
type ProductleModel = IProduct & Document;

interface IProduct {
  name?: string;
  description?: string;
  price?: {
    value: number;
    currency: string;
  };
  images?: any[];
  categories?: any[];
  stockQuantity?: number;
  space: string
  barcode?: string;
  status: any
}

const product = new Schema({
  name: String,
  description: String,
  categories: [{ type: Schema.Types.ObjectId, ref: "CATEGORY" }],
  price: {
    value: Number,
    currency: String,
  },
  stockQuantity: Number,
  images: [{ type: Schema.Types.ObjectId, ref: "IMAGE" }],
  barcode: String,
  space: {type: Schema.Types.ObjectId, ref: "SPACE" },
  status: [{
    updatedBy: {type: Schema.Types.ObjectId, ref: "USER" },
    value: {type:String, default: 'created'},
    updatedAt: {type: String, default: new Date().toUTCString()}
  }]
});

export const PRODUCT = model<ProductleModel>("PRODUCT", product);
