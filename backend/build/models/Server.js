"use strict";
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
/*
    Spanish: Se hace uso de la librería cors para habilitar el Intercambio de Recursos de Origen Cruzado (CORS)
    y con esto habilitar las solicitudes HTTP de origen cruzado que se inician desde secuencias de comandos que se
    ejecutan en el navegador.
    
    English: The cors library is used to enable the Cross-Origin Resource Sharing (CORS)
    to enable cross-origin HTTP requests that are initiated from scripts running in the browser.
    executed in the browser.
 */
const cors_1 = __importDefault(require("cors"));
/*
    Spanish: Se hace uso de Express, ya que Permite crear API y aplicaciones web fácilmente, dado que nos provee de un
    conjunto de características como manejo de rutas (direccionamiento), archivos estáticos, uso de motor de plantillas,
    integración con bases de datos, manejo de errores, middlewares entre otras. Es a su véz esencial para el desarrollo
    de aplicaciones de negocio, en particular para la automatización y la integración de la tecnología.
    Su enfoque minimalista, su alta escalabilidad, su velocidad y su rendimiento general son solo algunas de las razones
    por las que decidimos utilizar Expressjs.
    
    English: Express is used, since it allows us to create APIs and web applications easily, since it provides us with
    a set of features such as features such as route management (addressing), static files, use of témplate engine,
    integration with databases, error handling, middlewares and others, integration with databases, error handling,
    middlewares among others. It is also essential for business application development, particularly for of business
    applications, in particular for automation and technology integration, its minimalist approach, high scalability,
    speed and overall performance are just some of the reasons why we decided to use Express why we decided to use
    Expressjs.
 */
const express_1 = __importDefault(require("express"));
/*
    Spanish: Se importa el archivo de rutas relacionado a las categorías, en este archivo se encuentran disponibles
    cada una de las peticiones get, post, put y delete asociadas a las acciones que se pueden realizar sobre la tabla de
    categorías.
    
    English: The file of routes related to the categories is imported, in this file are available each one of the get,
    post, put and each of the get, post, put and delete requests associated to the actions that can be performed on the
    category table table.
 */
const categoryRouter_1 = __importDefault(require("../routes/categoryRouter"));
/*
    Spanish: Se importa el archivo connection, ya que este contiene el objeto de coneción a la db (db).
    
    English: The connection file is imported, since it contains the connection object to the db (db).
 */
const connection_1 = __importDefault(require("../db/connection"));
/*
    Spanish: Creamos una clase llamada Server, ya que es una forma de organizar el código asociado al servidor de forma
    entendible con el objetivo de simplificar el funcionamiento de nuestro programa. Además, hay que tener en cuenta que
    en esta clase se pueden generar objetos de asociados a la conexión hacia el servidor y acceder a métodos como listen,
    routes entre otros, cada uno con sus características y funciones concretas.
    
    English: We create a class called Server, since it is a way of organizing the code associated to the server in an
    understandable way in order to understandable in order to simplify the operation of our program. In addition, it is
    necessary to take into account that in this class we can generate objects associated with the connection to the
    server and access methods such as listen, routes among others, each one with its characteristics and
    concrete functions.
 */
class Server {
    constructor() {
        /*
            Spanish: Objeto privado que registra cada uno de los archivos de la carpeta route como rutas disponibles.
            
            English: Private object that records each of the files in the route folder as available routes.
         */
        this.apiPaths = {
            categories: '/api/categories',
        };
        /*
            Spanish: Se inicializa el servidor de express.
        
            English: The express server is initialized
        */
        this.app = (0, express_1.default)();
        /*
            Spanish: Se inicializa el atributo de port para indicarle el puerto donde se ejecutara el servidor.
        
            English:The port attribute is initialized to indicate the port where the server will be executed.
        */
        // @ts-ignore
        this.port = parseInt(process.env.PORT_SERVER) || 8000;
        /*
            Spanish: Se realiza la conexión la base de datos.
        
            English: The database connection is performed.
        */
        this.dbConnection();
        /*
            Spanish: Se habilitan los CORS y la lectura de requests enviados al servidor a través del body en formato JSON.
        
            English: CORS and the reading of requests sent to the server through the body in JSON format are enabled.
        */
        this.middlewares();
        /*
            Spanish: Se registran cada una de las rutas asociadas al sistema.
        
            English: Each of the routes associated with the system are recorded.
        */
        this.routes();
    }
    /*
        Spanish: Método asíncrono que realiza la conexión y autenticación en la base de datos.
        
        English: Asynchronous method that performs the connection and authentication in the database.
    */
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                yield connection_1.default.sync();
                console.log('Successful database connection');
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    middlewares() {
        /*
            Spanish: Se habilita el uso de CORS Y peticiones al servidor.
            
            English: CORS and server requests are enabled.
        */
        this.app.use((0, cors_1.default)());
        /*
            Spanish: Se habilita la lectura de peticiones y respuestas en formato json hacia el servidor a través del body.
            
            English: The reading of requests and responses in json format to the server through the body is enabled.
        */
        this.app.use(express_1.default.json());
    }
    /*
        Spanish: Método se usa para vincular y escuchar las conexiones en el host y puerto especificados.
        
        English: Method is used to bind and listen for connections on specified host and port.
     */
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
    /*
        Spanish: Método se usa para vincular y registrar cada una de las rutas asociadas a los archivos correspondientes.
        
        English: Method is used to link and record each of the paths associated with the corresponding files.
     */
    routes() {
        this.app.use(this.apiPaths.categories, categoryRouter_1.default);
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map