"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Importando el Router desde el módulo express.
    Importing the Router from the express module.
*/
const express_1 = require("express");
/*
    Importando las funciones desde el archivo categoriesController.ts.
    Importing the functions from the categoriesController.ts file.
*/
const categoriesController_1 = require("../controllers/categoriesController");
/*
    Creando una nueva instancia de la clase Router.
    Creating a new instance of the Router class.
*/
const categoriesRouter = (0, express_1.Router)();
/*
    Creando una ruta para la función getCategories.
    Creating a path for the getCategories function.
*/
categoriesRouter.get('/', categoriesController_1.getCategories);
/*
    Creando una ruta para la función getCategory.
    Creating a path for the getCategory function.
*/
categoriesRouter.get('/:Cat_Id', categoriesController_1.getCategory);
/*
    Creando una ruta para la función postCategory.
    Creating a path for the postCategory function.
*/
categoriesRouter.post('/createCategory', categoriesController_1.postCategory);
/*
    Creando una ruta para la función putCategory.
    Creating a path for the putCategory function.
*/
categoriesRouter.put('/updateCategory/:Cat_Id', categoriesController_1.putCategory);
/*
    Exportando el objeto categoriesRouter.
    Exporting the categoriesRouter object.
*/
exports.default = categoriesRouter;
//# sourceMappingURL=categoriesRouter.js.map