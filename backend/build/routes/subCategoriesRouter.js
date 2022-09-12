/* Importing the Router class from the express module. */
/* Importación de la clase de enrutador desde el módulo express. */
import { Router } from "express";
/* Importing the functions from the subcategoriesController.ts file. */
/* Importando las funciones desde el archivo subcategoriesController.ts. */
import { getSubCategories, getSubCategory, postSubCategory, putSubCategory } from "../controllers/subcategoriesController";
/* Creating a new instance of the Router class. */
/* Creando una nueva instancia de la clase Router. */
const subCategoriesRouter = Router();
/* Creation of a path that aims to obtain all the subcategories registered in the system */
/* Creación de una ruta que tiene como objetivo obtener todas las subcategorías registradas en el sistema */
subCategoriesRouter.get('/', getSubCategories);
/* Creation of a path that aims to obtain the data of a subcategory */
/* Creación de una ruta que tiene como objetivo obtener los datos de una subcategoría */
subCategoriesRouter.get('/:SubCat_Id', getSubCategory);
/* Creation of a route that aims to create a new subcategory */
/* Creación de una ruta que tiene como objetivo crear una nueva subcategoría */
subCategoriesRouter.post('/createSubCategory', postSubCategory);
/* Creation of a path that aims to use the data of a subcategory */
/* Creación de una ruta que tiene como objetivo actualizar los datos de una subcategoría */
subCategoriesRouter.put('/updateSubCategory/:Cat_Id', putSubCategory);
/* Exporting the subCategoriesRouter object. */
/* Exportando el objeto subCategoriesRouter. */
export default subCategoriesRouter;
//# sourceMappingURL=subCategoriesRouter.js.map