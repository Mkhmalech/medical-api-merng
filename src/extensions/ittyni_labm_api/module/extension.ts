import mongoose, { Schema } from "mongoose"

/**
 * labo extension gived to status by component
 */
export const extensionSchema = new Schema({
    component: { type: Schema.Types.ObjectId, ref: "COMPONENTS" },
    activatedBy: { type: Schema.Types.ObjectId, ref: 'USER' },
    activatedAt: { type: String, default: new Date().toUTCString() },
    plan: { type: String, enum: ['free', 'basic', 'premium'], default: 'free' },
    /**
     * to do
     * - check component is paid or not
     * - component premium or basic or free
     * - 
     */
    updates: [{
        updatedBy: { type: Schema.Types.ObjectId, ref: 'USER' },
        updatedAt: { type: String, default: new Date().toUTCString() },
        plan: { type: String, enum: ['free', 'basic', 'premium'], default: 'free' }
    }]
})
export const Extension = mongoose.model('extension', extensionSchema)