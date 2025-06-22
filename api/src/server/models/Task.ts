import mongoose from "mongoose";
import { TaskStatus } from "./enums/TaskStatus";

const Schema = mongoose.Schema;
const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true,
        enum: Object.values(TaskStatus),
        default: TaskStatus.PENDING
    },

}, {
    timestamps: true
});

const Task = mongoose.model('Task', TaskSchema);
export default Task;