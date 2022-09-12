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
import Subcategories from "../models/Subcategories";
import AutomobilesBrands from "../models/AutomobilesBrands";
import AutomobilesBrands_has_SubCategories from "../models/AutomobilesBrands_has_SubCategories";

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
const getSubCategoriesHasBrandsAssociated = async (_req: Request, res: Response) => {
    try{
        /* A database query that returns the Subcategory associated with each category and vice versa */
        /* Una consulta a la base de datos que devuelve la subcategoría asociada a cada marca y viceversa. */
        const subcategoriesHasBrands : Object[] = await db.query(`
                SELECT "AutBrand_Name", "SubCat_Name", FROM "Automobiles_Brands_has_SubCategories" ABS
                JOIN "Automobiles_Brands" AB on ABS."Automobiles_BrandsAutBraId" = AB."AutBra_Id"
                JOIN "Subcategories" S on ABS."SubcategoriesSubCatId" = S."SubCat_Id"
            `,{
                type: QueryTypes.SELECT
            }
        );
    
        /* Checking if there are no subcategories associated with the brands. */
        /* Comprobando si no existen subcategorías asociadas con marcas. */
        if (!subcategoriesHasBrands) {
            return res.status(200).send({ errors: [ { msg: 'No hay subcategorías asociadas con marcas'} ]});
        }
        /* Returning a response to the user. */
        /* Devolviendo una respuesta al usuario. */
        return res.status(200).send({
            response: [
                {
                    msg: "getSubCategoriesHasBrandsAssociated",
                    subcategoriesHasBrands
                }
            ]
        });
    }catch (e) {
        console.log(e);
    
        /* Sending a status code 500 and a message to the user. */
        /* Envío de un código de estado 500 y un mensaje al usuario. */
        return res.status(500).send({errors: {msg: 'Ha ocurrido un error, inténtelo más tarde.'}});
    }
}


/**
 * A database query that returns the brands associated with a subcategory
 * @param {Request} req - Request: It is the request that the user sends to the server.
 * @param {Response} res - Response: The response object that will be sent to the user.
 * @returns A database query that returns the brands associated with a subcategory.
 */
/**
 * Una consulta de base de datos que devuelve las marcas asociadas con una subcategoría
 * @param {Request} req - Solicitud: Es la solicitud que el usuario envía al servidor.
 * @param {Response} res - Respuesta: el objeto de respuesta que se enviará al usuario.
 * @returns Una consulta de base de datos que devuelve las marcas asociadas con una subcategoría.
 */
const getBrandsAssociatedWithSubcategory = async (req: Request, res: Response) => {
    try{
        /* Destructuring of the SubCategorySubCatId property of the req.params object. */
        /* Desestructuración de la propiedad SubCategorySubCatId del objeto req.params. */
        const { SubCategorySubCatId } = req.params;
    
        /* A database query that returns the brands associated with a subcategory. */
        /* Una consulta a la base de datos que devuelve las marcas asociadas a una subcategoría. */
        const brandsAssociatedWithSubcategory : Object[] = await db.query(`
                SELECT "AutBrand_Name", FROM "Automobiles_Brands_has_SubCategories" ABS
                JOIN "Automobiles_Brands" AB on ABS."Automobiles_BrandsAutBraId" = AB."AutBra_Id"
                JOIN "Subcategories" S on ABS."SubcategoriesSubCatId" = S."SubCat_Id"
                WHERE "SubcategoriesSubCatId" = ${SubCategorySubCatId}
            `, {
                    type: QueryTypes.SELECT
                }
        );
        
        /* Checking if there are no brands associated with the subcategory. */
        /* Comprobando si no existen marcas asociadas con la subcategoría. */
        if (!brandsAssociatedWithSubcategory) {
            return res.status(200).send({ errors: [ { msg: 'No hay marcas asociadas con la subcategoría'} ]});
        }
        /* Returning a response to the user. */
        /* Devolviendo una respuesta al usuario. */
        return res.status(200).send({
            response: [
                {
                    msg: "getBrandsAssociatedWithSubcategory",
                    brandsAssociatedWithSubcategory
                }
            ]
        });
    }catch (e) {
        console.log(e);
        
        /* Sending a status code 500 and a message to the user. */
        /* Envío de un código de estado 500 y un mensaje al usuario. */
        return res.status(500).send({errors: {msg: 'Ha ocurrido un error, inténtelo más tarde.'}});
    }
}



/**
 * It returns the subcategories associated with a brand
 * @param {Request} req - Request: This is the request object that contains the information sent by the user.
 * @param {Response} res - Response: The response object that will be sent to the user.
 * @returns A database query that returns the subcategories associated with a brand.
 */
/**
 * Devuelve las subcategorías asociadas a una marca
 * @param {Request} req - Solicitud: Este es el objeto de solicitud que contiene la información enviada por el usuario.
 * @param {Response} res - Respuesta: el objeto de respuesta que se enviará al usuario.
 * @returns Una consulta de base de datos que devuelve las subcategorías asociadas con una marca.
 */
const getSubCategoriesHasAssociatedWithBrand = async (req: Request, res: Response) => {
    try {
        /* Destructuring of the BrandAutBraId property of the req.params object. */
        /* Desestructuración de la propiedad BrandAutBraId del objeto req.params. */
        const {BrandAutBraId} = req.params;
    
        /* A database query that returns the subcategories associated with a brand. */
        /* Una consulta a la base de datos que devuelve las subcategorías asociadas a una marca. */
        const subcategoriesAssociatedWithBrand: Object[] = await db.query(`
                SELECT "SubCat_Name", FROM "Automobiles_Brands_has_SubCategories" ABS
                JOIN "Automobiles_Brands" AB on ABS."Automobiles_BrandsAutBraId" = AB."AutBra_Id"
                JOIN "Subcategories" S on ABS."SubcategoriesSubCatId" = S."SubCat_Id"
                WHERE "Automobiles_BrandsAutBraId" = ${BrandAutBraId}
            `, {
                type: QueryTypes.SELECT
            }
        );
    
        /* Checking if there are no subcategories associated with the brand. */
        /* Comprobando si no existen subcategorías asociadas con la marca. */
        if (!subcategoriesAssociatedWithBrand) {
            return res.status(200).send({errors: [{msg: 'No hay subcategorías asociadas con la marca ingresada'}]});
        }
    
        /* Returning a response to the user. */
        /* Devolviendo una respuesta al usuario. */
        return res.status(200).send({
            response: [
                {
                    msg: "getSubCategoriesAssociatedWithBrand",
                    subcategoriesAssociatedWithBrand
                }
            ]
        });
    }catch (e) {
        console.log(e);
        
        /* Sending a status code 500 and a message to the user. */
        /* Envío de un código de estado 500 y un mensaje al usuario. */
        return res.status(500).send({errors: {msg: 'Ha ocurrido un error, inténtelo más tarde.'}});
    }
}

/**
 * It receives a request with a subcategory id and a brand id, validates that the subcategory and brand exist, and then
 * creates a new association between the subcategory and brand
 * @param {Request} req - Request: This is the request object that contains the information sent by the user.
 * @param {Response} res - Response: The response object.
 * @returns A response to the user.
 */
/**
 * Recibe una solicitud con un id de subcategoría y un id de marca, valida que la subcategoría y la marca existen, verifica
 * que la subcategoría y la marca no están asociadas, crea una nueva asociación de subcategoría y marca y devuelve una
 * respuesta al usuario
 * @param {Request} req - Solicitud: Este es el objeto de solicitud que contiene la información enviada por el usuario.
 * @param {Response} res - Respuesta: el objeto de respuesta.
 * @returns Una respuesta al usuario.
 */
const postSubCategoriesHasBrands = async (req: Request, res: Response) => {
    try{
        /* Destructuring of the SubCategorySubCatId and BrandAutBraId properties of the req.body object. */
        /* Desestructuración de las propiedades SubCategorySubCatId y BrandAutBraId del objeto req.body. */
        const { SubCategorySubCatId, BrandAutBraId } = req.body;
        
        /* Validation of the SubCategorySubCatId and BrandAutBraId properties. */
        /* Validación de las propiedades SubCategorySubCatId y BrandAutBraId. */
        const validationsResults:Object[] = await validateSubcategoriesAndBrands(req, res);
        
        /* Checking if there are errors in the validations. */
        /* Comprobando si hay errores en las validaciones. */
        if (validationsResults.length > 0) {
            return res.status(400).send({ errors: validationsResults });
        }
        
        /* Finding a subcategory by its subcategory id. */
        /* Encontrar una subcategoría por su ID de subcategoría. */
        const subcategory : Subcategories | null = await Subcategories.findByPk(SubCategorySubCatId);
        
        /* Finding a brand by its brand id. */
        /* Encontrar una marca por su ID de marca. */
        const brand : AutomobilesBrands | null = await AutomobilesBrands.findByPk(BrandAutBraId);
        
        /* Checking if the brand and subcategory exist. */
        /* Comprobando si la marca y la subcategoría existen. */
        if (!subcategory || !brand) {
            return res.status(400).send({ errors: [{ msg: 'La subcategoría o la marca no existen.' }] });
        }
        
       /* Verifying that the subcategory and brand are not associated. */
        /* Verificando que la subcategoría y la marca no estén asociadas. */
        const existSubcategoryHasBrand: AutomobilesBrands_has_SubCategories | null = await AutomobilesBrands_has_SubCategories.findOne({
            where: {
                SubCategorySubCatId,
                BrandAutBraId
            }
        });
        
        /* Checking if the subcategory and brand are associated. */
        /* Comprobando si la subcategoría y la marca están asociadas. */
        if (existSubcategoryHasBrand) {
            return res.status(400).send({ errors: [{ msg: 'La subcategoría y la marca ya están asociadas.' }] });
        }
        
        /* Creating a new subcategory and brand association. */
        /* Creando una nueva asociación de subcategoría y marca. */
        const newSubcategoryHasBrand: AutomobilesBrands_has_SubCategories = await AutomobilesBrands_has_SubCategories.create({
            SubCategorySubCatId,
            BrandAutBraId
        });
        
        /* Saving the new subcategory and brand association. */
        /* Guardando la nueva asociación de subcategoría y marca. */
        await newSubcategoryHasBrand.save();
        
        /* Returning a response to the user. */
        /* Devolviendo una respuesta al usuario. */
        return res.status(200).send({
            response: [
                {
                    msg: "postSubCategoriesHasBrands",
                    newSubcategoryHasBrand
                }
            ]
        });
    }catch (e) {
        console.log(e);
    
        /* Sending a status code 500 and a message to the user. */
        /* Envío de un código de estado 500 y un mensaje al usuario. */
        return res.status(500).send({errors: {msg: 'Ha ocurrido un error, inténtelo más tarde.'}});
    }
}



/**
 * It validates the data that is being sent to the server
 * @param {Request} req - Request: The request object.
 * @param {Response} _res - Response: This is the response object that will be sent to the client.
 * @returns An array of errors.
 */
/**
 * Valida los datos que se están enviando al servidor.
 * @param {Request} req - Solicitud: El objeto de la solicitud.
 * @param {Response} _res - Respuesta: Este es el objeto de respuesta que se enviará al cliente.
 * @returns Una serie de errores.
 */
const validateSubcategoriesAndBrands = async (req: Request, _res: Response) => {
    
    /* The next code is validating the data that is being sent to the server. */
    /* El código siguiente está validando los datos que se envían al servidor. */
    await check('SubCategorySubCatId')
        .notEmpty().withMessage('El Id de La subcategoría es requerido')
        .isInt().withMessage('El Id de la subcategoría debe ser un número entero')
    .run(req);
    
    await check('BrandAutBraId')
        .notEmpty().withMessage('El Id de la marca es requerido')
        .isInt().withMessage('El Id de la marca debe ser un número entero')
    .run(req);
    
    /* Validating the request body and returning an array of errors. */
    /* Validar el cuerpo de la solicitud y devolver una serie de errores. */
    return validationResult(req).array();
}

/* Each of the declared functions is exported except for the function that validates the mandatory fields */
/* Se exportan cada una de las funciones declaradas a exepción de la función que valida los campos obligatorios */
export { getSubCategoriesHasBrandsAssociated, getBrandsAssociatedWithSubcategory, getSubCategoriesHasAssociatedWithBrand, postSubCategoriesHasBrands };