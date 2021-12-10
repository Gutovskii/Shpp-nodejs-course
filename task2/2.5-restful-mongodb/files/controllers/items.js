const fs = require('fs')
const crypto = require('crypto')

const dbUrn = './db/db.json'

const getItems = (req, res) => {
    if (req.session.userId) {
        const data = JSON.parse(fs.readFileSync(dbUrn))
        const userTasks = data.users.find(user => user._id === req.session.userId).tasks
        res.status(200).json(userTasks) // get
    }
    return res.status(500)
}

const addItem = (req, res) => {
    if (req.session.userId && req.body.hasOwnProperty('text')) {
        const data = JSON.parse(fs.readFileSync(dbUrn))
        const userIndex = data.users.findIndex(user => user._id === req.session.userId)
        const _id = crypto.randomBytes(10).toString('hex')
        const newTask = {
            _id,
            text: req.body.text,
            checked: false
        }
        data.users[userIndex].tasks.push(newTask) // post
        const newData = JSON.stringify(data, null, '\t')
        fs.writeFileSync(dbUrn, newData)
        return res.status(200).json({ _id })
    }
    res.status(400).send('400 Bad Request')
}

const changeItem = (req, res) => {
    if (req.session.userId && req.body.hasOwnProperty('_id')) {
        const data = JSON.parse(fs.readFileSync(dbUrn))
        const userIndex = data.users.findIndex(user => user._id === req.session.userId)
        const taskToChangeIndex = data.users[userIndex].tasks.findIndex(task => task._id === req.body._id)
        if (taskToChangeIndex === -1) {
            return res.status(404).send(`
                404 Not Found
                There is no task with id '${req.body._id}'
            `)
        }  
        data.users[userIndex].tasks[taskToChangeIndex] = req.body // put
        const newData = JSON.stringify(data, null, '\t')
        fs.writeFileSync(dbUrn, newData)
        return res.status(200).json({ "ok": true })
    }
    res.status(400).send('400 Bad Request')
}

const deleteItem = (req, res) => {
    if (req.session.userId && req.body.hasOwnProperty('_id')) {
        const data = JSON.parse(fs.readFileSync(dbUrn))
        const userIndex = data.users.findIndex(user => user._id === req.session.userId)
        const taskToDeleteIndex = data.users[userIndex].tasks.findIndex(task => task._id === req.body._id)
        if (taskToDeleteIndex === -1) {
            return res.status(404).send(`
                404 Not Found
                There is no task with id '${req.body._id}'
            `)
        }
        data.users[userIndex].tasks.splice(taskToDeleteIndex, 1) // delete
        const newData = JSON.stringify(data, null, '\t')
        fs.writeFileSync(dbUrn, newData)
        return res.status(200).json({ "ok": true })
    }
    res.status(400).send('400 Bad Request')
}

module.exports = {
    getItems,
    addItem,
    changeItem,
    deleteItem
}