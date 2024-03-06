import { Request, Response } from "express";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import {
  DEFAULT_PAGE,
  DEFAULT_ITEMS_PER_PAGE,
  RESPONSE_MESSAGES,
} from "../constants";
import { AdmitServicesClass } from "../services/admit.Service";
const SECRET_KEY = process.env.SECRET_KEY;

// var createCustomer = function() {
//   var param = {};
//   param.email = "amit@gmail.com";
//   param.name = "Amit Gupta";
//   param.description = "from node";

//   stripe.customers.create(param, options: function(err.customer)) {
//     if(err)
//     {
//       console.log("err:"+err);
//     }if(customer)
//     {
//       console.log("success: "+customer)
//     }else{
//       console.log("something went wrong");
//     }
//   }
// }

export class AdmitClass {
  //Admit patient API
  static async admitPatient(req: Request, res: Response): Promise<void> {
    try {
      const { patientId, staffId, bedType } = req.body;
      const result = await AdmitServicesClass.admitPatient(
        patientId,
        staffId,
        bedType
      );
      res.status(result.status).json(result.response);
    } catch (error) {
      res.status(500).json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
    }
  }

  //Discharge patient API
  static async dischargePatient(req: Request, res: Response): Promise<void> {
    try {
      const { patientId } = req.body;
      const result = await AdmitServicesClass.dischargePatient(patientId);
      console.log(result);
      res.status(result.status).json(result.response);
    } catch (error) {
      res.status(500).json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
    }
  }

//   static async dischargePatient(req: Request, res: Response): Promise<void> {
//     try {
//         const { patientId } = req.body;
//         const result = await AdmitServicesClass.dischargePatient(patientId);

//         // Fetch the total amount from the service response
//         const totalAmount = result.response.totalAmount;

//         const paymentIntent = await stripe.paymentIntents.create({
//           amount: totalAmount * 100, // Stripe accepts amounts in cents
//           currency: 'inr', // Use 'inr' for Indian Rupees
//         });
//         res.status(result.status).json(result.response);
//     } catch (error) {
//         res.status(500).json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
//     }
// }
}
