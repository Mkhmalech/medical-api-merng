import { Schema, model, Document } from "mongoose";

type imageModel = IImage & Document;

// const permission = new Schema({});
interface IImage {
  filename: string;
  originName: string;
  extension: string;
  status: string;
}

const image = new Schema({
  filename: String,
  originName: String,
  extension: String,
  status: String,
});

export const IMAGE = model<imageModel>("IMAGE", image);
