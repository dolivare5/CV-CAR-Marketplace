"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categories = void 0;
const Categories_1 = __importDefault(require("./Categories"));
exports.Categories = Categories_1.default;
const TypeOfVehicles_1 = __importDefault(require("./TypeOfVehicles"));
Categories_1.default.belongsToMany(TypeOfVehicles_1.default, {
    through: 'SubCategories_TypeOfVehicles',
    timestamps: false
});
//# sourceMappingURL=Associations.js.map