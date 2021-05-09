/**
 * Instancia de express para servicios de usuario
 */
const express = require("express");
const cors = require("cors");
const Services = require("./Services/UserServices");
const Middleware = require("../Middleware/Middleware");

const User = express.Router();

//  Configuración para express
User.use(express.urlencoded({ extended: true }));
User.use(express.json()); //retorna un objeto que pueda usar .use
User.use(cors());

/*
User.get("/all", async (req, res) =>{
    try {
        const result= await Dal.query("SELECT Id_user, email FROM users");
        res.status(200).json({
            message: result, 
        });
        
    } catch (error) {
        res.status(500).json({
            message: error,
        });
        
    }
    });
*/

User.post("/sign-up", async (req, res) => {
    console.log(req.body);
    let { user_name, email, pass, date_birth, address } = req.body;
    const { status, response } = await Services.signUp(user_name, email, pass, date_birth, address);
    res.status(status).json(response);
});

User.post("/login", async (req, res) => {
    console.log(req.body);
    let { email, pass } = req.body;
    const { status, response } = await Services.login(email, pass);
    res.status(status).json(response);
});

User.post("/rute-secret", Middleware, (req, res) => {
    res.status(200).json({
        hola: "mundo",
        data: req.jwData,
    })
});

module.exports = User;
