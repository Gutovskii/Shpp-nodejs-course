const mongoose = require('mongoose')

const task = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'must provide a text']
    },
    checked: {
        type: Boolean,
        default: false
    }
})

const Task = mongoose.model('Task', task)

module.exports = Task