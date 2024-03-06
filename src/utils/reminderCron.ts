import {appointmentModel} from "../models/appointmentModel";
import {DepartmentModel} from "../models/departmentModel";
import {patientModel} from "../models/patientModel";
import { sendReminderEmail } from '../services/email.Service';
import cron from 'node-cron'

export function startCronJob() {
  //Script will run every morning at 8 AM
  cron.schedule('0 8 * * *', async () => { 
    try {
      console.log("Cron Job Running");
      const currentDate = new Date();
      const tomorrow = new Date(currentDate);
      tomorrow.setDate(currentDate.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const upcomingAppointments = await appointmentModel.find({
        AppointmentDate: { $gte: new Date() },
      });

      // Reminder email for upcoming appointments
      for (const appointment of upcomingAppointments) {
        const { patientId, AppointmentDate, selectedSlot, visitReason, departmentId } = appointment;
        const patient = await patientModel.findById(patientId);

        const department = await DepartmentModel.findById(departmentId);
        const departmentName = department ? department.name : '';

        await sendReminderEmail(
            "deepak.dua@appinventiv.com",
            "Appointment Reminder",
            AppointmentDate,
            selectedSlot,
            appointment.doctorName,
            departmentName,
            visitReason
        );
      }
      console.log("Reminder email sent successfully");
    } catch (error) {
      console.log('Error sending reminder email: ', error);
    }
  });
}
