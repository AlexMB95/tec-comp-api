const Dal = require("../TaskDal");

const deleteTask = async (title) => {
    let response = {};
    let status = 500;
    let Task = null;

    //  Busca si existe la tarea.
    try {
        Task = await Dal.query("SELECT title FROM tasks WHERE title = ?", [title]);
    } catch (error) {
        response = {
            message: "Ha ocurrido un error al buscar tarea.",
            data: null,
        };
        status = 500;
        return {
            status, response
        }
    }

    //  Si la tarea existe, se elimina con el siguiente if.
    if (Task?.length) {
        try {
            const result = await Dal.query("DELETE FROM tasks WHERE title = ?", [title]);
            response = {
                message: "Se eliminó la tarea correctamente.",
                data: null,
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
            message: `La tarea ${title} no existe.`,
            data: null,
        };
        status = 400;

    }
    return {
        status, response,
    };
};
module.exports = deleteTask;