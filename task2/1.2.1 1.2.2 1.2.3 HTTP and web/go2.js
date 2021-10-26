function readHttpLikeInput(){
    var fs = require("fs");
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

function outputHttpResponse(statusCode, statusMessage, headers, body) {
  let date = new Date()
  let response = 
`HTTP/1.1 ${statusCode} ${statusMessage}
Date: ${date.toGMTString()}
Server: Apache/2.2.14 (Win32)
Connection: Closed
Content-Type: text/html; charset=utf-8
Content-Length: ${body.toString().length}
${body}`
  console.log(response)
}

function processHttpRequest(method, uri, headers, body) {
  body = body.join('')
  if (!body.includes('/sum')) {
    body = 'not found'
  }
  else if (!body.includes('?nums=')) {
    body = '400 Bad Request'
  }
  else {
    body = body.match(/(\d,?)+/)[0].split(',').map(x => +x).reduce((prev, curr) => prev += curr)
  }

  if (method != 'GET') {
    method = '404'
    uri = 'Not Found'
  } 
  else {
    method = '200'
    uri = 'OK'
  }
  outputHttpResponse(method, uri, headers, body)
}

function parseTcpStringAsHttpRequest(string) {
  return { 
    method: string.match(/^[A-Z]{3,6}/ig)[0], 
    uri: string.match(/(?<=\s)(\/\S*)?/ig)[0], 
    headers: string.match(/^[\w\-]+\:.+/igm)?.reduce((prev, curr) => {prev.push(curr.split(': ')); return prev}, []), 
    body: string.match(/(\/sum)|((\&|\?)\w+\=[\w\d\$\+\-\*\,\/]*)+/igm), 
  }; 
}

http = parseTcpStringAsHttpRequest(contents);
processHttpRequest(http.method, http.uri, http.headers, http.body);