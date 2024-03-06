import { ModelNames } from "../interfaces/models";
import * as models from "../models/index";

export default class BaseDao {
  async find(model: ModelNames,condition = {}) {
    const ModelName = models[model];
    return await ModelName.find(condition);
  }

  async findPagination(model: ModelNames, condition = {},pagination) {
    const skip = (pagination.page-1) * pagination.limit;
    const ModelName = models[model];
    return await ModelName.find(condition).skip(skip).limit(pagination.limit)
  }

  async findOne(model: ModelNames, condition) {
    const ModelName = models[model];
    return await ModelName.findOne(condition);
  }
  
  async findOneAndRemove(model: ModelNames, condition){
    const ModelName = models[model];
    return await ModelName.findOneAndRemove(condition);
  }

  async updateOne(model: ModelNames, condition, payload){
    const ModelName = models[model];
    return await ModelName.updateDOne(condition,{$set:payload});
  }
}
