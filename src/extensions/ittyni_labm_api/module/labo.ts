import { Schema, model, Document } from "mongoose";
import { Appointement } from "../../ittyni_appointement_api/module/appointement";
import { LaboStaff, LaboShift } from '../../ittyni_staff_api/module/staff';
import { extensionSchema } from "./extension";
import * as settings from "./settings";

type LaboModel = ILabo & Document;
// @types/labo
interface ILabo {
  account: any
  contact: any
  views: number
  catalogs: any[]
  orders: any[]
  refferal: any[]
  contributors: any[]
  affiliate: any[]
  staff: any[]
  shifts: any[]
  setting: any
  extensions: any[]
  appointements: any[]
  queuings: any[]
}
// queuing desks

const LaboCatalogListUpdateSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'USER' },
  testReported: Number,
  testPrice: Number,
  testReferred: Boolean,
  createdAt: String,
});

const LaboCatalogListSchema = new Schema(
  {
    testId: { type: Schema.Types.ObjectId, ref: 'TESTS' },
    testReported: Number,
    testPrice: Number,
    testReferred: Boolean,
    update: [LaboCatalogListUpdateSchema],
  },
  { strict: false }
);

const LaboCatalogSchema = new Schema({
  createdBy: { type: Schema.Types.ObjectId, ref: 'USER' },
  title: String,
  description: String,
  bFactor: Number,
  addressedTo: String,
  addressedCabinetId: { type: Schema.Types.ObjectId, ref: 'CABINET' },
  list: [LaboCatalogListSchema],
});
const LaboContributorSchema = new Schema({
  addedBy: { type: Schema.Types.ObjectId, ref: 'USER' },
  cabinetId: { type: Schema.Types.ObjectId, ref: 'CABINET' },
  createdAt: String
});


const LaboSchema = new Schema({
  account: {
    name: {
      type: String,
      unique : true
    },
    code: {
      type: Number,
      unique : true
    },
    ice : {type : String, unique : true},
    rc : {type: String, unique : true},
    inp: {type : String, unique : true},
    yearofcreation : {type: String}
  },

  contact: {
    tele: [{
      type : { type : String, unique : true},
      value : { type : String },
      owner : { type : String },
      description : { type: String}
    }],
    email : [{
      type : { type : String},
      value : { type : String },
      owner : { type : String },
      description : {type : String}
    }],
    address: {
      region: {
        type: String,
      },

      province: {
        type: String,
      },

      city: {
        type: String,
      },

      commune: {
        type: String,
      },

      street: {
        type: String,
      },
    },
  },
  /**
   * founder
   */
  founder : {type : Schema.Types.ObjectId, ref : 'USER'},

  /**
   * location
   */
  location: {
    latitude: {type : String},
    longitude : { type : String }
  },
  /**
   * number of reviews
   */
  reviews: Number,
  /**
   * number of views
   */
  views: Number,
  /**
   * price for contributors, pros
   * and affiliates
   */
  catalogs: [LaboCatalogSchema],

  /**
   * all lab orders
   * goes here
   */
  orders: [],

  /**
   * orders inteLabs goes here
   */
  refferals: [],

  /**
   * contributors are pro accounts that 
   * send orders to lab
   */
  contributors: [LaboContributorSchema],

  /**
   * is for both professional and non professional Health
   * affiliate person can send orders to lab and get
   * commissions
   */
  affiliates: [],

  /**
   * laboratoire staff that hold all
   * about labo staff
   */
  staff: [LaboStaff],

  /**
   * if manager create account
   * for an employer we will move
   * employer data to user collection
   * and move labo activities to subcollection
   * like shfits parameters and others
   */
  shifts: [LaboShift],

  /**
   * settings of labo holds data of holidays
   * and automates and data used by labo
   */
  setting: {
    // name of laboratory departements
    departements: [settings.laboSettingDepartement],

    // holidays of labortory
    holidays: [settings.laboSettingHoliday],

    // employed leaves vacance not dispo in this time
    leaves: [settings.laboSettingLeave],

    // what automate the labo has
    automates: [settings.laboSettingAutomate],

    // status of team that labo has
    team: [settings.laboSettingTeam]
  },
  /**
   * activated modules
   */
  extensions: [extensionSchema],
  /**
   * clients appointement
  */
  appointements: [Appointement],
  /**
   * queuing system
  */
  queuings: [{ type: Schema.Types.ObjectId, ref: "QUEUING" }],
  
  /**
   * sessions connection
   */
  sesions: [],

  /**
   * updates 
   */
  updates: []

});

export const LABO = model<LaboModel>("LABO", LaboSchema);
