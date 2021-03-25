import { Schema, model, Document } from "mongoose";

/**
 * labo extension gived to status by component
 */
const extensionSchema = new Schema({ 
    componentName: String, create: Boolean, read: Boolean, update: Boolean, delete: Boolean 
})
/**
 * payement
 */
const payement = new Schema({
    payementId : { type: Schema.Types.ObjectId, ref: 'PAYEMENT' }
})
/**
 * waiting patient
 */
const waitingPatient = new Schema({
    patient : { type: Schema.Types.ObjectId, ref: 'PATIENT' },
    arrivedAt : String,
    finishedAt : String,
    viewedAt : String,
    number : Number,
    icd : { type: Schema.Types.ObjectId, ref: 'ICD' },
    motif : String,
    visitType : String,
    status : [{updatedAt : String, updatedBy : { type: Schema.Types.ObjectId, ref: 'USER' }, now : String, before: String}]
})
/**
 * patient of cabinet
 */
const patient = new Schema({
    patientId : { type: Schema.Types.ObjectId, ref: 'PATIENT' }
})
interface ICabinetModel extends Document {
    account: {
        name: string,
        code?: number,
        type? : string,
        start? : string,
    }
    contact: {
        tele: any[],
        address: any,
        website : string
    }
    classification: any,
    
    extensions : any[],

    patients : any[],

    payement : any[]

    waitingRoom : any[]
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
        website: {type : String},
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
    patients : [patient],
    /**
     * cabinet incomes
     * payement
     */
    payements : [payement],
    /**
     * waitng room
     */
    waitingRoom : [waitingPatient]
    
});

export const CABINET = model<ICabinetModel>("CABINET", CabinetSchema);
