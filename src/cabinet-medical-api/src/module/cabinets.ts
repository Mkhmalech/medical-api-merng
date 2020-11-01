import { Schema, model, Document } from "mongoose";

interface ICabinetModel extends Document {
    account: {
        name: string,
        code?: number
    }
    contact: {
        tele: any,
        address: any
    }
    classification: any
}

const CabinetSchema: Schema = new Schema({
    account: {
        name: {
            type: String,
        },
        code: {
            type: Number,
        }
    },

    contact: {
        tele: {
            fix: [String],

            fax: [String],
        },

        address: {
            region: {
                type: String,
            },

            province: {
                type: String,
            },

            commune: {
                type: String,
            },

            street: {
                type: String,
            },
        },
    },
});

export const CABINET = model<ICabinetModel>("CABINET", CabinetSchema);
