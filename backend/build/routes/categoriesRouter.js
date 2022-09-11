/* Importing the Router class from the express module. */
/* Importación de la clase de enrutador desde el módulo express. */
import { Router } from "express";
/* Importing the functions from the categoriesController.ts file. */
/* Importando las funciones desde el archivo categoryController.ts. */
import { getCategories, getCategory, postCategory, putCategory } from "../controllers/categoriesController";
/* Creating a new instance of the Router class. */
/* Creando una nueva instancia de la clase Router. */
const categoriesRouter = Router();
/* Creation of a route to obtain the data of the categories registered in the system */
/* Creación de una ruta que tiene como objetivo obtener los datos de las categorías registradas en el sistema */
categoriesRouter.get('/', getCategories);
/* Creation of a path to obtain the data of a Category registered in the system */
/* Creación de una ruta que tiene como objetivo obtener los datos de una Categoría registrada en el sistema */
categoriesRouter.get('/:Cat_Id', getCategory);
/* Creation of a path that aims to register a new category in the system */
/* Creación de una ruta que tiene como objetivo registrar una nueva categoría el sistema */
categoriesRouter.post('/createCategory', postCategory);
/* Creation of a path that aims to update the data of the categories registered in the system */
/* Creación de una ruta que tiene como objetivo actualizar los datos de las categoría registrada en el sistema */
categoriesRouter.put('/updateCategory/:Cat_Id', putCategory);
/* Exporting the categoriesRouter object. */
/* Exportando el objeto enrutador de categorías. */
export default categoriesRouter;
//# sourceMappingURL=categoriesRouter.js.map