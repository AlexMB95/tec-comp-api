/**
 * Este archivo cetraliza las funciones a las que todos los componentes pueden acceder.
 */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const utils = {
    /**
     * Esta función se encarga de encriptar un string
     * @param {String} password Constraseñña a encriptar
     * @returns {String} Constraseña encriptada
     */
    hashPassword: (password) =>
        bcrypt.hashSync(password, parseInt(process.env.COST_FACTOR)),


    /**
     * Esta función verifica que las contraseñas coincidan
     * @param {string} password Constraseña sin encriptar
     * @param {string} encryptedPassword Contraseña encriptada
     * @returns {boolean} True = si la compración es correcta
     */
    verifyPassword: (password, encryptedPassword) =>
        bcrypt.compareSync(password, encryptedPassword),


    /**
     * Genera un nuevo JW
     * @param {object} data
     * @returns {string} JWT
     */
    generateJwt: (data) =>
        jwt.sign(data, process.env.JWT_PASSWORD, { expiresIn: "7d" }),


    /**
     * Verifica si el token enviado es válido
     * @param {string} token Web token
     * @returns JWT desencriptado o un error que se debe catchear
     */
    verifyJwt: (token) => jwt.verify(token, process.env.JWT_PASSWORD)
};

module.exports = utils;
