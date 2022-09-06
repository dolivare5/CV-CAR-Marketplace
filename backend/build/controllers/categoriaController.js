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
const getCategories = (_req, res) => {
    res.json({ msg: "GetCategories " });
};
exports.getCategories = getCategories;
const getCategory = (req, res) => {
    const { Cat_Id } = req.params;
    res.json({
        msg: "getCategory",
        Cat_Id
    });
};
exports.getCategory = getCategory;
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
            return res.json({ errores: resultado.array() });
        }
        /*
            Spanish: Se comprueba si existe o no una Categoría con el nombre que se recibe.
            English: It is checked whether or not a Categories exists with the name received.
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
            Spanish: Si no existe una categoría que sea igual a la ingresada se procede a crear un objeto de tipo
            Categories con la información que se recibe.
            English: If there is no category equal to the one entered, we proceed to create an object of type
            Categories object with the information received.
        */
        // @ts-ignore
        const category = new Category_1.default(body);
        /*
            Spanish: Una vez se ha creado el objeto, se procede a guardar la información de dicho objeto a la db.
        
            English: Once the object has been created, the information of the object is saved to the db.
        */
        yield category.save();
        /*
            Spanish: Finalmente, si no hay ningún problema se retorna la información a través de un objeto json.
            English:  Finally, if there is no problem, the information is returned through a json object.
        */
        return res.json({
            errores: [
                {
                    msg: "Categoría registrada correctamente.",
                    category
                }
            ]
        });
    }
    catch (e) {
        console.log(e);
        /*
            Spanish: Si llega a ocurrir un error al insertar los datos se retorna una respuesta con el código 500, ya
            que este es un código de estado HTTP que indica que una determinada petición o solicitud al servidor no se
            pudo completar con éxito. Aunque muchas veces se asocia, de forma errónea, este error a un fallo del
            servidor, lo cierto es que no es así.
            English: If an error occurs when inserting the data, a response with the code 500 is returned, since this
            is an HTTP status code that indicates that a certain request or request to the server has failed is an HTTP
            status code that indicates that a certain request or request to the server could not be successfully
            completed request to the server could not be completed successfully. Although this error is often mistakenly
            associated with a server failure, it is not server failure, the truth is that this is not the case.
        */
        res.status(500).json({ msg: 'Ha ocurrido un error, inténtelo más tarde.' });
    }
});
exports.postCategory = postCategory;
const putCategory = (req, res) => {
    const { catId } = req.params;
    const { body } = req;
    res.json({
        msg: "postCategory",
        body,
        catId
    });
};
exports.putCategory = putCategory;
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
//# sourceMappingURL=categoriaController.js.map