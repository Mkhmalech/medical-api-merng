import { Schema, model, Document } from "mongoose";
/**
 * extensions
 */
const extensionSchema = new Schema({
  component: { type: Schema.Types.ObjectId, ref: "COMPONENTS" },
  addedBy: { type: Schema.Types.ObjectId, ref: "USERS" },
  createdAt: { type: String, default: new Date().toUTCString() },
  canRead: Boolean,
  canCreate: Boolean,
  canUpdate: Boolean,
  canDelete: Boolean,
  canPublish: Boolean,
});
interface ISpaceModel extends Document {
  account: {
    name: string;
    code?: number;
    type?: string;
    start?: string;
  };
  photos: string[];
  contact: {
    tele: any[];
    address: any;
    website: string;
  };

  classification?: any;

  products?: any[];
  
  categories?: any;

  extensions?: any[];

  patients?: any[];

  catalogs?: any[];

  payement?: any[];

  waitingRoom?: any[];

  geometry?: {
    location: any;
  };

  views: number;

  rating?: number;

  user_ratings_total?: number;

  status: any[]
}

const SpaceSchema: Schema = new Schema({
  account: {
    name: { type: String },
    code: { type: Number },
    type: { type: String },
    start: { type: String },
  },
  space_id: { type: String },
  photos: [String],
  contact: {
    tele: [
      {
        country_code: String,
        country_name: String,
        country_dial_code: String,
        dial_numero: Number,
      },
    ],
    website: { type: String },
    address: {
      region: {
        type: String,
      },

      province: {
        type: String,
      },

      commune: {
        type: String,
      },

      street: {
        type: String,
      },

      city: {
        type: String,
      },
    },
  },
  geometry: {
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
  },
  /**
   * products
   */
  products: [{ type: Schema.Types.ObjectId, ref: "PRODUCT" }],

  /**
   * categories
   */
  categories: [{ type: Schema.Types.ObjectId, ref: "CATEGORIES" }],
  /**
   * activated modules
   */
  extensions: [extensionSchema],

  /**
   * patients not yet
   * confirmed by ID
   */
  // patients: [patient],
  /**
   * catalgs for B to Busniss
   */
  catalogs: [{ type: Schema.Types.ObjectId, ref: "CATALOG"}],
  /**
   * cabinet incomes
   * payement
   */
  // payements: [payement],
  /**
   * waitng room
   */
  // waitingRoom: [waitingPatient],
  /**
   * number of views
   */
  views: Number,
  /**
   * rating
   */
  rating: Number,
  user_ratings_total: Number,
  status: [{
    updatedBy: {type: Schema.Types.ObjectId, ref: 'USER'},
    updatedAt : {type: String, default: new Date().toUTCString()},
    value: {type: String, default: "created"}
  }]
});

export const SPACE = model<ISpaceModel>("SPACE", SpaceSchema);
