
const utils = require('./utils')

console.log('@@@ip', utils.getIPAdress())
const target = `http://${utils.getIPAdress()}:8000`

module.exports = {
  version: '3.0',
  baseDir: '../src',
  port: 8080,
  proxy: {
    '/ftryml': target,
    '/admin': target,
  },
}