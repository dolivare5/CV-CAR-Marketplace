"use strict";
/* Importing the Router from the express library. */
/* Importación del enrutador desde la biblioteca express. */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/* Importing the functions from the controller. */
/* Importación de las funciones desde el controlador. */
const typeOfVehiclesController_1 = require("../controllers/typeOfVehiclesController");
/* Creating the routes for the API. */
/* Creando las rutas para la API. */
/* Creating a new instance of the Router class. */
/* Creando una nueva instancia de la clase Router. */
const typeOfVehicle = (0, express_1.Router)();
/* Creating a route that is going to be used to get all the types of vehicles. */
/* Esta es una ruta que se va a utilizar para conseguir todos los tipos de vehículos. */
typeOfVehicle.get('/', typeOfVehiclesController_1.getTypesVehicles);
/* This is a route that is going to be used to get a type of vehicle. */
/* Esta es una ruta que se va a utilizar para conseguir un tipo de vehículo. */
typeOfVehicle.get('/:TypVeh_Id', typeOfVehiclesController_1.getTypeVehicle);
/* This is a route that is going to be used to create a type of vehicle. */
/* Esta es una ruta que se utilizará para crear un tipo de vehículo. */
typeOfVehicle.post('/createTypeVehicle', typeOfVehiclesController_1.postTypeVehicle);
/* This is a route that is going to be used to update a type of vehicle. */
/* Esta es una ruta que se va a utilizar para actualizar un tipo de vehículo. */
typeOfVehicle.put('/updateTypeVehicle/:TypVeh_Id', typeOfVehiclesController_1.putTypeVehicle);
/* Exporting the `typeOfVehicle` variable. */
/* Exportando la variable `typeOfVehicle`. */
exports.default = typeOfVehicle;
//# sourceMappingURL=typeOfVehiclesRouter.js.map