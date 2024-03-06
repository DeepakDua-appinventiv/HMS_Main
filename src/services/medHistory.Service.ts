import {MedicalHistoryModel} from "../models/medicalHistory";
import { ObjectId } from "mongoose";
import {medicationBillModel} from "../models/medicationBill";
import {appointmentModel} from "../models/appointmentModel";
import {staffModel} from "../models/staffModel";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants";

export class MedHistoryServicesClass{
//Service to handle add medical history of patient
static async addMedicalHistory(medHistoryData: any, staffId: string) {
    try {
        const appointment = await appointmentModel.findById(medHistoryData.appointmentId);

        if (!appointment) {
            return { success: false, message: ERROR_MESSAGES.APPOINTMENT_NOT_FOUND };
        }

        if (appointment.AppointmentStatus === 'Scheduled' && !appointment.Visited) {
            // Update appointment status to "Completed" if visited is true
            await appointmentModel.findByIdAndUpdate(
                medHistoryData.appointmentId,
                {
                    AppointmentStatus: 'Completed',
                    Visited: true
                }
            );

            const staff = await staffModel.findById(staffId);
            if (!staff) {
                return { success: false, message: ERROR_MESSAGES.STAFF_NOT_FOUND };
            }

            medHistoryData.treatedBy = staffId;
            medHistoryData.treatedDoctorName = `${staff.firstName} ${staff.lastName}`;

            // Your logic to add medical history goes here
            const newMedHistory = new MedicalHistoryModel(medHistoryData);
            await newMedHistory.save();

            return { success: true, status: 200, response: { message: SUCCESS_MESSAGES.MEDHISTORY_SUCCESS } };
        } else {
            return { success: false, message: 'Cannot add medical history for appointments with status other than Scheduled or if visited is true' };
        }
    } catch (error) {
        console.error(error);
        return { success: false, message: "An error occurred while adding medical history" };
    }
}

//Service to handle get medical history of patient by staff
static async getMedicalHistoryStaff(patientId: ObjectId, page: number, limit: number): Promise<any>{
    try {
        const skip = (page-1) * limit;
        const getMedHistory = await MedicalHistoryModel.find({ patientId: patientId }).skip(skip).limit(limit);
        console.log(getMedHistory);
        if(getMedHistory.length == 0){
            return { status: 404, response: { msg: ERROR_MESSAGES.MEDHISTORY_NOT_FOUND } };
        }else{
            return { status: 200, response: { data: getMedHistory } };
        }
    } catch (error) {
        throw error;
    }
}

//Service to handle get medical hsitory of patient
static async getMedicalHistory(patientId: ObjectId, page: number, limit: number): Promise<any> {
    try {
        const skip = (page-1) * limit;
        const getMedHistory = await MedicalHistoryModel.find({patientId: patientId}).skip(skip).limit(limit);
        console.log(getMedHistory);
        if(getMedHistory.length == 0){
            return { status:400, response: {msg: "No Medical History exist"}};
        }else{
            return { status:200, response: {data: getMedHistory }};
        }
    } catch (error) {
        throw error;
    }
}

//Service to handle update medical history of patient
static async updateMedicalHistory(historyId: ObjectId, updateMedHistory): Promise<any> {
    try {
        const updatedMedHistory = await MedicalHistoryModel.findOneAndUpdate({_id: historyId}, {$set: updateMedHistory}, {new: true});
        if (!updatedMedHistory) {
            return { status: 404, response: { message: ERROR_MESSAGES.MEDHISTORY_NOT_FOUND } };
        }
        return { status: 200, response: { message: SUCCESS_MESSAGES.MEDHISTORY_UPDATED, data: updatedMedHistory } };
    } catch (error) {
        throw error;
    }
}
}

