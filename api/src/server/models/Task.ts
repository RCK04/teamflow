import mongoose from "mongoose";

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
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },

}, {
    timestamps: true
});

const Task = mongoose.model('Task', TaskSchema);
export default Task;