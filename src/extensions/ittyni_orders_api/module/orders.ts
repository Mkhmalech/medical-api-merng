import { Schema, model, Document } from "mongoose";

type LabOrderModel = iOrder & Document

interface iOrder {
    
    OrderUniqueCode : string
    OrderedBy : string
    OrderType : string
    OrderDate : string
    OrderTime : string
    OrderPriceTotal : number
    OrderStatus : any[]
         /* payed
        */
    
    patient? : any
    laboratory ?: any
    referredFrom? : any
    referredFromCabinet? : any
    sample? : {
        /**
         * sampleType
         * sampleCondition
         * samplePriseTime
         * phlebotomistId
         * 
        */
    }
    panel? : any[]
} 

const LabOrderStatus = new Schema({
    type : String, 
    // "created" || "sent" || "recieved" || "performed" || "validated_partially" 
    // || "validated" || "cancelled" || "deleted"
    createdAt : String,
    createdBy : { type: Schema.Types.ObjectId, ref: 'USER' }
})
const LabOrderPanel = new Schema({
    testId : { type: Schema.Types.ObjectId, ref: 'TESTS' },
    testPrice : Number
})
export const LabOrder = new Schema({
    OrderUniqueCode : String,
    OrderType : String,
    OrderedBy : { type: Schema.Types.ObjectId, ref: 'USER' },
    OrderDate : String,
    OrderTime : String,
    OrderPriceTotal : Number,
    OrderStatus : [LabOrderStatus],
    patient : { type: Schema.Types.ObjectId, ref: 'PATIENT' },
    laboratory : { type: Schema.Types.ObjectId, ref: 'LABO' },
    referredFrom : { type: Schema.Types.ObjectId, ref: 'LABO' },
    referredFromCabinet : { type: Schema.Types.ObjectId, ref: 'CABINET' },
    sample : {},
    panel : [LabOrderPanel]
})

export const ORDER = model<LabOrderModel>('ORDER', LabOrder)