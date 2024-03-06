const express = require("express");
import { AdminClass } from "../controller/adminController";
const adminRouter = express.Router();
import { adminAuth } from "../middleware/auth";

//Admin all clear

adminRouter.post("/login", AdminClass.adminLogin);
adminRouter.post("/addstaff", adminAuth, AdminClass.addStaff);
adminRouter.put("/updatestaff", adminAuth, AdminClass.updateStaff);
adminRouter.get("/getallstaff", adminAuth, AdminClass.getAllStaffProfiles);
adminRouter.get("/getstaffbyrole", adminAuth, AdminClass.getStaffByRole);
adminRouter.get("/getstaffbyspecialization", adminAuth, AdminClass.getStaffBySpecialization);
adminRouter.get("/getallpatient", adminAuth, AdminClass.getAllPatientProfiles);
adminRouter.get("/searchstaff",adminAuth, AdminClass.searchStaff);    //full text search search staff 
adminRouter.get("/search", adminAuth, AdminClass.search);  //normal text search through regex
adminRouter.get("/searchstaffauto", adminAuth, AdminClass.searchStaffAuto);   //autocomplete search for staff
adminRouter.delete("/removestaff/:email", adminAuth, AdminClass.removeStaff);
adminRouter.get("/logout", adminAuth, AdminClass.adminLogout);

export default adminRouter;
