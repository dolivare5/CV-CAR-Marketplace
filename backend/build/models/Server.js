"use strict";
/* The cors library is used to enable the Cross-Origin Resource Sharing (CORS) to enable cross-origin HTTP requests
that are initiated from scripts running in the browser. executed in the browser. */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Se hace uso de la librería cors para habilitar el Intercambio de Recursos de Origen Cruzado (CORS) y con esto
habilitar las solicitudes HTTP de origen cruzado que se inician desde secuencias de comandos que se ejecutan en el
navegador. */
const cors_1 = __importDefault(require("cors"));
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
const express_1 = __importDefault(require("express"));
/* The import of the connection object and sequelize configuration to manipulate the database is performed. */
/* Se realiza la importación del objeto de conexión y configuración de sequelize para manipular la bd. */
const connection_1 = __importDefault(require("../db/connection"));
/* Importing the categoriesRouter from the routes folder. */
/* Importando las categoríasRouter desde la carpeta de rutas. */
const categoriesRouter_1 = __importDefault(require("../routes/categoriesRouter"));
/* Importing the typeOfVehiclesRouter from the routes folder. */
/* Importando el typeOfVehiclesRouter de la carpeta de rutas. */
const typeOfVehiclesRouter_1 = __importDefault(require("../routes/typeOfVehiclesRouter"));
/* Importing the subCategoriesRouter from the routes folder. */
/* Importando el subCategoriesRouter desde la carpeta de rutas. */
const subCategoriesRouter_1 = __importDefault(require("../routes/subCategoriesRouter"));
/* Importing the categories from the Categories.ts file. */
/* Importando las categorías del archivo Categories.ts. */
const Categories_1 = __importDefault(require("./Categories"));
/* Importing the Categories model from the Associations.ts file. */
/* Importando el modelo de Categorías del archivo Associations.ts. */
const Associations_1 = require("./Associations");
/* Importing the categories_TypeOfVehicleRouter from the routes folder. */
const Categories_TypeOfVehicleRouter_1 = __importDefault(require("../routes/Categories_TypeOfVehicleRouter"));
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
    constructor() {
        /* Private object that records each of the files in the route folder as available routes. */
        /* Objeto privado que registra cada uno de los archivos de la carpeta de rutas como rutas disponibles. */
        this.apiPaths = {
            categories: '/api/categories',
            typeOfVehicles: '/api/typeOfVehicles',
            subCategories: '/api/subCategories',
            categoriesAsTypeOfVehicles: '/api/categoriesAsTypeOfVehicles',
        };
        /* Initializing the app attribute with the express library. */
        /* Inicializando el atributo de la aplicación con la biblioteca express. */
        this.app = (0, express_1.default)();
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
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                /* Used to authenticate the connection to the database. */
                /* Se utiliza para autenticar la conexión a la base de datos. */
                yield connection_1.default.authenticate();
                /* Used to synchronize the database with the models. */
                /* Se utiliza para sincronizar la base de datos con los modelos. */
                yield connection_1.default.sync();
                // @ts-ignore
                yield Promise.all([Associations_1.Categories.bulkCreate(Categories_1.default)]);
                console.log('Successful database connection');
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    /* A method that is used to enable the use of CORS and requests to the server. */
    /* Se utiliza para habilitar el uso de CORS y solicitudes al servidor. */
    middlewares() {
        /* CORS and server requests are enabled. */
        /* Se habilitan CORS y solicitudes al servidor. */
        this.app.use((0, cors_1.default)());
        /*  The reading of requests and responses in json format to the server through the body is enabled. */
        /* Se habilita la lectura de solicitudes y respuestas en formato json hacia el servidor a través del body. */
        this.app.use(express_1.default.json());
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
        this.app.use(this.apiPaths.categories, categoriesRouter_1.default);
        this.app.use(this.apiPaths.typeOfVehicles, typeOfVehiclesRouter_1.default);
        this.app.use(this.apiPaths.subCategories, subCategoriesRouter_1.default);
        this.app.use(this.apiPaths.categoriesAsTypeOfVehicles, Categories_TypeOfVehicleRouter_1.default);
    }
}
/* Exporting the Server class to be used in other files. */
/* Exportación de la clase Servidor para ser utilizada en otros archivos. */
exports.default = Server;
//# sourceMappingURL=Server.js.map