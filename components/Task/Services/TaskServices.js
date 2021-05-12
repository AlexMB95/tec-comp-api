/**
 * Centraliza los servicios de tarea
 */
const addTask = require("./addTask");
const deleteTask = require("./deleteTask");
const viewTask = require("./viewTask");
const taskCompleted = require("./taskCompleted");
const taskIncomplete = require("./taskIncomplete");
const updateTask = require("./updateTask");

const Services = {
    addTask, deleteTask, viewTask, taskCompleted, taskIncomplete, updateTask,
}
module.exports = Services;