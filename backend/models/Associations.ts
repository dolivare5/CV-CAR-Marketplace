import Categories from "./Categories";
import TypeOfVehicles from "./TypeOfVehicles";

Categories.belongsToMany(TypeOfVehicles, {
    through: 'SubCategories_TypeOfVehicles',
    timestamps: false
});

export {
    Categories
}