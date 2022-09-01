import { Router } from "express";
import { getTypesVehicles, getTypeVehicle, postTypeVehicle, putTypeVehicle } from "../controllers/typeOfVehicleController";

const typeOfVehicle = Router();

typeOfVehicle.get('/', getTypesVehicles);

typeOfVehicle.get('/:TypVeh_Id', getTypeVehicle);

typeOfVehicle.post('/createTypeVehicle', postTypeVehicle);

typeOfVehicle.put('/updateTypeVehicle/:TypVeh_Id', putTypeVehicle);

export default typeOfVehicle;