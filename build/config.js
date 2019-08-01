

const target = 'http://127.0.0.1:8000'

module.exports = {
  version: '3.0',
  baseDir: '../src',
  port: 8080,
  proxy: {
    '/ftryml': target,
    '/admin': target,
  },
}