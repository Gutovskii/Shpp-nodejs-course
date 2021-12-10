const Task = require('../models/Task')

const getItems = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({ items: tasks })
    } catch (err) {
        res.status(500).json(err)
    }
}

const addItem = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ id: task._id })
    } catch (err) {
        res.status(500).json(err)
    }
}

const changeItem = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate({ _id: req.body.id}, req.body, {
             runValidators: true
        })
        res.status(201).json({ ok: true })
    } catch (err) {
        res.status(500).json(err)
    }
}

const deleteItem = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.body.id })
        res.status(200).json({ ok: true })
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    getItems,
    addItem,
    changeItem,
    deleteItem
}