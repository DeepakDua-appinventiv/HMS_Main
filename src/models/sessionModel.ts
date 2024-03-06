import mongoose, { Document } from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    // patientUserId: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Patient",
    //   required: true,
    // }],
    // staffUserId: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Staff",
    //   required: true,
    // }],
    patientUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      // required: true,
    },
    staffUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      // required: true,
    },
    isUserActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);

export { Session };
