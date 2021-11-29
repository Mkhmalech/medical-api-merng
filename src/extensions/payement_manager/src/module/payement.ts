import { Schema, model, Document } from "mongoose";

type FinanceModel = IPayement & Document;

const permission = new Schema({

})
interface IPayement {
    createdAt: string
    createdBy: string
    orderId: string
    from: string
    to: string
    amount: number
    currency: string
}

const Payement = new Schema({
    createdAt: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'USER' },
    orderId: { type: Schema.Types.ObjectId, ref: 'ORDER' },
    form: {
        patientId: { type: Schema.Types.ObjectId, ref: 'PATIENT' },
        cabinetId: { type: Schema.Types.ObjectId, ref: 'CABINET' },
        laboId: { type: Schema.Types.ObjectId, ref: 'LABO' },
    },
    to: {
        patientId: { type: Schema.Types.ObjectId, ref: 'PATIENT' },
        cabinetId: { type: Schema.Types.ObjectId, ref: 'CABINET' },
        laboId: { type: Schema.Types.ObjectId, ref: 'LABO' },
    },
    orderCode: String,
    amount: Number,
    currency: String
})

export const PAYEMENT = model<FinanceModel>('PAYEMENT', Payement)