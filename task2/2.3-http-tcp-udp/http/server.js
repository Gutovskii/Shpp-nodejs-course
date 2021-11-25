const http = require('http')

http.createServer((req, res) => {
    
    console.log(req.socket.remoteAddress)
    console.log('aaa')

    res.setHeader('SayHi', 'Hello')
    res.end('Hello')
})
.listen(3000)