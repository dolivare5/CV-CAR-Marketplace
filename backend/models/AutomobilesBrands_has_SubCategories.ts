/* Importing the DataTypes and Model from the sequelize library. */
/* Importación de los tipos de datos y el modelo de la biblioteca de sequelize. */
import {DataTypes, Model} from "sequelize";

/* The import of the connection object and sequelize configuration to manipulate the database is performed. */
/* Se realiza la importación del objeto de conexión y configuración de sequelize para manipular la bd. */
import db from "../db/connection";

/* A model is then created to associate the car brands with the subcategories. It is important to note
that this is an object and that it is reflected in the database when the configuration is synchronized.
As for the records that are stored through this model, they contain information about the different subcategories
associated with the brands subcategories associated to the car brands and vice versa within the Marketplace system. */

/* A continuación se crea un modelo para asociar las marca de automobiles con las las subcategorías. Es importante tener en cuenta
que esto es un objeto y que se refleja en la base de datos en el momento en el que se sincroniza la configuración.
En cuanto a los registros que se almacenen a través de este modelo contienen información sobre las diferentes
subcategorías asociadas a las marcas de automobiles  y viceversa dentro sistema de venta (Marketplace). */
class AutomobilesBrands_has_SubCategories extends Model {}

AutomobilesBrands_has_SubCategories.init({
    
    /*  Field that refers to the Subcategories table */
    /* Campo que hace referencia a la tabla de Subcategorías */
    
    SubCategorySubCatId: {
        type : DataTypes.SMALLINT,
        primaryKey : true,
        allowNull : false
    },
    AutomobilesBrandAutBradId: {
        type : DataTypes.SMALLINT,
        primaryKey : true,
        allowNull : false
    },
}, {
    /* The timestamps property is added with the value of false so that the creation and update date columns
     are not added creation and update date columns are not added. */
    
    /* Se agrega la propiedad timestamps con el valor de false para que no se agreguen las columnas de fecha
    de creación y de actualización. */
    timestamps: false,
    sequelize: db,
    modelName:'AutomobilesBrands_has_SubCategories'
});

/* Finally, the model is exported so that it can be used in other parts of the project. */
/* Finalmente se exporta el modelo para que pueda ser utilizado en otras partes del proyecto. */
export default AutomobilesBrands_has_SubCategories;