const Dal = require("../UserDal");
const { hashPassword, generateJwt } = require("../../../libs/utils");
/**
 * signUp crea un nuevo usuario
 * @param {string} user_name 
 * @param {string} email 
 * @param {string} password 
 * @param {Date} date_birth 
 * @param {string} address 
 * @returns {object}{status: int, response: object}
 */

const signUp = async (user_name, email, pass, date_birth, address) => {
    let response = {};
    let status = 500;
    let duplicateUser = null;

    //  Busca si el usuario está registrado.
    try {
        //console.log(user_name, email, address);
        duplicateUser = await Dal.query("SELECT email FROM users WHERE email = ?", [email]);

    } catch (error) {
        //console.log(error);

        response = {
            message: "Ha ocurrido un error al registrar al usuario.",
            data: null,
        };
        status = 500;
        return {
            status, response
        }
    }


    // En caso de no existir, inserta usuario a la base de datos
    if (duplicateUser?.length === 0) {
        try {
            const result = await Dal.query("INSERT INTO users (user_name, email, pass, date_birth, address) VALUES (?, ?, ?, ?, ?)",
                [user_name, email, hashPassword(pass), date_birth, address]);
            response = {
                message: "Registro de usuario concluido satisfactoriamente.",
                data: {
                    id: result.insertId,
                    email: email,
                    date_birth: date_birth,
                    address: address,
                    token: generateJwt({
                        id: result.insertId,
                        email: email,
                    }),
                },
            };
            status = 200;
        } catch (error) {
            console.log(error);
            response = {
                message: error.message,
                data: null,
            };
            status = 500;
        }
    } else {
        response = {
            message: `El email  ${email} ya está en uso.`,
            data: null,
        };
        status = 400;
    }
    return {
        status,
        response,
    };
};

module.exports = signUp;