"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    completed: { type: Boolean, default: false },
    userId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true
    },
});
exports.Task = (0, mongoose_1.model)('Task', taskSchema);
