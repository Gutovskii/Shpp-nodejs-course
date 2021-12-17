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
    saveUninitialized: false
}))

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use('/api/v1', items, auth)

const port = 3000

app.listen(port, () => console.log(`Server started on port: ${port}`))