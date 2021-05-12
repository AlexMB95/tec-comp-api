const express = require("express");
const cors = require("cors");
const Services = require("./Services/TaskServices");

const Task = express.Router();

//  Configuración de express.
Task.use(express.urlencoded({ extended: true }));
Task.use(express.json());
Task.use(cors());

//  Ruta de cada servicio.
Task.post("/add-task", async (req, res) => {
    console.log(req.body);
    let { title, descript, start_date, end_date, Users_id_user, estado } = req.body;
    const { status, response } = await Services.addTask(title, descript, start_date, end_date, Users_id_user, estado);
    res.status(status).json(response);
});

Task.delete("/delete-task", async (req, res) => {
    console.log(req.body);
    let { title } = req.body;
    const { status, response } = await Services.deleteTask(title);
    res.status(status).json(response);
});

Task.get("/watch-list", async (req, res) => {
    const { status, response } = await Services.viewTask();
    res.status(status).json(response);
});

Task.get("/watch-task-completed", async (req, res) => {
    const { status, response } = await Services.taskCompleted();
    res.status(status).json(response);
});

Task.get("/watch-task-incomplete", async (req, res) => {
    const { status, response } = await Services.taskIncomplete();
    res.status(status).json(response);
});

Task.put("/update-task", async (req, res) => {
    console.log(req.body);
    let { title, descript, start_date, end_date, Users_id_user, estado } = req.body;
    const { status, response } = await Services.updateTask(title, descript, start_date, end_date, Users_id_user, estado);
    res.status(status).json(response);
});

module.exports = Task;