import {Schema, model} from "mongoose";

const TaskSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
});

export const Task = model("Task", TaskSchema)