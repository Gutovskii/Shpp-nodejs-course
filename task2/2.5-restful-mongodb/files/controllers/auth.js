const fs = require('fs')
const crypto = require('crypto')

const dbUsers = './db/db.json'

const login = (req, res) => {
    const { login, pass } = req.body

    if (login && pass) {
        const usersData = JSON.parse(fs.readFileSync(dbUsers))
        const user = usersData.find(user => user.login === login && user.pass === pass)
        if (user) {
            req.session.userId = user._id
            return res
                    .status(200)
                    .json({ "ok": true })
                    .redirect('/ToDov2')
        }
        return res.status(404).send('User Not Found')
    }
    return res.status(500).send('Internal Server Error')
}

const register = (req, res) => {
    const { login, pass } = req.body

    if (login && pass) {
        const usersData = JSON.parse(fs.readFileSync(dbUsers))
        const user = {
            _id: crypto.randomBytes(16).toString('hex'),
            login,
            pass,
            tasks: []
        }
        req.session.userId = user._id
        const newUsersData = usersData.push(user)
        fs.writeFileSync(dbUsers, newUsersData)
        return res.status(200).send({ "ok": true })
    }
    return res.status(500).send('Internal Server Error')
}

const logout = (req, res) => {
    req.session.destroy(err => {
        if (!err) {
            res.clearCookie('sid')
            res.redirect('/LoginToDo/login.html')
        }
    })
}

module.exports = {
    login,
    register,
    logout
}