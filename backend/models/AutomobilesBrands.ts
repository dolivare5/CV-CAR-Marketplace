/* Importing the DataTypes and Model from the sequelize library. */
/* Importación de los tipos de datos y el modelo de la biblioteca de sequelize. */
import { DataTypes, Model } from "sequelize";

/* The import of the connection object and sequelize configuration to manipulate the database is performed. */
/* Se realiza la importación del objeto de conexión y configuración de sequelize para manipular la bd. */
import db from "../db/connection";

/* A template for creating, modifying, reading and deleting records from the Automobile Marks table is created below.
It is important to note that this is an object and that it is reflected in the database at the time the configuration is synchronized.
configuration is synchronized. As for the records that are stored through this template they contain
information about the types of cars registered in the sales system (Marketplace). */

/* A continuación se crea un modelo para crear, modificar, leer y eliminar registros de la tabla Marcas de automóviles.
Es importante tener en cuenta que esto es un objeto y que se refleja en la base de datos en el momento en el que se
sincroniza la configuración. En cuanto a los registros que se almacenen a través de este modelo contienen
información sobre los Tipos de automóviles registrados en sistema de venta (Marketplace). */
class AutomobilesBrands extends Model {}

/* The fields of the table are defined below. */
/* A continuación se definen los campos de la tabla. */
AutomobilesBrands.init(
    {
        /* The id field is defined below. */
        /* Se define el campo id a continuación. */
        AutBrand_Id: {
            /* The type of data that the field will contain is defined. */
            /* Se define el tipo de dato que contendrá el campo. */
            type: DataTypes.SMALLINT,
            /* The primary key is defined. */
            /* Se define la llave primaria. */
            primaryKey: true,
            /* The autoincrement is defined. */
            /* Se define el autoincremento. */
            autoIncrement: true,
            /* The field is not null. */
            /* El campo no es nulo. */
            allowNull: false,
        },
        /* The AutMov_Nombre field is defined below. */
        /* Se define el campo AutMov_Nombre a continuación. */
        AutBrand_Name: {
            /* The type of data that the field will contain is defined. */
            /* Se define el tipo de dato que contendrá el campo. */
            type: DataTypes.STRING(50),
            /* The field is not null. */
            /* El campo no es nulo. */
            allowNull: false,
            unique: true
        },
        /* The AutMov_Description field is defined below. */
        /* Se define el campo AutMov_Description a continuación. */
        AutBrand_Description: {
            /* The type of data that the field will contain is defined. */
            /* Se define el tipo de dato que contendrá el campo. */
            type: DataTypes.STRING(100),
            defaultValue: ''
        },
        
        AutBrand_Logo: {
            /* The type of data that the field will contain is defined. */
            /* Se define el tipo de dato que contendrá el campo. */
            type: DataTypes.BLOB,
            
        },
        
        /* The AutMov_Estado field is defined below. */
        /* Se define el campo AutMov_Estado a continuación. */
        AutBrand_Status: {
            /* The type of data that the field will contain is defined. */
            /* Se define el tipo de dato que contendrá el campo. */
            type: DataTypes.SMALLINT,
            defaultValue: 1,
        }
    },
    {
        /* The sequelize configuration is synchronized with the database. */
        /* Se sincroniza la configuración de sequelize con la base de datos. */
        sequelize: db,
        /* The name of the table is defined. */
        /* Se define el nombre de la tabla. */
        modelName: "AutomobilesBrands",
        timestamps: false,
    }
);

/* The export of the model is performed. */
/* Se realiza la exportación del modelo. */
export default AutomobilesBrands;