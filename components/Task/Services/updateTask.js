const Dal = require("../TaskDal");

const updateTask = async (title, descript, start_date, end_date, Users_id_user, estado) => {
    let response = {};
    let status = 500;
    let checkTask = null;

    //  Antes de actualizar, se busca si la tarea existe.
    try {
        checkTask = await Dal.query("SELECT title FROM tasks WHERE title =?", [title]);
    } catch (error) {
        response = {
            message: "Ha ocurrido un error al buscar dicha tarea.",
            data: null,
        };
        status = 500;
        return {
            status, response,
        }
    }

    //  Si la tarea existe, se actualizará.
    if (checkTask?.length) {
        try {
            const result = await Dal.query("UPDATE tasks SET title = ?, descript = ?, start_date= ?, end_date= ?, Users_id_user= ?, estado= ? WHERE title = ?",
                [title, descript, start_date, end_date, Users_id_user, estado, title]);
            response = {
                message: "Se actualizó la tarea correctamente.",
                data: {
                    id: result.insertId,
                    title: title,
                    descript: descript,
                    start_date: start_date,
                    end_date: end_date,
                    Users_id_user: Users_id_user,
                    estado: estado,
                }
            };
            status = 200;
        } catch (error) {
            console.log(error)
            response = {
                message: error.message,
                data: null,
            };
            status = 500;
        }
    } else {
        response = {
            message: `La tarea ${title} ya fue actualizada.`,
            data: null,
        };
        status = 400;
    }
    return {
        status, response,
    };
};
module.exports = updateTask;