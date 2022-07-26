import { Schema, model, Document } from "mongoose";
interface QUOTE extends Document {
    code?: string,
    symbol?: string,
    value?: number,
    price?: number
}
const QuoteSchema: Schema = new Schema({
    code: String,
    symbol: String,
    value: Number,
    price: Number
});
export const QUOTES = model<QUOTE>("QUOTES", QuoteSchema);