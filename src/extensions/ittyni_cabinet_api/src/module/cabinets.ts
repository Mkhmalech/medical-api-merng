import { Schema, model, Document, SchemaTypes } from "mongoose";

/**
 * cabinet extensions
 */
const extensionSchema = new Schema({
    componentId: { type: Schema.Types.ObjectId, ref: "COMPONENTS" },
    addedBy: { type: Schema.Types.ObjectId, ref: "USERS" },
    createdAt: { type: String, default: new Date().toUTCString() },
    canRead: Boolean,
    canCreate: Boolean,
    canUpdate: Boolean,
    canDelete: Boolean,
    canPublish: Boolean
})
/**
 * payement
 */
const payement = new Schema({
    payementId: { type: Schema.Types.ObjectId, ref: 'PAYEMENT' }
})
/**
 * waiting patient
 */
const waitingPatient = new Schema({
    patient: { type: Schema.Types.ObjectId, ref: 'PATIENT' },
    arrivedAt: String,
    finishedAt: String,
    viewedAt: String,
    number: Number,
    icd: { type: Schema.Types.ObjectId, ref: 'ICD' },
    motif: String,
    visitType: String,
    status: [{ updatedAt: String, updatedBy: { type: Schema.Types.ObjectId, ref: 'USER' }, now: String, before: String }]
})
/**
 * patient of cabinet
 */
const patient = new Schema({
    patientId: { type: Schema.Types.ObjectId, ref: 'PATIENT' }
})
interface ICabinetModel extends Document {
    account: {
        name: string,
        code?: number,
        type?: string,
        start?: string,
    }
    contact: {
        tele: any[],
        address: any,
        website: string
    }
    classification: any,

    extensions: any[],

    patients: any[],

    payement: any[]

    waitingRoom: any[]

    views: number
}

const CabinetSchema: Schema = new Schema({
    account: {
        name: { type: String },
        code: { type: Number },
        type: { type: String },
        start: { type: String },
    },

    contact: {
        tele: {
            fix: [String],

            fax: [String],

        },
        website: { type: String },
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

            city: {
                type: String,
            },
        },
    },
    /**
   * activated modules
   */
    extensions: [extensionSchema],
    /**
     * patients not yet 
     * confirmed by ID
     */
    patients: [patient],
    /**
     * cabinet incomes
     * payement
     */
    payements: [payement],
    /**
     * waitng room
     */
    waitingRoom: [waitingPatient],
    /**
     * number of views
     */
    views: Number,
    /**
     * rating
     */
    visitorsRating: Number
});

export const CABINET = model<ICabinetModel>("CABINET", CabinetSchema);
