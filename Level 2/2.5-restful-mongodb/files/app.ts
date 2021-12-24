import express from 'express'
import session from 'express-session'
import sessionFileStore from 'session-file-store'
import cors from 'cors'

import items from './router/items'
import auth from './router/auth'

const app = express()

const FileStore = sessionFileStore(session)

app.use(session({
    store: new FileStore({retries: 0}),
    secret: 'omegasuperpowerfulsecret',
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

const port = 3000

app.listen(port, () => console.log(`Server started on port: ${port}`))