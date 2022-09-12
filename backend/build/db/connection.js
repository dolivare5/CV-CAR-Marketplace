/* Sequelize is an ORM that allows us to call javascript functions to interact with the database without writing actual queries.
without writing real queries. It is quite useful to speed up development time. */
/* Sequelize es un ORM que nos permite llamar a funciones de javascript para interactuar con la base de datos
sin escribir consultas reales. Es bastante útil para acelerar el tiempo de desarrollo */
import { Sequelize } from "sequelize";
/* The dotenv library allows you to register and configure the environment variables registered for this project. */
/* La librería dotenv permite registrar y configurar las variables de entorno registradas para este proyecto. */
import dotenv from "dotenv";
/* Loading the environment variables from the .env file. */
/* Cargando las variables de entorno desde el archivo .env. */
dotenv.config({ path: '.env' });
/* Creating a connection to the database. */
/* Creación de una conexión a la base de datos. */
const db = new Sequelize(process.env.POSTGRES_DB_NAME || '', process.env.POSTGRES_USER || '', process.env.POSTGRES_PASS || '', {
    host: process.env.POSTGRES_HOST || '',
    port: parseInt(process.env.POSTGRES_PORT_BD || '5432'),
    dialect: 'postgres',
    /* A connection pool is used, since it provides a limited set of connections to the database, which is
    handled directly by the application server, so that these connections are managed directly by the application
    server Database, which is handled directly by the application server in such a way that these connections can
    be reused by different users and thus optimize response times connections can be reused by different users and
    thus optimize response times.*/
    /* Se utiliza un pool de conexiones, ya que este proporciona un conjunto limitado de conexiones la base
    de datos, que es manejado directamente por el servidor de aplicaciones de forma tal, que dichas conexiones
    puedan ser reutilizadas por los diferentes usuarios y de esta forma optimizar los tiempos de respuestas.*/
    pool: {
        /* Max - Maximum number of connections in pool. Default is 5 */
        /* Max - Número máximo de conexiones en el pool. Por defecto es 5 */
        max: 5,
        /* Min - Minimum number of connections in pool. Default is 0 */
        /* Min - Número mínimo de conexiones en el pool. Por defecto es 0 */
        min: 0,
        /* The maximum time, in milliseconds, that pool will try to get connection before throwing error. */
        /* El tiempo máximo, en milisegundos, que el pool intentará obtener una conexión antes de lanzar un error. */
        acquire: 30000,
        /* The maximum time, in milliseconds, that a connection can be idle before being released */
        /* El tiempo máximo, en milisegundos, que una conexión puede estar inactiva antes de ser liberada */
        idle: 10000
    }
});
/* Finally, this connection object is exported to the database to make it accessible in other parts of the project parts of the project. */
/* Finalmente, este objeto de conexión es exportado a la base de datos para que sea accesible en otras partes del proyecto. */
export default db;
//# sourceMappingURL=connection.js.map