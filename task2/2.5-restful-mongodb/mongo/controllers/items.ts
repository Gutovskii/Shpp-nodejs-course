import { Task } from '../models/Task'

export const getItems = async (req: any, res: any) => {
    if (!req.session.userId) return res.status(500).json({ "error": "forbidden" })

    try {
        const tasks = await Task.find({ forUser: req.session.userId })
        res.status(200).json({ items: tasks })
    } catch (err) {
        res.status(500).json(err)
    }
}

export const addItem = async (req: any, res: any) => {
    try {
        if (!req.session.userId && !req.body.hasOwnProperty('text')) return res.status(400).json({ "error": "Bad Request" })

        req.body.forUser = req.session.userId
        const task = await Task.create(req.body)
        res.status(201).json({ _id: task._id })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

export const changeItem = async (req: any, res: any) => {
    try {
        if (!req.session.userId) return res.status(400).send({ "error": "Bad Request" })
        
        const task = await Task.findOneAndUpdate({ _id: req.body._id }, req.body, {
             runValidators: true
        })
        if (!task) {
            return res.status(404).json({ error: 'Bad Request' })
        }
        res.status(201).json({ ok: true })
    } catch (err: any) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteItem = async (req: any, res: any) => {
    try {
        if (!req.session.userId && !req.body.hasOwnProperty('_id')) return res.status(400).json({ "error": "Bad Request"})

        const task = await Task.findOneAndDelete({ _id: req.body._id })
        if (!task) {
            return res.status(404).json({ error: 'Bad Request' })
        }
        res.status(200).json({ ok: true })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}