const net = require('net')

const socket = new net.Socket()

let connectionTime

socket.on('data', data => {
    const dataResponseBeginningTime = new Date().getTime()

    console.log('Server > ' + data)

    if (data == 'Привет') {
        console.log('Сервер нам тоже сказал привет')
    }

    const respondedTime = (dataResponseBeginningTime - connectionTime) / 100
    console.log(`Время на передачу и получение данных: ${respondedTime}s`)
})

socket.on('error', err => {
    console.log('Сервер отключился') 
})

socket.on('connect', () => {
    connectionTime = new Date().getTime()
    console.log('Отсылаем "Привет" серверу')
    socket.write('Привет')
})

socket.connect({
    port: 3000
})