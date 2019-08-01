const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const config = require('./config')
const utils = require('./utils')
const httpProxy = require('http-proxy')

const proxy = httpProxy.createProxyServer({})

var server = http.createServer(function (request, response) {
  const urlObject = url.parse(request.url)
  let pathname = urlObject.pathname
  if (!pathname || pathname === '/') {
    pathname = '/index.html'
  }
  const proxyResult = utils.isProxyApi(config.proxy, pathname)
  if (proxyResult.data) {
    proxy.web(request, response, { target: proxyResult.target })
    return
  }
  const fileName = path.join(__dirname, config.baseDir + pathname)
  // 文件读取
  fs.readFile(fileName, 'binary', function (err, data) {
    if (err) {
      response.writeHead(404, 'not found')
      response.end('<h1>404 Not Found</h1>')
      return
    }
    config.version = new Date().getTime().toString()
    data = utils.replace(data, config)
    response.write(data, 'binary')
    response.end()
  })
})
server.listen(config.port)
console.log(`server start at http://localhost:${config.port}`)