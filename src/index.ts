import express from 'express';  
import bodyParser from "body-parser";  // They are used to extract data from the request body and make it available in a more usable format within your routes or controllers 
import connectDatabase from './database/db.connection';
import patientRouter from './routes/patient.Routes';
import adminRouter from './routes/admin.Routes';
import staffRouter from './routes/staff.Routes';
import appRouter from './routes/appointment.Routes';
import medRouter from './routes/medHistory.Routes';
import invRouter from './routes/inventory.Routes';
// import medBillRouter from './routes/medBill.Routes';
import admitRouter from './routes/admit.Routes';
import { startCronJob } from './utils/reminderCron';
require('dotenv').config();

const app = express();
const stripe = require('stripe')('sk_test_51Np7zbSBZuUDptn0i9NdSLvzLjDwdLLvE7esnPNTvgYfbCVuljthBXfho28BzeMYJ23EAtM5cjsNUk3tPsqtLqkh00t32ki25c');
connectDatabase();
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJsDocs = YAML.load('/home/admin446/Desktop/Hospital Mang Project/src/api.yaml');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/patient', patientRouter);  //patient route
app.use('/admin', adminRouter);      //admin route
app.use('/staff', staffRouter);      //staff route
app.use('/appointment', appRouter);  //appointment route
app.use('/medical', medRouter);      //medical History route
app.use('/inventory', invRouter);    //inventory route
// app.use('/medbill', medBillRouter);  //medication bill route
app.use('/admit', admitRouter);      //Hospital Charges route 
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));  //swagger route

const port = process.env.PORT;
startCronJob();

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
})