import mongoose, { Schema } from "mongoose";


export const Appointement = new Schema({
    fullname: String,
    tele: String,
    appointement: String,
    appointementsubmited : String,
    details: String,
    needphlebotomist: Boolean
})

export const LaboAppointement = mongoose.model('laboAppointement', Appointement)