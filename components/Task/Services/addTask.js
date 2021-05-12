const Dal = require("../TaskDal");
const { generateJwt } = require("../../../libs/utils");

const addTask = async (title, descript, start_date, end_date, Users_id_user, estado) => {
    let response = {};
    let status = 500;
    let duplicateTask = null;

    //  Busca si no hay tareas respetidas
    try {
        duplicateTask = await Dal.query("SELECT title FROM tasks WHERE title = ?", [title]);
    } catch (error) {
        response = {
            message: "Ha ocurrido un error al registrar tarea.",
            data: null,
        };
        status = 500;
        return {
            status, response
        }
    }

    //  En caso de no existir, inserta tarea a la base de datos.
    if (duplicateTask?.length === 0) {
        try {
            const result = await Dal.query("INSERT INTO tasks (title, descript, start_date, end_date, Users_id_user, estado) VALUES (?, ?, ?, ?, ?, ?)",
                [title, descript, start_date, end_date, Users_id_user, estado]);
            response = {
                message: "Registro de tarea concluido satisfactoriamente.",
                data: {
                    id: result.insertId,
                    title: title,
                    descript: descript,
                    start_date: start_date,
                    end_date: end_date,
                    Users_id_user: Users_id_user,
                    estado: estado,
                    token: generateJwt({
                        id: result.insertId,
                        title: title,
                    }),
                }
            };
            status = 200;
        } catch (error) {
            response = {
                message: error.message,
                data: null,
            };
            status = 500;
        }
    } else {
        response = {
            message: `La tarea ${title} ya está asignada.`,
            data: null,
        };
        status = 400;
    }
    return {
        status, response,
    };
};
module.exports = addTask;