// import {inventoryModel} from "../models/inventoryModel";
// import { ObjectId } from "mongoose";
// import {medicationBillModel} from "../models/medicationBill";
// import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants";

// export class MedBillServicesClass {
//   static async calculateMedBill(
//     patientId: string,
//     inventoryId: string,
//     quantity: any
//   ): Promise<any> {
//     try {
//       // Find the matching subdocument and update its Quantity
//       const updateResult = await inventoryModel.findOneAndUpdate(
//         { "Medications._id": inventoryId },
//         {
//           $inc: { "Medications.$.Quantity": -quantity }, // Decrease the Quantity by the specified quantity
//         }
//       );

//       // Check if the update was successful
//       if (!updateResult) {
//         return { status: 404, response: { message: ERROR_MESSAGES.MEDICATION_NOT_FOUND } };
//       }

//       // Query for the updated document
//       const medication = await inventoryModel.findOne(
//         { "Medications._id": inventoryId },
//         { "Medications.$": 1 }
//       );

//       if (
//         !medication ||
//         !medication.Medications ||
//         medication.Medications.length === 0
//       ) {
//         return { status: 404, response: { message: ERROR_MESSAGES.MEDICATION_NOT_FOUND } };
//       }

//       const selectedMedication = medication.Medications[0];

//       console.log("Selected Medication:", selectedMedication);

//       if (!selectedMedication) {
//         return {
//           status: 404,
//           response: { message: "Selected medication not found" },
//         };
//       }

//       const totalAmount = selectedMedication.MRP * quantity;

//       return {
//         status: 200,
//         response: {
//           message: SUCCESS_MESSAGES.MEDBILL_SUCCESS,
//           totalAmount,
//           patientId,
//         },
//       };
//     } catch (error) {
//       throw error;
//     }
//   }
// }
