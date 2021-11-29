const dgram = require('dgram')

const client = dgram.createSocket('udp4')

let connectionTime

client.send('Привет', 3000, () => {
    connectionTime = new Date().getTime()
    console.log('Отсылаем "Привет" серверу')
})

client.on('message', msg => {
    const dataResponseBeginningTime = new Date().getTime()
    
    console.log(`Server > ${msg.toString()}`)
    
    if (msg.toString() == 'Привет') {
        console.log('Сервер нам тоже сказал привет')
    }

    const respnodedTime = (dataResponseBeginningTime - connectionTime) / 100
    console.log(`Время на передачу и получение данных: ${respnodedTime}s`)
})
