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
exports.postCategoriesAndTypeVehiclesAssociated = exports.getCategoriesAssociatedWithTypeVehicle = exports.getVehiclesTypesAssociatedWithCategory = exports.getCategoriesAndTypeVehiclesAssociated = void 0;
/* Importing the QueryTypes object from the sequelize package. */
/* Importación del objeto QueryTypes desde el paquete de secuencias. */
const sequelize_1 = require("sequelize");
/* Importing the connection to the database. */
/* Importación de la conexión a la base de datos. */
const connection_1 = __importDefault(require("../db/connection"));
/* Importing the check and validationResult functions from the express-validator package. */
/* Importación de las funciones check y validationResult del paquete express-validator. */
const express_validator_1 = require("express-validator");
/* Importing the TypeOfVehicles class from the models folder. */
/* Importando la clase TypeOfVehicles de la carpeta de modelos. */
const TypeOfVehicles_1 = __importDefault(require("../models/TypeOfVehicles"));
/* Importing the Categories class from the models folder. */
/* Importando la clase Categorías desde la carpeta de modelos. */
const Categories_1 = __importDefault(require("../models/Categories"));
/* Importing the Categories_TypeOfVehicle class from the models folder. */
/* Importando la clase Categories_TypeOfVehicle de la carpeta de modelos. */
const Categories_TypeOfVehicle_1 = __importDefault(require("../models/Categories_TypeOfVehicle"));
/**
 * A database query that returns the type of vehicle associated with each category and vice versa
 * @param {Request} _req - Request
 * @param {Response} res - Response: This is the response object that will be sent to the user.
 * @returns A list of categories associated with vehicle types.
 */
/**
 * Una consulta a la base de datos que devuelve el tipo de vehículo asociado a cada categoría y viceversa
 * @param {Request} _req - Solicitud
 * @param {Response} res - Respuesta: Este es el objeto de respuesta que se enviará al usuario.
 * @returns Una lista de categorías asociadas con los tipos de vehículos.
 */
const getCategoriesAndTypeVehiclesAssociated = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* Una consulta a la base de datos que devuelve el tipo de vehículo asociado a cada categoría y viceversa.
        A database query that returns the type of vehicle associated with each category and vice versa */
        /* Una consulta a la base de datos que devuelve el tipo de vehículo asociado a cada categoría y viceversa.
        Una consulta a la base de datos que devuelve el tipo de vehículo asociado a cada categoría y viceversa */
        const categoriesAsTypeVehicles = yield connection_1.default.query(`
                SELECT "TypVeh_Name", "Cat_Name" FROM "Categories_TypeOfVehicles" ctv
                JOIN "Type_Of_Vehicles" TOV on TOV."TypVeh_Id" = ctv."TypeOfVehicleTypVehId"
                JOIN "Categories" C on C."Cat_Id" = ctv."CategoryCatId"
            `, {
            type: sequelize_1.QueryTypes.SELECT
        });
        /* Comprobando si se encontraron o no categorías asociadas a tipos de vehículos. */
        /* Checking whether or not categories associated with vehicle types were found. */
        if (!categoriesAsTypeVehicles) {
            res.status(200).send({ errors: [{ msg: 'No hay categorías asociadas a tipos de vehículos registradas en el sistema' }] });
        }
        /* Returning a response to the user. */
        /* Devolviendo una respuesta al usuario. */
        return res.status(200).send({
            response: [
                {
                    msg: "getCategoriesAsTypeVehicles",
                    categoriesAsTypeVehicles
                }
            ]
        });
    }
    catch (e) {
        console.log(e);
        /* Sending a status code 500 and a message to the user. */
        /* Envío de un código de estado 500 y un mensaje al usuario. */
        return res.status(500).send({ errores: { msg: 'Ha ocurrido un error, inténtelo más tarde.' } });
    }
});
exports.getCategoriesAndTypeVehiclesAssociated = getCategoriesAndTypeVehiclesAssociated;
/**
 * A query to the database that returns the vehicle types associated with the entered category
 * @param {Request} req - Request: It is the request that the user sends to the server.
 * @param {Response} res - Response: It is the response that will be sent to the user.
 * @returns A list of vehicle types associated with the entered category.
 */
/**
 * Una consulta a la base de datos que devuelve los tipos de vehículos asociados con la categoría ingresada
 * @param {Request} req - Solicitud: Es la solicitud que el usuario envía al servidor.
 * @param {Response} res - Respuesta: Es la respuesta que se enviará al usuario.
 * @returns Una lista de tipos de vehículos asociados con la categoría ingresada.
 */
const getVehiclesTypesAssociatedWithCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* Destructuring of the CategoryCatId property of the req.params object. */
        /* Desestructuración de la propiedad CategoryCatId del objeto req.params. */
        const { CategoryCatId } = req.params;
        /* A query to the database that returns the vehicle types associated with the entered category. */
        /* Una consulta a la base de datos que devuelve los tipos de vehículo asociados a la categoría ingresada. */
        const typeOfVehicles = yield connection_1.default.query(`
            SELECT "TypVeh_Name" FROM "Categories_TypeOfVehicles" ctv
            JOIN "Type_Of_Vehicles" TOV on ctv."TypeOfVehicleTypVehId" = TOV."TypVeh_Id"
            WHERE "CategoryCatId" = ${CategoryCatId}
        `, {
            type: sequelize_1.QueryTypes.SELECT
        });
        /* Checking if there are no vehicle types associated with the entered category. */
        /* Comprobando si no existen tipos de vehículos asociados a la categoría ingresada. */
        if (!typeOfVehicles) {
            return res.status(200).send({ errors: [{ msg: 'No hay tipos de vehículos asociados a la categoría ingresada' }] });
        }
        /* Returning a response to the user. */
        /* Devolviendo una respuesta al usuario. */
        return res.status(200).send({
            response: [
                {
                    msg: "getVehiclesTypesAssociatedWithCategory",
                    typeOfVehicles
                }
            ]
        });
    }
    catch (e) {
        console.log(e);
        /* Sending a status code 500 and a message to the user. */
        /* Envío de un código de estado 500 y un mensaje al usuario. */
        return res.status(500).send({ errores: { msg: 'Ha ocurrido un error, inténtelo más tarde.' } });
    }
});
exports.getVehiclesTypesAssociatedWithCategory = getVehiclesTypesAssociatedWithCategory;
/**
 * It returns the categories associated with the type of vehicle entered
 * @param {Request} req - Request: This is the request object that contains the information sent by the user.
 * @param {Response} res - Response: This is the response object that will be sent to the user.
 * @returns A list of categories associated with the type of vehicle entered.
 */
/** Devuelve las categorías asociadas al tipo de vehículo ingresado
 * @param {Request} req - Solicitud: Este es el objeto de solicitud que contiene la información enviada por el usuario.
 * @param {Response} res - Respuesta: Este es el objeto de respuesta que se enviará al usuario.
 * @returns Una lista de categorías asociadas con el tipo de vehículo ingresado.
 */
const getCategoriesAssociatedWithTypeVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* Destructuring of the TypeOfVehicleTypVehId property of the req.params object. */
        /* Desestructuración de la propiedad TypeOfVehicleTypVehId del objeto req.params. */
        const { TypeOfVehicleTypVehId } = req.params;
        /* A query to the database that returns the categories associated with the type of vehicle entered. */
        /* Una consulta a la base de datos que devuelve las categorías asociadas al tipo de vehículo ingresado. */
        const categories = yield connection_1.default.query(`
            SELECT "Cat_Name" FROM "Categories_TypeOfVehicles" ctv
            JOIN "Categories" C on ctv."CategoryCatId" = C."Cat_Id"
            WHERE "TypeOfVehicleTypVehId" = ${TypeOfVehicleTypVehId}
        `, {
            type: sequelize_1.QueryTypes.SELECT
        });
        /* Checking if there are no categories associated with the type of vehicle entered. */
        /* Comprobando si no existen categorías asociadas al tipo de vehículo ingresado. */
        if (!categories) {
            return res.status(200).send({ errors: [{ msg: 'No hay categorías asociadas al tipo de vehículo ingresado' }] });
        }
        /* Returning a response to the user. */
        /* Devolviendo una respuesta al usuario. */
        return res.status(200).send({
            response: [
                {
                    msg: "getCategoriesAssociatedWithTypeVehicle",
                    categories
                }
            ]
        });
    }
    catch (e) {
        console.log(e);
        /* Sending a status code 500 and a message to the user. */
        /* Envío de un código de estado 500 y un mensaje al usuario. */
        return res.status(500).send({ errores: { msg: 'Ha ocurrido un error, inténtelo más tarde.' } });
    }
});
exports.getCategoriesAssociatedWithTypeVehicle = getCategoriesAssociatedWithTypeVehicle;
const postCategoriesAndTypeVehiclesAssociated = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* Destructuring of the CategoryCatId and TypeOfVehicleTypVehId property of the req.body object. */
        /* Desestructuración de la propiedad CategoryCatId y TypeOfVehicleTypVehId del objeto req.body. */
        const { CategoryCatId, TypeOfVehicleTypVehId } = req.body;
        /* Validating that the category and type of vehicle identification are not empty. */
        /* Validando que la categoría y el tipo de identificación del vehículo no estén vacíos. */
        let resultsValidations = yield validateCategoriesAndTypeVehiclesAssociated(req, res);
        if (!resultsValidations) {
            return res.status(400).send({ errors: resultsValidations });
        }
        /* Searching for the type of vehicle with the id entered by the user. */
        /* Buscando el tipo de vehículo con el id ingresado por el usuario. */
        const typeOfVehicle = yield TypeOfVehicles_1.default.findByPk(TypeOfVehicleTypVehId);
        /* Searching for the category with the id entered by the user. */
        /* Buscando la categoría con el id ingresado por el usuario. */
        const category = yield Categories_1.default.findByPk(CategoryCatId);
        /* Checking if the category or type of vehicle entered does not exist. */
        /* Comprobando si la categoría o el tipo de vehículo introducido no existe. */
        if (!typeOfVehicle || !category) {
            return res.status(400).send({ errors: [{ msg: 'La categoría o el tipo de vehículo ingresado no existe' }] });
        }
        /* Checking if the vehicle category and type already exists in the database. */
        /* Comprobando si la categoría y tipo de vehículo ya existe en la base de datos. */
        const existCategoryAndTypeVehiclesAssociated = yield connection_1.default.query(`
             SELECT * FROM "Categories_TypeOfVehicles" ctv
             WHERE "CategoryCatId" = ${CategoryCatId} AND "TypeOfVehicleTypVehId" = ${TypeOfVehicleTypVehId}`, {
            type: sequelize_1.QueryTypes.SELECT
        });
        /* If it exists it sends a message indicating this to the user */
        /* Si existe envía un mensaje indicándole esto mismo al usuario */
        if (existCategoryAndTypeVehiclesAssociated.length > 0) {
            return res.status(400).send({ errors: [{ msg: 'La categoría y el tipo de vehículo ingresado ya están asociados' }] });
        }
        /* Creating a new instance of the Categories_TypeOfVehicle class. */
        /* Creando una nueva instancia de la clase Categories_TypeOfVehicle. */
        const categoryAndTypeVehiclesAssociated = new Categories_TypeOfVehicle_1.default(req.body);
        /* Saving the new instance of the Categories_TypeOfVehicle class in the database. */
        /* Guardando la nueva instancia de la clase Categories_TypeOfVehicle en la base de datos. */
        yield categoryAndTypeVehiclesAssociated.save();
        /* Returning a response to the user. */
        /* Devolviendo una respuesta al usuario. */
        return res.status(200).send({
            response: [
                {
                    msg: "postCategoriesAndTypeVehiclesAssociated",
                    CategoryCatId,
                    TypeOfVehicleTypVehId
                }
            ]
        });
    }
    catch (e) {
        console.log(e);
        /* Sending a status code 500 and a message to the user. */
        /* Envío de un código de estado 500 y un mensaje al usuario. */
        return res.status(500).send({ errores: { msg: 'Ha ocurrido un error, inténtelo más tarde.' } });
    }
});
exports.postCategoriesAndTypeVehiclesAssociated = postCategoriesAndTypeVehiclesAssociated;
/**
 * It validates that the category id and vehicle type id are not empty
 * @param {Request} req - Request: The request object.
 * @param {Response} _res - Response: It is the response object that will be sent to the client.
 * @returns It is being returned an array of errors.
 */
/**
 * Valida que el id de categoría y el id de tipo de vehículo no estén vacíos
 * @param {Request} req - Solicitud: El objeto de la solicitud.
 * @param {Response} _res - Respuesta: Es el objeto de respuesta que se enviará al cliente.
 * @returns Se está devolviendo una matriz de errores.
 */
const validateCategoriesAndTypeVehiclesAssociated = (req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    /* The category id and vehicle type id are not empty. */
    /* Se valida de el id de la categoría y del tipo de vehículo no estén vacíos. */
    yield (0, express_validator_1.check)('CategoryCatId', 'El id de la categoría es obligatorio').not().isEmpty().run(req);
    yield (0, express_validator_1.check)('TypeOfVehicleTypVehId', 'El id del tipo de vehículo es obligatorio').not().isEmpty().run(req);
    /* Validates the request body and returns a series of errors. */
    /* Valida el cuerpo de la solicitud y devuelve una serie de errores. */
    return (0, express_validator_1.validationResult)(req).array();
});
//# sourceMappingURL=categoriesTypeOfVehicleController.js.map