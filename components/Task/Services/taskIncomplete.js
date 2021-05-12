const Dal = require("../TaskDal");

const taskIncomplete = async () => {
    let response = {};
    let status = 500;

    try {
        const result = await Dal.query("SELECT * FROM tasks WHERE estado = 'Incomplete'");
        response = {
            message: "Se cargó la lista de tareas inconclusas.",
            data: result,
        };
        status = 200;
    } catch (error) {
        response = {
            message: "Ha ocurrido un error al cargar la lista de tareas inconclusas.",
            data: null,
        };
        status = 500;
    }
    return {
        status, response
    }
};

module.exports = taskIncomplete;