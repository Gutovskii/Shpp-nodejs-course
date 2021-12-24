import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cors from 'cors'
import 'dotenv/config'

import { getItems } from './controllers/items'
import { itemsRouter } from './router/items'
import { authRouter } from './router/auth'
import connectDB from './db/connect'

const app = express()

app.use(session({
    secret: 'omegasuperpowerfulsecret',
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 100 * 60 * 60 * 2
    }
}))

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(express.json())
app.use(express.static('public'))

app.get('/api/v2/router', getItems)
app.post('/api/v2/router', itemsRouter)
app.post('/api/v2/router', authRouter)

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