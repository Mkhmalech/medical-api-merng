import { Schema, model, Document } from "mongoose";
interface FINANCE extends Document {
    country: string
    code: string
    symbol: string
    value: number
    price: number
    currency: string
    description: string
}
const FinanceSchema: Schema = new Schema({
    country: String,
    currency: String,
    description: String,
    quotes : [{type:Schema.Types.ObjectId, ref: "QUOTES"}]
});
export const FINANCES = model<FINANCE>("FINANCES", FinanceSchema);