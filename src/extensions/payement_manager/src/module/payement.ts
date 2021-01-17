import { Schema, model, Document } from "mongoose";

type FinanceModel = IPayement & Document;

const permission = new Schema({

})
interface IPayement {
    createdAt: string
    createdBy: string
    orderId: string
    amount: number
    currency: string
}

const Payement = new Schema({
    createdAt: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'USER' },
    orderId: { type: Schema.Types.ObjectId, ref: 'ORDER' },
    orderCode: String,
    amount: Number,
    currency: String
})

export const PAYEMENT = model<FinanceModel>('PAYEMENT', Payement)