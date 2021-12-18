const net = require('net')

const connection = socket => {
    const { remoteAddress } = socket 
    console.log('>>>>>>>>>>>>>>>>>>>>>>')
    console.log(new Date().toDateString())
    console.log('Пользователь присоединился')
    console.log(`Адрес: ${remoteAddress}`)

    socket.on('data', data => {
        console.log('>>>>>>>>>>>>>>>>>>>>>>')
        console.log(new Date().toDateString())
        console.log('Client > ' + data)
        socket.write(data)
    })

    socket.on('error', () => {
        console.log('>>>>>>>>>>>>>>>>>>>>>>')
        console.log(new Date().toDateString())
        console.log('Пользователь отсоединился')
        console.log(new Date())
    })
}

const server = net.createServer()

server.on('connection', connection)

server.listen(3000)