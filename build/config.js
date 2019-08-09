

const utils = require('./utils')

const target = `http://${getIpAddr()}:8000`

module.exports = {
  version: '3.0',
  baseDir: '../src',
  port: 8080,
  proxy: {
    '/ftryml': target,
    '/admin': target,
  },
}