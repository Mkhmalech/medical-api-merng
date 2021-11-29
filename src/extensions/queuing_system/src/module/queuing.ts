import { Schema, model, Document } from "mongoose";

type queuingModel = IQueuing & Document;
const desk = new Schema({
    /**
     * token : {type : String, unique : true},
     * token = {number , userAgent }
     **/
    number: { type: Number, unique: true },
    location : {
        latitude : { type: String },
        longitude : { type: String }
    },
    addedBy: { type: Schema.Types.ObjectId, ref: "USER" },
    addedAt: { type: String, default: new Date().toUTCString() },
    userAgent: { type: String },
    workers : [{
        user: { type: Schema.Types.ObjectId, ref: "USER" },
        connectedAt : { type: String, default: new Date().toUTCString() },
    }],
    status: { type: String, enum: ['active', 'inactive', 'deleted'], default: 'paused' }
})
// queuing labelers
const labeler = new Schema({
    number: { type: Number, unique: true },
    location : {
        latitude : { type: String },
        longitude : { type: String }
    },
    addedBy: { type: Schema.Types.ObjectId, ref: "USER" },
    addedAt: { type: String, default: new Date().toUTCString() },
    userAgent: { type: String },
    workers : [{
        user: { type: Schema.Types.ObjectId, ref: "USER" },
        connectedAt : { type: String, default: new Date().toUTCString() },
    }],
    status: { type: String, enum: ['active', 'inactive', 'deleted', 'paused'], default: 'paused' }
})
const ticket = new Schema({
    number: { type: Number, unique: true },
    addedBy: { type: Schema.Types.ObjectId, ref: "USER" },
    addedAt: { type: String, default: new Date().toUTCString() },
    userAgent: { type: String },
    status: [{
        type: { type: String, enum: ['printed', 'waiting', 'canceled', 'confirmed'], default: 'printed' },
        desk : Number,
        updatedAt: { type: String, default: new Date().toUTCString() },
        updatedBy: { type: Schema.Types.ObjectId, ref: "USER" },
    }]
})

interface IQueuing {
    desks: any[]
    labelers: any[]
    workFlow: any[]
    activatedBy: string
    activatedAt: string
    updates: any[]
}

const queuing = new Schema({

    desks: [desk],

    labelers: [labeler],

    workFlow: [{
        
        startAt: { type: String, default: new Date().toUTCString() },

        endAt: { type: String, default: new Date().toUTCString() },

        tickets: [ticket]
    }],

    activatedBy: { type: Schema.Types.ObjectId, ref: "USER" },

    activatedAt: { type: String, default: new Date().toUTCString() },

    updates: []

})

export const QUEUING = model<queuingModel>('QUEUING', queuing)