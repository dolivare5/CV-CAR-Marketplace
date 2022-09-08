"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Importing the Router class from the express module. */
/* Importación de la clase de enrutador desde el módulo express. */
const express_1 = require("express");
/* Importing the functions from the subcategoriesController.ts file. */
/* Importando las funciones desde el archivo subcategoriesController.ts. */
const subcategoriesController_1 = require("../controllers/subcategoriesController");
/* Creating a new instance of the Router class. */
/* Creando una nueva instancia de la clase Router. */
const subCategoriesRouter = (0, express_1.Router)();
/* Creation of a path that aims to obtain all the subcategories registered in the system */
/* Creación de una ruta que tiene como objetivo obtener todas las subcategorías registradas en el sistema */
subCategoriesRouter.get('/', subcategoriesController_1.getSubCategories);
/* Creation of a path that aims to obtain the data of a subcategory */
/* Creación de una ruta que tiene como objetivo obtener los datos de una subcategoría */
subCategoriesRouter.get('/:SubCat_Id', subcategoriesController_1.getSubCategory);
/* Creation of a route that aims to create a new subcategory */
/* Creación de una ruta que tiene como objetivo crear una nueva subcategoría */
subCategoriesRouter.post('/createSubCategory', subcategoriesController_1.postSubCategory);
/* Creation of a path that aims to use the data of a subcategory */
/* Creación de una ruta que tiene como objetivo actualizar los datos de una subcategoría */
subCategoriesRouter.put('/updateSubCategory/:Cat_Id', subcategoriesController_1.putSubCategory);
/* Exporting the subCategoriesRouter object. */
/* Exportando el objeto subCategoriesRouter. */
exports.default = subCategoriesRouter;
//# sourceMappingURL=subCategoriesRouter.js.map