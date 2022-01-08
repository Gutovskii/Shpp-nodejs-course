import express, { Express } from 'express'
import session from 'express-session'
import cors from 'cors'
import 'dotenv/config'

import items from './router/items'
import auth from './router/auth'
import db from './db/connect'

const app: Express = express()

const MySQLStore = require('express-mysql-session')(session)

declare module 'express-session' {
    interface Session {
         userId: string;
    }
}

app.use(session({
    secret: 'omegasuperpowerfulsecret',
    store: new MySQLStore({}, db),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 100 * 60 * 60 * 2,
        httpOnly: true,
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

const port = 3000

const start = async () => {
    try {
        (await db)
        app.listen(port, () => console.log(`Server started on port: ${port}`))
    } catch (err) {
        console.log(err)
    }
}

start()