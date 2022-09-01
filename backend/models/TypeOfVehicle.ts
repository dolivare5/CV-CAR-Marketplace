/*
    Spanish: Se hace uso de DataType para acceder a los datos incorporados por sequelize
    English: DataType is used to access the data incorporated by sequelize
 */
import {DataTypes} from "sequelize";

/*
    Spanish: Se realiza la importación del objeto de conexión y configuración de sequelize para manipular la bd.
    The import of the connection object and sequelize configuration to manipulate the database is performed.
 */
import db from "../db/connection";

/*
    Spanish: A continuación se crea un modelo para crear, modificar, leer y eliminar registros de la tabla de Tipos de
    Vehículos. Es importante tener en cuenta que esto es un objeto y que se refleja en la base de datos en el momento
    en el que se sincroniza la configuración. En cuanto a los registros que se almacenen a través de este modelo contienen
    información sobre los diferentes tipos de vehículos asociados al sistema de venta (Marketplace).
    
    English: A template for creating, modifying, reading and deleting records from the Vehicle Types table is created
    below. It is important to note that this is an object and that it is reflected in the database at the time the
    configuration is synchronized configuration is synchronized. As for the records that are stored through this model,
    they contain information about the different types of vehicles associated with the vehicle information about the
    different types of vehicles associated to the sales system (Marketplace).
 */
const TypeOfVehicle = db.define('Type_Of_Vehicle', {
    /*
        Spanish: El campo TypVeh_Id hace referencia al identificador único de cada tipo de vehículo registrado en
        la base de datos. Adicional a esto, este campo es llave primaria, auto incremental, no se aceptan valores nulos,
        el identificador se genera automáticamente y es de typo SMALLINT, ya que es suficientes para la cantidad de
        registros a insertar y de esta forma se optimiza la base de datos.
        
        English: The TypVeh_Id field refers to the unique identifier of each vehicle type registered in the database.
        the database. In addition to this, this field is a primary key, auto incremental, null values are not accepted,
        the identifier is generated automatically and is of SMALLINT type, since it is sufficient for the number of records to be
        records to be inserted, thus optimizing the database.
     */
    TypVeh_Id : {
        type : DataTypes.SMALLINT,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    },
    
    /*
        Spanish: En el campo o columna TypVeh_Name se almacena el nombre del tipo de vehículo. El nombre es de typo String
        (VARCHAR), único y no se aceptan valores nulos en este campo.
        
        English: In the field or column TypVeh_Name the name of the vehicle type is stored. The name is a String type
        (VARCHAR), unique and null values are not accepted in this field.
     */
    TypVeh_Name: {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    
    /*
        Spanish: El campo Cat_Description almacena una breve descripción de la categoría si el usuario quiere
        agregarla. Este campo es opcional y es de tipo String.
        
        English: English: The Cat_Description field stores a brief description of the category if the user wants to add it.
        want to add it. This field is optional and is of String type.
     */
    TypVeh_Description: {
        type : DataTypes.STRING,
        defaultValue: ''
    },
    
    /*
        Spanish: El campo TypVeh_Status almacena el estado de un tipo de vehículo. Este campo es opcional y es de tipo Smallint.
        
        English: English: The Cat_Status field stores the status of a category. This field is optional and is of type Smallint
     */
    TypVeh_Status : {
        type : DataTypes.SMALLINT,
        defaultValue: 1
    }
},{
    /*
       Spanish: Se agrega la propiedad timestamps con el valor de false para que no se agreguen las columnas de fecha
       de creación y de actualización.
       
       English: The timestamps property is added with the value of false so that the creation and update date columns
       are not added creation and update date columns are not added.
    */
    timestamps: false
})

/*
    Spanish: Finalmente, se exporta el modelo de TypeOfVehicle para que se pueda utilizar en otras partes del proyecto.
    English: Finally, the TypeOfVehicle model is exported so that it can be used in other parts of the project.
*/
export default TypeOfVehicle;