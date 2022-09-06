"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeOfVehiclesController_1 = require("../controllers/typeOfVehiclesController");
const typeOfVehicle = (0, express_1.Router)();
typeOfVehicle.get('/', typeOfVehiclesController_1.getTypesVehicles);
typeOfVehicle.get('/:TypVeh_Id', typeOfVehiclesController_1.getTypeVehicle);
typeOfVehicle.post('/createTypeVehicle', typeOfVehiclesController_1.postTypeVehicle);
typeOfVehicle.put('/updateTypeVehicle/:TypVeh_Id', typeOfVehiclesController_1.putTypeVehicle);
exports.default = typeOfVehicle;
//# sourceMappingURL=typeOfVehiclesRouter.js.map