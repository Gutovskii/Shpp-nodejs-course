const path = require('path')
const express = require('express')

const app = express()
const PORT = 3000

const visitsData = {}

app.set('view engine', 'ejs')
app.set('views', path.resolve('ejs'))

function updateVisits(pageName) {
    if (visitsData.hasOwnProperty(pageName)) {
        visitsData[pageName]++
    } else {
        visitsData[pageName] = 1
    }
}

app.get('/', (req, res) => {
    updateVisits('index')
    res.render('index', {visits: visitsData.index})
})

app.get('/hello', (req, res) => {
    updateVisits('hello')
    res.render('hello', {visits: visitsData.hello})
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})