const express = require('express');
const invRouter = express.Router();
import { invAuth, pharmaAuth } from "../middleware/auth";
import { InventoryClass } from "../controller/inventoryController";

invRouter.post('/additem', invAuth, InventoryClass.addItem);
invRouter.get('/getitem/:itemName', pharmaAuth, InventoryClass.getItem);
invRouter.get('/getallitems', pharmaAuth, InventoryClass.getAllItems);

export default invRouter;