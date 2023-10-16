import { Schema, model, Document } from "mongoose";

// updates schema
const Update = new Schema({
  updatedAt: { type: String, default: new Date().toUTCString() },
  updatedBy: { type: Schema.Types.ObjectId, ref: "USER" },
  name: {
    en: String,
    fr: String,
  },
  reference: {
    Mnemonic: { type: String, unique: true },
    CPT: { type: Number },
  },
  finance: [
    {
      country: String,
      Bcode: Number,
      code: String,
      value: Number,
      price: Number,
      currency: String,
      description: String,
    },
  ],
  description: {
    overview: { type: String },
    why: { type: String },
    how: { type: String },
    what: { type: String },
    when: { type: String },
  },
  departements: [{ type: Schema.Types.ObjectId, ref: "DEPARTEMENTS" }],
  parameter: Boolean,
  group: Boolean,
  components: [{ type: Schema.Types.ObjectId, ref: "TESTS" }],
  panel: { type: Schema.Types.ObjectId, ref: "PANELS" },
  structure: { type: Schema.Types.ObjectId, ref: "STRUCTURES" },
  preparation: {
    fasting: {
      required: Boolean,
      duration: {
        min: Number,
        max: Number,
        unit: { type: String, enum: ["minutes", "hours", "days"] },
      },
    },
    spectialTime: [String],
  },
  specimen: {
    nature: {
      type: [String],
      // enum : ["serum", "plasma","blood"]
    },
    tubecolor: { type: [String] },
    anticoagulant: { type: [String] },
    numberoftube: { type: Number },
    volumemin: { type: Number },
    location: { type: String },
    stability: [
      {
        time: { type: Number },
        temperature: { type: Number },
      },
    ],
  },
});
interface ITestModel extends Document {
  reference?: any;
  name?: any;
  description?: any;
  finance?: any[];
  departements?: any;
  components?: any;
  parameter?: any;
  group?: any;
  panel?: any;
  structure?: any;
  preparation?: any;
  specimen?: any;
  delivery: any;
  transport: any;
  updates: any[];
  official?: boolean
  status?: any[]
  space?: string
  user?: string
  views: number;
}

const TestSchema: Schema = new Schema({
  space: {type: Schema.Types.ObjectId, ref: 'SPACE'},
  user: {type: Schema.Types.ObjectId, ref: 'USER'},
  name: {
    en: String,
    fr: String,
  },
  reference: {
    code: { type: [Number] },
    Mnemonic: { type: String, unique: true },
    CPT: { type: Number },
  },
  finance: [
    {
      country: String,
      Bcode: Number,
      code: String,
      price: Number,
      currency: String,
      description: String,
      symbol: String,
    },
  ],
  description: {
    overview: { type: String },
    why: { type: String },
    how: { type: String },
    what: { type: String },
    when: { type: String },
  },
  departements: [{ type: Schema.Types.ObjectId, ref: "DEPARTEMENTS" }],
  components: [{ type: Schema.Types.ObjectId, ref: "TESTS" }],
  parameter: Boolean,
  group: Boolean,
  panel: { type: Schema.Types.ObjectId, ref: "PANELS" },
  structure: { type: Schema.Types.ObjectId, ref: "STRUCTURES" },
  preparation: {
    fasting: {
      required: Boolean,
      duration: {
        min: Number,
        max: Number,
        unit: { type: String, enum: ["minutes", "hours", "days"] },
      },
    },
    spectialTime: [String],
  },
  specimen: {
    nature: { type: [String] },
    tubecolor: { type: [String] },
    anticoagulant: { type: [String] },
    numberoftube: { type: Number },
    volumemin: { type: Number },
    location: { type: String },
    stability: [
      {
        time: { type: Number },
        temperature: { type: Number },
      },
    ],
    multiple: {
      isMultiple: Boolean,
      duration: Number,
      times: Number,
      unit: { type: String, enum: ["minutes", "hours", "days"] },
    },
  },
  delivery: {
    time: { type: String, enum: ["24", "48", "72"] },
    unit: { type: String, enum: ["hours", "days"], default: "hours" },
  },
  transport: {
    temperature: { type: String, enum: ["room", "refrigerated", "frozen"] },
  },
  updates: [Update],
  status: [{
    value: { type: String, default: "created", enum: ["created", "validated", "online", "offline", "deleted"]},
    createdBy: { type: Schema.Types.ObjectId, ref: "USER"},
    createdAt: { type: String, default: new Date().toUTCString()}
  }],
  views: Number,
  official: {type: Boolean}
});

export const TESTS = model<ITestModel>("TESTS", TestSchema);