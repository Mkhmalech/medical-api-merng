import mongoose, { Schema } from "mongoose";


export const Contribution = new Schema({
    fullname: String,
    tele: String,
    appointement: String,
    appointementsubmited : String,
    details: String,
    needphlebotomist: Boolean
})

export const LaboContributions = mongoose.model('laboContributions', Contribution)