import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants";
import {inventoryModel} from "../models/inventoryModel";
import { ObjectId } from "mongoose";

export class InventoryServiceClass{
    static async addNewItem(inventoryData: any): Promise<any> {
        try {
          if (!inventoryData || !inventoryData.MedName) {
            throw new Error('Invalid medication data format');
          }
      
          // Check if a medication with the same MedName already exists
          const existingMedication = await inventoryModel.findOne({ MedName: inventoryData.MedName });
      
          if (existingMedication) {
            existingMedication.Quantity += inventoryData.Quantity;
            await existingMedication.save();
      
            return {
              status: 200,
              response: { message: 'Medication updated successfully', data: existingMedication },
            };
          } else {
            // Medication doesn't exist, create a new entry
            const newMedication = new inventoryModel(inventoryData);
            await newMedication.save();
      
            return {
              status: 201,
              response: { message: 'Medication added successfully', data: newMedication },
            };
          }
        } catch (error) {
          throw error;
        }
      }
      
  
//Service to handle get an item from the inventory
static async getInventoryItem(itemName: string): Promise<any> {
    try {
        const existingItem = await inventoryModel.findOne({ MedName: itemName });

        if (!existingItem) {
            return { status: 404, response: { message: 'Item not found in inventory' } };
        }

        return { status: 200, response: { data: existingItem } };
    } catch (error) {
        throw error;
    }
}

//Service to handle get all items from the inventory
static async getAllItems(page, itemsPerPage): Promise<any> {
    try {
        const skipItems = (page-1) * itemsPerPage;
        const allItems = await inventoryModel.find({}).skip(skipItems).limit(itemsPerPage);
        
        if (!allItems|| allItems.length === 0) {
            return { status: 404, response: { message: 'No staff profiles found' } };
        }
        
        return { status: 200, response: allItems };
    } catch (error) {
        
    }
}
}

