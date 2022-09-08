"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categories = void 0;
/* Importing the Categories model from the Categories.js file. */
/* Importando el modelo de categorías del archivo Categories.js. */
const Categories_1 = __importDefault(require("./Categories"));
exports.Categories = Categories_1.default;
/* Importing the TypeOfVehicles model from the TypeOfVehicles.js file. */
/* Importación del modelo TypeOfVehicles del archivo TypeOfVehicles.js. */
const TypeOfVehicles_1 = __importDefault(require("./TypeOfVehicles"));
/* Create a many-to-many relationship between Categories and TypeOfVehicles models. */
/* Crear una relación de muchos a muchos entre los modelos Categories y TypeOfVehicles. */
Categories_1.default.belongsToMany(TypeOfVehicles_1.default, {
    through: 'Categories_TypeOfVehicles',
    timestamps: false
});
//# sourceMappingURL=Associations.js.map