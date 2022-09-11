/* Importing the `check` and `validationResult` functions from the `express-validator` module. */
/* Importación de las funciones `check` y `validationResult` desde el módulo `express-validator`. */
import { check, validationResult } from 'express-validator';
/* Importing the `QueryTypes` object from the `sequelize` module. */
/* Importando el objeto `QueryTypes` desde el módulo `sequelize`. */
import { QueryTypes } from "sequelize";
/* Importing the `db` object from the `../db/connection` file. */
/* Importación del objeto `db` desde el archivo `../db/connection`. */
import db from '../db/connection';
/* Importing the AutomobilesBrands class from the models folder. */
/* Importación de la clase MarcasAutomóviles desde la carpeta de modelos. */
import AutomobilesBrands from "../models/AutomobilesBrands";
/**
 * This is a function used to get all the records of the `AutomobilesBrands` table.
 * @param {Request} _req - Request: This parameter is used to get the request made by the client.
 * @param {Response} res - Response: This is the response object used to send the response to the client.
 * @returns The `automobilesBrands` variable is returned.
 */
/**
 * Es una función que se utiliza para obtener todos los registros de la tabla `AutomobilesBrands`
 * @param {Request} _req - Solicitud: Este parámetro se utiliza para obtener la solicitud realizada por el cliente.
 * @param {Response} res - Respuesta: Este es el objeto de respuesta que se utiliza para enviar la respuesta al cliente.
 * @returns Se devuelve la variable `automobilesBrands`.
 */
const getAutomobilesBrands = async (_req, res) => {
    /* The `findAll` method is used to obtain all the records from the `AutomobilesBrands` table. */
    /* Se utiliza el método `findAll` para obtener todos los registros de la tabla `AutomobilesBrands`. */
    const automobilesBrands = await AutomobilesBrands.findAll();
    /* The `automobilesBrands` variable is returned. */
    /* Se retorna la variable `automobilesBrands`. */
    return res.json({
        msg: 'getAutomobilesBrands',
        automobilesBrands
    });
};
/**
 * It's a function that receives a request and a response, and returns a json with a message and the automobile brand that
 * was found by its id
 * @param {Request} req - Request - This is the request object that contains the data sent from the client.
 * @param {Response} res - Response - This is the response object that we will use to send back a response to the client.
 * @returns The function getAutomobilesBrandsById is being returned.
 */
/**
 * Es una función que recibe una solicitud y una respuesta, y devuelve un json con un mensaje y la marca de automóvil que
 * se encontró por su id.
 * @param {Request} req - Solicitud: este es el objeto de solicitud que contiene los datos enviados por el cliente.
 * @param {Response} res - Respuesta: este es el objeto de respuesta que usaremos para enviar una respuesta al cliente.
 * @returns Se devuelve la función getAutomobilesBrandsById.
 */
const getAutomobilesBrandsById = async (req, res) => {
    const { AutBrand_Id } = req.params;
    const automobilesBrands = await AutomobilesBrands.findByPk(AutBrand_Id);
    return res.json({
        msg: 'getAutomobilesBrandsById',
        automobilesBrands
    });
};
/**
 * It's creating a new record in the `AutomobilesBrands` table
 * @param {Request} req - Request: It's the request that the client sends to the server.
 * @param {Response} res - Response: It's the response object that the server sends to the client.
 * @returns It's returning a function that creates a new record in the `AutomobilesBrands` table.
 */
/**
 * Está creando un nuevo registro en la tabla `AutomobilesBrands`
 * @param {Request} req - Solicitud: Es la solicitud que el cliente envía al servidor.
 * @param {Response} res - Respuesta: Es el objeto de respuesta que el servidor envía al cliente.
 * @returns Está devolviendo una función que crea un nuevo registro en la tabla `AutomobilesBrands`.
 */
const postAutomobilesBrands = async (req, res) => {
    /* The data sent by the client is obtained. */
    /* Se extraen los datos del cuerpo de la solicitud. */
    const { body } = req;
    try {
        /* It's a validation that checks if the `AutBrand_Name` field is empty, and if it is, it returns a message. */
        /* Es una validación que comprueba si el campo `AutBrand_Name` está vacío y, si lo está, devuelve un mensaje. */
        const resultsValidations = await validationsAutomobilesBrands(req, res);
        if (resultsValidations.length > 0) {
            /* It's sending a 400 status code and a message to the user. */
            /* Está enviando un código de estado 400 y un mensaje al usuario. */
            return res.status(400).send({ errors: resultsValidations });
        }
        /* It's looking for a record in the `AutomobilesBrands` table that has the same `AutBrand_Name` as the one that
        the user is trying to create. */
        /* Se busca un registro en la tabla `AutomobilesBrands` que tenga el mismo `AutBrand_Name` que el que el usuario
        está tratando de crear. */
        const existAutomobilesBrands = await AutomobilesBrands.findOne({
            where: {
                AutBrand_Name: body.AutBrand_Name
            }
        });
        /* If the `existAutomobilesBrands` variable is not null, it means that there is a record in the database with the
        same `AutBrand_Name` as the one that the user is trying to create, so it returns a message. */
        /* Si la variable `existAutomobilesBrands` no es nula, significa que hay un registro en la base de datos con el
        mismo `AutBrand_Name` que el que el usuario está tratando de crear, por lo que devuelve un mensaje. */
        if (existAutomobilesBrands) {
            return res.status(400).send({
                errors: [
                    {
                        msg: 'La marca de automóvil ingresada ya existe.'
                    }
                ]
            });
        }
        /* It's creating a new record in the `AutomobilesBrands` table. */
        /* Está creando un nuevo registro en la tabla `AutomobilesBrands`. */
        const automobilesBrands = await AutomobilesBrands.create(body);
        await automobilesBrands.save();
        /* It's sending a 200 status code and a message to the user. */
        /* Está enviando un código de estado 200 y un mensaje al usuario. */
        // @ts-ignore
        const { AutBrand_Name, AutBrand_Description, AutBrand_Logo } = automobilesBrands;
        return res.status(200).send({
            response: {
                msg: 'La marca de automóvil se ha creado correctamente.',
                automobilesBrands: {
                    AutBrand_Name,
                    AutBrand_Description,
                    AutBrand_Logo
                }
            }
        });
    }
    catch (e) {
        console.log(e);
        /* El código anterior envía un código de estado 500 y un mensaje al usuario. */
        /* Sending a 500 status code and a message to the user. */
        return res.status(500).send({ errors: { msg: 'Ha ocurrido un error, inténtelo más tarde.' } });
    }
};
const putAutomobilesBrands = async (req, res) => {
    /* The data sent by the client is obtained. */
    /* Se extraen los datos del cuerpo de la solicitud. */
    const { body } = req;
    const { AutBrand_Id } = req.params;
    try {
        /* It's a validation that checks if the `AutBrand_Name` field is empty, and if it is, it returns a message. */
        /* Es una validación que comprueba si el campo `AutBrand_Name` está vacío y, si lo está, devuelve un mensaje. */
        const resultsValidations = await validationsAutomobilesBrands(req, res);
        if (resultsValidations.length > 0) {
            /* It's sending a 400 status code and a message to the user. */
            /* Está enviando un código de estado 400 y un mensaje al usuario. */
            return res.status(400).send({ errors: resultsValidations });
        }
        /* A record in the `AutomobilesBrands` table is searched for that has the id that the user sends */
        /* Se busca un registro en la tabla `AutomobilesBrands` que tenga el id que el usuario envía */
        const automobilesBrands = await AutomobilesBrands.findByPk(AutBrand_Id);
        /* If the `automobilesBrands` variable is null, it means that there is no record in the database with the id that
        the user sends, so it returns a message. */
        /* Si la variable `automobilesBrands` es nula, significa que no hay un registro en la base de datos con el id que
        el usuario envía, por lo que devuelve un mensaje. */
        if (!automobilesBrands) {
            return res.status(404).send({
                errors: [
                    {
                        msg: 'La marca de automóvil no existe.'
                    }
                ]
            });
        }
        const { AutBrand_Name, AutBrand_Description, AutBrand_Logo, AutBrand_Status } = body;
        /* The `AutBrand_Name` field is checked if the user submits the `AutBrand_Name` field and if so, it is checked if the car brand name that the user submits is different from the car brand name that already exists in the database.
        If the user submits the `AutBrand_Name` field, it is checked whether the car brand name the user submits is different from the car brand name that already exists in the database. */
        /* Se verifica si el usuario envía el campo `AutBrand_Name` y si lo hace, se verifica si el nombre de la marca de
        automóvil que el usuario envía es diferente al nombre de la marca de automóvil que ya existe en la base de datos. */
        const existAutomobilesBrands = await db.query(`SELECT * FROM automobiles_brands WHERE AutBrand_Name = '${AutBrand_Name}' AND AutBrand_Id != ${AutBrand_Id}`, {
            type: QueryTypes.SELECT
        });
        /* If the `existAutomobilesBrands` variable is not null, it means that there is a record in the database with the
        same `AutBrand_Name` as the one that the user is trying to create, so it returns a message. */
        /* Si la variable `existAutomobilesBrands` no es nula, significa que hay un registro en la base de datos con el
        mismo `AutBrand_Name` que el que el usuario está tratando de crear, por lo que devuelve un mensaje. */
        if (existAutomobilesBrands.length > 0) {
            return res.status(400).send({
                errors: [
                    {
                        msg: 'La marca de automóvil ingresada ya existe.'
                    }
                ]
            });
        }
        /* You are updating the `automobilesBrands` object. */
        /* Está actualizando el objeto `automobilesBrands`. */
        automobilesBrands.set({
            AutBrand_Name,
            AutBrand_Description,
            AutBrand_Logo,
            AutBrand_Status
        });
        /* It's updating the record in the `AutomobilesBrands` table. */
        /* Está actualizando el registro en la tabla `AutomobilesBrands`. */
        await automobilesBrands.save();
        /* It's sending a 200 status code and a message to the user. */
        /* Está enviando un código de estado 200 y un mensaje al usuario. */
        return res.status(200).send({
            response: [
                {
                    msg: 'La marca de automóvil se ha actualizado correctamente.',
                    automobilesBrands: {
                        AutBrand_Name,
                        AutBrand_Description,
                        AutBrand_Logo,
                        AutBrand_Status
                    }
                }
            ]
        });
    }
    catch (e) {
        console.log(e);
        /* The code next sends a 500 status code and a message to the user. */
        /* El código siguiente envía un código de estado 500 y un mensaje al usuario. */
        return res.status(500).send({ errors: { msg: 'Ha ocurrido un error, inténtelo más tarde.' } });
    }
};
/**
 * It's a validation that checks if the `AutBrand_Name` field is empty, and if it is, it returns a message
 * @param {Request} req - Request: It's the request that comes from the client.
 * @param {Response} _res - Response: It's a parameter that is not used, but it's necessary to be able to use the
 * `validationResult` function.
 * @returns An array of errors.
 */
/**
 * Es una validación que comprueba si el campo `AutBrand_Name` está vacío y, si lo está, devuelve un mensaje.
 * @param {Request} req - Solicitud: Es la solicitud que proviene del cliente.
 * @param {Response} _res - Respuesta: Es un parámetro que no se usa, pero es necesario para poder usar la función
 * `validationResult`.
 * @returns Una serie de errores.
 */
const validationsAutomobilesBrands = async (req, _res) => {
    /* It's a validation that checks if the `AutBrand_Name` field is empty, and if it is, it returns a message. */
    /* Es una validación que comprueba si el campo `AutBrand_Name` está vacío y, si lo está, devuelve un mensaje. */
    await check('AutBrand_Name')
        .not().isEmpty().withMessage('El nombre de la marca de automóvil no puede estar vacío.')
        .isLength({ min: 3, max: 25 }).withMessage('El nombre de la marca de automóvil debe tener entre 3 y 25 caracteres.')
        .run(req);
    return validationResult(req).array();
};
/* The next code is exporting the functions from the automobilesBrands.ts file. */
/* El código siguiente está exportando las funciones del archivo automobilesBrands.ts. */
export { getAutomobilesBrands, getAutomobilesBrandsById, postAutomobilesBrands, putAutomobilesBrands };
//# sourceMappingURL=automobilesBrandsControllers.js.map