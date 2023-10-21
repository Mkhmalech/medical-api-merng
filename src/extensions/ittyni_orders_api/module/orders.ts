import { Schema, model, Document } from "mongoose";

type LabOrderModel = IOrder & Document;

interface IOrder {
  OrderedBy?: string;

  OrderTime?: string;
  OrderPriceTotal?: any;
  /* payed
   */

  patient?: any;
  laboratory?: any;
  referredFrom?: any;
  panel?: any[];
  OrderUniqueCode: string;
  OrderDate: string;
  OrderNumber: number;
  OrderType: string;
  OrderStatus: any[];
  OrderCreatedAt: string;
  OrderPriceUnit: string;
  OrderQuantity?: string;
  medicinesOrders: any[];
  OrderDeliveryArea?: string;
  OrderDeliveryAreaUnit?: string;
  OrderTele?: {
    country_code: string;
    country_dial_code: string;
    dial_numero: number;
  };
}

const LabOrderStatus = new Schema({
  type: String,
  // "created" || "sent" || "recieved" || "performed" || "validated_partially"
  // || "validated" || "cancelled" || "deleted"
  createdAt: String,
  createdBy: { type: Schema.Types.ObjectId, ref: "USER" },
});
const LabOrderProcedure = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: "TESTS" },
  price: {
    value: String,
    currency: { type: String, default: "MAD" },
  },
});
export const LabOrder = new Schema({
  patient: {
    civility: { type: String },

    gender: { type: String },

    firstName: { type: String },

    lastName: { type: String },

    dob: { type: String },

    pob: { type: Schema.Types.ObjectId, ref: "CITIES" },

    cne: { type: String },
  },
  referredTo: { type: Schema.Types.ObjectId, ref: "SPACE" },
  referredFrom: { type: Schema.Types.ObjectId, ref: "SPACE" },
  procedures: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "TESTS" },
      price: {
        value: String,
        currency: { type: String, default: "MAD" },
      },
    },
  ],
});

export const MedicineOrderSchema = new Schema({
  medicineId: { type: Schema.Types.ObjectId, ref: "MEDICINE" },
});

const OrderStatusSchema = new Schema({
  type: { type: String },
  value: {
    type: String,
    required: true,
    default: "created",
    enum: [
        "created" ||
        "sent" ||
        "recieved" ||
        "performed" ||
        "completed" ||
        "cancelled" ||
        "deleted",
    ],
  },
  createdAt: { type: String, default: new Date().toUTCString() },
  createdBy: { type: Schema.Types.ObjectId, ref: "USER" },
  comment: { type: String },
});

export const PromotionSchema = new Schema({
  PromotionType: { type: String },
  PromotionCode: { type: String },
  PromotionDiscount: { type: String },
});

export const OrderSchema = new Schema({
  OrderUniqueCode: { type: String, unique: true }, // order unique code digits and letters specified in user order settings
  OrderDate: {
    type: String,
    default: new Date()
      .toLocaleDateString("en-GB")
      .split("/")
      .reverse()
      .join(""),
  },
  OrderNumber: { type: Number, required: true },
  OrderType: { type: String },
  OrderStatus: [OrderStatusSchema],
  OrderTime: { type: String },
  OrderCreatedAt: { type: String, default: new Date().toUTCString() },
  OrderPriceUnit: { type: String },
  OrderQuantity: { type: Number },
  OrderPriceTotal: {
    value: String,
    currency: { type: String, default: "MAD" },
  },
  OrderDeliveryArea: { type: Schema.Types.ObjectId, ref: "AREA" },
  OrderDeliveryAreaUnit: { type: Schema.Types.ObjectId, ref: "AREAUNIT" },
  OrderPromotion: [PromotionSchema],
  labOrder: {
    patient: {
      civility: { type: String },

      gender: { type: String },

      firstname: { type: String },

      lastname: { type: String },

      dob: { type: String },

      pob: { type: Schema.Types.ObjectId, ref: "CITIES" },

      tele: { type: String },

      city: { type: String },

      documentID: {
        documentIDNumber: { type: String },
        documentIDType: { type: String, default: "cne" },
      },
    },
    referredTo: { type: Schema.Types.ObjectId, ref: "SPACE" },
    referredFrom: { type: Schema.Types.ObjectId, ref: "SPACE" },
    procedures: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "TESTS" },
        price: {
          value: String,
          currency: { type: String, default: "MAD" },
        },
      },
    ],
    phlebotomist: {
      price: { 
        value: String,
        currency: { type: String, default: "MAD" }
      },
      requested: {type: Boolean, default: false }
    }
  },
  OrderTele: {
    country_code: { type: String },
    country_dial_code: { type: String },
    dial_numero: { type: Number },
  },
  medicinesOrders: [MedicineOrderSchema],
});

export const ORDER = model<LabOrderModel>("ORDER", OrderSchema);
