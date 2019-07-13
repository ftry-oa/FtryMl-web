var http = require('http')
var url = require('url')
var path = require('path')
var fs = require('fs')
var config = require('./config')
var utils = require('./build/utils')

const baseDir = './src'

var server = http.createServer(function (request, response) {
  const urlObject = url.parse(request.url)
  const fileName = path.join(__dirname, baseDir + urlObject.pathname)
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