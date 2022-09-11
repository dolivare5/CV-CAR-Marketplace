/* Importing the Router class from the express module. */
/* Importación de la clase de enrutador desde el módulo express. */
import { Router } from "express";
import { getCategoriesHasSubCategoriesAssociated, getSubCategoriesAssociatedWithCategory, postCategoriesHasSubCategoriesAssociated } from "../controllers/categories_has_SubcategoriesController";
/* Creating a new instance of the Router class. */
/* Creando una nueva instancia de la clase Router. */
const CategoriesHasSubCategoriesRouter = Router();
/* Creating a route for the router `CategoriesHasSubCategoriesRouter`. All categories and associated subcategories are
extracted associated subcategories are extracted. */
/* Creando una ruta para el enrutador `CategoriesHasSubCategoriesRouter`. Se extraen todas las categorías y
subcategorías asociadas. */
CategoriesHasSubCategoriesRouter.get('/', getCategoriesHasSubCategoriesAssociated);
/* Creating a route for the router `CategoriesHasSubCategoriesRouter`. The categories associated with a subcategory
are obtained */
/* Creando una ruta para el enrutador `CategoriesHasSubCategoriesRouter`. Se obtienen las categorías asociadas a
una subcategoría */
CategoriesHasSubCategoriesRouter.get('/cat/:SubCategorySubCatId', getCategoriesHasSubCategoriesAssociated);
/* Creating a route for the router `CategoriesHasSubCategoriesRouter`. The subcategories associated with a
category are obtained subcategory */
/* Creando una ruta para el enrutador `CategoriesHasSubCategoriesRouter`. Se obtienen las subcategorías
asociadas a una categoría */
CategoriesHasSubCategoriesRouter.get('/sub/:CategoryCatId', getSubCategoriesAssociatedWithCategory);
/* Creating a route for the router `CategoriesHasSubCategoriesRouter`. Create a new association between a category
category and a subcategory. */
/* Creación de una ruta para el enrutador `CategoriesHasSubCategoriesRouter`. Crear una nueva asociación entre una
categoría y una subcategoría. */
CategoriesHasSubCategoriesRouter.post('/', postCategoriesHasSubCategoriesAssociated);
/* Exporting the router `CategoriesHasSubCategoriesRouter` to be used in the server.ts file. */
/* Exportando el enrutador `CategoriesHasSubCategoriesRouter` para ser usado en el archivo server.ts. */
export default CategoriesHasSubCategoriesRouter;
//# sourceMappingURL=CategoriesHasSubCategoriesRouter.js.map