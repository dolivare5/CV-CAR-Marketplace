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
/*
    Spanish: Aquí se importan funciones y métodos necesarios para la validación de cada campo que se recibe como parámetro.
    English: Functions and methods necessary for the validation of each field received as a parameter are imported here.
 */
const express_validator_1 = require("express-validator");
const Category_1 = __importDefault(require("../models/Category"));
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
//----------------------------------------------------------------------------------------------- //
/*
    Spanish: Método retorna los datos de una categoría en especifico.
    English: Method returns the data of a specific category.
 */
const getCategories = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /*
            Spanish: Se realiza una consulta à la base de datos para extraer las categorías registradas.
            English: A database query is performed to extract the registered categories.
        */
        const categories = yield Category_1.default.findAll({
            attributes: ['Cat_Name', 'Cat_Description'],
            where: { Cat_Status: 1 }
        });
        if (!categories) {
            res.status(200).send({ errores: [{ msg: 'No hay categorías registradas en el sistema' }] });
        }
        /*
            Spanish: Finalmente retorno la información de todas las categorías.
            English: Finally I return the information of all the categories.
        */
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
           Spanish: Si llega a ocurrir un error al insertar los datos se retorna una respuesta con el código 500, ya
           que indica que una determinada petición o solicitud al servidor no se pudo completar con éxito.
           
           English: EIf an error occurs when inserting the data, a response with the code 500 is returned, since it
           indicates that a certain request or request to the server could not be completed successfully.
       */
        return res.status(500).send({ errores: { msg: 'Ha ocurrido un error, inténtelo más tarde.' } });
    }
});
exports.getCategories = getCategories;
//----------------------------------------------------------------------------------------------- //
/*
    Spanish: Método retorna los datos de una categoría en especifico.
    English: Method returns the data of a specific category.
 */
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /*
            Spanish: Se extraen los datos que vienen en el body a través del request.
        
            English: The data that comes in the body is extracted through the request.
        */
        const { Cat_Id } = req.params;
        /*
            Spanish: Se realiza una consulta à la base de datos para extraer la categoría que tenga registrada el
            id que se recibe.
            English: A query is made to the database to extract the category that has the received id registered.
            id that is received.
        */
        const category = yield Category_1.default.findByPk(Cat_Id);
        if (!category) {
            res.status(200).send({ errores: [{ msg: 'El código ingresado no corresponde a ninguna categoría  ' }] });
        }
        /*
            Spanish: Finalmente retorno la información de la categoría registrada.
            English: Finally I return the information of the registered category.
        */
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
        /*
           Spanish: Si llega a ocurrir un error al insertar los datos se retorna una respuesta con el código 500, ya
           que indica que una determinada petición o solicitud al servidor no se pudo completar con éxito.
           
           English: EIf an error occurs when inserting the data, a response with the code 500 is returned, since it
           indicates that a certain request or request to the server could not be completed successfully.
       */
        return res.status(500).send({ errores: { msg: 'Ha ocurrido un error, inténtelo más tarde.' } });
    }
});
exports.getCategory = getCategory;
//----------------------------------------------------------------------------------------------- //
/*
    Spanish: Método que registra Categorías.
    English: Method of recording Categories.
 */
const postCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        let resultado = yield validateFieldsCategory(req, res);
        if (!resultado.isEmpty()) {
            /*
                Spanish: De haber un error retorno un arreglo json con cada uno de las validaciones que no se cumplieron.
                English: If there is an error I return a json array with each of the validations that were not fulfilled.
            */
            res.status(200).send({ errores: resultado.array() });
        }
        /*
            Spanish: Se comprueba si existe o no una Categoría con el nombre que se recibe.
            English: It is checked whether a Categories exists with the name received.
        */
        const existCategory = yield Category_1.default.findOne({
            where: {
                Cat_Name: body.Cat_Name
            }
        });
        /*
            Spanish: Si existe una categoría que sea igual a la ingresada se retorna un mensaje con dicha información.
            English: If there is a category equal to the one entered, a message is returned with this information.
        */
        if (existCategory) {
            return res.status(400).json({
                errores: [
                    {
                        msg: "La Categoría ingresada ya se encuentra registrada"
                    }
                ]
            });
        }
        /*
            Spanish: Si no existe una categoría que sea igual à la ingresada se procede a crear un objeto de tipo
            Categories con la información que se recibe.
            English: If there is no category equal to the one entered, we proceed to create an object of type
            Categories object with the information received.
        */
        // @ts-ignore
        const category = new Category_1.default(body);
        /*
            Spanish: Una vez se ha creado el objeto, se procede a guardar la información de dicho objeto à la db.
        
            English: Once the object has been created, the information of the object is saved to the db.
        */
        yield category.save();
        /*
            Spanish: Finalmente, si no hay ningún problema se retorna la información a través de un objeto json.
            English:  Finally, if there is no problem, the information is returned through a json object.
        */
        // @ts-ignore
        const { Cat_Name, Cat_Description } = category;
        res.status(200).send({
            errores: [
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
        /*
           Spanish: Si llega a ocurrir un error al insertar los datos se retorna una respuesta con el código 500, ya
           que indica que una determinada petición o solicitud al servidor no se pudo completar con éxito.
           
           English: EIf an error occurs when inserting the data, a response with the code 500 is returned, since it
           indicates that a certain request or request to the server could not be completed successfully.
       */
        return res.status(500).send({ errores: { msg: 'Ha ocurrido un error, inténtelo más tarde.' } });
    }
});
exports.postCategory = postCategory;
//----------------------------------------------------------------------------------------------- //
/*
    Spanish: Método que permite actualizar los datos relacionados a las categorías.
    English: Method that allows updating the data related to the categories.
 */
const putCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /*
            Spanish: Se extrae el id que se recibe en la request.
            English: The id received in the request is extracted.
        */
        const { Cat_Id } = req.params;
        /*
            Spanish: Se consulta en la base de datos para verificar si existe o no el id que se recibe.
            English: The database is queried to verify whether the received id exists.
        */
        const category = yield Category_1.default.findByPk(Cat_Id);
        if (!category) {
            return res.json({ errores: [{ msg: 'El código ingresado no corresponde a ninguna categoría  ' }] });
        }
        /*
            Spanish: Verifica si el arreglo resultado en el cual se guardan todas las validaciones está vacío o no
            English: Checks whether the result array in which all validations are stored is empty or not.
        */
        let resultado = yield validateFieldsCategory(req, res);
        if (!resultado.isEmpty()) {
            /*
                Spanish: De haber un error, retorno un arreglo json con cada uno de las validaciones que no se cumplieron.
                English: If there is an error, return a json array with each of the validations that were not fulfilled.
            */
            return res.json({ errores: resultado.array() });
        }
        /*
            Spanish: Si noy problemas con las validaciones anteriores, se procede a extraer cada uno de los datos que se
            modificaran en la base de datos.
            English: If there are no problems with the previous validations, we proceed to extract each of the data to be modified in the database.
            to be modified in the database.
        */
        const { Cat_Name, Cat_Description, Cat_Status } = req.body;
        /*
            Spanish: Se verifica que el nuevo nombre por el que se va a remplazar la categoría no se encuentre
            registrado en otras categorías. Para ello se realiza una consulta donde se busca si en algún registro
            diferente al que se va a modificar se encuentra el nombre a registrar. Si se encuentra no se registra.
            
            English: Verify that the new name to be used to replace the category is not already registered in other
            categories registered in other categories. To do this, a query is made to find out if the name to be
            registered is found in any record other than the one to be different from the one to be modified if the
            name to be registered is found. If it is found, it is not registered.
        */
        const existCategoryRepeated = yield connection_1.default.query(`SELECT * FROM "Categories" c WHERE "Cat_Id" != ${Cat_Id} AND "Cat_Name" = '${Cat_Name}'`, { type: sequelize_1.QueryTypes.SELECT });
        /*
            Spanish: Si existe por lo menos una categoría registrada no se permite actualizar el registro con
            dicho nombre. Caso contrario, se procede con el registro.
            
            English: If there is at least one registered category, it is not allowed to update the record with that name.
            name. Otherwise, proceed with the registration.
        */
        if (existCategoryRepeated.length > 0) {
            return res.status(200).send({ errores: [{ msg: 'Lo sentimos, la categoría ingresada ya se encuentra registrada' }] });
        }
        /*
            Spanish: Se actualiza el objeto de categoría con los datos que se reciben en el body.
            English: The category object is updated with the data received in the body.
        */
        category.set({ Cat_Name, Cat_Description, Cat_Status });
        /*
            Spanish: Una vez actualizar el objeto que guarda la categoría ya modificada se procede con editar el
            registro en la db.
            English: Once the object that stores the modified category has been updated, the next step is to edit the
            record in the db.
        */
        yield category.save();
        /*
            Spanish: Finalmente retorno la información de la categoría registrada.
            English: Finally I return the information of the registered category.
        */
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
        /*
           Spanish: Si llega a ocurrir un error al insertar los datos se retorna una respuesta con el código 500, ya
           que indica que una determinada petición o solicitud al servidor no se pudo completar con éxito.
           
           English: EIf an error occurs when inserting the data, a response with the code 500 is returned, since it
           indicates that a certain request or request to the server could not be completed successfully.
       */
        return res.status(500).send({ errores: { msg: 'Ha ocurrido un error, inténtelo más tarde.' } });
    }
});
exports.putCategory = putCategory;
//----------------------------------------------------------------------------------------------- //
/*
    Spanish: Método que valida los campos obligatorios para la tabla de categorías.
    English: Method that validates the required fields for the category table.
 */
const validateFieldsCategory = (req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
        Spanish: Validaciones a través de express validators. Entre estas están que no se ingresen datos no validos.
        Para ello se valida que el campo nombre no este vacío.
        
        English: Validations through express validators. Among these are that no invalid data is entered.
        For this purpose, it is validated that the name field is not empty.
     */
    yield (0, express_validator_1.check)('Cat_Name').notEmpty().withMessage("El nombre de la categoría es Obligatorio").run(req);
    /*
        Spanish: Se guarda en una variable de tipo arreglo con el resultado de cada una de las validaciones
        de los campos y se retorna dicho arreglo.
        
        English: It is stored in an array variable with the result of each field validation and the array is returned.
        of the fields and the array is returned.
     */
    return (0, express_validator_1.validationResult)(req);
});
//# sourceMappingURL=categoryController.js.map