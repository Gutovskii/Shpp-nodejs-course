import express, { Express } from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cors from 'cors'
import 'dotenv/config'

import items from './router/items'
import auth from './router/auth'
import connectDB from './db/connect'

const app: Express = express()

declare module 'express-session' {
    interface Session {
        userId: string;
    }
}

app.use(session({
    secret: 'omegasuperpowerfulsecret',
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 100 * 60 * 60 * 2,
        httpOnly: true
    }
}))

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(express.json())
app.use(express.static('public'))
app.use('/api/v1', items, auth)

const port: number = 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI!)
        app.listen(port, () => console.log(`Server started on port: ${port}`))
    } catch (err: unknown) {
        console.log(err)
    }
}
start()