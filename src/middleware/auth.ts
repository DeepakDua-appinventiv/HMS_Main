const jwt = require("jsonwebtoken");
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
import { Request, Response } from "express";
import { Session } from "../models/sessionModel";

//Common Auth Middleware
export const auth = async (req: any, res: any, next: any) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, SECRET_KEY);
      const session = await Session.findOne({
        patientUserId: user.id,
        isUserActive: true,
      });
      if (!session) {
        res.status(401).json({ message: "User not logged In" });
      }
      req.userId = user.id;
      req.userEmail = user.email;
    } else {
      res.status(401).json({ message: "Missing Token" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "unauthorized user" });
  }
};

//Common Staff Auth Middleware  
export const commonStaffAuth = async (req: any, res: any, next: any) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, SECRET_KEY);

      const session = await Session.findOne({
        staffUserId: user.id,
        isUserActive: true,
      });
      if (!session) {
        res.status(401).json({ message: "User not logged In" });
      }
      
      if (user.role !== "Doctor" && user.role !== "Nurse" && user.role !== "Receptionist" && user.role !== "Inventory Manager" && user.role !== "Pharmacist") {
        res.status(401).json({ message: "Access denied. Only Doctors can perform this action" });
      }

      req.userId = user.id;
      next();
    } else {
      res.status(401).json({ message: "Missing Token" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized user" });
  }
};

//Staff Auth Middleware where role is Doctor
export const staffAuth = async (req: any, res: any, next: any) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, SECRET_KEY);

      const session = await Session.findOne({
        staffUserId: user.id,
        isUserActive: true,
      });
      if (!session) {
        res.status(401).json({ message: "User not logged In" });
      }
      
      if (user.role !== "Doctor") {
        res.status(401).json({ message: "Access denied. Only Doctors can perform this action" });
      }

      req.userId = user.id;
      next();
    } else {
      res.status(401).json({ message: "Missing Token" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized user" });
  }
};

//Staff Auth Middleware where role is Pharmacist
export const pharmaAuth = async (req: any, res: any, next: any) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, SECRET_KEY);

      const session = await Session.findOne({
        staffUserId: user.id,
        isUserActive: true,
      });
      if (!session) {
        res.status(401).json({ message: "User not logged In" });
      }
      
      if (user.role !== "Pharmacist" && user.role !== "Inventory Manager" && user.role !== "Admin") {
        res.status(401).json({ message: "Access denied. Only Pharmacist can perform this action" });
      }

      req.userId = user.id;
      next();
    } else {
      res.status(401).json({ message: "Missing Token" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized user" });
  }
};

//Staff Auth Middleware where role is Inventory Manager
export const invAuth = async (req: any, res: any, next: any) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, SECRET_KEY);

      const session = await Session.findOne({
        staffUserId: user.id,
        isUserActive: true,
      });
      if (!session) {
        res.status(401).json({ message: "User not logged In" });
      }
      
      if (user.role !== "Inventory Manager" && user.role !== "Admin") {
        res.status(401).json({ message: "Access denied. Only Inventory Manager or Admin can perform this action" });
      }

      req.userId = user.id;
      next();
    } else {
      res.status(401).json({ message: "Missing Token" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized user" });
  }
};

//Staff Auth Middleware where role is Receptionist
export const recAuth = async (req: any, res: any, next: any) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, SECRET_KEY);

      const session = await Session.findOne({
        staffUserId: user.id,
        isUserActive: true,
      });
      if (!session) {
        res.status(401).json({ message: "User not logged In" });
      }
      
      if (user.role !== "Receptionist") {
        res.status(401).json({ message: "Access denied. Only Receptionist can perform this action" });
      }

      req.userId = user.id;
      next();
    } else {
      res.status(401).json({ message: "Missing Token" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized user" });
  }
};

//Admin Auth Middleware
export const adminAuth = async (req: any, res: any, next: any) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, SECRET_KEY);

      const session = await Session.findOne({
        staffUserId: user.id,
        isUserActive: true,
      });
      if (!session) {
        res.status(401).json({ message: "User not logged In" });
      }
      if (user.role != "Admin")
        res
          .status(401)
          .json({
            message: "Access denied. Only admin can perform this action",
          });

      req.userId = user.id;
      next();
    } else {
      res.status(401).json({ message: "Missing Token" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "unauthorized user" });
  }
};

//  export const determineUserType =  async (req, res, next) => {
//   // You can determine the userType based on the route, request headers, or any other criteria
//   // For example, you can check the route path:
//   if (req.path.startsWith('/staff')) {
//     req.userType = 'staff';
//   } else if (req.path.startsWith('/patient')) {
//     req.userType = 'patient';
//   }
//   next();
// }

