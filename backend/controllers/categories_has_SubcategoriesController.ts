/* Importing the Request and Response objects from the express package. */
/* Importación de los objetos Solicitud y Respuesta del paquete express. */
import {Request, Response} from "express";

/* Importing the QueryTypes object from the sequelize package. */
/* Importación del objeto QueryTypes desde el paquete de secuencias. */
import {QueryTypes} from "sequelize";

/* Importing the connection to the database. */
/* Importación de la conexión a la base de datos. */
import db from "../db/connection";

/* Importing the check and validationResult functions from the express-validator package. */
/* Importación de las funciones check y validationResult del paquete express-validator. */
import {check, validationResult} from "express-validator";


/* Importing the Subcategories model from the models folder. */
/* Importación del modelo Subcategorías desde la carpeta de modelos. */
import Subcategories from "../models/Subcategories";

/* Importing the Categories class from the models folder. */
/* Importando la clase Categorías desde la carpeta de modelos. */
import Categories from "../models/Categories";

/* Importing the Categories_has_SubCategories model from the models folder. */
/* Importando el modelo Categories_has_SubCategories de la carpeta de modelos. */
import Categories_has_SubCategories from "../models/Categories_has_SubCategories";

/**
 * A database query that returns the Subcategory associated with each category and vice versa
 * @param {Request} _req - Request: It is the request that the user sends to the server.
 * @param {Response} res - Response: This is the response that will be sent to the user.
 * @returns A database query that returns the Subcategory associated with each category and vice versa.
 */
/**
 * Una consulta de base de datos que devuelve la Subcategoría asociada con cada categoría y viceversa
 * @param {Request} _req - Solicitud: Es la solicitud que el usuario envía al servidor.
 * @param {Response} res - Respuesta: Esta es la respuesta que se enviará al usuario.
 * @returns Una consulta de base de datos que devuelve la Subcategoría asociada con cada categoría y viceversa.
 */
const getCategoriesHasSubCategoriesAssociated = async (_req: Request, res: Response) => {
    try{
        /* A database query that returns the Subcategory associated with each category and vice versa */
        /* Una consulta a la base de datos que devuelve la categoría asociada a cada subcategoría y viceversa. */
        const subcategoriesHasCategories : Object[] = await db.query(`
                SELECT "Cat_Name", "SubCat_Name" FROM "Subcategories_has_Categories" SC
                JOIN "SubCategories" S  on S."SubCat_Id" = SC."SubcategorySubCatId"
                JOIN "Categories" C on C."Cat_Id" = SC."CategoryCatId"
            `,{
                type: QueryTypes.SELECT
            }
        );
    
        /* Checking if there are no categories associated with subcategories. */
        /* Comprobando si no existen categorías asociadas con subcategorías. */
        if(!subcategoriesHasCategories){
            return res.status(200).send({ errors: [ { msg: 'No hay categorías asociadas a tipos de vehículos registradas en el sistema'} ]});
        }
        
        /* Returning a response to the user. */
        /* Devolviendo una respuesta al usuario. */
        return res.status(200).send({
            response: [
                {
                    msg: "getCategoriesHasSubCategoriesAssociated",
                    subcategoriesHasCategories
                }
            ]
        });
        
    }catch (e) {
        console.log(e);
    
        /* Sending a status code 500 and a message to the user. */
        /* Envío de un código de estado 500 y un mensaje al usuario. */
        return res.status(500).send({errores: {msg: 'Ha ocurrido un error, inténtelo más tarde.'}});
    }
}

/**
 * It returns the categories associated with a subcategory
 * @param {Request} req - Request: It is the request that the user sends to the server.
 * @param {Response} res - Response: The response object that will be sent to the user.
 * @returns A database query that returns the categories associated with a subcategory.
 */
/**
 * Devuelve las categorías asociadas a una subcategoría
 * @param {Request} req - Solicitud: Es la solicitud que el usuario envía al servidor.
 * @param {Response} res - Respuesta: el objeto de respuesta que se enviará al usuario.
 * @returns Una consulta de base de datos que devuelve las categorías asociadas con una subcategoría.
 */
const getCategoriesAssociatedWithSubcategory = async (req: Request, res: Response) => {
    try{
        /* Destructuring of the SubCategorySubCatId property of the req.params object. */
        /* Desestructuración de la propiedad SubCategorySubCatId del objeto req.params. */
        const { SubCategorySubCatId } = req.params;
    
        /* A database query that returns the categories associated with a subcategory. */
        /* Una consulta a la base de datos que devuelve las categorías asociadas a una subcategoría. */
        const categories:Object[] = await db.query(`
            SELECT "Cat_Name" FROM "Subcategories_has_Categories" SC
            JOIN "Categories" C on SC."CategoryCatId" = SC."Cat_Id"
            WHERE "SubCategorySubCatId" = ${SubCategorySubCatId}
        `, {
            type: QueryTypes.SELECT
        });
        /* Checking if there are no categories associated with the subcategory. */
        /* Comprobando si no existen categorías asociadas con la subcategoría. */
        if (!categories) {
            return res.status(200).send({ errors: [ { msg: 'No hay Categorías asociadas a la subcategoría ingresada'} ]});
        }
        /* Returning a response to the user. */
        /* Devolviendo una respuesta al usuario. */
        return res.status(200).send({
            response: [
                {
                    msg: "getCategoriesAssociatedWithSubcategory",
                    categories
                }
            ]
        });
        
    }catch (e) {
        console.log(e);
        
        /* Sending a status code 500 and a message to the user. */
        /* Envío de un código de estado 500 y un mensaje al usuario. */
        return res.status(500).send({errores: {msg: 'Ha ocurrido un error, inténtelo más tarde.'}});
    }
}


/**
 * It returns the subcategories associated with a category
 * @param {Request} req - Request: It is the request that the user sends to the server.
 * @param {Response} res - Response: This is the response object that will be sent to the user.
 * @returns A database query that returns the subcategories associated with a category.
 */
/**
 * Devuelve las subcategorías asociadas a una categoría
 * @param {Request} req - Solicitud: Es la solicitud que el usuario envía al servidor.
 * @param {Response} res - Respuesta: Este es el objeto de respuesta que se enviará al usuario.
 * @returns Una consulta de base de datos que devuelve las subcategorías asociadas con una categoría.
 */
const getSubCategoriesAssociatedWithCategory = async (req: Request, res: Response) => {
    try{
        /* Destructuring of the CategoryCatId property of the req.params object. */
        /* Desestructuración de la propiedad CategoryCatId del objeto req.params. */
        const { CategoryCatId } = req.params;
    
        /* A database query that returns the subcategories associated with a category. */
        /* Una consulta a la base de datos que devuelve las subcategorías asociadas a una categoría. */
        const subcategories:Object[] = await db.query(`
            SELECT "SubCat_Name" FROM "Subcategories_has_Categories" SC
            JOIN "SubCategories" S on SC."SubCategorySubCatId" = S."SubCat_Id"
            WHERE "CategoryCatId" = ${CategoryCatId}
        `, {
            type: QueryTypes.SELECT
        });
        
        /* Checking if there are no subcategories associated with the category. */
        /* Comprobando si no existen subcategorías asociadas con la categoría. */
        if (!subcategories) {
            return res.status(200).send({ errors: [ { msg: 'No hay Subcategorías asociadas a la categoría ingresada'} ]});
        }
        
        /* Returning a response to the user. */
        /* Devolviendo una respuesta al usuario. */
        return res.status(200).send({
            response: [
                {
                    msg: "getSubCategoriesAssociatedWithCategory",
                    subcategories
                }
            ]
        });
    }catch (e) {
        console.log(e);
        
        /* Sending a status code 500 and a message to the user. */
        /* Envío de un código de estado 500 y un mensaje al usuario. */
        return res.status(500).send({errores: {msg: 'Ha ocurrido un error, inténtelo más tarde.'}});
    }
}

const postCategoriesHasSubCategoriesAssociated = async (req: Request, res: Response) => {
    try{
        /* Destructuring of the CategoryCatId and SubCategorySubCatId properties of the req.body object. */
        /* Desestructuración de las propiedades CategoryCatId y SubCategorySubCatId del objeto req.body. */
        const { CategoryCatId, SubCategorySubCatId } = req.body;
        
        /* Validating the categories and subcategories. */
        /* Validación de las categorías y subcategorías. */
        const validationsResults:Object[] = await validateCategoriesAndSubcategories(req, res);
        /* Checking if the validationsResults array has any errors. If it does, it returns the errors to the user. */
        /* Comprobando si la matriz de validacionesResultados tiene algún error. Si lo hace, devuelve los errores al
        usuario. */
        if (validationsResults.length > 0) {
            return res.status(200).send({ errors: validationsResults });
        }
        /* Finding a subcategory by its subcategory id. */
        /* Encontrar una subcategoría por su ID de subcategoría. */
        const subcategory : Subcategories | null = await Subcategories.findByPk(SubCategorySubCatId);
        /* Finding a category by its id. */
        /* Encontrar una categoría por su id. */
        const category : Categories | null = await Categories.findByPk(CategoryCatId);
        
        /* Checking if the category or subcategory exists. */
        /* Comprobando si la categoría o subcategoría existe. */
        if (!subcategory || !category) {
            return res.status(200).send({ errors: [ { msg: 'La categoría o la subcategoría ingresada no existe'} ]});
        }
    
        /* A database query that returns the categories associated with a subcategory. */
        /* Una consulta a la base de datos que devuelve las categorías asociadas a una subcategoría. */
        const existCategories_has_subcategories:Object[] = await db.query(`
            SELECT * FROM "Categories_has_SubCategories" SC
            WHERE "CategoryCatId" = ${CategoryCatId} AND "SubCategorySubCatId" = ${SubCategorySubCatId}
        `, {
            type: QueryTypes.SELECT
        });
        
        /* Checking if the category and subcategory already exist in the database. */
        /* Comprobando si la categoría y la subcategoría ya existen en la base de datos. */
        if (existCategories_has_subcategories.length > 0) {
            return res.status(200).send({ errors: [ { msg: 'Ya existe una asociación entre la categoría y la subcategoría ingresada'} ]});
        }
        
        /* Creating a new association between a category and a subcategory. */
        /* Creando una nueva asociación entre una categoría y una subcategoría. */
        const newCategories_has_subcategories: Categories_has_SubCategories = new Categories_has_SubCategories(req.body);
        /* Saving the new association in the database. */
        /* Guardando la nueva asociación en la base de datos. */
        await newCategories_has_subcategories.save();
        
        /* Returning a response to the user. */
        /* Devolviendo una respuesta al usuario. */
        return res.status(200).send({
            response: [
                {
                    msg: "postCategoriesHasSubCategoriesAssociated",
                    newCategories_has_subcategories
                }
            ]
        });
    }catch (e) {
        console.log(e);
    
        /* Sending a status code 500 and a message to the user. */
        /* Envío de un código de estado 500 y un mensaje al usuario. */
        return res.status(500).send({errores: {msg: 'Ha ocurrido un error, inténtelo más tarde.'}});
    }
}

/**
 * It validates the request body and returns a series of errors
 * @param {Request} req - Request: The request object.
 * @param {Response} _res - Response: The response object.
 * @returns An array of errors.
 */
/**
 * Valida el cuerpo de la solicitud y devuelve una serie de errores.
 * @param {Request} req - Solicitud: El objeto de la solicitud.
 * @param {Response} _res - Respuesta: el objeto de respuesta.
 * @returns Una serie de errores.
 */
const validateCategoriesAndSubcategories = async (req: Request, _res: Response) => {
    
    /* The following code checks if CategoryCatId and SubCategorySubCatId are not empty and are integers. */
    /* El código siguiente verifica si CategoryCatId y SubCategorySubCatId no están vacíos y son números enteros. */
    await check('CategoryCatId')
        .notEmpty().withMessage('El id de la categoría es obligatorio').not().isEmpty()
        .isNumeric().withMessage('El id de la categoría no es valido')
    .run(req);
    
    await check('SubCategorySubCatId')
        .notEmpty().withMessage('El id de la subcategoría es obligatorio').not().isEmpty()
        .isNumeric().withMessage('El id de la Subcategoría no es valido')
        .run(req);
    
    /* Validates the request body and returns a series of errors. */
    /* Valida el cuerpo de la solicitud y devuelve una serie de errores. */
    return validationResult(req).array();
}

/* Each of the declared functions is exported except for the function that validates the mandatory fields */
/* Se exportan cada una de las funciones declaradas a exepción de la función que valida los campos obligatorios */
export { getCategoriesHasSubCategoriesAssociated, getCategoriesAssociatedWithSubcategory, getSubCategoriesAssociatedWithCategory, postCategoriesHasSubCategoriesAssociated };