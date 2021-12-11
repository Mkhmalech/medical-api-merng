import { Schema, model, Document } from "mongoose";



// updates schema
const Update = new Schema({
  updatedAt: String,
  updatedBy: { type: Schema.Types.ObjectId, ref: 'USER' },
  name: {
    en: String,
    fr: String
  },
  reference: {
    Mnemonic: { type: String, unique: true },
    CPT: { type: Number }
  },
  finance: [
    {
      country: String,
      Bcode: Number
    }
  ],
  departements: [{ type: Schema.Types.ObjectId, ref: 'DEPARTEMENTS' }],
  components: [{ type: Schema.Types.ObjectId, ref: 'TESTS' }],
  parameter: Boolean,
  group: Boolean,
  panel: { type: Schema.Types.ObjectId, ref: 'PANELS' },
  structure: { type: Schema.Types.ObjectId, ref: 'STRUCTURES' },
  preparation : {
    fasting : {
      required : Boolean,
      duration : {
        min : Number,
        max : Number,
        unit : {type : String, enum : ["minutes", "hours", "days"]}
      }
    },
    spectialTime : [String]
  },
  specimen: {
    nature: { type: [String] },
    tubecolor: { type: [String] },
    anticoagulant: { type: [String] },
    numberoftube: { type: Number },
    volumemin: { type: Number },
    location : { type : String},
    stability: [{
      time: { type: Number },
      temperature: { type: Number }
    }]
  }
})
interface ITestModel extends Document {
  reference: any;
  name: any;
  finance: any[];
  departements : any
  components : any
  parameter : any
  group : any
  panel : any
  structure : any
  preparation : any
  specimen?: any;
  updates: any;
  views: number
}


const TestSchema: Schema = new Schema({
  name: {
    en: String,
    fr: String
  },
  reference: {
    code: { type: [Number] },
    Mnemonic: { type: String, unique: true },
    CPT: { type: Number }
  },
  finance: [
    {
      country: String,
      Bcode: Number
    }
  ],
  departements: [{ type: Schema.Types.ObjectId, ref: 'DEPARTEMENTS' }],
  components: [{ type: Schema.Types.ObjectId, ref: 'TESTS' }],
  parameter: Boolean,
  group: Boolean,
  panel: { type: Schema.Types.ObjectId, ref: 'PANELS' },
  structure: { type: Schema.Types.ObjectId, ref: 'STRUCTURES' },
  preparation : {
    fasting : {
      required : Boolean,
      duration : {
        min : Number,
        max : Number,
        unit : {type : String, enum : ["minutes", "hours", "days"]}
      }
    },
    spectialTime : [String]
  },
  specimen: {
    nature: { type: [String] },
    tubecolor: { type: [String] },
    anticoagulant: { type: [String] },
    numberoftube: { type: Number },
    volumemin: { type: Number },
    location : { type : String},
    stability: [{
      time: { type: Number },
      temperature: { type: Number }
    }],
    multiple : {
      isMultiple : Boolean,
      duration : Number,
      times : Number,
      unit : {type : String, enum : ["minutes", "hours", "days"]}
    }
  },

  updates: [Update],

  views: Number
});


export const TESTS = model<ITestModel>("TESTS", TestSchema);