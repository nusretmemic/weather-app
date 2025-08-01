import { Schema, model, Document } from "mongoose";

export interface IWidget extends Document {
  _id: number;
  location: string;
  lat: number;
  lng: number;
  createdAt: Date;
  userId?: string; // Optional field for user association for future use
}

const widgetSchema = new Schema<IWidget>({
  _id: { type: Number, required: true },
  location: { type: String },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  createdAt: { type: Date, default: () => new Date() },
  userId: { type: String, required: false }, // Optional field for user association for future use
});

export default model<IWidget>("Widget", widgetSchema);
