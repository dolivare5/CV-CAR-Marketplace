/* Importing the Router class from the express module. */
/* Importación de la clase de enrutador desde el módulo express. */
import { Router } from "express";
/* Importing the functions that will be used in the routes. */
/* Importación de las funciones que se utilizarán en las rutas. */
import { getCategoriesAndTypeVehiclesAssociated, getCategoriesAssociatedWithTypeVehicle, getVehiclesTypesAssociatedWithCategory, postCategoriesAndTypeVehiclesAssociated } from "../controllers/categoriesTypeOfVehicleController";
/* Creating a new instance of the Router class. */
/* Creando una nueva instancia de la clase Router. */
const categories_TypeOfVehicleRouter = Router();
/* Creating a route for the router `categories_TypeOfVehicleRouter`. All categories and associated vehicle types are
extracted associated vehicles are extracted. */
/* Creando una ruta para el enrutador `categories_TypeOfVehicleRouter`. Se extraen todas las categorías y tipos de
vehículos asociados. */
categories_TypeOfVehicleRouter.get('/', getCategoriesAndTypeVehiclesAssociated);
/* Creating a route for the router `categories_TypeOfVehicleRouter`. The types of vehicles associated to a category are
obtained */
/* Creando una ruta para el enrutador `categories_TypeOfVehicleRouter`. Se obtienen los tipos de vehículos asociados a
una categoría */
categories_TypeOfVehicleRouter.get('/tpv/:CategoryCatId', getVehiclesTypesAssociatedWithCategory);
/* Creating a route for the router `categories_TypeOfVehicleRouter`. The categories associated with a vehicle type are obtained
vehicle type */
/* Creando una ruta para el enrutador `categories_TypeOfVehicleRouter`. Se obtienen las categorías asociadas a un tipo
de vehículo */
categories_TypeOfVehicleRouter.get('/ctg/:TypeOfVehicleTypVehId', getCategoriesAssociatedWithTypeVehicle);
/* Creating a route for the router `categories_TypeOfVehicleRouter`. Create a new association between a category
category and a vehicle type. */
/* Creación de una ruta para el enrutador `categories_TypeOfVehicleRouter`. Crear una nueva asociación entre una
categoría y un tipo de vehículo. */
categories_TypeOfVehicleRouter.post('/', postCategoriesAndTypeVehiclesAssociated);
export default categories_TypeOfVehicleRouter;
//# sourceMappingURL=Categories_TypeOfVehicleRouter.js.map