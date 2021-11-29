const http = require('http')

const options = {
    method: 'POST',
    port: 3000
}

const clientMessage = 'Привет'

console.time('requestTime')

const req = http.request(options, (res) => {
    res.on('data', (message) => {
        if (message.toString() == clientMessage) {
            console.log(`Server > ${message.toString()}`)
            console.log('Сервер нам тоже сказал привет')
            console.timeEnd('requestTime')
        }
    })
})

req.write(clientMessage, () => {
    console.log('Сообщение отправляется...')
})