import express from 'express'
import session from 'express-session'
import sessionFileStore from 'session-file-store'

import { getItems } from './controllers/items'
import itemsRouter from './router/items'
import authRouter from './router/auth'

const app = express()

const FileStore = sessionFileStore(session)

app.use(session({
    store: new FileStore({retries: 0}),
    secret: 'omegasuperpowerfulsecret',
    resave: false,
    saveUninitialized: false
}))

app.use(express.json())
app.use(express.static('public'))

app.get('/api/v2/router', getItems)
app.post('/api/v2/router', itemsRouter)
app.post('/api/v2/router', authRouter)

const port = 3000

app.listen(port, () => console.log(`Server started on port: ${port}`))