var fs = require('fs')
var path = require('path')

function readHttpLikeInput(){
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for(;;){ 
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) {break; /* windows */}
        if(buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10) 
                break;
            was10++;
        } else 
           was10 = 0;
        res += new String(buffer);
    }
    return res;
}
let contents = readHttpLikeInput();

function outputHttpResponse(statusCode, body = '') {
  let date = new Date()
  let response = 
`HTTP/1.1 ${statusCode}
Date: ${date.toGMTString()}
Server: Apache/2.2.14 (Win32)
Content-Length: ${body.length}
Connection: Closed
Content-Type: text/html; charset=utf-8
${body}`
  console.log(response)
}

function processHttpRequest(method, uri, headers, body) {
    headers = headers ?? ''
    body = body ?? ''

    try {
        let filePath
        if (uri == '/') filePath = 'index.html'
        else {
            filePath = path.join(headers["Host"]?.match(/[\w\d]+(?=\.)/)[0], uri)
        }
        const file = fs.readFileSync(filePath, {encoding: 'utf-8'})

        method = '200 OK'

        console.log(file)
    } catch (err) {
        method = '404 Not Found'
    }
    
    outputHttpResponse(method, body)
}

function parseTcpStringAsHttpRequest(string) {
  return { 
    method: string.match(/^[A-Z]{3,6}/ig)[0], 
    uri: string.match(/(?<=\s)(\/\S*)?/ig)[0], 
    headers: string.match(/^[\w\-]+\:.+/igm)?.reduce((prev, curr) => {
        let header = curr.split(': ')
        prev[header[0]] = header[1]
        return prev
    }, {}), 
    body: string.match(/\?[\w\d]+\=[\w\d]*(\&[\w\d]+\=[\w\d]*)*/g), 
  }; 
}

const http = parseTcpStringAsHttpRequest(contents)
processHttpRequest(http.method, http.uri, http.headers, http.body);