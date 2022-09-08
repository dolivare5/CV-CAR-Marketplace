/* Importing the DataTypes and Model objects from the sequelize module. */
/* Importación de los objetos DataTypes y Model desde el módulo Sequelize. */
import {DataTypes, Model} from "sequelize";

/* The import of the connection object and sequelize configuration to manipulate the database is performed. */
/* Se realiza la importación del objeto de conexión y configuración de sequelize para manipular la bd. */
import db from "../db/connection";

class TypeOfVehicles extends Model {}

/* A template for creating, modifying, reading and deleting records from the Vehicle Types table is created
below. It is important to note that this is an object and that it is reflected in the database at the time the
configuration is synchronized configuration is synchronized. As for the records that are stored through this model,
they contain information about the different types of vehicles associated with the vehicle information about the
different types of vehicles associated to the sales system (Marketplace). */

/* A continuación se crea un modelo para crear, modificar, leer y eliminar registros de la tabla de Tipos de
Vehículos. Es importante tener en cuenta que esto es un objeto y que se refleja en la base de datos en el momento
en el que se sincroniza la configuración. En cuanto a los registros que se almacenen a través de este modelo contienen
información sobre los diferentes tipos de vehículos asociados al sistema de venta (Marketplace). */

TypeOfVehicles.init({
    /* The TypVeh_Id field refers to the unique identifier of each vehicle type registered in the database.
    the database. In addition to this, this field is a primary key, auto incremental, null values are not accepted,
    the identifier is generated automatically and is of SMALLINT type, since it is sufficient for the number of records to be
    records to be inserted, thus optimizing the database. */
    
    /* El campo TypVeh_Id hace referencia al identificador único de cada tipo de vehículo registrado en
     la base de datos. Adicional a esto, este campo es llave primaria, auto incremental, no se aceptan valores nulos,
     el identificador se genera automáticamente y es de typo SMALLINT, ya que es suficientes para la cantidad de
     registros a insertar y de esta forma se optimiza la base de datos. */
    TypVeh_Id : {
        type : DataTypes.SMALLINT,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    },
    
    /* In the field or column TypVeh_Name the name of the vehicle type is stored. The name is a String type
       (VARCHAR), unique and null values are not accepted in this field. */
    
    /* En el campo o columna TypVeh_Name se almacena el nombre del tipo de vehículo. El nombre es de typo String
       (VARCHAR), único y no se aceptan valores nulos en este campo. */
    
    TypVeh_Name: {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    
    /* The Cat_Description field stores a brief description of the category if the user wants to add it.
     want to add it. This field is optional and is of String type. */
    
    /* El campo Cat_Description almacena una breve descripción de la categoría si el usuario quiere
     agregarla. Este campo es opcional y es de tipo String. */
    TypVeh_Description: {
        type : DataTypes.STRING,
        defaultValue: ''
    },
    
    /* The Cat_Status field stores the status of a category. This field is optional and is of type Smallint */
    /* El campo Cat_Status almacena el estado de una categoría. Este campo es opcional y es de tipo Smallint */
    TypVeh_Status : {
        type : DataTypes.SMALLINT,
        defaultValue: 1
    }
}, {
    /* The timestamps property is added with the value of false so that the creation and update date columns
    are not added creation and update date columns are not added. */
    
    /* Se agrega la propiedad timestamps con el valor de false para que no se agreguen las columnas de fecha
    de creación y de actualización. */
    timestamps: false,
    sequelize: db,
    modelName: 'Type_Of_Vehicles'
});

/*  Finally, the TypeOfVehicles model is exported so that it can be used in other parts of the project. */
/* Finalmente se exporta el modelo TypeOfVehicles para que pueda ser utilizado en otras partes del proyecto. */
export default TypeOfVehicles;