const Dal = require("../UserDal");
const { generateJwt, verifyPassword } = require("../../../libs/utils");
const { verify } = require("jsonwebtoken");

const login = async (email, password) => {
    let response = {};
    let status = 500;
    let users;

    try {

        users = await Dal.query("SELECT * FROM users WHERE email = ?", [email]);
    } catch (error) {
        console.log(error);
        response = {
            message: "Ha ocurrido un error al iniciar sesión.",
            data: null,
        };
        status = 500;
        return {
            status, response,
        };
    }
    console.log(users[0]);
    if (users?.length) {
        const user = users[0];
        if (verifyPassword(password, user.pass)) {
            response = {
                message: "Usuario autentificado correctamente.",
                data: {
                    titulo: "Datos de usuario",
                    id: user.id_user,
                    email: user.email,
                    token: generateJwt({
                        id: user.id_user,
                        email: user.email,
                    }),
                },
            }
            status = 200;
        } else {
            response = {
                message: "Usuario o contraseña incorrectos",
                data: null,
            };
            status = 400;
        }
    } else {
        response = {
            message: "Usuario o contraseña incorrectos",
            data: null,
        };
        status = 400;
    }
    return {
        status, response
    }
};
module.exports = login;





