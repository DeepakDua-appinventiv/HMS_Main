import mongoose from "mongoose";
import {HospitalUtilities} from "../models/hospitalUtilityModel";
import {Admit} from "../models/admitModel";
import { RESPONSE_MESSAGES, SUCCESS_MESSAGES } from "../constants";

export class AdmitServicesClass{
//Service to handle patient admission
    static async admitPatient(patientId: string, staffId: string, bedType: string){
        const admitDate = new Date();

        const admission = new Admit({
            patientId,
            staffId,
            bedType,
            admitDate
        });
        try{
        await admission.save(); 
    
    const result = await HospitalUtilities.findOneAndUpdate({ bedType }, { $inc: { bedsAllotted: 1 } }, { new: true });
    if(!result) {
        throw new Error('Bed Type not found');
    }
    // return { status: 200, response: { message: "Patient Admitted successfully"} };
    return { status: 200, response: { message: SUCCESS_MESSAGES.ADMIT_SUCCESS} }; // Return success message
    }catch (error) {
        throw new Error(RESPONSE_MESSAGES.SERVER_ERROR);
      }
    }

    // static async dischargePatient(patientId: string){
    //     try {
    //         const admission = await Admit.findOne({ patientId });
    //         console.log(admission);
    //         if(!admission){
    //             throw new Error("Patient not found or not admitted");
    //         }
    //         if(admission.dischargeDate){
    //             throw new Error('Patient is already discharged.');
    //         }

    //         const dischargeDate: any = new Date();
    //         const admitDate = admission.admitDate;
    //         const bedType = admission.bedType;
    //         const bedCharge = await HospitalUtilities.findOne({bedType:bedType});
    //         const perDayBedCharge = bedCharge.perDayBedCharge
    //         const daysAdmitted = Math.ceil((dischargeDate - admitDate)/ (1000 * 60 * 60 * 24));
    //         console.log(perDayBedCharge);
    //         const totalAmount = daysAdmitted * perDayBedCharge;
    //         console.log(totalAmount);
    //         admission.dischargeDate = dischargeDate;
    //         admission.totalAmount = totalAmount;
    //         await admission.save();

    //         await HospitalUtilities.findOneAndUpdate(
    //             { bedType },
    //             { $inc: { bedCount: 1 } }
    //           );   
    //         return { status: 200, response: { message: SUCCESS_MESSAGES.DISCHARGE_SUCCESS } };
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }

    static async dischargePatient(patientId: string) {
        try {
            const admission = await Admit.findOne({ patientId });
    
            if (!admission) {
                throw new Error("Patient not found or not admitted");
            }
    
            if (admission.dischargeDate) {
                throw new Error('Patient is already discharged.');
            }
    
            const dischargeDate: any = new Date();
            const admitDate = admission.admitDate;
            const bedType = admission.bedType;
            const bedCharge = await HospitalUtilities.findOne({ bedType: bedType });
            const perDayBedCharge = bedCharge.perDayBedCharge;
            
            // Calculate days admitted, ensuring it's at least 1
            const daysAdmitted = Math.max(1, Math.ceil((dischargeDate - admitDate) / (1000 * 60 * 60 * 24)));
            
            const totalAmount = daysAdmitted * perDayBedCharge;
    
            // Store the calculated total amount in the database
            admission.dischargeDate = dischargeDate;
            admission.totalAmount = totalAmount;
            await admission.save();
    
            await HospitalUtilities.findOneAndUpdate(
                { bedType },
                { $inc: { bedsAllotted: -1  } }
            );
    
            return { status: 200, response: { message: SUCCESS_MESSAGES.DISCHARGE_SUCCESS, totalAmount } };
        } catch (error) {
            throw new Error(error.message);
        }
    }   
}
