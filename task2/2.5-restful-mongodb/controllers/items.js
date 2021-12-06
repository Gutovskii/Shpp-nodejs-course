const fs = require('fs')
const crypto = require('crypto')

const getItems = (req, res) => {
    const data = JSON.parse(fs.readFileSync('./db.json'))
    res.status(200).json(data) // get
}

const addItem = (req, res) => {
    if (req.body.hasOwnProperty('text')) {
        const data = JSON.parse(fs.readFileSync('./db.json'))
        const id = crypto.randomBytes(10).toString('hex')
        const newTask = {
            id,
            text: req.body.text,
            checked: false
        }
        data.tasks.push(newTask) // post
        const newData = JSON.stringify(data, null, '\t')
        fs.writeFileSync('./db.json', newData)
        return res.status(200).json({ id })
    }
    res.status(400).send('400 Bad Request')
}

const changeItem = (req, res) => {
    if (req.body.hasOwnProperty('id')) {
        const data = JSON.parse(fs.readFileSync('./db.json'))
        const taskId = data.tasks.id
        const taskToChangeIndex = data.tasks.findIndex(task => task.id === req.body.id)
        if (taskToChangeIndex === -1) {
            return res.status(404).send(`
                404 Not Found
                There is no task with id '${req.body.id}'
            `)
        }  
        data.tasks[taskToChangeIndex] = req.body // put
        const newData = JSON.stringify(data, null, '\t')
        fs.writeFileSync('./db.json', newData)
        return res.status(200).json({ "ok": true })
    }
    res.status(400).send('400 Bad Request')
}

const deleteItem = (req, res) => {
    if (req.body.hasOwnProperty('id')) {
        const data = JSON.parse(fs.readFileSync('./db.json'))
        const taskToDeleteIndex = data.tasks.findIndex(task => task.id === req.body.id)
        if (taskToDeleteIndex === -1) {
            return res.status(404).send(`
                404 Not Found
                There is no task with id '${req.body.id}'
            `)
        }
        data.tasks.splice(taskToDeleteIndex, 1) // delete
        const newData = JSON.stringify(data, null, '\t')
        fs.writeFileSync('./db.json', newData)
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