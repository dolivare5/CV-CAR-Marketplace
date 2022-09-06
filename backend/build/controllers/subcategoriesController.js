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
exports.postSubCategory = exports.putSubCategory = exports.getSubCategories = exports.getSubCategory = void 0;
/*
    El código siguiente está importando las funciones check y validationResult del paquete express-validator.
    The following code is importing the functions check and validationResult from the express-validator package.
*/
const express_validator_1 = require("express-validator");
/*
    Importación de QueryTypes desde el paquete Sequelize.
    QueryTypes import from the Sequelize package.
*/
const sequelize_1 = require("sequelize");
/*
    Importando el archivo connection.ts desde la carpeta db.
    Importing the connection.ts file from the db folder.
*/
const connection_1 = __importDefault(require("../db/connection"));
/*
    Importación del modelo Subcategorías desde la carpeta de modelos.
    Subcategories model import from the model folder.
*/
const Subcategories_1 = __importDefault(require("../models/Subcategories"));
//----------------------------------------------------------------------------------------------- //
/**
 * Encuentra todas las subcategorías que tienen un estado de 1 y las envía al cliente
 * @param {Request} _req - Solicitud: Esta es la solicitud que el cliente envía al servidor.
 * @param {Response} res - Respuesta: Esta es la respuesta que se enviará al cliente.
 * @returns una respuesta al cliente con las subcategorías registradas en el sistema.
 *
 * Finds all the subcategories that have a status of 1 and sends them to the client
 * @param {Request} _req - Request: This is the request that the client sends to the server.
 * @param {Response} res - Response: This is the response that will be sent to the client.
 * @returns a response to the client with the subcategories registered in the system.
 */
const getSubCategories = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /*
            Encontrar todas las subcategorías que tienen un estado de 1.
            Find all subcategories that have a status of 1.
        */
        const subCategories = yield Subcategories_1.default.findAll({
            attributes: ['SubCat_Name', 'SubCat_Description'],
            where: { SubCat_Status: 1 }
        });
        /*
            Comprobando si hay subcategorías en la base de datos. Si no hay ninguno, enviará un mensaje al usuario.
            Checking if there are subcategories in the database. If there are none, it will send a message to the user.
        */
        if (!subCategories) {
            res.status(200).send({ errors: [{ msg: 'No hay subcategorías registradas en el sistema' }] });
        }
        /*
            Envío de respuesta al cliente con las subcategorías registradas en el sistema.
            Sending a response to the client with the subcategories registered in the system.
         */
        return res.status(200).send({
            response: [
                {
                    msg: "getSubCategories",
                    subCategories
                }
            ]
        });
    }
    catch (e) {
        console.log(e);
        /* Envío de un código de estado 500 y un mensaje al usuario. */
        return res.status(500).send({ errores: { msg: 'Ha ocurrido un error, inténtelo más tarde.' } });
    }
});
exports.getSubCategories = getSubCategories;
//----------------------------------------------------------------------------------------------- //
/*
    Spanish: Método retorna los datos de una categoría en especifico.
    English: Method returns the data of a specific category.
 */
/**
 * Recibe una solicitud del cliente, busca una subcategoría por su clave principal, si la encuentra, envía una respuesta
 * con el nombre y descripción de la subcategoría, si no la encuentra, envía una respuesta con un mensaje que dice que la
 * subcategoría no existe
 * @param {Request} req - Solicitud: este parámetro es la solicitud que el cliente envía al servidor.
 * @param {Response} res - Respuesta: Esta es la respuesta que el servidor enviará al cliente.
 * @returns Se está devolviendo una subcategoría.
 *
 * It receives a request from the client, searches for a subcategory by its main key, if it finds it, it sends a response with the name and description of the subcategory.
 * with the name and description of the subcategory, if not found, it sends a response with a message saying that the subcategory does not exist.
 * subcategory does not exist
 * @param {Request} req - Request: this parameter is the request that the client sends to the server.
 * @param {Response} res - Response: This is the response that the server will send to the client.
 * @returns A subcategory is being returned.
 */
const getSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /*
            Desestructuración del SubCat_Id del objeto req.params.
            Destructuring of the SubCat_Id of the req.params object.
        */
        const { SubCat_Id } = req.params;
        /*
            Encontrar una subcategoría por su clave principal.
            Find a subcategory by its main key.
         */
        const subCategory = yield Subcategories_1.default.findByPk(SubCat_Id);
        /*
            Comprobando si la subcategoría no es nula, si no es nula, enviará una respuesta con un estado de 200 y un
            mensaje.
            
            Checking if the subcategory is not null, if it is not null, it will send a response with a status of 200 and a
            message.
        */
        if (!subCategory) {
            res.status(200).send({ errors: [{ msg: 'El código ingresado no corresponde a ninguna subcategoría  ' }] });
        }
        /*
            Destrucción del objeto SubCategory para extraer el nombre y la descripción de la subcategoría.
            Destruction of the SubCategory object to extract the name and description of the subcategory.
        */
        // @ts-ignore
        const { SubCat_Name, SubCat_Description } = subCategory;
        /* El código anterior es una respuesta del servidor al cliente con la información de la subcategoría
           solicitada.
           
           The above code is a response from the server to the client with the requested subcategory information.
           requested.
        */
        res.status(200).send({
            response: [
                {
                    msg: "getSubCategory",
                    subcategory: {
                        SubCat_Name,
                        SubCat_Description
                    }
                }
            ]
        });
    }
    catch (e) {
        console.log(e);
        /*
            Envío de un código de estado 500 y un mensaje al usuario.
            Sending a status code 500 and a message to the user.
        */
        return res.status(500).send({ errores: { msg: 'Ha ocurrido un error, inténtelo más tarde.' } });
    }
});
exports.getSubCategory = getSubCategory;
//----------------------------------------------------------------------------------------------- //
/**
     * La función valida los campos obligatorios de la tabla de subcategorías, verifica si la subcategoría ya existe en la base
     * de datos, crea un nuevo objeto o instancia en función de la subcategoría del modelo de subcategoría, guarda el objeto de
     * la subcategoría en la base de datos y, finalmente, si no hay ningún problema. , la información se devuelve a través de
     * un objeto o la información de instancia se devuelve a través de un objeto json
     * @param {Request} req - Solicitud: Este es el objeto de solicitud que contiene los datos enviados por el cliente.
     * @param {Response} res - Respuesta: el objeto de respuesta que se enviará al cliente.
     * @returns Una función que recibe dos parámetros, el primero es la solicitud y el segundo es la respuesta.
 
     * The function validates the required fields of the subcategory table, checks if the subcategory already exists in
     * the database, creates a new object or instance based on the subcategory from the subcategory template, saves the
     * subcategory object in the subcategory table, and database, creates a new object or instance based on the
     * subcategory in the subcategory template, stores the subcategory object in the database, and finally, if there is
     * no problem the subcategory in the database and finally, if there is no problem. The information is returned via
     * an object or instance information is returned via an object or instance information is returned via an object.
     * an object or the instance information is returned through a json object
     * @param {Request} req - Request: This is the request object that contains the data sent by the client.
     * @param {Response} res - Response: the response object to be sent to the client.
     * @returns A function that receives two parameters, the first is the request and the second is the response.
 */
const postSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
        Spanish: Se extraen los datos que vienen en el body a través del request.
        English: The data that comes in the body is extracted through the request.
    */
    const { body } = req;
    /*
        Se valida los campos obligatorios de la tabla de subcategorías, verificando si la
        subcategoría ya existe en la base de datos, creando un nuevo objeto o instancia basada en el modelo de
        Subcategorías, guardando el objeto de la subcategoría en la base de datos y, finalmente, si no hay problema, la
        información se devuelve a través de un objeto json.
        
        The validates the required fields of the subcategories table, verifying if the subcategory already exists in the
        database, creating a new object or instance based on the subcategory model subcategory, saving the subcategory
        object in the database, and finally, if there is no problem,the information is returned through an object or
        instance information is returned through a json object.
    */
    try {
        /*
            Validación de los campos obligatorios de la tabla subcategorías.
            Validation of the mandatory fields of the subcategories table.
        */
        let result = yield validateFieldsSubCategory(req, res);
        /*
            Comprobando si el resultado está vacío. Si no está vacío, enviará los errores al cliente.
            Checking if the result is empty. If it is not empty, it will send the errors to the client.
        */
        if (!result.isEmpty()) {
            res.status(200).send({ errores: result.array() });
        }
        /*
            Comprobando si la subcategoría ya existe en la base de datos.
            Checking if the subcategory already exists in the database.
        */
        const existSubCategory = yield Subcategories_1.default.findOne({
            where: {
                SubCat_Name: body.SubCat_Name
            }
        });
        /*
            Devuelve un código de estado 400 y un objeto json con una serie de errores en caso de que exista la
            subcategoría ingresada.
            
            Returns a status code 400 and a json object with a series of errors in case the entered subcategory exists.
            entered subcategory exists.
        */
        if (existSubCategory) {
            return res.status(400).json({
                errors: [
                    {
                        msg: "La SubCategoría ingresada ya se encuentra registrada"
                    }
                ]
            });
        }
        /*
            Creando una nuevo objeto o instancia en base al modelo de Subcategorías.
            Creating a new object or instance based on the Subcategories model.
        */
        // @ts-ignore
        const subCategory = new Subcategories_1.default(body);
        /*
            Guardando el objeto de subcategoría en la base de datos.
            Saving the subcategory object in the database.
        */
        yield subCategory.save();
        /*
            Finalmente, si no hay ningún problema se retorna la información a través de un objeto json.
            Finally, if there is no problem, the information is returned through a json object.
        */
        // @ts-ignore
        const { SubCat_Name, SubCat_Description } = subCategory;
        /*
            Envío de respuesta al cliente con los datos de la subcategoría registrada.
            Sending a response to the client with the data of the registered subcategory.
        */
        res.status(200).send({
            response: [
                {
                    msg: "SubCategoría registrada correctamente.",
                    subcategory: {
                        SubCat_Name,
                        SubCat_Description
                    }
                }
            ]
        });
    }
    catch (e) {
        console.log(e);
        /* Envío de un código de estado 500 y un mensaje al usuario. */
        return res.status(500).send({ errors: { msg: 'Ha ocurrido un error, inténtelo más tarde.' } });
    }
});
exports.postSubCategory = postSubCategory;
//----------------------------------------------------------------------------------------------- //
/**
     * Actualiza una subcategoría en la base de datos.
     * @param {Request} req - Solicitud: Es la solicitud que el cliente envía al servidor.
     * @param {Response} res - Respuesta: Es la respuesta que el servidor enviará al cliente.
     * @returns la información de la subcategoría registrada.
     *
     * Updates a subcategory in the database.
     * @param {Request} req - Request: It is the request that the client sends to the server.
     * @param {Response} res - Response: It is the response that the server will send to the client.
     * @returns the information of the registered subcategory.
 */
const putSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
        Actualiza una subcategoría en la base de datos.
        Updates a subcategory in the database.
    */
    try {
        /*
            Se extrae el id que se recibe en la request.
            The id received in the request is extracted.
        */
        const { SubCat_Id } = req.params;
        /*
            Encontrar la subcategoría por su clave principal.
            Find the subcategory by its primary key.
        */
        const subCategory = yield Subcategories_1.default.findByPk(SubCat_Id);
        /*
            Al verificar si la subcategoría no es nula, si no es nula, devolverá un mensaje de error.
            When checking if the subcategory is not null, if it is not null, it will return an error message.
         */
        if (!subCategory) {
            return res.json({ errors: [{ msg: 'El código ingresado no corresponde a ninguna subcategoría  ' }] });
        }
        /*
            Validación de los campos obligatorios de la tabla subcategorías.
            Validation of the mandatory fields of the subcategories table.
        */
        let result = yield validateFieldsSubCategory(req, res);
        /*
            Valida que los datos que se envían al servidor no presenten ningún error.
            Validates that the data sent to the server does not present any error.
        */
        if (!result.isEmpty()) {
            /*
                De haber un error, retorno un arreglo json con cada uno de las validaciones que no se cumplieron.
                If there is an error, return a json array with each of the validations that were not fulfilled.
            */
            return res.json({ errores: result.array() });
        }
        /*
            Si noy problemas con las validaciones anteriores, se procede a extraer cada uno de los datos que se
            modificaran en la base de datos.
            If there are no problems with the previous validations, we proceed to extract each of the data to be
            modified in the database to be modified in the database.
        */
        const { SubCat_Name, SubCat_Description, SubCat_Status } = req.body;
        /*
            Comprobando si existe una subcategoría con el mismo nombre que la que se está editando.
            Checking if there is a subcategory with the same name as the one being edited.
        */
        const existSubCategoryRepeated = yield connection_1.default.query(`SELECT * FROM "Subcategories" sc WHERE "SubCat_Id" != ${SubCat_Id} AND "SubCat_Name" = '${SubCat_Name}'`, { type: sequelize_1.QueryTypes.SELECT });
        /*
            Si existe por lo menos una categoría registrada no se permite actualizar el registro con
            dicho nombre. Caso contrario, se procede con el registro.
            
            If there is at least one registered category, it is not allowed to update the record with that name.
            name. Otherwise, proceed with the registration.
        */
        if (existSubCategoryRepeated.length > 0) {
            return res.status(200).send({ errors: [{ msg: 'Lo sentimos, la subcategoría ingresada ya se encuentra registrada' }] });
        }
        /*
            Se actualiza el objeto de subcategoría con los datos que se reciben en el body.
            The subcategory object is updated with the data received in the body.
        */
        subCategory.set({ SubCat_Name, SubCat_Description, SubCat_Status });
        /*
            Una vez actualizar el objeto que guarda la subcategoría ya modificada se procede con editar el
            registro en la db.
            Once the object that stores the modified subcategory has been updated, the next step is to edit the
            record in the db.
        */
        yield subCategory.save();
        /*
            Spanish: Finalmente retorno la información de la subcategoría registrada.
            English: Finally I return the information of the registered subcategory.
        */
        res.status(200).send({
            response: [
                {
                    msg: "postSubCategory",
                    subCategory
                }
            ]
        });
    }
    catch (e) {
        console.log(e);
        /* Envío de un código de estado 500 y un mensaje al usuario. */
        return res.status(500).send({ errores: { msg: 'Ha ocurrido un error, inténtelo más tarde.' } });
    }
});
exports.putSubCategory = putSubCategory;
//----------------------------------------------------------------------------------------------- //
/**
 * Valida que el campo de nombre no esté vacío
 * @param {Request} req - Solicitud: el objeto de la solicitud.
 * @param {Response} _res - Respuesta: Este es el objeto de respuesta que se devolverá al cliente.
 * @returns El resultado de la validación del cuerpo de la solicitud.
 *
 * Validates that the name field is not empty.
 * @param {Request} req - Request: the request object.
 * @param {Response} _res - Response: This is the response object to be returned to the client.
 * @returns The result of the validation of the request body.
 */
const validateFieldsSubCategory = (req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
        Spanish: Validaciones a través de express validators. Entre estas están que no se ingresen datos no validos.
        Para ello se valida que el campo nombre no este vacío.
        
        English: Validations through express validators. Among these are that no invalid data is entered.
        For this purpose, it is validated that the name field is not empty.
     */
    yield (0, express_validator_1.check)('SubCat_Name').notEmpty().withMessage("El nombre de la subcategoría es Obligatorio").run(req);
    /* Se retorna el resultado de la validación del cuerpo de la solicitud. */
    return (0, express_validator_1.validationResult)(req);
});
//# sourceMappingURL=subcategoriesController.js.map