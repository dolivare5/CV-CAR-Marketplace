"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putTypeVehicle = exports.postTypeVehicle = exports.getTypeVehicle = exports.getTypesVehicles = void 0;
/*
    Spanish: Aquí se importan funciones y métodos necesarios para la validación de cada campo que se recibe como parámetro.
    English: Functions and methods necessary for the validation of each field received as a parameter are imported here.
 */
const express_validator_1 = require("express-validator");
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const TypeOfVehicle_1 = __importDefault(require("../models/TypeOfVehicle"));
//----------------------------------------------------------------------------------------------- //
/*
    Spanish: Método retorna los tipos de vehículos registrados.
    English: Method returns the types of vehicles registered.
 */
const getTypesVehicles = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /*
            Spanish: Se realiza una consulta à la base de datos para extraer los tipos de vehículos registrados.
            English: A database query is performed to extract the types of vehicles registered.
        */
        const typeOfVehicles = yield TypeOfVehicle_1.default.findAll({
            attributes: ['TypVeh_Name', 'TypVeh_Description'],
            where: { TypVeh_Status: 1 }
        });
        if (!typeOfVehicles) {
            res.status(200).send({ errores: [{ msg: 'No hay tipos de vehículos registrados en el sistema' }] });
        }
        /*
            Spanish: Finalmente retorno la información de los tipos de vehículos registrados.
            English: Finally, I return the information on the types of vehicles registered.
        */
        return res.status(200).send({
            response: [
                {
                    msg: "getTypeOfVehicles",
                    typeOfVehicles
                }
            ]
        });
    }
    catch (e) {
        console.log(e);
        /*
           Spanish: Si llega a ocurrir un error al insertar los datos se retorna una respuesta con el código 500, ya
           que indica que una determinada petición o solicitud al servidor no se pudo completar con éxito.
           
           English: EIf an error occurs when inserting the data, a response with the code 500 is returned, since it
           indicates that a certain request or request to the server could not be completed successfully.
       */
        return res.status(500).send({ errores: { msg: 'Ha ocurrido un error, inténtelo más tarde.' } });
    }
});
exports.getTypesVehicles = getTypesVehicles;
//----------------------------------------------------------------------------------------------- //
/*
    Spanish: Método retorna los datos de un typo de vehículo en especifico.
    English: Method returns data for a specific vehicle type.
 */
const getTypeVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /*
            Spanish: Se extraen los datos que vienen en el body a través del request.
        
            English: The data that comes in the body is extracted through the request.
        */
        const { TypVeh_Id } = req.params;
        /*
            Spanish: Se realiza una consulta à la base de datos para extraer el tipo de vehículo
            que tenga registrado el id que se recibe.
            English: A query is made to the database to extract the type of vehicle registered in the id received.
            registered in the id being received.
        */
        const typeOfVehicle = yield TypeOfVehicle_1.default.findByPk(TypVeh_Id);
        if (!typeOfVehicle) {
            res.status(200).send({ errores: [{ msg: 'El código ingresado no corresponde a ningún tipo de vehículo.  ' }] });
        }
        /*
            Spanish: Finalmente retorno la información del tipo de vehículo registrado.
            English: Finally return the information of the type of vehicle registered.
        */
        // @ts-ignore
        const { TypVeh_Name, TypVeh_Description } = typeOfVehicle;
        res.status(200).send({
            response: [
                {
                    msg: "getTypeVehicle",
                    typeOfVehicle: {
                        TypVeh_Name,
                        TypVeh_Description
                    }
                }
            ]
        });
    }
    catch (e) {
        console.log(e);
        /*
           Spanish: Si llega a ocurrir un error al insertar los datos se retorna una respuesta con el código 500, ya
           que indica que una determinada petición o solicitud al servidor no se pudo completar con éxito.
           
           English: EIf an error occurs when inserting the data, a response with the code 500 is returned, since it
           indicates that a certain request or request to the server could not be completed successfully.
       */
        return res.status(500).send({ errores: { msg: 'Ha ocurrido un error, inténtelo más tarde.' } });
    }
});
exports.getTypeVehicle = getTypeVehicle;
//----------------------------------------------------------------------------------------------- //
/*
    Spanish: Método que registra Tipos De Vehículos.
    English: Method of recording Vehicle Types.
 */
const postTypeVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
        Spanish: Se extraen los datos que vienen en el body a través del request.
    
        English: The data that comes in the body is extracted through the request.
    */
    const { body } = req;
    try {
        /*
            Spanish: Verifica si el arreglo resultado en el cual se guardan todas las validaciones está vacío o no
            English: Checks whether the result array in which all validations are stored is empty or not.
        */
        let result = yield validateFieldsTypeOfVehicle(req, res);
        if (!result.isEmpty()) {
            /*
                Spanish: De haber un error retorno un arreglo json con cada uno de las validaciones que no se cumplieron.
                English: If there is an error I return a json array with each of the validations that were not fulfilled.
            */
            res.status(200).send({ errores: result.array() });
        }
        /*
            Spanish: Se comprueba si existe o no una tipo de vehículo con el nombre que se recibe.
            English: It is checked whether or not there is a vehicle type with the name received.
        */
        const existTypeVehicle = yield TypeOfVehicle_1.default.findOne({
            where: {
                TypVeh_Name: body.TypVeh_Name
            }
        });
        /*
            Spanish: Si existe un tipo de vehículo que sea igual al ingresado se retorna un mensaje con dicha información.
            English: If there is a vehicle type that is the same as the one entered, a message is returned with this information.
        */
        if (existTypeVehicle) {
            return res.status(400).json({
                errores: [
                    {
                        msg: "El tipo de vehículo ingresado ya se encuentra registrado"
                    }
                ]
            });
        }
        /*
            Spanish: Si no existe un tipo de vehículo que sea igual al ingresado se procede a crear un objeto de tipo
            TypeOfVehicle con la información que se recibe.
            English: If there is no vehicle type equal to the one entered, we proceed to create an object of type
            TypeOfVehicle with the information received.
        */
        // @ts-ignore
        const typeOfVehicle = new TypeOfVehicle_1.default(body);
        /*
            Spanish: Una vez se ha creado el objeto, se procede a guardar la información de dicho objeto à la db.
        
            English: Once the object has been created, the information of the object is saved to the db.
        */
        yield typeOfVehicle.save();
        /*
            Spanish: Finalmente, si no hay ningún problema se retorna la información a través de un objeto json.
            English:  Finally, if there is no problem, the information is returned through a json object.
        */
        // @ts-ignore
        const { TypVeh_Name, TypVeh_Description } = typeOfVehicle;
        res.status(200).send({
            errores: [
                {
                    msg: "Tipo de Vehículo registrado correctamente.",
                    typeOfVehicle: {
                        TypVeh_Name,
                        TypVeh_Description
                    }
                }
            ]
        });
    }
    catch (e) {
        console.log(e);
        /*
           Spanish: Si llega a ocurrir un error al insertar los datos se retorna una respuesta con el código 500, ya
           que indica que una determinada petición o solicitud al servidor no se pudo completar con éxito.
           
           English: EIf an error occurs when inserting the data, a response with the code 500 is returned, since it
           indicates that a certain request or request to the server could not be completed successfully.
       */
        return res.status(500).send({ errores: { msg: 'Ha ocurrido un error, inténtelo más tarde.' } });
    }
});
exports.postTypeVehicle = postTypeVehicle;
//----------------------------------------------------------------------------------------------- //
/*
    Spanish: Método que permite actualizar los datos relacionados a los tipos de vehículos.
    English: Method that allows updating data related to vehicle types.
 */
const putTypeVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /*
            Spanish: Se extrae el id que se recibe en la request.
            English: The id received in the request is extracted.
        */
        const { TypVeh_Id } = req.params;
        /*
            Spanish: Se consulta en la base de datos para verificar si existe o no el id que se recibe.
            English: The database is queried to verify whether the received id exists.
        */
        const typeVehicle = yield TypeOfVehicle_1.default.findByPk(TypVeh_Id);
        if (!typeVehicle) {
            return res.json({ errores: [{ msg: 'El código ingresado no corresponde a ningún tipo de vehículo. ' }] });
        }
        /*
            Spanish: Verifica si el arreglo resultado en el cual se guardan todas las validaciones está vacío o no
            English: Checks whether the result array in which all validations are stored is empty or not.
        */
        let result = yield validateFieldsTypeOfVehicle(req, res);
        if (!result.isEmpty()) {
            /*
                Spanish: De haber un error, retorno un arreglo json con cada uno de las validaciones que no se cumplieron.
                English: If there is an error, return a json array with each of the validations that were not fulfilled.
            */
            return res.json({ errores: result.array() });
        }
        /*
            Spanish: Si noy problemas con las validaciones anteriores, se procede a extraer cada uno de los datos que se
            modificaran en la base de datos.
            English: If there are no problems with the previous validations, we proceed to extract each of the data to be modified in the database.
            to be modified in the database.
        */
        const { TypVeh_Name, TypVeh_Description, TypVeh_Status } = req.body;
        /*
            Spanish: Se verifica que el nuevo nombre por el que se va a remplazar el tipo de vehículo no se encuentre
            registrado en otros tipos de vehículos. Para ello se realiza una consulta donde se busca si en algún registro
            diferente al que se va a modificar se encuentra el nombre a registrar. Si se encuentra no se registra.
            
            English: Verify that the new name to be used to replace the vehicle type is not already registered in other
            vehicle types registered in other types of vehicles. For this purpose, a query is made to find out if the
            name to be registered is found in any other registry different from the one to be modified if the name to
            be registered is found. If it is found, it is not registered.
        */
        const existTypeVehicleRepeated = yield connection_1.default.query(`SELECT * FROM "Type_Of_Vehicles" tv WHERE "TypVeh_Id" != ${TypVeh_Id} AND "TypVeh_Name" = '${TypVeh_Name}'`, { type: sequelize_1.QueryTypes.SELECT });
        /*
            Spanish: Si existe por lo menos un tipo de vehículo registrado no se permite actualizar el registro con
            dicho nombre. Caso contrario, se procede con el registro.
            
            English: If there is at least one type of vehicle registered, it is not allowed to update the record with that name.
            name. Otherwise, the registration will proceed.
        */
        if (existTypeVehicleRepeated.length > 0) {
            return res.status(200).send({ errores: [{ msg: 'Lo sentimos, el tipo de vehículo ingresado ya se encuentra registrado' }] });
        }
        /*
            Spanish: Se actualiza el objeto de tipos de vehículos con los datos que se reciben en el body.
            English: The vehicle type object is updated with the data received in the body.
        */
        typeVehicle.set({ TypVeh_Name, TypVeh_Description, TypVeh_Status });
        /*
            Spanish: Una vez actualizar el objeto que guarda el tipo de vehículo ya modificado se procede con editar el
            registro en la db.
            English: Once the object that stores the modified vehicle type has been updated, we proceed to edit the
            record in the db.
        */
        yield typeVehicle.save();
        /*
            Spanish: Finalmente retorno la información del tipo de vehículo registrado.
            English: Finally return the information of the type of vehicle registered.
        */
        res.status(200).send({
            response: [
                {
                    msg: "postTypeVehicle",
                    typeVehicle
                }
            ]
        });
    }
    catch (e) {
        console.log(e);
        /*
           Spanish: Si llega a ocurrir un error al insertar los datos se retorna una respuesta con el código 500, ya
           que indica que una determinada petición o solicitud al servidor no se pudo completar con éxito.
           
           English: EIf an error occurs when inserting the data, a response with the code 500 is returned, since it
           indicates that a certain request or request to the server could not be completed successfully.
       */
        return res.status(500).send({ errores: { msg: 'Ha ocurrido un error, inténtelo más tarde.' } });
    }
});
exports.putTypeVehicle = putTypeVehicle;
//----------------------------------------------------------------------------------------------- //
/*
    Spanish: Método que valida los campos obligatorios para la tabla de tipos de vehículos.
    English: Method that validates the mandatory fields for the vehicle type table.
 */
const validateFieldsTypeOfVehicle = (req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
        Spanish: Validaciones a través de express validators. Entre estas están que no se ingresen datos no validos.
        Para ello se valida que el campo nombre no este vacío.
        
        English: Validations through express validators. Among these are that no invalid data is entered.
        For this purpose, it is validated that the name field is not empty.
     */
    yield (0, express_validator_1.check)('TypVeh_Name').notEmpty().withMessage("El nombre del tipo de vehículo es Obligatorio").run(req);
    /*
        Spanish: Se guarda en una variable de tipo arreglo con el resultado de cada una de las validaciones
        de los campos y se retorna dicho arreglo.
        
        English: It is stored in an array variable with the result of each field validation and the array is returned.
        of the fields and the array is returned.
     */
    return (0, express_validator_1.validationResult)(req);
});
//# sourceMappingURL=typeOfVehicleController.js.map