const http = require('http')

const server = http.createServer()

server.on('connection', () => {
    console.log('>>>>>>>>>>>>>>>>>>')
    console.log(new Date().toISOString())
    console.log('Пользователь присоединился')
})

server.on('request', (req, res) => {
    req.on('data', message => {
        console.log('>>>>>>>>>>>>>>>>>>')
        console.log(new Date().toISOString())
        console.log(`Client > ${message.toString()}`)
    })
    req.on('close', (err) => {
        console.log('>>>>>>>>>>>>>>>>>>')
        console.log(new Date().toISOString())
        console.log('Пользователь отсоединился')
    })
    console.log(req.socket.remoteAddress)
    res.write('Привет')
}).listen(3000, () => {
    console.log('Сервер запустился...')
})