const express = require('express')
require('dotenv').config()

const items = require('./router/items')
const connectDB = require('./db/connect')

const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use('/api/v1', items)

const port = 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`Server started on port: ${port}`))
    } catch (err) {
        console.log(err)
    }
}

start()