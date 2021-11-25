const dgram = require('dgram')

const server = dgram.createSocket('udp4')

server.on('message', (msg, rinfo) => {
    console.log('>>>>>>>>>>>>>>>>>>>>>>')
    console.log(new Date().toDateString())
    console.log('Пользователь отправил данные')
    console.log(`Адрес: ${rinfo.address}`)
    console.log(`Client > ${msg.toString()}`)

    server.send(msg, rinfo.port, 'localhost')
})

server.bind(3000)