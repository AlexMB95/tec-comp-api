/**
 * Capa de acceso de datos (Data Accers Layer)
 */
const Database = require("../Database/Database");
const TaskDal = {
    query: Database.query,
};
module.exports = TaskDal;