/*
    Importando el Router desde el módulo express.
    Importing the Router from the express module.
*/
import { Router } from "express";
/*
    Importando las funciones desde el archivo categoriesController.ts.
    Importing the functions from the categoriesController.ts file.
*/
import {getCategories, getCategory, postCategory, putCategory} from "../controllers/categoriesController";

/*
    Creando una nueva instancia de la clase Router.
    Creating a new instance of the Router class.
*/
const categoriesRouter = Router();

/*
    Creando una ruta para la función getCategories.
    Creating a path for the getCategories function.
*/
categoriesRouter.get('/', getCategories);

/*
    Creando una ruta para la función getCategory.
    Creating a path for the getCategory function.
*/
categoriesRouter.get('/:Cat_Id', getCategory);

/*
    Creando una ruta para la función postCategory.
    Creating a path for the postCategory function.
*/
categoriesRouter.post('/createCategory', postCategory);

/*
    Creando una ruta para la función putCategory.
    Creating a path for the putCategory function.
*/
categoriesRouter.put('/updateCategory/:Cat_Id', putCategory);

/*
    Exportando el objeto categoriesRouter.
    Exporting the categoriesRouter object.
*/
export default categoriesRouter;