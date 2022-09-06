"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Importando el Router desde el módulo express.
    Importing the Router from the express module.
*/
const express_1 = require("express");
/*
    Importando las funciones desde el archivo subcategoriesController.ts.
    Importing the functions from the subCategoryController.ts file.
*/
const subcategoriesController_1 = require("../controllers/subcategoriesController");
/*
    Creando una nueva instancia de la clase Router.
    Creating a new instance of the Router class.
*/
const subCategoriesRouter = (0, express_1.Router)();
/*
    Creando una ruta para la función getSubCategories.
    Creating a path for the getSubCategories function.
*/
subCategoriesRouter.get('/', subcategoriesController_1.getSubCategories);
/*
    Creando una ruta para la función getSubCategory.
    Creating a path for the getSubCategory function.
*/
subCategoriesRouter.get('/:SubCat_Id', subcategoriesController_1.getSubCategory);
/*
    Creando una ruta para la función postSubCategory.
    Creating a path for the postSubCategory function.
*/
subCategoriesRouter.post('/createSubCategory', subcategoriesController_1.postSubCategory);
/*
    Creando una ruta para la función putSubCategory.
    Creating a path for the putSubCategory function.
*/
subCategoriesRouter.put('/updateSubCategory/:Cat_Id', subcategoriesController_1.putSubCategory);
/*
    Exportando el objeto categoriesRouter.
    Exporting the categoriesRouter object.
*/
exports.default = subCategoriesRouter;
//# sourceMappingURL=subCategoriesRouter.js.map