import { Schema, model, Document } from "mongoose";



// updates schema
const Update = new Schema({
  updatedAt: { type: String, default: new Date().toUTCString() },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'USER' },
  name: String,
  code: String,
  mnemonic: String,
  finance: [{
    country: String,
    currency: String,
    description: String,
    code: String,
    symbol: String,
    value: Number,
    price: Number
  }],
  description: {
    overview: { type: String },
    why: { type: String },
    how: { type: String },
    what: { type: String },
    when: { type: String },
  },
  departements: [{ type: Schema.Types.ObjectId, ref: 'DEPARTEMENTS' }],
  parameter: Boolean,
  group: Boolean,
  components: [{ type: Schema.Types.ObjectId, ref: 'TESTS' }],
  panel: { type: Schema.Types.ObjectId, ref: 'PANELS' },
  structure: { type: Schema.Types.ObjectId, ref: 'STRUCTURES' },
  preparation: {
    fasting: {
      required: Boolean,
      duration: {
        min: Number,
        max: Number,
        unit: { type: String, enum: ["minutes", "hours", "days"] }
      }
    },
    spectialTime: [String]
  },
  specimen: {
    type: [{ type: Schema.Types.ObjectId, ref: 'SAMPLES' }],
    vial: [{ type: Schema.Types.ObjectId, ref: 'VIALS' }],
    anticoagulant: [{ type: Schema.Types.ObjectId, ref: 'ANTICOAGULANTS' }],
    numberoftube: { type: Number },
    volumemin: { type: Number },
    location: { type: String },
    stability: [{
      time: { type: Number },
      temperature: { type: Number }
    }]
  },
  methods: [{ type: Schema.Types.ObjectId, ref: 'ANALYTICS' }]
})
interface INABMModel extends Document {
  reference?: any;
  name?: string;
  mnemonic?: string,
  code?: string
  description?: any
  finance?: any[];
  departements?: any
  components?: any
  parameter?: any
  group?: any
  panel?: any
  structure?: any
  preparation?: any
  specimen?: any;
  updates?: any;
  views?: number
}


const NABMSchema: Schema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  mnemonic: String,
  finance: [{ type: Schema.Types.ObjectId, ref: "FINANCES" }],
  description: {
    overview: { type: String },
    why: { type: String },
    how: { type: String },
    what: { type: String },
    when: { type: String },
  },
  departements: [{ type: Schema.Types.ObjectId, ref: 'DEPARTEMENTS' }],
  components: [{ type: Schema.Types.ObjectId, ref: 'TESTS' }],
  parameter: Boolean,
  group: Boolean,
  panel: { type: Schema.Types.ObjectId, ref: 'PANELS' },
  structure: { type: Schema.Types.ObjectId, ref: 'STRUCTURES' },
  preparation: {
    fasting: {
      required: Boolean,
      duration: {
        min: Number,
        max: Number,
        unit: { type: String, enum: ["minutes", "hours", "days"] }
      }
    },
    spectialTime: [String]
  },
  specimen: {
    nature: { type: [String] },
    tubecolor: { type: [String] },
    anticoagulant: { type: [String] },
    numberoftube: { type: Number },
    volumemin: { type: Number },
    location: { type: String },
    stability: [{
      time: { type: Number },
      temperature: { type: Number }
    }],
    multiple: {
      isMultiple: Boolean,
      duration: Number,
      times: Number,
      unit: { type: String, enum: ["minutes", "hours", "days"] }
    }
  },
  methods: [{ type: Schema.Types.ObjectId, ref: 'ANALYTICS' }],
  updates: [Update],
  views: Number
});


export const NABM = model<INABMModel>("NABM", NABMSchema);