/*
    The dotenv library allows you to register and configure the environment variables registered for this
    project.
    
    La librería dotenv permite registrar y configurar las variables de entorno registradas para este proyecto.
*/
import dotenv from "dotenv";

/*
    Spanish: Se hace uso de la clase Server para acceder a los métodos y correr el servidor.
    
    English: The Server class is used to access the methods and run the server.
*/
import Server from "./models/Server";

/*
    Spanish: Se registran las variables entornos.
    
    English: The variables environments are recorded.
*/
dotenv.config();

/*
    Spanish: Creo un nuevo objeto para crear y conectarme al servidor.
    
    English: I create a new object to create and connect to the server.
*/
const server = new Server();

/*
    Spanish: Se hace que el servidor este escuchando los cambios y registrando estos mismos.
    
    English: The server is made to listen for changes and register them.
*/
server.listen();