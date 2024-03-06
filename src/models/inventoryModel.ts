import mongoose, { Document, Schema, Model } from "mongoose";

export interface IMedication extends Document {
  MedName: string;
  description: string;
  Expiry: Date;
  Quantity: number;
  MRP: number;
}

const medicationSchema = new Schema<IMedication>({
  MedName: String,
  description: String,
  Expiry: Date,
  Quantity: Number,
  MRP: Number,
});

export const inventoryModel = mongoose.model<IMedication>("Inventory", medicationSchema) as Model<IMedication>;
