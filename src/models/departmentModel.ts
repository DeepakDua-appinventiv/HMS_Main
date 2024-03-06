import mongoose, { Document, Schema } from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: [
      "Medicine",
      "Surgery",
      "Gynaecology",
      "Obstetrics",
      "Paediatrics",
      "Eye",
      "ENT",
      "Dental",
      "Orthopaedics",
      "Neurology",
      "Cardiology",
      "Psychiatry",
      "Skin & V.D.",
      "Plastic Surgery",
      "Nuclear Medicine",
      "Infectious Disease"
    ],
    required: true
  }
});

export const DepartmentModel = mongoose.model('Department', departmentSchema);

// export default DepartmentModel;
