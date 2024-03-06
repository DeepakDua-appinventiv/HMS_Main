import BaseDao from "./base.dao";

class AdminDao extends BaseDao {
// Entity-specific data access methods
//   async searchStaff(data) {
//     const condition = {
//       $or: [
//         { firstName: { $regex: data, $options: 'i' } },
//         { lastName: { $regex: data, $options: 'i' } },
//         { email: { $regex: data, $options: 'i' } },
//         { role: { $regex: data, $options: 'i' } },
//       ],
//     };
//     return this.find("staff", condition);
//   }

  async getAdmin(condition)
  {
    return await this.findOne("staffModel",condition);
  }

  async getStaff(condition)
  {
    return await this.findOne("staffModel", condition);
  }

  async getAllStaff(pagination?) //? means optional
  {
    const condition = {}
    if(pagination){
      return await this.findPagination("staffModel",condition, pagination);
    }else{
      return await this.find("staffModel", condition);
    }
  }

  async getStaffByRole(condition, pagination?) {
    if (pagination)
    return await this.findPagination("staffModel", condition,pagination)
    else
    return await this.find("staffModel",condition)
    }

  async getAllPatient(pagination?) //? means optional
  {
    const condition = {}
    if(pagination){
      return await this.findPagination("patientModel",condition, pagination);
    }else{
      return await this.find("patientModel", condition);
    }
  }

  async removeStaff(condition)
  {
    return await this.findOneAndRemove("staffModel", condition);
  }

  async updateStaff(condition,update)
  {
    return await this.updateOne("staffModel", condition, update)
  }
}

export const adminDao = new AdminDao;