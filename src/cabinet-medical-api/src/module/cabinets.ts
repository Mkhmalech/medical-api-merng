import { Schema, model, Document } from "mongoose";

/**
 * labo extension gived to status by component
 */
const extensionSchema = new Schema({ 
    componentName: String, create: Boolean, read: Boolean, update: Boolean, delete: Boolean 
})
interface ICabinetModel extends Document {
    account: {
        name: string,
        code?: number
    }
    contact: {
        tele: any,
        address: any
    }
    classification: any,
    
    extensions : any[]
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
    /**
   * activated modules
   */
    extensions: [extensionSchema],
});

export const CABINET = model<ICabinetModel>("CABINET", CabinetSchema);
