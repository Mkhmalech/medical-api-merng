import { Schema } from "mongoose";
export const Permission: Schema = new Schema({
    component: { type: Schema.Types.ObjectId, ref: "COMPONENTS" },
    canRead: Boolean,
    canCreate: Boolean,
    canUpdate: Boolean,
    canDelete: Boolean,
    canPublish: Boolean,
    addedBy: { type: Schema.Types.ObjectId, ref: "USER" },
    addedAt: { type: String, default: new Date().toUTCString() },
});
export const AccountModuleSchema: Schema = new Schema({
    // module : {type : Schema.Types.ObjectId},
    moduleName: String,
    enabledAt: String,
    enabledBy: { type: Schema.Types.ObjectId, ref: "USER" },
})

export const AccountSchema: Schema = new Schema({
    labo: { type: Schema.Types.ObjectId, ref: "LABO" },
    cabinet: { type: Schema.Types.ObjectId, ref: "CABINET" },
    pharma: { type: Schema.Types.ObjectId, ref: "PHARMA" },
    enabledBy: { type: Schema.Types.ObjectId, ref: "USER" },
    enabledAt: { type: String, default: new Date().toUTCString() },
    role: {
        name: String,
        status: { type : String, enum :['active', 'inactive'], default : 'active' }
    },
    permissions: [Permission],
    updates: [{
        updateddBy: { type: Schema.Types.ObjectId, ref: "USER" },
        updatedAt: { type: String, default: new Date().toUTCString() },
        role: {
            name: String,
            status: String
        },
        permissions: [Permission]
    }]
})