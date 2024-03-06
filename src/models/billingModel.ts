import mongoose, { Document, Schema } from "mongoose";

enum BillingStatus {
  PENDING = "Pending",
  COMPLETED = "Completed",
  CANCELED = "Canceled",
}

interface IBillingDescription {
  labCharges: number;
  hospitalCharges: number;
  medicationCharges: number;
}

export interface IBilling extends Document {
  PatientId: string;
  //   Medications: IMedicationQuantity[];
  BillingDescription: IBillingDescription;
  Status: BillingStatus;
  Insurance: string;
}

export const billingDescriptionSchema = new Schema<IBillingDescription>({
  labCharges: {
    type: Number,
    required: true,
  },
  hospitalCharges: {
    type: Number,
    required: true,
  },
  medicationCharges: {
    type: Number,
    required: true,
  },
});

const billingSchema = new Schema<IBilling>({
  _id: {
    type: Schema.Types.ObjectId,
    ref: "Patient", // Reference to the Patient model
    required: true,
  },
  //   Medications: [medicationQuantitySchema],
  BillingDescription: {
    type: billingDescriptionSchema,
    required: true,
  },
  Status: {
    type: String,
    enum: Object.values(BillingStatus),
    required: true,
  },
  //   Insurance: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Insurance', // Reference to the Insurance model
  //     required: true
  //   }
});

export const billingModel = mongoose.model<IBilling>("Billing", billingSchema);

// export default billingModel;
