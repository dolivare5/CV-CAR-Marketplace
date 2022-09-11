/* Importing the Categories model from the Categories.js file. */
/* Importando el modelo de categorías del archivo Categories.js. */
import Categories from "./Categories";
/* Importing the TypeOfVehicles model from the TypeOfVehicles.js file. */
/* Importación del modelo TypeOfVehicles del archivo TypeOfVehicles.js. */
import TypeOfVehicles from "./TypeOfVehicles";
import Subcategories from "./Subcategories";
/* Create a many-to-many relationship between Categories and TypeOfVehicles models. */
/* Crear una relación de muchos a muchos entre los modelos Categories y TypeOfVehicles. */
Categories.belongsToMany(TypeOfVehicles, {
    through: 'Categories_TypeOfVehicles',
    timestamps: false
});
/* Creating a many-to-many relationship between the Categories and Subcategories models. */
/* Crear una relación de muchos a muchos entre los modelos de Categorías y Subcategorías. */
Subcategories.belongsToMany(Categories, {
    through: 'Categories_has_SubCategories',
    timestamps: false
});
/* Exporting the Categories model. */
/* Exportando el modelo de Categorías. */
export { Categories, Subcategories };
//# sourceMappingURL=Associations.js.map