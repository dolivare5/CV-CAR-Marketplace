/*
    Importando el Router desde el módulo express.
    Importing the Router from the express module.
*/
import { Router } from "express";

/*
    Importando las funciones desde el archivo subcategoriesController.ts.
    Importing the functions from the subCategoryController.ts file.
*/
import { getSubCategories, getSubCategory, postSubCategory, putSubCategory } from "../controllers/subcategoriesController";


/*
    Creando una nueva instancia de la clase Router.
    Creating a new instance of the Router class.
*/
const subCategoriesRouter = Router();

/*
    Creando una ruta para la función getSubCategories.
    Creating a path for the getSubCategories function.
*/
subCategoriesRouter.get('/', getSubCategories);

/*
    Creando una ruta para la función getSubCategory.
    Creating a path for the getSubCategory function.
*/
subCategoriesRouter.get('/:SubCat_Id', getSubCategory);

/*
    Creando una ruta para la función postSubCategory.
    Creating a path for the postSubCategory function.
*/
subCategoriesRouter.post('/createSubCategory', postSubCategory);

/*
    Creando una ruta para la función putSubCategory.
    Creating a path for the putSubCategory function.
*/
subCategoriesRouter.put('/updateSubCategory/:Cat_Id', putSubCategory);

/*
    Exportando el objeto categoriesRouter.
    Exporting the categoriesRouter object.
*/
export default subCategoriesRouter;