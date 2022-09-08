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
exports.putCategory = exports.postCategory = exports.getCategory = exports.getCategories = void 0;
/* Here functions and methods necessary for the validation of each field that is received as a parameter are imported. */
/* Aquí se importan funciones y métodos necesarios para la validación de cada campo que se recibe como parámetro. */
const express_validator_1 = require("express-validator");
/* Importing the Categories model from the models folder. */
/* Importando el modelo de Categorías desde la carpeta de modelos. */
const Categories_1 = __importDefault(require("../models/Categories"));
/* Importing the QueryTypes from the sequelize package. */
/* Importación de QueryTypes desde el paquete Sequelize. */
const sequelize_1 = require("sequelize");
/* Importing the connection.ts file from the db folder. */
/* Importando el archivo connection.ts desde la carpeta db. */
const connection_1 = __importDefault(require("../db/connection"));
/**
 * It returns all the categories registered in the system
 * @param {Request} _req - Request, res: Response
 * @param {Response} res - Response: This is the response object that is used to send the response to the client.
 * @returns The information of all the categories.
 */
/**
 * Devuelve todas las categorías registradas en el sistema
 * @param {Request} _req - Solicitud, res: Respuesta
 * @param {Response} res - Respuesta: Este es el objeto de respuesta que se utiliza para enviar la respuesta al cliente.
 * @returns La información de todas las categorías.
 */
const getCategories = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /* The next code is performing a query to the database to extract the registered categories. */
    /* El código siguiente está realizando una consulta a la base de datos para extraer las categorías registradas. */
    try {
        /* A database query is performed to extract the registered categories. */
        /* Se realiza una consulta à la base de datos para extraer las categorías registradas.*/
        const categories = yield Categories_1.default.findAll({
            attributes: ['Cat_Name', 'Cat_Description'],
            where: { Cat_Status: 1 }
        });
        /*
            Checking if there is no categories in the database. If there is no categories, it will send a response with a
            status of 200 and a message saying that there is no categories in the system.
        */
        /*
            Comprobando si no hay categorías en la base de datos. Si no hay categorías, enviará una respuesta con un estado
            de 200 y un mensaje que dice que no hay categorías en el sistema.
        */
        if (!categories) {
            res.status(200).send({ errors: [{ msg: 'No hay categorías registradas en el sistema' }] });
        }
        /* Finally I return the information of all the categories. */
        /* Finalmente retorno la información de todas las categorías. */
        return res.status(200).send({
            response: [
                {
                    msg: "getCategories",
                    categories
                }
            ]
        });
    }
    catch (e) {
        console.log(e);
        /*
           English: EIf an error occurs when inserting the data, a response with the code 500 is returned, since it
           indicates that a certain request or request to the server could not be completed successfully.
       */
        /*
             Si llega a ocurrir un error al insertar los datos se retorna una respuesta con el código 500, ya
             que indica que una determinada petición o solicitud al servidor no se pudo completar con éxito.
         */
        return res.status(500).send({ errors: { msg: 'Ha ocurrido un error, inténtelo más tarde.' } });
    }
});
exports.getCategories = getCategories;
/**
 * It receives a request and a response, it extracts the id of the category that comes in the body of the request, it makes
 * a query to the database to extract the category that has the received id registered, and finally it returns the
 * information of the registered category
 * @param {Request} req - Request, res: Response
 * @param {Response} res - Response: It is the response that the server will send to the client.
 * @returns The information of the category that has the id that is received.
 */
/**
 * Recibe una solicitud y una respuesta, extrae el id de la categoría que viene en el cuerpo de la solicitud, hace una
 * consulta a la base de datos para extraer la categoría que tiene registrado el id recibido, y finalmente devuelve la
 * información del categoría registrada
 * @param {Request} req - Solicitud, res: Respuesta
 * @param {Response} res - Respuesta: Este es el objeto de respuesta que se utiliza para enviar la respuesta al cliente.
 * @returns La información de la categoría que tiene el id que se recibe.
 */
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /* The next code is a function that is responsible for extracting the information of a category that is registered in
    the database. */
    /* El código siguiente es una función que se encarga de extraer la información de una categoría que se encuentra
    registrada en la base de datos. */
    try {
        /* Se extraen los datos que vienen en el body a través del request.*/
        /* The data that comes in the body is extracted through the request.*/
        const { Cat_Id } = req.params;
        /* Se realiza una consulta à la base de datos para extraer la categoría que tenga registrada el id que se recibe. */
        /* English: A query is made to the database to extract the category that has the received id registered id that is received. */
        const category = yield Categories_1.default.findByPk(Cat_Id);
        /* Checking if the category exists. */
        /* Comprobando si la categoría existe. */
        if (!category) {
            res.status(200).send({ errors: [{ msg: 'El código ingresado no corresponde a ninguna categoría  ' }] });
        }
        /* Finalmente retorno la información de la categoría registrada*/
        /* Finally I return the information of the registered category.*/
        // @ts-ignore
        const { Cat_Name, Cat_Description } = category;
        res.status(200).send({
            response: [
                {
                    msg: "getCategory",
                    category: {
                        Cat_Name,
                        Cat_Description
                    }
                }
            ]
        });
    }
    catch (e) {
        console.log(e);
        /* El código anterior envía un código de estado 500 y un mensaje al usuario. */
        /* Sending a 500 status code and a message to the user. */
        return res.status(500).send({ errors: { msg: 'Ha ocurrido un error, inténtelo más tarde.' } });
    }
});
exports.getCategory = getCategory;
/**
 * It receives the data from the body of the request, validates the data, checks if the category already exists, creates a
 * new category object, saves the category object to the database, and returns a response with the data of the category
 * created
 * @param {Request} req - Request, res: Response
 * @param {Response} res - Response: It is the response that is returned to the client.
 * @returns a json object with the information of the category created.
 */
/**
 * Recibe los datos del cuerpo de la solicitud, valida los datos, verifica si la categoría ya existe, crea un nuevo objeto
 * de categoría, guarda el objeto de categoría en la base de datos y devuelve una respuesta con los datos de la categoría
 * creada
 * @param {Request} req - Solicitud, res: Respuesta
 * @param {Response} res - Respuesta: Es la respuesta que se devuelve al cliente.
 * @returns un objeto json con la información de la categoría creada.
 */
const postCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /* The data that comes in the body is extracted through the request. */
    /* Se extraen los datos que vienen en el body a través del request. */
    const { body } = req;
    try {
        /* Checks whether the result array in which all validations are stored is empty or not. */
        /* Verifica si el arreglo resultado en el cual se guardan todas las validaciones está vacío o no */
        const resultsValidations = yield validateFieldsCategory(req, res);
        /* The next code is validating the data that is being sent to the server. */
        /* El código siguiente está validando los datos que se envían al servidor. */
        if (resultsValidations.length > 0) {
            /* If there is an error I return a json array with each of the validations that were not met. */
            /* De haber un error retorno un arreglo json con cada uno de las validaciones que no se cumplieron. */
            res.status(200).send({ errors: resultsValidations });
        }
        /* It is checked if there is or is not a Category with the name that is received. */
        /* Se comprueba si existe o no una Categoría con el nombre que se recibe.*/
        const existCategory = yield Categories_1.default.findOne({
            where: {
                Cat_Name: body.Cat_Name
            }
        });
        /* If there is a category that is equal to the entered one, a message with that information is returned. */
        /* Si existe una categoría que sea igual a la ingresada se retorna un mensaje con dicha información.*/
        if (existCategory) {
            return res.status(400).json({
                errors: [
                    {
                        msg: "La Categoría ingresada ya se encuentra registrada"
                    }
                ]
            });
        }
        /*  If there is no category equal to the one entered, an object of type Categories is created. */
        /*  Si no existe una categoría que sea igual à la ingresada se crea un objeto de tipo Categories. */
        // @ts-ignore
        const category = new Categories_1.default(body);
        /* Once the object has been created, the information of the object is saved to the db. */
        /* Una vez se ha creado el objeto, se procede a guardar la información de dicho objeto à la db. */
        yield category.save();
        /* Finally, if there is no problem, the information is returned through a json object. */
        /* Finalmente, si no hay ningún problema, se retorna la información a través de un objeto json. */
        // @ts-ignore
        const { Cat_Name, Cat_Description } = category;
        res.status(200).send({
            response: [
                {
                    msg: "Categoría registrada correctamente.",
                    category: {
                        Cat_Name,
                        Cat_Description
                    }
                }
            ]
        });
    }
    catch (e) {
        console.log(e);
        /* El código anterior envía un código de estado 500 y un mensaje al usuario. */
        /* Sending a 500 status code and a message to the user. */
        return res.status(500).send({ errors: { msg: 'Ha ocurrido un error, inténtelo más tarde.' } });
    }
});
exports.postCategory = postCategory;
/**
 * It receives a request and a response, it validates the data received in the request, it updates the data in the database
 * and returns a response with the updated data
 * @param {Request} req - Request: It is the request that is received from the client.
 * @param {Response} res - Response: It is the response that the server will send to the client.
 * @returns the information of the category that was modified.
 */
/**
 * Recibe una solicitud y una respuesta, extrae el id de la solicitud, consulta la base de datos para verificar que existe
 * el id, valida los datos recibidos en la solicitud, verifica que el nuevo nombre que se usará para reemplazar la
 * categoría es no registrado en otras categorías, actualiza el objeto categoría con los datos recibidos en el cuerpo,
 * edita el registro en la BD y finalmente devuelve la información de la categoría registrada
 * @param {Request} req - Solicitud: Es la solicitud que se recibe del cliente.
 * @param {Response} res - Respuesta: Es la respuesta que el servidor enviará al cliente.
 * @returns la información de la categoría que fue modificada.
 */
const putCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* Destructuring the Cat_Id from the req.params object. */
        /* Desestructuración del Cat_Id del objeto req.params. */
        const { Cat_Id } = req.params;
        /* The database is queried to verify whether the received id exists. */
        /* Se consulta la base de datos para verificar si existe el id recibido. */
        const category = yield Categories_1.default.findByPk(Cat_Id);
        /* Checking if the category exists. */
        /* Comprobando si la categoría existe. */
        if (!category) {
            return res.json({ errors: [{ msg: 'El código ingresado no corresponde a ninguna categoría  ' }] });
        }
        /* Checks whether the result array in which all validations are stored is empty or not. */
        /* Verifica si el arreglo resultado en el cual se guardan todas las validaciones está vacío o no */
        const resultsValidations = yield validateFieldsCategory(req, res);
        if (resultsValidations.length > 0) {
            /* De haber un error, retorno un arreglo json con cada uno de las validaciones que no se cumplieron. */
            /* If there is an error I return a json array with each of the validations that were not met. */
            return res.json({ errors: resultsValidations });
        }
        /* If there are no problems, we proceed to extract each of the data to be modified in the database. */
        /* Si noy problemas, se procede a extraer cada uno de los datos que se modificaran en la base de datos. */
        const { Cat_Name, Cat_Description, Cat_Status } = req.body;
        /*
            Verify that the new name to be used to replace the category is not already registered in other
            categories registered in other categories. To do this, a query is made to find out if the name to be
            registered is found in any record other than the one to be different from the one to be modified if the
            name to be registered is found. If it is found, it is not registered.
         */
        /*
            Se verifica que el nuevo nombre por el que se va a remplazar la categoría no se encuentre
            registrado en otras categorías. Para ello se realiza una consulta donde se busca si en algún registro
            diferente al que se va a modificar se encuentra el nombre a registrar. Si se encuentra no se registra.
        */
        const existCategoryRepeated = yield connection_1.default.query(`SELECT * FROM "Categories" c WHERE "Cat_Id" != ${Cat_Id} AND "Cat_Name" = '${Cat_Name}'`, { type: sequelize_1.QueryTypes.SELECT });
        /* If there is no category registered under that name, the registration will proceed. */
        /* Si no existe una categoría registrada con ese nombre se procede con el registro. */
        if (existCategoryRepeated.length > 0) {
            return res.status(200).send({ errors: [{ msg: 'Lo sentimos, la categoría ingresada ya se encuentra registrada' }] });
        }
        /* If there are no problems, the category object is updated with the data received in the body. */
        /* Se actualiza el objeto de categoría con los datos que se reciben en el body. */
        category.set({ Cat_Name, Cat_Description, Cat_Status });
        /* Once the object that stores the modified category has been updated, we proceed to edit the registry in the db. */
        /* Una vez actualizado el objeto que guarda la categoría ya modificada se procede a editar el registro en la db. */
        yield category.save();
        /* Finally I return the information of the registered category. */
        /* Finalmente retorno la información de la categoría registrada. */
        res.status(200).send({
            response: [
                {
                    msg: "postCategory",
                    category
                }
            ]
        });
    }
    catch (e) {
        console.log(e);
        /* El código anterior envía un código de estado 500 y un mensaje al usuario. */
        /* Sending a 500 status code and a message to the user. */
        return res.status(500).send({ errors: { msg: 'Ha ocurrido un error, inténtelo más tarde.' } });
    }
});
exports.putCategory = putCategory;
/* Método que valida los campos obligatorios para la tabla de categorías. */
/* Method that validates the mandatory fields for the categories table. */
const validateFieldsCategory = (req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
        Validaciones a través de express validators. Entre estas están que no se ingresen datos no validos.
        Para ello se valida que el campo nombre no este vacío.
    */
    /*
        Validations through express validators. Among these are that no invalid data is entered.
        For this purpose, it is validated that the name field is not empty.
     */
    yield (0, express_validator_1.check)('Cat_Name').notEmpty().withMessage("El nombre de la categoría es Obligatorio").run(req);
    /* Se retorna el resultado de cada una de las validaciones realizadas. */
    /* The result of each of the validations performed is returned. */
    return (0, express_validator_1.validationResult)(req).array();
});
//# sourceMappingURL=categoriesController.js.map