import { Schema, model, Document } from "mongoose";

type LabOrderModel = IOrder & Document

interface IOrder {

    OrderedBy: string

    OrderTime: string
    OrderPriceTotal: number
    /* payed
   */

    patient?: any
    laboratory?: any
    referredFrom?: any
    referredFromCabinet?: any
    sample?: {
        /**
         * sampleType
         * sampleCondition
         * samplePriseTime
         * phlebotomistId
         * 
        */
    }
    panel?: any[]
    OrderUniqueCode: string
    OrderDate: string
    OrderUniqueNumber: number
    OrderType: string
    OrderStatus: any[]
    OrderCreatedAt: string
    OrderPriceUnit: string
    OrderQuantity?: string
    medicinesOrders: any[]
    OrderDeliveryArea?: string
    OrderDeliveryAreaUnit?: string
}

const LabOrderStatus = new Schema({
    type: String,
    // "created" || "sent" || "recieved" || "performed" || "validated_partially" 
    // || "validated" || "cancelled" || "deleted"
    createdAt: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'USER' }
})
const LabOrderPanel = new Schema({
    testId: { type: Schema.Types.ObjectId, ref: 'TESTS' },
    testPrice: Number
})
export const LabOrder = new Schema({
    patient: { type: Schema.Types.ObjectId, ref: 'PATIENT' },
    laboratory: { type: Schema.Types.ObjectId, ref: 'LABO' },
    referredFrom: { type: Schema.Types.ObjectId, ref: 'LABO' },
    referredFromCabinet: { type: Schema.Types.ObjectId, ref: 'CABINET' },
    sample: {},
    panel: [LabOrderPanel]
})

export const MedicineOrderSchema = new Schema({
    medicineId: { type: Schema.Types.ObjectId, ref: 'MEDICINE' },
})

const OrderStatusSchema = new Schema({
    type: { type: String },
    status: { type: String, required: true },
    // "created" || "sent" || "recieved" || "performed" || "validated_partially" 
    // || "validated" || "cancelled" || "deleted"
    createdAt: { type: String, default: new Date().toUTCString() },
    createdBy: { type: Schema.Types.ObjectId, ref: 'USER' },
    comment: { type: String }
})

export const PromotionSchema = new Schema({
    PromotionType: { type: String },
    PromotionCode: { type: String },
    PromotionDiscount: { type: String }
})

export const OrderSchema = new Schema({
    OrderUniqueCode: { type: String, unique: true }, // order unique code digits and letters specified in user order settings
    OrderDate: { type: String, default: new Date().toLocaleDateString('en-GB').split('/').reverse().join('') },
    OrderUniqueNumber: { type: Number, unique: true },
    OrderType: { type: String },
    OrderStatus: [OrderStatusSchema],
    OrderCreatedAt: { type: String, default: new Date().toUTCString() },
    OrderPriceUnit: { type: String },
    OrderQuantity: { type: Number },
    OrderDeliveryArea: { type: Schema.Types.ObjectId, ref: 'AREA' },
    OrderDeliveryAreaUnit: { type: Schema.Types.ObjectId, ref: 'AREAUNIT' },
    OrderPromotion: [PromotionSchema],
    labOrders: [LabOrder],
    medicinesOrders: [MedicineOrderSchema],
})

export const ORDER = model<LabOrderModel>('ORDER', OrderSchema)