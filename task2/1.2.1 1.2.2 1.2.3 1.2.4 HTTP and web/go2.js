var fs = require('fs')

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

function outputHttpResponse(statusCode, body) {
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

function processHttpRequest(httpRequest) {
  http = parseTcpStringAsHttpRequest(httpRequest)

  if (http.method != 'POST') {
    http.method = '404 Not Found'
  } 
  else {
    http.method = '200 OK'
  }

  if (!http.uri.includes('/api/checkLoginAndPassword')) {
    http.method = '404 Not Found'
  } else {
    http.uri = ''
  }

  for (let i in http.headers) {
    if (http.headers[i][0] == 'Content-Type' && !http.headers[i][1].includes('application')) {
      http.headers = '502 Bad Gateway'
      break
    }
  }

  try {
    let passwordsObj = fs.readFileSync('data/passwords.txt', {encoding: 'utf-8'})
                        .match(/[\w\d]+:[\w\d]+/g)
                        .map(userData => [userData.match(/[\w\d]+(?=\:)/)[0], userData.match(/(?<=\:)[\w\d]+/)[0]])
                        .reduce((prev, curr) => {
                          prev[curr[0]] = curr[1]
                          return prev
                        }, {})

    userLogin = http.body.match(/(?<=login=)[\w\d]*/)[0]
    userPassword = http.body.match(/(?<=password=)[\w\d]*/)[0]

    if (passwordsObj[userLogin] == userPassword) {
      http.body = '<h1 style="color:green">FOUND</h1>'
    } else {
      http.body = '<h1 style="color:red">NOT FOUND</h1>'
    }
  } catch (err) {
    http.body = '500 Internal Server Error'
  }
  outputHttpResponse(http.method, http.body)
}

function parseTcpStringAsHttpRequest(string) {
  return { 
    method: string.match(/^[A-Z]{3,6}/ig)[0], 
    uri: string.match(/(?<=\s)(\/\S*)?/ig)[0], 
    headers: string.match(/^[\w\-]+\:.+/igm)?.reduce((prev, curr) => {prev.push(curr.split(': ')); return prev}, []), 
    body: string.match(/(\/sum)|((\&|\?)\w+\=[\w\d\$\+\-\*\,\/]*)+/igm)[0], 
  }; 
}

processHttpRequest(contents);