/**
 * Este script levanta el servidor e importa componentes.
 */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Database = require("./components/Database/Database");
const User = require("./components/User/User");
//const { query } = require("./components/Database/Database");


//  Componentes.


//  Configuración para express.
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //retorna un objeto que pueda usar .use
app.use(cors());

/* Prueba de conexión con base de datos.
app.get("/", async(req, res) => {
    try {
        const result = await Database.query("SELECT * FROM users");
        res.status(200).json({
            message: result,
        });
        
    } catch (error) {
        console.log("Error");
        res.status(500).json({
            message: error,
        });
    }
});
*/
//  Registro de componentes.
app.use("/usuarios", User.api);

//  Levanta servidor
app.listen(3000, () => {
    console.clear();
    console.log("Task running on port 3000");
});