/* The next code is importing the check and validationResult functions from the express-validator package. */
/* El código siguiente está importando las funciones check y validationResult del paquete express-validator. */
import { check, validationResult } from 'express-validator';
/* Importing the QueryTypes from the sequelize package. */
/* Importación de QueryTypes desde el paquete Sequelize. */
import { QueryTypes } from "sequelize";
/* Importing the connection.ts file from the db folder. */
/* Importando el archivo connection.ts desde la carpeta db. */
import db from "../db/connection";
/* Importing the Subcategories model from the models folder. */
/* Importación del modelo Subcategorías desde la carpeta de modelos. */
import Subcategories from "../models/Subcategories";
/**
 * Encuentra todas las subcategorías que tienen un estado de 1 y las envía al cliente
 * @param {Request} _req - Solicitud: Esta es la solicitud que el cliente envía al servidor.
 * @param {Response} res - Respuesta: Esta es la respuesta que se enviará al cliente.
 * @returns una respuesta al cliente con las subcategorías registradas en el sistema.
 */
/**
*  Finds all the subcategories that have a status of 1 and sends them to the client
* @param {Request} _req - Request: This is the request that the client sends to the server.
* @param {Response} res - Response: This is the response that will be sent to the client.
* @returns a response to the client with the subcategories registered in the system.
*/
const getSubCategories = async (_req, res) => {
    try {
        /* Finding all the subcategories that have a status of 1. */
        /* Encontrar todas las subcategorías que tienen un estado de 1. */
        const subCategories = await Subcategories.findAll({
            attributes: ['SubCat_Name', 'SubCat_Description'],
            where: { SubCat_Status: 1 }
        });
        /* Checking if there are any subcategories in the database. If there are none, it will send a message to the user. */
        /* Comprobando si hay subcategorías en la base de datos. Si no hay ninguno, enviará un mensaje al usuario. */
        if (!subCategories) {
            return res.status(400).send({ errors: [{ msg: 'No hay subcategorías registradas en el sistema' }] });
        }
        /* Sending a response to the client with the subcategories registered in the system.*/
        /* Envío de respuesta al cliente con las subcategorías registradas en el sistema. */
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
        /* Sending a 500 status code and a message to the user. */
        /* Envío de un código de estado 500 y un mensaje al usuario. */
        return res.status(500).send({ errors: { msg: 'Ha ocurrido un error, inténtelo más tarde.' } });
    }
};
/**
 * It receives a request from the client, searches for a subcategory by its main key, if it finds it, it sends a response with the name and description of the subcategory.
 * with the name and description of the subcategory, if not found, it sends a response with a message saying that the subcategory does not exist.
 * subcategory does not exist
 * @param {Request} req - Request: this parameter is the request that the client sends to the server.
 * @param {Response} res - Response: This is the response that the server will send to the client.
 * @returns A subcategory is being returned.
 */
/**
 * Recibe una solicitud del cliente, busca una subcategoría por su clave principal, si la encuentra, envía una respuesta
 * con el nombre y descripción de la subcategoría, si no la encuentra, envía una respuesta con un mensaje que dice que la
 * subcategoría no existe
 * @param {Request} req - Solicitud: este parámetro es la solicitud que el cliente envía al servidor.
 * @param {Response} res - Respuesta: Esta es la respuesta que el servidor enviará al cliente.
 * @returns Se está devolviendo una subcategoría.
 */
const getSubCategory = async (req, res) => {
    try {
        /* Destructuring of the SubCat_Id of the req.params object. */
        /* Desestructuración del SubCat_Id del objeto req.params. */
        const { SubCat_Id } = req.params;
        /* Finding a subcategory by its primary key. */
        /* Encontrar una subcategoría por su clave principal. */
        const subCategory = await Subcategories.findByPk(SubCat_Id);
        /* Checking if the subCategory is empty or not. If it is empty, it will send a response with a status of 400 and an
        error message. */
        /* Comprobando si la subcategoría está vacía o no. Si está vacío, enviará una respuesta con un estado de 400 y un
        mensaje de error. */
        if (!subCategory) {
            return res.status(400).send({ errors: [{ msg: 'El código ingresado no corresponde a ninguna subcategoría  ' }] });
        }
        /* Destructuring of the SubCategory object to extract the name and description of the subcategory. */
        /* Desestructuración del objeto SubCategory para extraer el nombre y la descripción de la subcategoría. */
        // @ts-ignore
        const { SubCat_Name, SubCat_Description } = subCategory;
        /* The above code is a response from the server to the client with the requested subcategory information requested. */
        /* El código anterior es una respuesta del servidor al cliente con la información de la subcategoría solicitada. */
        return res.status(200).send({
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
        return res.status(500).send({ errors: { msg: 'Ha ocurrido un error, inténtelo más tarde.' } });
    }
};
/**
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
/**
 * La función valida los campos obligatorios de la tabla de subcategorías, verifica si la subcategoría ya existe en la base
 * de datos, crea un nuevo objeto o instancia en función de la subcategoría del modelo de subcategoría, guarda el objeto de
 * la subcategoría en la base de datos y, finalmente, si no hay ningún problema. , la información se devuelve a través de
 * un objeto o la información de instancia se devuelve a través de un objeto json
 * @param {Request} req - Solicitud: Este es el objeto de solicitud que contiene los datos enviados por el cliente.
 * @param {Response} res - Respuesta: el objeto de respuesta que se enviará al cliente.
 * @returns Una función que recibe dos parámetros, el primero es la solicitud y el segundo es la respuesta.
 */
const postSubCategory = async (req, res) => {
    /* The data that comes in the body is extracted through the request. */
    /* Se extraen los datos que vienen en el body a través del request. */
    const { body } = req;
    /* The next code is validating the mandatory fields of the subcategories table, checking if the subcategory already
    exists in the database, creating a new object or instance based on the Subcategories model, saving the subcategory
    object in the database, and finally, if there is no problem, the information is returned through a json object. */
    /* El código siguiente está validando los campos obligatorios de la tabla de subcategorías, verificando si la
    subcategoría ya existe en la base de datos, creando un nuevo objeto o instancia basada en el modelo de
    Subcategorías, guardando el objeto de la subcategoría en la base de datos y, finalmente, si no hay problema, la
    información se devuelve a través de un objeto json. */
    try {
        /* Validating the fields of the subcategory. */
        /* Validación de los campos de la subcategoría. */
        const resultsValidations = await validateFieldsSubCategory(req, res);
        /* Checking if the result is empty. If it is not empty, it will send the errors to the client. */
        /* Comprobando si el resultado está vacío. Si no está vacío, enviará los errores al cliente. */
        if (resultsValidations.length > 0) {
            return res.status(400).send({ errors: resultsValidations });
        }
        /* Checking if the subcategory already exists in the database. */
        /* Comprobando si la subcategoría ya existe en la base de datos. */
        const existSubCategory = await Subcategories.findOne({
            where: {
                SubCat_Name: body.SubCat_Name
            }
        });
        /* The next code is checking if the subcategory already exists in the database. */
        /* El código siguiente verifica si la subcategoría ya existe en la base de datos. */
        if (existSubCategory) {
            return res.status(400).send({
                errors: [
                    {
                        msg: "La SubCategoría ingresada ya se encuentra registrada"
                    }
                ]
            });
        }
        /* Creating a new instance of the Subcategories class. */
        /* Creando una nueva instancia de la clase Subcategorías. */
        const subCategory = new Subcategories(body);
        /* Saving the subcategory in the database. */
        /* Guardando la subcategoría en la base de datos. */
        await subCategory.save();
        /* Finally, if there is no problem, the information is returned through a json object.*/
        /* Finalmente, si no hay ningún problema se retorna la información a través de un objeto json.*/
        // @ts-ignore
        const { SubCat_Name, SubCat_Description } = subCategory;
        /* Sending a response to the client with the data of the registered subcategory. */
        /* Envío de respuesta al cliente con los datos de la subcategoría registrada. */
        return res.status(200).send({
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
};
/**
     * Updates a subcategory in the database.
     * @param {Request} req - Request: It is the request that the client sends to the server.
     * @param {Response} res - Response: It is the response that the server will send to the client.
     * @returns the information of the registered subcategory.
 */
/**
     * Actualiza una subcategoría en la base de datos.
     * @param {Request} req - Solicitud: Es la solicitud que el cliente envía al servidor.
     * @param {Response} res - Respuesta: Es la respuesta que el servidor enviará al cliente.
     * @returns la información de la subcategoría registrada.
 */
const putSubCategory = async (req, res) => {
    /* The next code is updating a subcategory in the database. */
    /* El código siguiente está actualizando una subcategoría en la base de datos. */
    try {
        /* The id received in the request is extracted. */
        /* Se extrae el id que se recibe en la request. */
        const { SubCat_Id } = req.params;
        /* Validating the fields of the subcategory. */
        /* Validación de los campos de la subcategoría. */
        const resultsValidations = await validateFieldsSubCategory(req, res);
        /* Validating the data that is being sent to the server. */
        /* Validación de los datos que se envían al servidor. */
        if (resultsValidations.length > 0) {
            /* If there is an error, return a json array with each of the validations that were not fulfilled. */
            /* De haber un error, retorno un arreglo json con cada uno de las validaciones que no se cumplieron. */
            return res.send({ errors: resultsValidations });
        }
        /* Find a subcategory by its main key in the database. */
        /* Encontrar una subcategoría por su clave principal en la base de datos. */
        const subCategory = await Subcategories.findByPk(SubCat_Id);
        /* Checking if the subCategory is not null, if it is not null, it will return an error message. */
        /* Al verificar si la subcategoría no es nula, si no es nula, devolverá un mensaje de error. */
        if (!subCategory) {
            return res.status(400).send({ errors: [{ msg: 'El código ingresado no corresponde a ninguna subcategoría  ' }] });
        }
        /* If there are no problems with the previous validations, we proceed to extract each of the data to be
        modified in the database to be modified in the database.*/
        /* Si noy problemas con las validaciones anteriores, se procede a extraer cada uno de los datos que se
        modificaran en la base de datos. */
        const { SubCat_Name, SubCat_Description, SubCat_Status } = req.body;
        /* Checking if there is a subcategory with the same name as the one being edited. */
        /* Comprobando si existe una subcategoría con el mismo nombre que la que se está editando. */
        const existSubCategoryRepeated = await db.query(`SELECT * FROM "Subcategories" sc WHERE "SubCat_Id" != ${SubCat_Id} AND "SubCat_Name" = '${SubCat_Name}'`, { type: QueryTypes.SELECT });
        /* The next code is checking if the subcategory already exists in the database. */
        /* El código siguiente verifica si la subcategoría ya existe en la base de datos. */
        if (existSubCategoryRepeated.length > 0) {
            return res.status(400).send({ errors: [{ msg: 'Lo sentimos, la subcategoría ingresada ya se encuentra registrada' }] });
        }
        /* Setting the values of the subCategory object. */
        /* Establece los valores del objeto de subcategoría. */
        subCategory.set({ SubCat_Name, SubCat_Description, SubCat_Status });
        /* Saving the subcategory in the database. */
        /* Guardando la subcategoría en la base de datos. */
        await subCategory.save();
        /* Finally, if there is no problem, the information is returned through a json object.*/
        /* Finalmente, si no hay ningún problema se retorna la información a través de un objeto json.*/
        return res.status(200).send({
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
        return res.status(500).send({ errors: { msg: 'Ha ocurrido un error, inténtelo más tarde.' } });
    }
};
/**
 * Validates that the name field is not empty.
 * @param {Request} req - Request: the request object.
 * @param {Response} _res - Response: This is the response object to be returned to the client.
 * @returns The result of the validation of the request body.
 */
/**
     * Valida que el campo de nombre no esté vacío
     * @param {Request} req - Solicitud: el objeto de la solicitud.
     * @param {Response} _res - Respuesta: Este es el objeto de respuesta que se devolverá al cliente.
     * @returns El resultado de la validación del cuerpo de la solicitud.
*/
const validateFieldsSubCategory = async (req, _res) => {
    /* Checking if the field is empty or not. */
    /* Comprobando si el campo está vacío o no. */
    await check('SubCat_Name')
        .notEmpty().withMessage("Subcategoría no valido.")
        .isString().withMessage("La Subcategoría debe ser un texto válido.")
        .isLength({ min: 3, max: 15 }).withMessage("La Subcategoría debe tener entre 3 y 25 caracteres.")
        .run(req);
    /* Se retorna el resultado de la validación del cuerpo de la solicitud. */
    /* The result of the validation of the request body is returned. */
    return validationResult(req).array();
};
/* Exporting the functions getSubCategory, getSubCategories, putSubCategory, and postSubCategory. */
/* Exportando las funciones getSubCategory, getSubCategories, putSubCategory y postSubCategory. */
export { getSubCategory, getSubCategories, putSubCategory, postSubCategory };
//# sourceMappingURL=subcategoriesController.js.map