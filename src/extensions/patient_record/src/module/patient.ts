import { Schema, model, Document } from "mongoose";

type PatientModel = IPatient & Document;

/**
 * payement
 */
const payement = new Schema({
    payementId : { type: Schema.Types.ObjectId, ref: 'PAYEMENT' },
    patientId : { type: Schema.Types.ObjectId, ref: 'PATIENT' },
    cabinetId : { type: Schema.Types.ObjectId, ref: 'CABINET' }
})
const permission = new Schema({
    cabinetId : { type: Schema.Types.ObjectId, ref: 'CABINET' },
    laboId : { type: Schema.Types.ObjectId, ref: 'LABO' },
})
interface IPatient {
    civility : String
    firstname: string,
    lastname: string,
    gender: string,
    tele?: string,
    DOB : any,
    ID : {
        IDType : String
        IDNum : String
    }
    contact? : {
        tele : [{
            mobile : string,
            fix : string
        }],
        email : string
        address: {
            region: string

            province:string

            commune: string

            street: string

            city: string
        }
    },
    update : [{
        updatedAt : string,
        updatedBy : any,
    }]
    permissions : any[]
}

const patient = new Schema({
    civility : String,
    firstname: String,
    lastname: String,
    gender: String,
    DOB : String,
    ID : {
        IDType : String,
        IDNum : String
    },
    contact : {
        tele : [{
            mobile : String,
            fix : String
        }],
        email : {type : String},
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
        }
    },
    update : [{
        updatedAt : String,
        updatedBy : { type: Schema.Types.ObjectId, ref: 'USER' }
    }],
    permissions : [permission],

    payements : [payement]
})

export const PATIENT = model<PatientModel>('PATIENT', patient)