"use strict";
<<<<<<< HEAD
const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware que transforma el req.body a un json.
const PORT = 3000;
app.get("/api", (_req, res) => {
    console.log("Someone ping here!!");
    res.send('pong');
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
=======
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Spanish: La librería dotenv permite registrar y configurar las variables de entorno registradas para este proyecto.
    
    English: The dotenv library allows you to register and configure the environment variables registered for this
    project.
*/
const dotenv_1 = __importDefault(require("dotenv"));
/*
    Spanish: Se hace uso de la clase Server para acceder a los métodos y correr el servidor.
    
    English: The Server class is used to access the methods and run the server.
*/
const Server_1 = __importDefault(require("./models/Server"));
/*
    Spanish: Se registran las variables entornos.
    
    English: The variables environments are recorded.
*/
dotenv_1.default.config();
/*
    Spanish: Creo un nuevo objeto para crear y conectarme al servidor.
    
    English: I create a new object to create and connect to the server.
*/
const server = new Server_1.default();
/*
    Spanish: Se hace que el servidor este escuchando los cambios y registrando estos mismos.
    
    English: The server is made to listen for changes and register them.
*/
server.listen();
//# sourceMappingURL=index.js.map
>>>>>>> 262b98cf3e1350d7d41f51e898a1e9ea8f934db4
