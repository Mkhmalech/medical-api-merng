import { Schema, model, Document } from "mongoose";

type EHRModel = IEHR & Document;

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
interface IEHR {
    civility : string
    firstname: string,
    lastname: string,
    gender: string,
    tele?: string,
    dob : any,
    ID : {
        IDType : string
        IDNum : string
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

const ehr = new Schema({
    civility : String,
    firstname: String,
    lastname: String,
    gender: String,
    dob : String,
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

export const EHR = model<EHRModel>('EHR', ehr)