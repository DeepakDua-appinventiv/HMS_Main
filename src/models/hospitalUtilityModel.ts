const mongoose = require('mongoose');

// Create a schema for the Hospital Utilities model
const hospitalUtilitiesSchema = new mongoose.Schema({
  bedType: {
    type: String,
    required: true,
    unique: true, // Ensures each bed type is unique
  },
  perDayBedCharge: {
    type: Number,
    // required: true,
  },
  bedCount: {
    type: Number,
    // required: true,
  },
  bedsAllotted: {
    type: Number,
    default: 0, 
  },
});

// Create the Hospital Utilities model using the schema
export const HospitalUtilities = mongoose.model('HospitalUtility', hospitalUtilitiesSchema);

// export default HospitalUtilities;
