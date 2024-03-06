// import { Request, Response } from "express";
// import {inventoryModel} from "../models/inventoryModel";
// import { MedBillServicesClass } from "../services/medBill.Service";
// import { RESPONSE_MESSAGES } from "../constants";
// import {medicationBillModel} from "../models/medicationBill";

// export class medBillClass {
//   static async calculateMedicationBill(
//     req: Request,
//     res: Response
//   ): Promise<void> {
//     try {
//       const { patientId, inventoryId, quantity } = req.body;
//       const result = await MedBillServicesClass.calculateMedBill(
//         patientId, inventoryId, quantity
//       );

//       const medicationBill = new medicationBillModel({
//         PatientId: patientId,
//         InventoryId: inventoryId,
//         TotalAmount: result.response.totalAmount,
//       });
  
//       await medicationBill.save();
  
//       return res.status(result.status).json(result.response);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
//     }
//   }
// }
