import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cors from 'cors'
import 'dotenv/config'

import items from './router/items'
import auth from './router/auth'
import connectDB from './db/connect'

const app = express()

app.use(session({
    secret: 'omegasuperpowerfulsecret',
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    resave: false,
    saveUninitialized: false
}))

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use('/api/v1', items, auth)

const port = 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI!)
        app.listen(port, () => console.log(`Server started on port: ${port}`))
    } catch (err) {
        console.log(err)
    }
}

start()