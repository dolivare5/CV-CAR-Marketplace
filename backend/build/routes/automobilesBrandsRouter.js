/* Importing the Router class from the express module. */
/* Importación de la clase de enrutador desde el módulo express. */
import { Router } from "express";
/* Importing the functions that will be used in the routes. */
/* Importación de las funciones que se utilizarán en las rutas. */
import { getAutomobilesBrands, getAutomobilesBrandsById, postAutomobilesBrands, putAutomobilesBrands } from "../controllers/automobilesBrandsControllers";
/* Creating a new instance of the Router class. */
/* Creando una nueva instancia de la clase Router. */
const automobilesBrandsRouter = Router();
/* Creation of a route that aims to obtain the data of the brands of cars registered in the system */
/* Creación de una ruta que tiene como objetivo obtener los datos de las marcas de automobiles registradas en el sistema */
automobilesBrandsRouter.get('/', getAutomobilesBrands);
/* Creation of a route that aims to obtain the data of an Automobile Brand registered in the system */
/* Creación de una ruta que tiene como objetivo obtener los datos de una Marca de Automobiles registrada en el sistema */
automobilesBrandsRouter.get('/:AutBrand_Id', getAutomobilesBrandsById);
/* Creation of a route that aims at registering a new car brand in the system */
/* Creación de una ruta que tiene como objetivo registrar una nueva Marca de automobiles el sistema */
automobilesBrandsRouter.post('/createBrand', postAutomobilesBrands);
/* Creation of a route that aims to update the data of a car brand registered in the system */
/* Creación de una ruta que tiene como objetivo actualizar los datos de una marca de automobiles registrada en el sistema */
automobilesBrandsRouter.put('/updateBrand/:AutBrand_Id', putAutomobilesBrands);
/* Exporting the instance of the Router class. */
/* Exportando la instancia de la clase Router. */
export default automobilesBrandsRouter;
//# sourceMappingURL=automobilesBrandsRouter.js.map