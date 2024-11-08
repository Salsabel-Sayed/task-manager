"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterCompletedTasks = exports.deleteAllTasks = exports.deleteSpecificTask = exports.updateCompletedTask = exports.updateTask = exports.getSpecificTask = exports.getAllTasks = exports.createTask = void 0;
const CatchErrors_1 = require("../../middleware/Errors/CatchErrors");
const tasks_models_1 = require("./tasks.models");
const AppErrors_1 = require("../../middleware/Errors/AppErrors");
const auth_models_1 = require("../auth/auth.models");
// import {CustomRequest} from "../auth/auth.models"
// * create task
exports.createTask = (0, CatchErrors_1.CatchErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, description, completed = false } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const task = yield tasks_models_1.Task.create({ title, description, completed, userId });
    yield auth_models_1.User.findByIdAndUpdate(userId, { $push: { tasks: task._id } }, { new: true });
    res.status(201).json({ message: "done! task created succesfully *-*", task });
}));
// ? //////////////////////////////////////////////////////////////////////////////////////////////////////
// * get all user tasks 
exports.getAllTasks = (0, CatchErrors_1.CatchErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const tasks = yield tasks_models_1.Task.find({ userId });
    res.json({ message: "all user tasks here", tasks });
}));
// ? //////////////////////////////////////////////////////////////////////////////////////////////////////
// * get specific task
exports.getSpecificTask = (0, CatchErrors_1.CatchErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const taskId = req.params.id;
    const task = yield tasks_models_1.Task.findOne({ _id: taskId, userId: userId });
    if (!task)
        return next(new AppErrors_1.AppErrors("Task not found or you do not have permission to view this task", 404));
    res.json({ message: "task found", task });
}));
// ? //////////////////////////////////////////////////////////////////////////////////////////////////////
// * update task
exports.updateTask = (0, CatchErrors_1.CatchErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const taskId = req.params.id;
    const task = yield tasks_models_1.Task.findOne({ _id: taskId, userId: userId });
    if (!task)
        return next(new AppErrors_1.AppErrors("Task not found or you do not have permission to view this task", 404));
    const { title, description, completed } = req.body;
    const updatedTask = yield tasks_models_1.Task.findByIdAndUpdate(taskId, { title, description, completed }, { new: true });
    // Object.assign(task, req.body); // Update task properties with the values from the request body  
    // await task.save(); 
    res.json({ message: "task updated", updatedTask });
}));
// ? //////////////////////////////////////////////////////////////////////////////////////////////////////
// * update completed tasks
exports.updateCompletedTask = (0, CatchErrors_1.CatchErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const taskId = req.params.id;
    const task = yield tasks_models_1.Task.findOne({ _id: taskId, userId: userId });
    if (!task)
        return next(new AppErrors_1.AppErrors("Task not found or you do not have permission to update this task", 404));
    const { completed } = req.body;
    const updatedTask = yield tasks_models_1.Task.findByIdAndUpdate(taskId, { completed: completed === "yes" }, { new: true });
    res.json({ message: "task updated", updatedTask });
}));
// ? //////////////////////////////////////////////////////////////////////////////////////////////////////
// * delete specific task
exports.deleteSpecificTask = (0, CatchErrors_1.CatchErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const taskId = req.params.id;
    const task = yield tasks_models_1.Task.findOne({ _id: taskId, userId: userId });
    if (!task)
        return next(new AppErrors_1.AppErrors("Task not found or you do not have permission to delete this task", 404));
    yield auth_models_1.User.findByIdAndUpdate(userId, { $pull: { tasks: taskId } });
    const deletedTask = yield tasks_models_1.Task.findByIdAndDelete(taskId);
    res.json({ message: "task deleted", deletedTask });
}));
// ? //////////////////////////////////////////////////////////////////////////////////////////////////////
// * delete all user tasks
exports.deleteAllTasks = (0, CatchErrors_1.CatchErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const findAllTasks = yield tasks_models_1.Task.find({ userId });
    if (!findAllTasks)
        return next(new AppErrors_1.AppErrors("cant find user tasks! ,sorry!", 404));
    const deletedTasks = yield tasks_models_1.Task.deleteMany({ userId });
    yield auth_models_1.User.findByIdAndUpdate(userId, { $set: { tasks: [] } });
    res.json({ message: "tasks deleted", deletedTasks });
}));
// ? //////////////////////////////////////////////////////////////////////////////////////////////////////
// * filter completed tasks
exports.filterCompletedTasks = (0, CatchErrors_1.CatchErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const { status } = req.query;
    let filter = { userId: userId };
    if (status === 'completed') {
        filter.completed = true;
    }
    else if (status === 'not-completed') {
        filter.completed = false;
    }
    const tasks = yield tasks_models_1.Task.find(filter);
    res.json({ message: "filtered tasks", tasks });
}));
