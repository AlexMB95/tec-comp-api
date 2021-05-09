/**
 * Centraliza los servicios de usuario
 */
const signUp = require("./signUp");
const login = require("./login");

const Services = {
    signUp, login
};
module.exports = Services;