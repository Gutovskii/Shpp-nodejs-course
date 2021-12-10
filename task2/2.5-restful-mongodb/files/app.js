const express = require('express')
const session = require('express-session')

const items = require('./router/items')
const auth = require('./router/auth')

const app = express()

app.use(session({
    secret: 'omegasuperpowerfulsecret',
    name: 'sid',
    resave: false,
    saveUninitialized: false
}))

app.use(express.json())
app.use(express.static('public'))
app.use('/api/v1', items, auth)

const port = 3000

app.listen(port, () => console.log(`Server started on port: ${port}`))