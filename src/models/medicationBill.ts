import mongoose, { Document, Schema } from "mongoose";

interface IMedicationBill extends Document {
  PatientId: mongoose.Types.ObjectId;
  InventoryId: mongoose.Types.ObjectId;
  TotalAmount: number;
}

const medicationBillSchema = new Schema<IMedicationBill>({
  PatientId: {
    type: Schema.Types.ObjectId,
    ref: "Patient", // Reference to the Patient model
    required: true,
  },
  InventoryId: {
    type: Schema.Types.ObjectId,
    ref: "Inventory", // Reference to the Patient model
    required: true,
  },
  TotalAmount: {
    type: Number,
  }
});

export const medicationBillModel = mongoose.model<IMedicationBill>(
  "MedicationBill",
  medicationBillSchema
);

// export default medicationBillModel;
