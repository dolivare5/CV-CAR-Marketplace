"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeOfVehicleController_1 = require("../controllers/typeOfVehicleController");
const typeOfVehicle = (0, express_1.Router)();
typeOfVehicle.get('/', typeOfVehicleController_1.getTypesVehicles);
typeOfVehicle.get('/:TypVeh_Id', typeOfVehicleController_1.getTypeVehicle);
typeOfVehicle.post('/createTypeVehicle', typeOfVehicleController_1.postTypeVehicle);
typeOfVehicle.put('/updateTypeVehicle/:TypVeh_Id', typeOfVehicleController_1.putTypeVehicle);
exports.default = typeOfVehicle;
//# sourceMappingURL=typeOfVehicleRouter.js.map