import { Schema, model } from 'mongoose'

interface ITask {
    forUser: string
    text: string,
    checked: boolean
}

const TaskSchema = new Schema<ITask>({
    forUser: {
        type: String,
        required: [true, 'no id']
    },
    text: {
        type: String,
        required: [true, 'must provide a text']
    },
    checked: {
        type: Boolean,
        default: false
    }
})

export const Task = model<ITask>('Task', TaskSchema)
