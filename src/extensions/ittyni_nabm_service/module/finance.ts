import { Schema, model, Document } from "mongoose";
interface FINANCE extends Document {
    country: string
    Bcode: number
    code: string
    symbol: string
    value: number
    price: number
    currency: string
    description: string
}
const FinanceSchema: Schema = new Schema({
    country: String,
    Bcode: Number,
    code: String,
    symbol: String,
    value: Number,
    price: Number,
    currency: String,
    description: String

});
export const FINANCES = model<FINANCE>("FINANCES", FinanceSchema);