import { Schema } from "mongoose";

export const parapharmacyUpdateSchema = new Schema({
    account: {
        name: { type: String },
        code: { type: Number },
        type: { type: String },
        start: { type: String },
        ice: { type: String},
        rc: { type: String}
    },

    contact: {
        tele: {
            fix: [String],

            fax: [String],

        },
        website: { type: String },
        address: {
            area: {
                type: String,
            },

            area_unit: {
                type: String,
            },

            street: {
                type: String,
            },

        },
    },
    status: { type: String, enum :['created', 'validated', 'suspended', 'deleted'], default: 'created'},
    createdAt: { type: String , default: new Date().toUTCString() },
    createdBy: { type: Schema.Types.ObjectId, ref: "USER" }
})