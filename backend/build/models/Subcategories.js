/* Importing the DataTypes and Model from the sequelize library. */
/* Importación de los tipos de datos y el modelo de la biblioteca de sequelize. */
import { DataTypes, Model } from "sequelize";
/* The import of the connection object and sequelize configuration to manipulate the database is performed. */
/* Se realiza la importación del objeto de conexión y configuración de sequelize para manipular la bd. */
import db from "../db/connection";
/* A template for creating, modifying, reading and deleting records from the SubCategories table is created
below. It is important to note that this is an object and that it is reflected in the database at the time of the
configuration is synchronized. As for the records that are stored through this model, they contain information
about the categories of the different vehicles information about the categories of the different vehicles
associated to the sales system (Marketplace). */
/* A continuación se crea un modelo para crear, modificar, leer y eliminar registros de la tabla de SubCategorías.
Es importante tener en cuenta que esto es un objeto y que se refleja en la base de datos en el momento en el que se
sincroniza la configuración. En cuanto a los registros que se almacenen a través de este modelo contienen
información sobre las categorías de los diferentes vehículos asociados al sistema de venta (Marketplace). */
class SubCategories extends Model {
}
SubCategories.init({
    /* The Cat_Id field refers to the unique identifier of each record or subcategory registered in the database.
     the database. In addition to this, this field is a primary key, auto incremental, null values are not accepted,
     the identifier is automatically generated and is of SMALLINT type, since it is sufficient for the number of
     records to be inserted and thus number of records to be inserted, thus optimizing the database.*/
    /* El campo Cat_Id hace referencia al identificador único de cada registro o subcategoría registrada en
     la base de datos. Adicional a esto, este campo es llave primaria, auto incremental, no se aceptan valores nulos,
     el identificador se genera automáticamente y es de typo SMALLINT, ya que es suficientes para la cantidad de
     registros a insertar y de esta forma se optimiza la base de datos.  */
    SubCat_Id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    /* The Cat_Name field or column stores the name of the subcategory. The name is a String type
    (VARCHAR), unique and null values are not accepted in this field. */
    /* En el campo o columna Cat_Name se almacena el nombre de la subcategoría. El nombre es de typo String
    (VARCHAR), único y no se aceptan valores nulos en este campo. */
    SubCat_Name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    /* The Cat_Description field stores a short description of the subcategory if the user wants to add it.
    to add it. This field is optional and is of String type. */
    /* El campo Cat_Description almacena una breve descripción de la subcategoría si el usuario quiere
    agregarla. Este campo es opcional y es de tipo String. */
    SubCat_Description: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    /* The Cat_Status field stores the status of a subcategory. This field is optional and is of type Smallint. */
    /* El campo Cat_Status almacena el estado de una subcategoría. Este campo es opcional y es de tipo Smallint. */
    SubCat_Status: {
        type: DataTypes.SMALLINT,
        defaultValue: 1
    }
}, {
    /* The timestamps property is added with the value of false so that the creation and update date columns
    are not added creation and update date columns are not added. */
    /* Se agrega la propiedad timestamps con el valor de false para que no se agreguen las columnas de fecha
    de creación y de actualización. */
    timestamps: false,
    sequelize: db,
    modelName: 'SubCategories'
});
/* Finally, the SubCategories model is exported so that it can be used in other parts of the project. */
/* Finalmente se exporta el modelo SubCategories para que pueda ser utilizado en otras partes del proyecto. */
export default SubCategories;
//# sourceMappingURL=Subcategories.js.map