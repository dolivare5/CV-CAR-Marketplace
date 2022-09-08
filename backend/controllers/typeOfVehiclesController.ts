
/* Importing the Request and Response interfaces from the express module. */
/* Importación de las interfaces de Solicitud y Respuesta desde el módulo express. */
import {Request, Response} from "express";

/* The next code is importing the check and validationResult functions from the express-validator package. */
/* El código anterior está importando las funciones check y validationResult del paquete express-validator. */
import {check, validationResult} from 'express-validator';

/* Importing the QueryTypes from the sequelize package. */
/* Importación de QueryTypes desde el paquete Sequelize. */
import {QueryTypes} from "sequelize";

/* Importing the connection.ts file from the db folder. */
/* Importando el archivo connection.ts desde la carpeta db. */
import db from "../db/connection";

/* Importing the TypeOfVehicles class from the models folder. */
/* Importando la clase TypeOfVehicles de la carpeta de modelos. */
import TypeOfVehicles from "../models/TypeOfVehicles";


/**
 * A function that allows you to obtain the types of vehicles registered in the system.
 * @param {Request} _req - Request, res: Response
 * @param {Response} res - Response: It is the response that the server will send to the client.
 * @returns the types of vehicles registered in the system.
 */
/**
 * Una función que le permite obtener los tipos de vehículos registrados en el sistema.
 * @param {Request} _req - Solicitud, res: Respuesta
 * @param {Response} res - Respuesta: Es la respuesta que el servidor enviará al cliente.
 * @returns los tipos de vehículos registrados en el sistema.
 */
const getTypesVehicles = async (_req: Request, res: Response) => {
    /* The next code is performing a query to the database to extract the types of vehicles registered in the system. */
    /* El código siguiente está realizando una consulta a la base de datos para extraer los tipos de vehículos registrados
    en el sistema. */
    try{
        /* A database query is performed to extract the types of vehicles registered. */
        /* Se realiza una consulta à la base de datos para extraer los tipos de vehículos registrados. */
        const typeOfVehicles:TypeOfVehicles[] = await TypeOfVehicles.findAll({
            attributes:[ 'TypVeh_Name', 'TypVeh_Description'],
            where: {TypVeh_Status: 1}
        });
        
        /* Checking if the variable typeOfVehicles is empty. If it is empty, it will send a response to the client with a
        status code of 200 and a message saying that there are no types of vehicles registered in the system. */
        
        /* Comprobando si la variable typeOfVehicles está vacía. Si está vacío, enviará una respuesta al cliente con un
        código de estado de 200 y un mensaje diciendo que no hay tipos de vehículos registrados en el sistema. */
        if(!typeOfVehicles){
            res.status(200).send({ errors: [ { msg: 'No hay tipos de vehículos registrados en el sistema'} ]});
        }
        
        /* Finally, I return the information on the types of vehicles registered.  */
        /* Finalmente, retorno la información sobre los tipos de vehículos registrados. */
        return res.status(200).send({
            response: [
                {
                    msg: "getTypeOfVehicles",
                    typeOfVehicles
                }
            ]
        });
        
    }catch (e) {
        console.log(e);
        
        /* Sending a 500 status code and a message to the user. */
        /* Envío de un código de estado 500 y un mensaje al usuario. */
        return res.status(500).send({errores: {msg: 'Ha ocurrido un error, inténtelo más tarde.'}});
    }
}


/**
 * A function that allows you to get the type of vehicle registered in the database.
 * @param {Request} req - Request, res: Response
 * @param {Response} res - Response: It is the response that the server will send to the client.
 * @returns the information of the type of vehicle registered in the id being received.
 */
/**
 * Una función que le permite obtener el tipo de vehículo registrado en la base de datos.
 * @param {Request} req - Solicitud, res: Respuesta
 * @param {Response} res - Respuesta: Es la respuesta que el servidor enviará al cliente.
 * @returns la información del tipo de vehículo registrado en el id que se está recibiendo.
 */
const getTypeVehicle  = async (req: Request, res: Response) => {
    try{
        /* The data that comes in the body is extracted through the request.*/
        /* Se extraen los datos que vienen en el body a través del request. */
        const {TypVeh_Id} = req.params;
    
        /* A query is made to the database to extract the type of vehicle registered in the id received registered in the id being received. */
        /* Se realiza una consulta à la base de datos para extraer el tipo de vehículo que tenga registrado el id que se recibe. */
        const typeOfVehicle : TypeOfVehicles | null = await TypeOfVehicles.findByPk(TypVeh_Id);
    
        /* Checking if the typeOfVehicle is not null, if it is not null, it will send a response with a status of 200 and a message. */
        /* Comprobando si typeOfVehicle no es nulo, si no es nulo, enviará una respuesta con un estado de 200 y un mensaje. */
        if(!typeOfVehicle){
            res.status(200).send({ errors: [ { msg: 'El código ingresado no corresponde a ningún tipo de vehículo.  '} ]});
        }
        /* Finalmente retorno la información del tipo de vehículo registrado.*/
        /* Finally I return the information of the type of vehicle registered. */
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
        
    }catch (e) {
        console.log(e);
        
        /* Sending a 500 status code and a message to the user. */
        /* Envía un código de estado 500 y un mensaje al usuario. */
        return res.status(500).send({errores: {msg: 'Ha ocurrido un error, inténtelo más tarde.'}});
    }
    
}


/**
 * It receives the data that comes in the body of the request, validates it, checks if there is a vehicle type with the
 * same name, if there is not, it creates an object of type TypeOfVehicles with the data received and saves it to the db
 * @param {Request} req - Request, res: Response
 * @param {Response} res - Response: It is the response that is returned to the client.
 * @returns a json object with the information of the type of vehicle that was created.
 */
/**
 * Recibe los datos que vienen en el cuerpo de la solicitud, los valida, comprueba si existe un tipo de vehículo con el
 * mismo nombre, si no lo hay crea un objeto de tipo TypeOfVehicles con los datos recibidos y lo guarda en la db
 * @param {Request} req - Solicitud, res: Respuesta
 * @param {Response} res - Respuesta: Es la respuesta que se devuelve al cliente.
 * @returns un objeto json con la información del tipo de vehículo que se creó.
 */
const postTypeVehicle = async (req: Request, res: Response) => {
    /* Se extraen los datos que vienen en el body a través del request. */
    /* The data that comes in the body is extracted through the request. */
    const {body} = req;
    try {
        /* Checks whether the result array in which all validations are stored is empty or not.*/
        /* Verifica si el arreglo resultado en el cual se guardan todas las validaciones está vacío o no */
        let resultsValidations: Object[] = await validateFieldsTypeOfVehicle(req, res);
    
        if (!resultsValidations) {
            /* If there is an error I return a json array with each of the validations that were not met. */
            /* De haber un error retorno un arreglo json con cada uno de las validaciones que no se cumplieron. */
            res.status(200).send({errores: resultsValidations});
        }
        /* It is checked whether or not there is a vehicle type with the name received. */
        /* Se verifica si existe o no un tipo de vehículo con el nombre recibido. */
        const existTypeVehicle: TypeOfVehicles | null = await TypeOfVehicles.findOne({
            where: {
                TypVeh_Name: body.TypVeh_Name
            }
        })
    
        /* If there is a vehicle type that is the same as the one entered, a message is returned with this information. */
        /* De existir un tipo de vehículo que sea el mismo que el ingresado, se retorna un mensaje con esta información. */
        if (existTypeVehicle) {
            return res.status(400).json({
                errors: [
                    {
                        msg: "El tipo de vehículo ingresado ya se encuentra registrado"
                    }
                ]
            });
        }
    
        /* If there is no vehicle type equal to the one entered, we proceed to create an object of type
           TypeOfVehicles with the information received. */
        /* Si no existe un tipo de vehículo que sea igual al ingresado se procede a crear un objeto de tipo
            TypeOfVehicles con la información que se recibe. */
        // @ts-ignore
        const typeOfVehicle: TypeOfVehicles = new TypeOfVehicles(body);
        /* Once the object has been created, the information of the object is saved to the db. */
        /* Una vez creado el objeto se guarda la información del objeto en la db. */
        await typeOfVehicle.save();
        /* Finally, if there is no problem, the information is returned through a json object. */
        /* Finalmente, si no hay ningún problema se retorna la información a través de un objeto json. */
        // @ts-ignore
        const { TypVeh_Name, TypVeh_Description} = typeOfVehicle;
        res.status(200).send({
            response: [
                {
                    msg: "Tipo de Vehículo registrado correctamente.",
                    typeOfVehicle : {
                        TypVeh_Name,
                        TypVeh_Description
                    }
                }
            ]
        });
    } catch (e) {
        console.log(e);
        
        /* Sending a 500 status code and a message to the user. */
        /* Envío de un código de estado 500 y un mensaje al usuario. */
        return res.status(500).send({errores: {msg: 'Ha ocurrido un error, inténtelo más tarde.'}});
    }
}


/**
 * It receives a request with the id of the vehicle type to be modified, validates the data received in the request, and if
 * there are no errors, it updates the vehicle type in the database
 * @param {Request} req - Request: It is the request that is received from the client.
 * @param {Response} res - Response: It is the response that the server will send to the client.
 * @returns the information of the type of vehicle registered.
 */
/**
 * Recibe una solicitud con el id del tipo de vehículo a modificar, valida los datos recibidos en la solicitud, y si no hay
 * errores, actualiza el tipo de vehículo en la base de datos
 * @param {Request} req - Solicitud: Es la solicitud que se recibe del cliente.
 * @param {Response} res - Respuesta: Es la respuesta que el servidor enviará al cliente.
 * @returns la información del tipo de vehículo matriculado.
 */
const putTypeVehicle = async (req: Request, res: Response) => {
    try {
        /* The id received in the request is extracted. */
        /* Se extrae el id que se recibe en la solicitud (request). */
        const { TypVeh_Id } = req.params;
        
        /* The database is queried to verify whether the received id exists. */
        /* Se consulta la base de datos para verificar si existe el id recibido. */
        const typeVehicle:TypeOfVehicles|null = await TypeOfVehicles.findByPk(TypVeh_Id);
        
        /* Checking if the typeVehicle is not null, if it is not null, it will return an error message. */
        /* Verificando si typeVehicle no es nulo, si no es nulo, devolverá un mensaje de error. */
        if(!typeVehicle){
            return res.json({ errors: [ { msg: 'El código ingresado no corresponde a ningún tipo de vehículo. '} ]});
        }
    
        /* Checks whether the result array in which all validations are stored is empty or not. */
        /* Verifica si el arreglo resultado en el cual se guardan todas las validaciones está vacío o no */
        const resultsValidations = await validateFieldsTypeOfVehicle(req, res);
        if (!resultsValidations) {
            /* If there is an error, return a json array with each of the validations that were not fulfilled. */
            /* De haber un error retorno un arreglo json con cada uno de las validaciones que no se cumplieron. */
            return res.json({errores: resultsValidations});
        }
    
        /* We proceed to extract each of the data to be modified in the database to be modified in the database. */
        /* Procedemos a extraer cada uno de los datos a modificar en la base de datos a modificar en la base de datos. */
        const { TypVeh_Name, TypVeh_Description, TypVeh_Status  } = req.body;
    
        
        /* A query to the database to see if there is a type of vehicle with the same name as the one that is being edited. */
        /* Una consulta a la base de datos para ver si existe algún tipo de vehículo con el mismo nombre que el que se está
        editando. */
        const existTypeVehicleRepeated:Object[] = await db.query(
            `SELECT * FROM "Type_Of_Vehicles" tv WHERE "TypVeh_Id" != ${ TypVeh_Id } AND "TypVeh_Name" = '${TypVeh_Name}'`,
            { type: QueryTypes.SELECT }
        )
    
        /* If there is a record, it is not allowed to update the record. Otherwise, the record is proceeded with. */
        /* Si existe un registro no se permite actualizar el registro. Caso contrario, se procede con el registro. */
        if (!existTypeVehicleRepeated){
            return res.status(200).send({ errors: [ { msg: 'Lo sentimos, el tipo de vehículo ingresado ya se encuentra registrado'}]});
        }
        
        /* The vehicle type object is updated with the data received in the body. */
        /* El objeto tipo de vehículo se actualiza con los datos recibidos en el body. */
        
        typeVehicle.set({ TypVeh_Name, TypVeh_Description, TypVeh_Status});
    
        /* Once the object that stores the modified vehicle type has been edited, the record is updated in the db. */
        /* Una vez editado el objeto que guarda el tipo de vehículo ya modificado se actualiza el registro en la db. */
        await typeVehicle.save();
    
        /* Finally, if there is no problem, the information is returned through a json object. */
        /* Finalmente retorno la información del tipo de vehículo registrado. */
        res.status(200).send({
            response: [
                {
                    msg: "postTypeVehicle",
                    typeVehicle
                }
            ]
        })
    } catch (e) {
        console.log(e);
        
        /* Sending a 500 status code and a message to the user. */
        /* Envío de un código de estado 500 y un mensaje al usuario. */
        return res.status(500).send({errores: {msg: 'Ha ocurrido un error, inténtelo más tarde.'}});
    }
}


/**
 * It validates that the name field is not empty
 * @param {Request} req - Request, _res: Response
 * @param {Response} _res - Response: This is the response that will be sent to the client.
 * @returns an array with the result of each field validation and the array is returned.
 */
/**
 * Valida que el campo de nombre no esté vacío
 * @param {Request} req - Solicitud, _res: Respuesta
 * @param {Response} _res - Respuesta: Este parámetro no se usa en la función, pero es necesario indicar que la función
 * devuelve una respuesta.
 * @returns una matriz con el resultado de cada validación de campo y se devuelve la matriz.
 */
const validateFieldsTypeOfVehicle = async (req: Request, _res: Response) => {
    /* Validations through express validators. Among these are that the name field is not empty.
    /* Validaciones a través de express validators. Entre estas están que el campo nombre no este vacío.*/
    await check('TypVeh_Name').notEmpty().withMessage("El nombre del tipo de vehículo es Obligatorio").run(req);
    
    /* The result of each of the validations is returned in an array */
    /* Se retorna el resultado de cada una de las validaciones en un arreglo */
    return validationResult(req).array();
    
}

/* Each of the declared functions is exported except for the function that validates the mandatory fields */
/* Se exportan cada una de las funciones declaradas a exepción de la función que valida los campos obligatorios */
export {getTypesVehicles, getTypeVehicle, postTypeVehicle, putTypeVehicle};