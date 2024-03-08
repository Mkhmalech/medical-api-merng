import { Schema } from "mongoose";
import mongoose from 'mongoose';

/**
 * labo departement hold all 
 */
export const laboSettingDepartement = new Schema({  name : String, date : String })

/**
 * holiday when labo doesn't work
 * @data from, to, name
 */
export const LaboSettingHoliday = new Schema({ holiday : String, duration : Number, createdAt : String });

/**
 * leave is the personal vacation 
 */
export const LaboSettingLeave = new Schema({  leave : String, duration : Number, createdAt : String })

/**
 * labo automates
 */
export const LaboSettingAutomate = new Schema({ brand : String, analyzer : String, entryDate : String, createdAt : String })

/**
 * labo permission gived to status by component
 */
// export const PermissionByComponent = new Schema({ componentName : String, create : Boolean, read : Boolean, update : Boolean, delete : Boolean  })

/**
 * labo affiliation
 */
export const LaboSettingAffiliation = new Schema({ 
    allow_invitations : { type: Boolean, default: false },  
    updatedAt: { type: String, default: new Date().toISOString() },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'USER' },
});

/**
 * labo Team Status
 */
export const laboSettingTeam = new Schema({ 
    addedby : {type : Schema.Types.ObjectId, ref : 'USER'}, 
    updatedby : {type : Schema.Types.ObjectId, ref : 'USER'}, 
    role : String, 
    // permissions : [PermissionByComponent] 
})
export const LaboSettingTeam = mongoose.model<any>('LaboSettingTeam', laboSettingTeam)