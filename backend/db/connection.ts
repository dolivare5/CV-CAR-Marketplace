/*
    Spanish: Sequelize es un ORM que nos permite llamar a funciones de javascript para interactuar con la base de datos
    sin escribir consultas reales. Es bastante útil para acelerar el tiempo de desarrollo
    
    English: Sequelize is an ORM that allows us to call javascript functions to interact with the database without writing actual queries.
    without writing real queries. It is quite useful to speed up development time.
 */
import { Sequelize } from "sequelize";

/*
    Spanish: La librería dotenv permite registrar y configurar las variables de entorno registradas para este proyecto.
    
    English: The dotenv library allows you to register and configure the environment variables registered for this
    project.
 */
import dotenv from "dotenv";
dotenv.config({path:'.env'});

/*
    Spanish: Se hace uso del comentario @ts-ignore para indicarle al compilador de TypeScript que ignore la línea
    debajo de él. Esto lo hago, ya que no sé por qué razón al registrar las variables de entornos en el objeto db
    genera errores por el tipado de datos pero no es relevante por eso lo ignoro. En cuanto a la funcionalidad, este
    objeto se encarga de crear un objeto de configuración para acceder a la base de datos a través dr sequelize.
    
    English: The @ts-ignore comment is used to tell the TypeScript compiler to ignore the line below it.
    below it. I do this because I don't know why registering the environment variables in the db object
    object generates errors due to data typing but it is not relevant so I ignore it. As for the functionality, this
    object is responsible for creating a configuration object to access the database through dr sequelize.
 */
// @ts-ignore
const db = new Sequelize(process.env.POSTGRES_DB_NAME, process.env.POSTGRES_USER, process.env.POSTGRES_PASS,{
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT_BD ,
    dialect: 'postgres',
    /*
        Spanish: Se utiliza un pool de conexiones, ya que este proporciona un conjunto limitado de conexiones la base
        de datos, que es manejado directamente por el servidor de aplicaciones de forma tal, que dichas conexiones
        puedan ser reutilizadas por los diferentes usuarios y de esta forma optimizar los tiempos de respuestas.
        
        English: A connection pool is used, since it provides a limited set of connections to the database, which is
        handled directly by the application server, so that these connections are managed directly by the application
        server Database, which is handled directly by the application server in such a way that these connections can
        be reused by different users and thus optimize response times connections can be reused by different users and
        thus optimize response times.
     */
    pool : {
        /*
            Spanish: Max - Número máximo de conexiones en el pool. Por defecto es 5
            English: Max - Maximum number of connections in pool. Default is 5
         */
        max : 5,
        
        /*
            Spanish: Min - Número mínimo de conexiones en el pool. Por defecto es 0
            English: Min - Minimum number of connections in pool. Default is 0
         */
        min : 0,
        /*
            Spanish: El tiempo máximo, en milisegundos, que el pool intentará obtener la conexión antes de lanzar error.
            English: The maximum time, in milliseconds, that pool will try to get connection before throwing error.
         */
        acquire: 30000,
        /*
            Spanish: El tiempo máximo, en milisegundos, que una conexión puede estar inactiva antes de ser liberada
            English: The maximum time, in milliseconds, that a connection can be idle before being released
         */
        idle: 10000
    },
    /*
        Spanish: Establece los alias de operador disponibles. Establecer esto como un valor booleano ha quedado obsoleto
        y no funciona, pero lo coloco en falso por precaución.
        
        English: Sets the available operator aliases. Setting this as a boolean value has become obsolete
        and does not work but I set it to false as a precaution.
     */
    operatorsAliases: false
})

/*
    Spanish: Finalmente, se exporta este objeto de conexión a la base de datos para hacerlo accesible en otras
    partes del proyecto.
    
    English: Finally, this connection object is exported to the database to make it accessible in other parts of
    the project parts of the project.
 */
export default db;
