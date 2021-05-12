const Dal = require("../TaskDal");

const viewTask = async () => {
    let response = {};
    let status = 500;

    try {
        const result = await Dal.query("SELECT * FROM tasks");
        response = {
            message: "Se cargó la lista de tareas correctamente.",
            data: result,
        };
        status = 200;
    } catch (error) {
        response = {
            message: "Ha ocurrido un error al cargar la lista de tareas.",
            data: null,
        };
        status = 500;
    }
    return {
        status, response
    }
};

module.exports = viewTask;