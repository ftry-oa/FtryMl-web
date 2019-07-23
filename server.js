const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const config = require('./config')
const utils = require('./build/utils')
const httpProxy = require('http-proxy')

const baseDir = './src'
const target = 'http://127.0.0.1:8000'

const proxy = httpProxy.createProxyServer({})

var server = http.createServer(function (request, response) {
  const urlObject = url.parse(request.url)
  let pathname = urlObject.pathname
  if (!pathname || pathname === '/') {
    pathname = '/index.html'
  }
  if (pathname.indexOf('upload') !== -1 || pathname.indexOf('admin') !== -1) {
    proxy.web(request, response, { target, })
    return
  }
  const fileName = path.join(__dirname, baseDir + pathname)
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
server.listen(8080)
console.log('server start at 8080')