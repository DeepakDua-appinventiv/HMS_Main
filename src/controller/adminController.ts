import {staffModel} from "../models/staffModel";
import { Session } from "../models/sessionModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import {
  DEFAULT_PAGE,
  DEFAULT_ITEMS_PER_PAGE,
  RESPONSE_MESSAGES,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  RESPONSE_STATUS
} from "../constants";
import { AdminServicesClass } from "../services/admin.Service";
const SECRET_KEY = process.env.SECRET_KEY;

//Admin all clear

export class AdminClass {
  //admin login API
  static async adminLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await AdminServicesClass.loginAdmin(email, password);
      if (result.status === 404 || result.status === 400) {
        // Will work for Admin not found and Invalid Credentials both
        res.status(result.status).json({ message: result.response.message });  
      }else {
        res.status(result.status).json({ message: SUCCESS_MESSAGES.LOGIN_SUCCESS, token: result.response.token });
      }
    } catch (error) {
      console.log(error);
      res.status(RESPONSE_STATUS.internalServerError).json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
    }
  }

  //add staff API
  static async addStaff(req: Request, res: Response) {
    try {
      const staffData = req.body;
      const result = await AdminServicesClass.addNewStaff(staffData);
      if(result.status === 400){
        //Duplicate Staff
        res.status(result.status).json({ message: result.response.message });
      }else{
        res.status(result.status).json({ message: result.response.message, data: result.response.data });
      }
    } catch (error) {
      console.log(error);
      res.status(RESPONSE_STATUS.internalServerError).json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
    }
  }

  //remove staff API
  static async removeStaff(req: Request, res: Response) {
    try {
      const staffToRemove = req.params.email;
      const result = await AdminServicesClass.removeStaffProfile(staffToRemove);
      if(result.status === 404){
        res.status(result.status).json({ message: result.response.message });
      }else{
      res.status(RESPONSE_STATUS.success).json({message: result.response.message});
      }
    } catch (error) {
      console.log(error);
      res.status(RESPONSE_STATUS.internalServerError).json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
    }
  }

  //update staff API
  static async updateStaff(req: Request, res: Response) {
    const staffData = req.body;
    try {
      const result = await AdminServicesClass.updateStaffProfile(staffData);
      if(result.status === 404){
      res.status(result.status).json({ message: result.response.message });
      }else{
        res.status(result.status).json({ message: result.response.message, data: result.response.data });
      }
    } catch (error) {
      console.log(error);
      res.status(RESPONSE_STATUS.internalServerError).json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
    }
  }

  //get all staff details
  static async getAllStaffProfiles(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page) || DEFAULT_PAGE;
      const limit = parseInt(req.query.limit) || DEFAULT_ITEMS_PER_PAGE;
      const pagination = {
        page: page,
        limit: limit
      }
      const result = await AdminServicesClass.fetchAllStaffProfiles(pagination);
      if(result.status === 404){
        res.status(result.status).json({ message: result.response.message });
      }else{
      res.status(result.status).json({ result: result.response, totalPages: result.page });
      }
    } catch (error) {
      console.log(error);
      res.status(RESPONSE_STATUS.internalServerError).json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
    }
  }

  //get staff by role
  static async getStaffByRole(req: Request, res: Response) {
    try {
      const role = req.query.role as string;
      const page = parseInt(req.query.page) || DEFAULT_PAGE;
      const limit = parseInt(req.query.limit) || DEFAULT_ITEMS_PER_PAGE;
      if (!role) {
        res.status(RESPONSE_STATUS.notFound).json({ message: RESPONSE_MESSAGES.NOT_FOUND });
        return;
      }
      const pagination = {
        page: page,
        limit: limit
      }
      const result = await AdminServicesClass.fetchAllStaffByRole(
        role,
        pagination
      );
      console.log(result);
      if(result.status === 404){
        res.status(result.status).json({ message: result.response.message });
      }else{
      res.status(result.status).json({ result: result.response, totalPages: result.page });
      }
    } catch (error) {
      console.log(error);
      res.status(RESPONSE_STATUS.internalServerError).json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
    }
  }

  //get staff by specialization
  static async getStaffBySpecialization(req: Request, res: Response) {
    try {
      const role = req.query.role as string;
      const specialization = req.query.specialization as string;
      const page = parseInt(req.query.page) || DEFAULT_PAGE;
      const limit = parseInt(req.query.limit) || DEFAULT_ITEMS_PER_PAGE;
      if (!role) {
        res.status(RESPONSE_STATUS.notFound).json({ message: RESPONSE_MESSAGES.NOT_FOUND });
        return;
      }
      if (!specialization) {
        res.status(RESPONSE_STATUS.notFound).json({ message: RESPONSE_MESSAGES.NOT_FOUND });
        return;
      }
      const result = await AdminServicesClass.fetchAllStaffBySpecialization(
        role,
        specialization,
        page,
        limit
      );
      if(result.status === 404){
        res.status(result.status).json({ message: result.response.message });
      }else{
        res.status(result.status).json({ result: result.response, totalPages: result.page });
      }
    } catch (error) {
      console.log(error);
      res.status(RESPONSE_STATUS.internalServerError).json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
    }
  }

  //get all patient details
  static async getAllPatientProfiles(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page) || DEFAULT_PAGE;
      const limit = parseInt(req.query.limit) || DEFAULT_ITEMS_PER_PAGE;
      const pagination = {
        page: page,
        limit: limit
      }
      const result = await AdminServicesClass.fetchAllPatientProfiles(pagination);
      if(result.status === 404){
        res.status(result.status).json({ message: result.response.message });
      }else{
        res.status(result.status).json({ result: result.response, totalPages: result.page });
      }
    } catch (error) {
      console.log(error);
      res.status(RESPONSE_STATUS.internalServerError).json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
    }
  }

  //normal text search through regex
  static async search(req: Request,  res: Response){
    try {
      const data  = req.query.search;
      console.log(data);
      const result = await AdminServicesClass.search(data);
      res.status(result.status).json({ result: result.response });
    } catch (error) {
      console.log(error);
      res.status(RESPONSE_STATUS.internalServerError).json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
    }
  }

  //full text search search staff 
  static async searchStaff(req: Request,  res: Response){
    try {
      const search = req.query.search;
      const result = await AdminServicesClass.searchStaff(search);
      res.status(result.status).json({ result: result.response });
    } catch (error) {
      console.log(error);
      res.status(RESPONSE_STATUS.internalServerError).json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
    }
  }

  //autocomplete search for staff
  static async searchStaffAuto(req: Request, res: Response){
    try {
      const search = req.query.search;
      const result = await AdminServicesClass.searchStaffAuto(search);
      res.status(result.status).json({ result: result.response });

    } catch (error) {
      console.log(error);
      res.status(RESPONSE_STATUS.internalServerError).json({ message: RESPONSE_MESSAGES.SERVER_ERROR })
    }
  }

  //Admin Logout API
  static async adminLogout(req: Request, res: Response) {
    try {
      const adminId = req.userId;
      const result = await AdminServicesClass.logoutAdmin(adminId);
      if(result.status){
        res.status(result.status).json({ message: result.response.message });
      }else{
        res.status(404).json({ message: ERROR_MESSAGES.ADMIN_NOT_FOUND });
      }
    } catch (error) {
      console.log(error);
      res.status(RESPONSE_STATUS.internalServerError).json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
    }
  }
}
