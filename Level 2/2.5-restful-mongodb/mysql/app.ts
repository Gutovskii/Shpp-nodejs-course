import express, { Express } from 'express'
import session from 'express-session'
import cors from 'cors'
import 'dotenv/config'

import db from './db/connect'
import itemsRouter from './router/items'
import authRouter from './router/auth'
import { getItems } from './controllers/items'

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

const port: number = 3000

const start = async () => {
    try {
        (await db)
        app.listen(port, () => console.log(`Server started on port: ${port}`))
    } catch (err) {
        console.log(err)
    }
}
start()