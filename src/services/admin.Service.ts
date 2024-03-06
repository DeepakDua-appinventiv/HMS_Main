import {staffModel} from '../models/staffModel';
import { Session } from '../models/sessionModel';
import {patientModel} from '../models/patientModel';
import { createClient } from 'redis';
import  { DEFAULT_PAGE, DEFAULT_ITEMS_PER_PAGE, RESPONSE_MESSAGES, SUCCESS_MESSAGES, ERROR_MESSAGES } from "../constants";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongoose';
import {adminDao} from '../entities/admin.dao';
import { sendNewStaff } from './email.Service';

const SECRET_KEY = process.env.SECRET_KEY;

export class AdminServicesClass{

//Service to handle admin login
 static async loginAdmin(email: string, password: string): Promise<any> {
    try {
        // const existingAdmin = await staffModel.findOne({ email: email });
        const existingAdmin = await adminDao.getAdmin({email:email});

        if (!existingAdmin) {
            return { status: 404, response: { message: ERROR_MESSAGES.ADMIN_NOT_FOUND } };
        }

        const matchPassword = existingAdmin.password === password;

        if (!matchPassword) {
            return { status: 400, response: { message: ERROR_MESSAGES.INVALID_CREDENTIALS } };
        }

        const token = jwt.sign(
            { email: existingAdmin.email, id: existingAdmin._id, role: existingAdmin.role },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        const client = createClient();  client.on("error", (err) => console.log("redis Client Error", err));  
        await client.connect();         
        await client.set(`status:${existingAdmin._id}`, 'true');

        await Session.create({
            staffUserId: existingAdmin._id,
            isUserActive: true
        });

        return { status: 200, response: { message: SUCCESS_MESSAGES.LOGIN_SUCCESS, token: token } };
        // return token;
    } catch (error) {
        throw error;
    }
}

//Service to handle add new staff by admin
 static async addNewStaff(staffData: any) {
    try {
        // const existingStaff = await staffModel.findOne({ email: staffData.email });
        const existingStaff = await adminDao.getStaff({ email: staffData.email });

        if (existingStaff) {
            return { status: 409, response: { message: RESPONSE_MESSAGES.DUPLICATE } };
        }
        staffData.password = await this.generateRandomPassword();
        const randomPassword = staffData.password

        const hashedPassword = await bcrypt.hash(staffData.password, 10);
        staffData.password = hashedPassword;

        const newStaff = new staffModel(staffData);
        await newStaff.save();

        await sendNewStaff(staffData.email, randomPassword);

        return { status: 201, response: { message: SUCCESS_MESSAGES.ADD_STAFF_SUCCESS, data: { ...newStaff.toObject(), password: randomPassword } } };
    } catch (error) {
        throw error;
    }
}

static async generateRandomPassword(){
    const length = 12;
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = "";
    for(let i=0; i<length; i++){
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }
    return password;
}

//Service to handle remove existing staff by admin
 static async removeStaffProfile(email: string) {
    try {
        // const removeStaff = await staffModel.findOne({ email: email });
        const existingStaff = await adminDao.getStaff({ email: email });

        if (!existingStaff) {
            return { status: 404, response: { message: ERROR_MESSAGES.STAFF_NOT_FOUND } };
        }

        // await staffModel.findOneAndRemove({ email: email });
        await adminDao.removeStaff({ email: email });

        return { status: 200, response: { message: SUCCESS_MESSAGES.DELETE_SUCCESS } };
    } catch (error) {
        throw error;
    }
}

//Service to handle update staff by admin
 static async updateStaffProfile(staffData: any) {
    try {
        // const updateStaff = await staffModel.findOneAndUpdate(
        //     { email: staffData.email },
        //     { $set: { staffData } },
        //     { new: true }
        const condition = {email:staffData.email}
        const update = {staffData}
        const updateStaff = await adminDao.updateStaff(condition,update)
    
        if (!updateStaff) {
            return { status: 404, response: { message: ERROR_MESSAGES.STAFF_NOT_FOUND } };
        }

        return { status: 200, response: { message: SUCCESS_MESSAGES.PROFILE_UPDATED, data: updateStaff } };
    } catch (error) {
        throw error;
    }
}

//Service to handle get all staff details
 static async fetchAllStaffProfiles(pagination): Promise<any> {
    try {
        // const skip = (pagination.page-1) * pagination.limit;
        // const allStaffProfiles = await staffModel.find({}).skip(skip).limit(limit);
        const allStaffProfiles = await adminDao.getAllStaff(pagination);
        const totalCount = await staffModel.countDocuments(allStaffProfiles);
        const totalPages = Math.ceil(totalCount/pagination.limit);
        
        if (!allStaffProfiles || allStaffProfiles.length === 0) {
            return { status: 404, response: { message: 'No Staff Profiles Found' } };
        }
        
        return { status: 200, response: allStaffProfiles , page: totalPages };
    } catch (error) {
        throw error;
    }
}

//Service to handle get all staff details by there role
static async fetchAllStaffByRole(role: string, pagination): Promise<any>{
    try {
        const condition = {role:role};
        // const skip = (pagination.page-1) * pagination.limit;
        // const staffProfiles = await staffModel.find({role:role}).skip(skip).limit(limit);
        const staffProfiles = await adminDao.getStaffByRole(condition, pagination);
        const totalCount = await staffModel.countDocuments(staffProfiles);
        const totalPages = Math.ceil(totalCount/pagination.limit);
        console.log(role)
        if (!staffProfiles || staffProfiles.length === 0) {
            return { status: 404, response: { message: `No staff profiles found with role: ${role}` } };
        }
        return { status:200, response: staffProfiles, page: totalPages };
    } catch (error) {
        throw error;
    }
}

//Service to handle get all staff details by there specialization
static async fetchAllStaffBySpecialization(role: string, specialization: string, page: number, limit: number): Promise<any>{
    try {
        const skip = (page-1) * limit;
        const staffProfiles = await staffModel.find({role: role, specialization: specialization}).skip(skip).limit(limit);
        const totalCount = await staffModel.countDocuments(staffProfiles);
        const totalPages = Math.ceil(totalCount/limit);
        if (!staffProfiles || staffProfiles.length === 0) {
            return { status: 404, response: { message: `No staff profiles found with role: ${role} and specialization: ${specialization}` } };
        }
        return { status:200, response: staffProfiles, page: totalPages };
    } catch (error) {
        throw error;
    }
}

//Service to handle get all patient details
 static async fetchAllPatientProfiles(pagination): Promise<any> {
    try {
        // const skip = (pagination.page-1) * pagination.limit;
        const allPatientProfiles = await adminDao.getAllPatient(pagination);
        const totalCount = await patientModel.countDocuments(allPatientProfiles);
        const totalPages = Math.ceil(totalCount/pagination.limit);
        if(!allPatientProfiles || allPatientProfiles.length === 0) {
            return { status: 404, response: { message: 'No patient profiles found' } };
        }
        return { status: 200, response: allPatientProfiles, page: totalPages};
    } catch (error) {
        throw error;
    }
}

//Service to handle normal search for staff
static async search(data: any) {
    try{
    const staffProfiles = await staffModel.find({
        $or: [
          { firstName: { $regex: data, $options: 'i' } }, 
          { lastName: { $regex: data, $options: 'i' } }, 
          { email: { $regex: data, $options: 'i' } },    
          { role: { $regex: data, $options: 'i' } },              
        ],
      });
      return {status: 200, response: staffProfiles};
    } catch (error) {
        throw error;
    }
}

//Service to handle full text search for staff
static async searchStaff(search: string) {

    try {
        const staffProfiles = await staffModel.aggregate([
            {
              $search: {
                index: "text-search",
                text: {
                  query: search,
                  path: {
                    wildcard: "*"
                  },
                },
              },
            }
          ]);
          return {status: 200, response: staffProfiles};
    } catch (error) {
        throw error;
    }
}

//Service to handle search staff auto
static async searchStaffAuto(search: string){
    try {
        const staffProfiles = await staffModel.aggregate([
            {
            //    $addFields: {
            //       combinedName: {
            //       $concat: ["$firstName", " ", "$lastName"]
            //     }
            // },
              $search: {
                index: "autocomplete",
                autocomplete: {
                    query: search,
                    path: "firstName"
                }
              },
            },{
                $limit: 5
            },{
                $project: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    password: 1,
                    role: 1
                }
            }
        ]);
        return {status: 200, response: staffProfiles};
    } catch (error) {
        throw error;
    }
}

//Service to handle admin logout
static async logoutAdmin(adminId: ObjectId) {
    try {
      await Session.findOneAndUpdate(
        { staffUserId: adminId, isUserActive: true },
        { $set : { isUserActive: false }}
      );

      const client = createClient();
      client.on("error", (err) => console.log("Redis Client Error", err));
      await client.connect();
      await client.set(`status:${adminId}`, 'false');
      await client.del(`status: ${adminId}`);  

      return { status: 200, response: { message: SUCCESS_MESSAGES.LOGOUT_SUCCESS } };
    } catch (error) {
      throw error;
    }
  }
  
}