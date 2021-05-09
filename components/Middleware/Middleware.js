const { verifyJwt } = require("../../libs/utils");

const Middleware = (req, res, next) => {
    try {
        const jwtData = verifyJwt(req.headers.authorization); //Recibe autorización
        req.jwtData = jwtData;
        next();
    } catch (error) {
        res.status(401).json({
            message: "No se encuentra autentificado"
        });
    }
};

module.exports = Middleware;