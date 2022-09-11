/* The cors library is used to enable the Cross-Origin Resource Sharing (CORS) to enable cross-origin HTTP requests
that are initiated from scripts running in the browser. executed in the browser. */
/* Se hace uso de la librería cors para habilitar el Intercambio de Recursos de Origen Cruzado (CORS) y con esto
habilitar las solicitudes HTTP de origen cruzado que se inician desde secuencias de comandos que se ejecutan en el
navegador. */
import cors from "cors";
/* Express is used, since it allows us to create APIs and web applications easily, since it provides us with
a set of features such as features such as route management (addressing), static files, use of témplate engine,
integration with databases, error handling, middlewares and others, integration with databases, error handling,
middlewares among others. It is also essential for business application development, particularly for of business
applications, in particular for automation and technology integration, its minimalist approach, high scalability,
speed and overall performance are just some of the reasons why we decided to use Express why we decided to useExpressjs. */
/* Se hace uso de Express, ya que Permite crear API y aplicaciones web fácilmente, dado que nos provee de un
conjunto de características como manejo de rutas (direccionamiento), archivos estáticos, uso de motor de plantillas,
integración con bases de datos, manejo de errores, middlewares entre otras. Es a su véz esencial para el desarrollo
de aplicaciones de negocio, en particular para la automatización y la integración de la tecnología.
Su enfoque minimalista, su alta escalabilidad, su velocidad y su rendimiento general son solo algunas de las razones
por las que decidimos utilizar Expressjs. */
import express from "express";
/* The import of the connection object and sequelize configuration to manipulate the database is performed. */
/* Se realiza la importación del objeto de conexión y configuración de sequelize para manipular la bd. */
import db from "../db/connection";
/* Importing the categoriesRouter from the routes folder. */
/* Importando las categoríasRouter desde la carpeta de rutas. */
import categoriesRouter from "../routes/categoriesRouter";
/* Importing the typeOfVehiclesRouter from the routes folder. */
/* Importando el typeOfVehiclesRouter de la carpeta de rutas. */
import typeOfVehicleRouter from "../routes/typeOfVehiclesRouter";
/* Importing the subCategoriesRouter from the routes folder. */
/* Importando el subCategoriesRouter desde la carpeta de rutas. */
import subCategoriesRouter from "../routes/subCategoriesRouter";
/* Importing the data from the files Categories and Subcategories. */
/* Importación de los datos de los archivos Categorías y Subcategorías. */
import categories from "./Categories";
import subCategories from "./Subcategories";
/* Importing the models from the Associations file. */
/* Importación de los modelos desde el archivo de Asociaciones. */
import { Categories, Subcategories } from "./Associations";
/* Importing the categories_TypeOfVehicleRouter from the routes folder. */
import categories_TypeOfVehicleRouter from "../routes/Categories_TypeOfVehicleRouter";
import categoriesHasSubCategoriesRouter from "../routes/CategoriesHasSubCategoriesRouter";
/* We create a class called Server, since it is a way of organizing the code associated to the server in an
understandable way in order to understandable in order to simplify the operation of our program. In addition, it is
necessary to take into account that in this class we can generate objects associated with the connection to the
server and access methods such as listen, routes among others, each one with its characteristics and
concrete functions. */
/* Creamos una clase llamada Server, ya que es una forma de organizar el código asociado al servidor de forma
entendible con el objetivo de simplificar el funcionamiento de nuestro programa. Además, hay que tener en cuenta que
en esta clase se pueden generar objetos de asociados a la conexión hacia el servidor y acceder a métodos como listen,
routes entre otros, cada uno con sus características y funciones concretas. */
class Server {
    /* Private attribute corresponding to an Express application. */
    /* Atributo privado correspondiente a una aplicación de Express. */
    app;
    /* Private attribute that stores the connection port to the Express server. */
    /* Atributo privado que almacena el puerto de conexión al servidor de Express. */
    port;
    /* Private object that records each of the files in the route folder as available routes. */
    /* Objeto privado que registra cada uno de los archivos de la carpeta de rutas como rutas disponibles. */
    apiPaths = {
        categories: '/api/categories',
        typeOfVehicles: '/api/typeOfVehicles',
        subCategories: '/api/subCategories',
        categoriesHasTypeOfVehicles: '/api/categoriesHasTypeOfVehicles',
        categoriesHasSubcategories: '/api/categoriesHasSubcategories',
    };
    constructor() {
        /* Initializing the app attribute with the express library. */
        /* Inicializando el atributo de la aplicación con la biblioteca express. */
        this.app = express();
        /* The port attribute is initialized to indicate the port where the server will be executed. */
        /* Se inicializa el atributo de puerto para indicar el puerto donde se ejecutará el servidor. */
        // @ts-ignore
        this.port = parseInt(process.env.PORT_SERVER) || 8000;
        /* A method that performs the connection and authentication in the database. */
        /* Un método que realiza la conexión y autenticación en la base de datos. */
        this.dbConnection();
        /* A method that is used to enable the use of CORS and requests to the server. */
        /* Se utiliza para habilitar el uso de CORS y solicitudes al servidor. */
        this.middlewares();
        /* Used to link and register each of the routes associated with the corresponding files. */
        /* Se utiliza para vincular y registrar cada una de las rutas asociadas a los archivos correspondientes. */
        this.routes();
    }
    /* A method that performs the connection and authentication in the database. */
    /* Un método que realiza la conexión y autenticación en la base de datos. */
    async dbConnection() {
        try {
            /* Used to authenticate the connection to the database. */
            /* Se utiliza para autenticar la conexión a la base de datos. */
            await db.authenticate();
            /* Used to synchronize the database with the models. */
            /* Se utiliza para sincronizar la base de datos con los modelos. */
            await db.sync();
            // @ts-ignore
            await Promise.all([Categories.bulkCreate(categories), Subcategories.bulkCreate(subCategories)]);
            console.log('Successful database connection');
        }
        catch (e) {
            console.log(e);
        }
    }
    /* A method that is used to enable the use of CORS and requests to the server. */
    /* Se utiliza para habilitar el uso de CORS y solicitudes al servidor. */
    middlewares() {
        /* CORS and server requests are enabled. */
        /* Se habilitan CORS y solicitudes al servidor. */
        this.app.use(cors());
        /*  The reading of requests and responses in json format to the server through the body is enabled. */
        /* Se habilita la lectura de solicitudes y respuestas en formato json hacia el servidor a través del body. */
        this.app.use(express.json());
    }
    /**
     * The listen function is a method of the App class that creates a server that listens for requests on the port
     * specified in the constructor
     */
    /**
     * La función de escucha es un método de la clase App que crea un servidor que escucha las solicitudes en el puerto
     * especificado en el constructor.
     */
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
    /**
     * This function is used to set up the routes for the API
     */
    /**
     * Esta función se utiliza para configurar las rutas para la API
     */
    routes() {
        this.app.use(this.apiPaths.categories, categoriesRouter);
        this.app.use(this.apiPaths.typeOfVehicles, typeOfVehicleRouter);
        this.app.use(this.apiPaths.subCategories, subCategoriesRouter);
        this.app.use(this.apiPaths.categoriesHasTypeOfVehicles, categories_TypeOfVehicleRouter);
        this.app.use(this.apiPaths.categoriesHasSubcategories, categoriesHasSubCategoriesRouter);
    }
}
/* Exporting the Server class to be used in other files. */
/* Exportación de la clase Servidor para ser utilizada en otros archivos. */
export default Server;
//# sourceMappingURL=Server.js.map