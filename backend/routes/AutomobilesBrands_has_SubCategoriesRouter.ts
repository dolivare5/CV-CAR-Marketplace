/* Importing the Router class from the express module. */
/* Importación de la clase de enrutador desde el módulo express. */
import { Router } from "express";
/* Importing the functions that will be used in the routes. */
/* Importación de las funciones que se utilizarán en las rutas. */
import {
    getBrandsAssociatedWithSubcategory, getSubCategoriesHasAssociatedWithBrand,
    getSubCategoriesHasBrandsAssociated, postSubCategoriesHasBrands
} from "../controllers/AutomobilesBrands_has_SubCategoriesController";


/* Creating a new instance of the Router class. */
/* Creando una nueva instancia de la clase Router. */
const  automobilesBrands_has_SubCategoriesRouter = Router();

/* Creation of a route that aims to obtain the data of the brands of cars and Subcategories registered in the system */
/* Creación de una ruta que tiene como objetivo obtener los datos de las marcas de automobiles y Subcategorías registradas en el sistema */
automobilesBrands_has_SubCategoriesRouter.get('/', getSubCategoriesHasBrandsAssociated);

/* Creation of a route that aims to obtain the data of the car brands associated to subcategories registered in the system */
/* Creación de una ruta que tiene como objetivo obtener los datos de las marcas de automobiles asociadas a subcategorías registradas en el sistema */
automobilesBrands_has_SubCategoriesRouter.get('/brands/:SubCategorySubCatId', getBrandsAssociatedWithSubcategory);

/* Creation of a route that aims to obtain the data of the subcategories associated to car brands registered in the system */
/* Creación de una ruta que tiene como objetivo obtener los datos de las subcategorías asociadas a marcas de automobiles registradas en el sistema */
automobilesBrands_has_SubCategoriesRouter.get('/subcats/:AutomobilesBrandsAutBrandId', getSubCategoriesHasAssociatedWithBrand);

/* Creation of a route that aims at registering a new car brand in the system */
/* Creación de una ruta que tiene como objetivo registrar una nueva Marca de automobiles el sistema */
automobilesBrands_has_SubCategoriesRouter.post('/createBrand', postSubCategoriesHasBrands);

/* Exporting the instance of the Router class. */
/* Exportando la instancia de la clase Router. */
export default automobilesBrands_has_SubCategoriesRouter;