import { Schema, model, Document } from "mongoose";
import { AccountSchema } from "./account";

interface IUserModel extends Document {
  status?: string;
  email: UserEmail;
  password: UserPassword;
  createdAt: UserCreatedAt;
  signedbygg : boolean;
  picture? : string
  firstName? : string
  lastName? : string
  accounts: any[];
  sessions: any
  // role of main application
  role: {
    name ?: string,
    addedBy?: string,
    createdAt?: string,
    update ?: any[]
  };
  // permissions of main application
  permissions: any[];
}

const Role: Schema = new Schema({
  name: String,
  updatedBy: String,
  updateddAt: String,
});

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
const Session: Schema = new Schema({
  at : String,
  device : String,
  location : String
});

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  code: Number,

  picture : String,

  firstName : String,

  lastName : String,

  signedbygg : Boolean,

  accounts: [AccountSchema],

  role: {
    name : String,
    addedBy: String,
    createdAt: String,
    update : [Role]
  },

  status : String,

  addedBy: String,

  permissions: [Permission],

  createdAt: { type: String, default: new Date().toUTCString() },

  sessions : [Session]
});

export const USER = model<IUserModel>("USER", UserSchema);
