import nodemailer from 'nodemailer';
import dotenv from "dotenv";
import ejs from "ejs";
import path from "path";
import fs from 'fs'
dotenv.config();

const TEMPLATE_PATH = path.join(__dirname, 'template');

//for send mail
export async function sendVerifyMail(name, email, user_id){
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      
      const verificationLink = `http://localhost:5000/patient/verify?id=${user_id}`;
      const template = fs.readFileSync('/home/admin446/Desktop/Hospital Mang Project/src/templates/verificationEmail.html', 'utf-8');

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Verification Mail",
        html: template.replace('{{ name }}', name).replace('{{ verificationLink }}', verificationLink)
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("email has been sent :-", info.response);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

export async function  sendNewStaff(email, password){
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
      }
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Welcome to Our System', // Email subject
      text: `Your email: ${email}\nYour password: ${password}`, // Email body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error sending email:', error);
      } else {
          console.log('Email sent:', info.response);
      }
  });
  } catch (error) {
    console.log("Email Error:", error);
    return false;
  }
}
  
export async function sendConfirmationEmail(to: any, subject: any, appointmentDate:any, selectedSlot:any, doctorName:any, departmentName: any, visitReason:any): Promise<boolean>{
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            }
        });
        const template = fs.readFileSync('/home/admin446/Desktop/Hospital Mang Project/src/templates/appointment.html','utf-8');
        
        const mailOptions = {
            from: process.env.EMAIL,
            to,
            subject: subject,
            html: template.replace('{{ appointmentDate }}',appointmentDate).replace('{{ selectedSlot }}',selectedSlot).replace('{{ doctorName }}',doctorName).replace('{{ departmentName }}', departmentName).replace('{{ visitReason }}',visitReason)
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);
        return true
    } catch (error) {
        console.log('Email error: ', error);
        return false;
    }
}

export async function sendReminderEmail(to: any, subject: any, appointmentDate:any, selectedSlot:any, doctorName:any, departmentName: any, visitReason:any) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
  
      const template = fs.readFileSync('/home/admin446/Desktop/Hospital Mang Project/src/templates/appointmentReminder.html', 'utf-8');

      const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject: subject,
        html: template.replace('{{ appointmentDate }}', appointmentDate).replace('{{ selectedSlot }}', selectedSlot).replace('{{ doctorName }}',doctorName).replace('{{ departmentName }}', departmentName).replace('{{ visitReason }}',visitReason)
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Reminder Email sent:', info.response);
      return true;
    } catch (error) {
      console.log('Reminder Email error:', error);
      return false;
    }
  }
  