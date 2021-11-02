const path = require('path')
const express = require('express')

const PORT = 3000

const app = express()

app.use(express.static(path.resolve('static')))

app.get('/', (req, res) => {
    res.sendFile(path.resolve('static', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server: ${PORT}`)
})